(function(root, factory) {
	var api = factory();
	if (typeof module === 'object' && module.exports) { module.exports = api; }
	if (root) { root.CrossexData = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
	'use strict';

	var DEFAULT_MISSING = new Set(['NA', 'N/A', 'NULL', 'null', 'NaN', 'nan', '']);

	// Tokens that mean "no value" once a cell is trimmed and upper-cased. Covers
	// the usual NA family plus the error strings Excel/Sheets paste into cells
	// (#N/A, #DIV/0!, …). Matching is case-insensitive so "nan"/"NaN"/"#n/a" all
	// collapse to a true null — we never turn these into the number NaN.
	var MISSING_TOKENS = new Set([
		'', 'NA', 'N/A', 'NAN', 'NULL', 'NIL',
		'#N/A', '#NA', '#N/A N/A', '#VALUE!', '#REF!', '#DIV/0!', '#NUM!', '#NAME?', '#NULL!', '#ERROR!'
	]);
	function isMissingToken(trimmed) {
		return trimmed === '' || MISSING_TOKENS.has(trimmed.toUpperCase());
	}

	// Same ISO-ish shape d3.autoType recognizes as a Date.
	var DATE_LIKE = /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;

	// Coerce one raw delimited cell. Mirrors d3.autoType (number / boolean / date
	// / text) with two deliberate differences: missing tokens and non-finite
	// values become a true null instead of NaN, and text is trimmed. A blank or
	// "#N/A" cell therefore stays empty and never contaminates a numeric column.
	function coerceCell(raw) {
		if (raw == null) { return null; }
		var s = String(raw).trim();
		if (isMissingToken(s)) { return null; }
		if (s === 'true') { return true; }
		if (s === 'false') { return false; }
		var n = +s;
		if (n === n) { return isFinite(n) ? n : null; }   // NaN check; ±Infinity -> null
		if (DATE_LIKE.test(s)) {
			var d = new Date(s);
			if (!isNaN(+d)) { return d; }
		}
		return s;
	}

	// Aggressive numeric cleaner for explicit "use as Number" conversions (the
	// Datatype pulldown and the Data Lab). Strips thousands separators, spaces
	// (incl. non-breaking), currency symbols, and accounting parentheses so
	// "1,200", " 1 200 ", "$1,200", and "(1,200)" all become finite numbers.
	// Anything that still isn't a finite number returns null — never NaN.
	function cleanNumber(value) {
		if (value == null) { return null; }
		if (typeof value === 'number') { return isFinite(value) ? value : null; }
		var s = String(value).trim();
		if (isMissingToken(s)) { return null; }
		var negative = /^\(.*\)$/.test(s);
		if (negative) { s = s.slice(1, -1); }
		s = s.replace(/[,\s $€£¥]/g, '');
		if (s === '') { return null; }
		var n = Number(s);
		if (!isFinite(n)) { return null; }
		return negative ? -n : n;
	}

	// Turn a raw header row into clean, unique, non-empty column names. A blank
	// header cell (a column Excel left unlabeled) becomes "Column N"; duplicate
	// names get a numeric suffix so no column silently overwrites another.
	function cleanHeaders(rawHeader, width) {
		var used = Object.create(null);
		var names = [];
		for (var i = 0; i < width; i++) {
			var base = rawHeader[i] == null ? '' : String(rawHeader[i]).trim();
			if (base === '') { base = 'Column ' + (i + 1); }
			var unique = base, k = 2;
			while (used[unique]) { unique = base + '_' + k; k++; }
			used[unique] = true;
			names.push(unique);
		}
		return names;
	}

	// Choose the delimiter from the first non-empty line by counting candidates:
	// tabs win ties (a pasted spreadsheet is tab-separated), otherwise comma.
	// This replaces "contains any tab -> TSV", where one stray tab in a CSV
	// collapsed the whole table into a single column.
	function sniffDelimiter(text) {
		var start = 0;
		while (start < text.length) {
			var nl = text.indexOf('\n', start);
			var line = (nl < 0 ? text.slice(start) : text.slice(start, nl)).replace(/\r$/, '');
			if (line.trim() !== '') {
				var tabs = 0, commas = 0, semis = 0;
				for (var i = 0; i < line.length; i++) {
					var c = line.charCodeAt(i);
					if (c === 9) { tabs++; } else if (c === 44) { commas++; } else if (c === 59) { semis++; }
				}
				if (tabs > 0 && tabs >= commas && tabs >= semis) { return '\t'; }
				if (semis > commas) { return ';'; }
				return ',';
			}
			if (nl < 0) { break; }
			start = nl + 1;
		}
		return ',';
	}

	// Parse delimited text with full control over headers and blank lines. Fully
	// empty rows (trailing newlines, blank lines Excel leaves at the end) are
	// dropped; the header is padded to the widest row so an extra unlabeled
	// column is kept rather than discarded.
	function parseDelimited(text, delimiter, dsv) {
		var arrays = dsv.dsvFormat(delimiter).parseRows(text).filter(function(row) {
			return row.some(function(cell) { return cell != null && String(cell).trim() !== ''; });
		});
		if (!arrays.length) { throw new Error('No data rows were found'); }
		var width = 0;
		for (var a = 0; a < arrays.length; a++) { if (arrays[a].length > width) { width = arrays[a].length; } }
		var header = cleanHeaders(arrays[0], width);
		var rows = [];
		for (var r = 1; r < arrays.length; r++) {
			var arr = arrays[r];
			var obj = {};
			for (var c = 0; c < width; c++) { obj[header[c]] = coerceCell(arr[c]); }
			rows.push(obj);
		}
		rows.columns = header;
		return validateRows(rows);
	}

	function columnsOf(rows) {
		if (rows && Array.isArray(rows.columns)) { return rows.columns.slice(); }
		var columns = [];
		var seen = new Set();
		(rows || []).forEach(function(row) {
			if (!row || typeof row !== 'object' || Array.isArray(row)) { return; }
			Object.keys(row).forEach(function(key) {
				if (!seen.has(key)) { seen.add(key); columns.push(key); }
			});
		});
		return columns;
	}

	function validateRows(rows) {
		if (!Array.isArray(rows)) { throw new Error('Data must be an array of row objects'); }
		if (!rows.length) { throw new Error('The dataset contains no rows'); }
		for (var i = 0; i < rows.length; i++) {
			if (!rows[i] || typeof rows[i] !== 'object' || Array.isArray(rows[i])) {
				throw new Error('Row ' + (i + 1) + ' must be an object');
			}
		}
		var columns = columnsOf(rows);
		if (!columns.length) { throw new Error('The rows contain no columns'); }
		rows.columns = columns;
		return rows;
	}

	function parseInput(text, dsv) {
		if (typeof text !== 'string' || !text.trim()) { throw new Error('No data was provided'); }
		if (!dsv || typeof dsv.dsvFormat !== 'function') {
			throw new Error('A CSV/TSV parser is required');
		}
		var trimmed = text.trim();
		if (trimmed[0] === '[' || trimmed[0] === '{') {
			var rows;
			try { rows = JSON.parse(trimmed); }
			catch (error) { throw new Error('Invalid JSON: ' + error.message); }
			if (!Array.isArray(rows)) { rows = [rows]; }
			return validateRows(rows);
		}
		return parseDelimited(text, sniffDelimiter(text), dsv);
	}

	function isMissing(value, missingValues) {
		return value === null || value === undefined ||
			(typeof value === 'number' && value !== value) ||
			(typeof value === 'string' && missingValues.has(value.trim()));
	}

	function valueType(value) {
		if (value instanceof Date) { return 'date'; }
		if (typeof value === 'number' && isFinite(value)) { return 'numeric'; }
		if (typeof value === 'boolean') { return 'boolean'; }
		return 'text';
	}

	function stableRowKey(row, columns) {
		return columns.map(function(column) {
			var value = row[column];
			if (value instanceof Date) { return 'd:' + value.toISOString(); }
			return typeof value + ':' + String(value);
		}).join('\u001f');
	}

	function profile(rows, options) {
		options = options || {};
		validateRows(rows);
		var columns = columnsOf(rows);
		var scanLimit = Math.max(1, options.scanLimit || 100000);
		var distinctLimit = Math.max(100, options.distinctLimit || 10000);
		var scanned = Math.min(rows.length, scanLimit);
		var missingValues = new Set(DEFAULT_MISSING);
		(options.missingValues || []).forEach(function(value) { missingValues.add(String(value)); });

		var duplicateSet = new Set();
		var duplicateRows = 0;
		for (var r = 0; r < scanned; r++) {
			var rowKey = stableRowKey(rows[r], columns);
			if (duplicateSet.has(rowKey)) { duplicateRows++; }
			else { duplicateSet.add(rowKey); }
		}

		var issues = [];
		var profiles = columns.map(function(column) {
			var missing = 0;
			var types = Object.create(null);
			var distinct = new Set();
			var distinctCapped = false;
			var samples = [];
			var numericCount = 0, min = Infinity, max = -Infinity, mean = 0;
			for (var i = 0; i < scanned; i++) {
				var value = rows[i][column];
				if (isMissing(value, missingValues)) { missing++; continue; }
				var type = valueType(value);
				types[type] = (types[type] || 0) + 1;
				if (distinct.size < distinctLimit) { distinct.add(type + ':' + String(value)); }
				else { distinctCapped = true; }
				if (samples.length < 3 && samples.indexOf(String(value)) < 0) { samples.push(String(value)); }
				if (type === 'numeric') {
					numericCount++;
					if (value < min) { min = value; }
					if (value > max) { max = value; }
					mean += (value - mean) / numericCount;
				}
			}
			var nonMissing = scanned - missing;
			var typeNames = Object.keys(types);
			var type = !nonMissing ? 'empty' : (typeNames.length === 1 ? typeNames[0] : 'mixed');
			var distinctCount = distinct.size;
			var missingRate = scanned ? missing / scanned : 0;
			var uniqueRate = nonMissing ? Math.min(1, distinctCount / nonMissing) : 0;
			var item = {
				name: column,
				type: type,
				types: types,
				missing: missing,
				missingRate: missingRate,
				distinct: distinctCount,
				distinctCapped: distinctCapped,
				uniqueRate: uniqueRate,
				samples: samples,
				min: numericCount ? min : null,
				max: numericCount ? max : null,
				mean: numericCount ? mean : null
			};
			if (type === 'empty') { issues.push({ severity: 'warning', code: 'empty', column: column, message: column + ' is entirely missing' }); }
			else if (type === 'mixed') { issues.push({ severity: 'warning', code: 'mixed', column: column, message: column + ' contains mixed data types' }); }
			if (missingRate >= 0.2 && type !== 'empty') { issues.push({ severity: 'info', code: 'missing', column: column, message: column + ' is ' + Math.round(missingRate * 100) + '% missing' }); }
			if (nonMissing > 1 && distinctCount === 1) { issues.push({ severity: 'info', code: 'constant', column: column, message: column + ' has one constant value' }); }
			var idName = /(^id$|(^|[_\s-])id($|[_\s-])|uuid|identifier|row[_\s-]?number|index$|key$)/i.test(column);
			if (nonMissing >= 20 && uniqueRate >= 0.95 && (type === 'text' || idName)) {
				issues.push({ severity: 'info', code: 'identifier', column: column, message: column + ' looks like an identifier' });
			}
			return item;
		});

		if (duplicateRows) {
			issues.unshift({ severity: 'warning', code: 'duplicates', column: null,
				message: duplicateRows.toLocaleString() + ' duplicate row' + (duplicateRows === 1 ? '' : 's') + ' found in the scanned data' });
		}
		return {
			rowCount: rows.length,
			columnCount: columns.length,
			scannedRows: scanned,
			partial: scanned < rows.length,
			duplicateRows: duplicateRows,
			columns: profiles,
			issues: issues
		};
	}

	function convertColumn(rows, column, targetType) {
		if (targetType === 'automatic') { return rows; }
		for (var i = 0; i < rows.length; i++) {
			var value = rows[i][column];
			if (value === null || value === undefined || value === '') { rows[i][column] = null; continue; }
			if (targetType === 'text') { rows[i][column] = String(value); }
			else if (targetType === 'numeric') {
				rows[i][column] = cleanNumber(value);
			} else if (targetType === 'date') {
				var date = value instanceof Date ? value : new Date(value);
				rows[i][column] = isNaN(+date) ? null : date;
			}
		}
		return rows;
	}

	function copyColumns(source, target, columns) {
		target.columns = (columns || columnsOf(source)).slice();
		return target;
	}

	function setOwn(object, key, value) {
		Object.defineProperty(object, key, { value: value, writable: true, enumerable: true, configurable: true });
	}

	function pickRow(row, columns) {
		var output = {};
		columns.forEach(function(column) { setOwn(output, column, row[column]); });
		return output;
	}

	function sortRows(rows, column, direction) {
		var columns = columnsOf(rows);
		if (columns.indexOf(column) < 0) { throw new Error('Unknown sort column: ' + column); }
		var dir = direction === 'desc' ? -1 : 1;
		var indexed = rows.map(function(row, index) { return { row: row, index: index }; });
		indexed.sort(function(a, b) {
			var x = a.row[column], y = b.row[column];
			var xm = x === null || x === undefined || x === '', ym = y === null || y === undefined || y === '';
			if (xm && ym) { return a.index - b.index; }
			if (xm) { return 1; }
			if (ym) { return -1; }
			var result;
			if (typeof x === 'number' && typeof y === 'number') { result = x - y; }
			else if (x instanceof Date && y instanceof Date) { result = +x - +y; }
			else { result = String(x).localeCompare(String(y)); }
			return dir * result || a.index - b.index;
		});
		return copyColumns(rows, indexed.map(function(item) { return item.row; }), columns);
	}

	function deduplicateRows(rows, keys) {
		var columns = columnsOf(rows);
		keys = keys && keys.length ? keys.slice() : columns.slice();
		keys.forEach(function(key) { if (columns.indexOf(key) < 0) { throw new Error('Unknown deduplication column: ' + key); } });
		var seen = new Set();
		var output = [];
		rows.forEach(function(row) {
			var key = stableRowKey(row, keys);
			if (!seen.has(key)) { seen.add(key); output.push(row); }
		});
		return copyColumns(rows, output, columns);
	}

	function aggregateValues(values, operation) {
		var present = values.filter(function(value) { return value !== null && value !== undefined && value !== ''; });
		if (operation === 'count') { return present.length; }
		var numeric = present.map(Number).filter(function(value) { return isFinite(value); });
		if (!numeric.length) { return null; }
		if (operation === 'sum') { return numeric.reduce(function(total, value) { return total + value; }, 0); }
		if (operation === 'mean') { return numeric.reduce(function(total, value) { return total + value; }, 0) / numeric.length; }
		if (operation === 'min') { return Math.min.apply(null, numeric); }
		if (operation === 'max') { return Math.max.apply(null, numeric); }
		throw new Error('Unsupported aggregation: ' + operation);
	}

	function groupRows(rows, groupBy, aggregations) {
		var columns = columnsOf(rows);
		groupBy = (groupBy || []).slice();
		aggregations = (aggregations || []).slice();
		if (!aggregations.length) { throw new Error('At least one aggregation is required'); }
		groupBy.forEach(function(column) { if (columns.indexOf(column) < 0) { throw new Error('Unknown group column: ' + column); } });
		aggregations.forEach(function(aggregation) {
			if (aggregation.operation !== 'count' && columns.indexOf(aggregation.column) < 0) {
				throw new Error('Unknown aggregation column: ' + aggregation.column);
			}
		});
		var groups = new Map();
		rows.forEach(function(row) {
			var key = stableRowKey(row, groupBy);
			if (!groups.has(key)) { groups.set(key, []); }
			groups.get(key).push(row);
		});
		var outputColumns = groupBy.slice();
		aggregations.forEach(function(aggregation) {
			var name = aggregation.as || (aggregation.operation + (aggregation.column ? '_' + aggregation.column : ''));
			if (outputColumns.indexOf(name) >= 0) { throw new Error('Duplicate output column: ' + name); }
			outputColumns.push(name);
		});
		var output = [];
		groups.forEach(function(group) {
			var row = {};
			groupBy.forEach(function(column) { setOwn(row, column, group[0][column]); });
			aggregations.forEach(function(aggregation) {
				var name = aggregation.as || (aggregation.operation + (aggregation.column ? '_' + aggregation.column : ''));
				var values = aggregation.operation === 'count' ? group.map(function() { return 1; }) :
					group.map(function(item) { return item[aggregation.column]; });
				setOwn(row, name, aggregation.operation === 'count' ? group.length : aggregateValues(values, aggregation.operation));
			});
			output.push(row);
		});
		return copyColumns(rows, output, outputColumns);
	}

	function appendRows(left, right, options) {
		validateRows(left); validateRows(right);
		options = options || {};
		var columns = (options.leftColumns || columnsOf(left)).slice();
		(options.rightColumns || columnsOf(right)).forEach(function(column) { if (columns.indexOf(column) < 0) { columns.push(column); } });
		var output = left.concat(right).map(function(row) { return pickRow(row, columns); });
		return copyColumns(left, output, columns);
	}

	function joinRows(left, right, options) {
		validateRows(left); validateRows(right);
		options = options || {};
		var leftColumns = (options.leftColumns || columnsOf(left)).slice();
		var rightColumns = (options.rightColumns || columnsOf(right)).slice();
		var leftKey = options.leftKey, rightKey = options.rightKey || leftKey;
		if (leftColumns.indexOf(leftKey) < 0) { throw new Error('Unknown left join key: ' + leftKey); }
		if (rightColumns.indexOf(rightKey) < 0) { throw new Error('Unknown right join key: ' + rightKey); }
		var type = options.type || 'left';
		if (['left', 'inner', 'full'].indexOf(type) < 0) { throw new Error('Unsupported join type: ' + type); }
		var suffix = options.suffix || '_right';
		var rightNames = {};
		rightColumns.forEach(function(column) {
			if (column === rightKey && leftKey === rightKey) { return; }
			var name = leftColumns.indexOf(column) >= 0 ? column + suffix : column;
			while (leftColumns.indexOf(name) >= 0 || Object.values(rightNames).indexOf(name) >= 0) { name += suffix; }
			rightNames[column] = name;
		});
		var outputColumns = leftColumns.concat(Object.keys(rightNames).map(function(column) { return rightNames[column]; }));
		var index = new Map();
		right.forEach(function(row, rowIndex) {
			var key = stableRowKey(row, [rightKey]);
			if (!index.has(key)) { index.set(key, []); }
			index.get(key).push({ row: row, index: rowIndex });
		});
		var matchedRight = new Set();
		var output = [];
		var maxRows = options.maxRows || Infinity;
		function addOutput(row) {
			if (output.length >= maxRows) { throw new Error('Join would exceed the ' + maxRows.toLocaleString() + '-row safety limit'); }
			output.push(row);
		}
		function merged(leftRow, rightRow) {
			var row = {};
			leftColumns.forEach(function(column) { setOwn(row, column, leftRow ? leftRow[column] : null); });
			if (!leftRow && rightRow && leftKey === rightKey) { setOwn(row, leftKey, rightRow[rightKey]); }
			Object.keys(rightNames).forEach(function(column) { setOwn(row, rightNames[column], rightRow ? rightRow[column] : null); });
			return row;
		}
		left.forEach(function(leftRow) {
			var matches = index.get(stableRowKey(leftRow, [leftKey])) || [];
			if (matches.length) {
				matches.forEach(function(match) { matchedRight.add(match.index); addOutput(merged(leftRow, match.row)); });
			} else if (type === 'left' || type === 'full') { addOutput(merged(leftRow, null)); }
		});
		if (type === 'full') {
			right.forEach(function(rightRow, index2) { if (!matchedRight.has(index2)) { addOutput(merged(null, rightRow)); } });
		}
		return copyColumns(left, output, outputColumns);
	}

	function createProject(state) {
		if (!state || !state.data) { throw new Error('Project data is required'); }
		validateRows(state.data);
		var columns = state.columns && state.columns.length ? state.columns.slice() : columnsOf(state.data);
		return {
			kind: 'crossex-project',
			version: 1,
			createdAt: new Date().toISOString(),
			name: state.name || 'Crossex project',
			columns: columns,
			data: state.data.map(function(row) { return pickRow(row, columns); }),
			options: state.options || [],
			signals: state.signals || {},
			transforms: state.transforms || [],
			operations: state.operations || []
		};
	}

	function parseProject(input) {
		var project = typeof input === 'string' ? JSON.parse(input) : input;
		if (!project || project.kind !== 'crossex-project') { throw new Error('Not a Crossex project file'); }
		if (project.version !== 1) { throw new Error('Unsupported Crossex project version: ' + project.version); }
		if (!Array.isArray(project.columns) || !Array.isArray(project.data)) { throw new Error('Project data is incomplete'); }
		project.data.columns = project.columns.slice();
		validateRows(project.data);
		project.options = Array.isArray(project.options) ? project.options : [];
		project.transforms = Array.isArray(project.transforms) ? project.transforms : [];
		project.operations = Array.isArray(project.operations) ? project.operations : [];
		project.signals = project.signals && typeof project.signals === 'object' ? project.signals : {};
		return project;
	}

	function csvCell(value) {
		if (value === null || value === undefined) { return '""'; }
		if (value instanceof Date) { value = isNaN(+value) ? '' : value.toISOString(); }
		if (typeof value === 'string' && /^[=+\-@\t\r]/.test(value)) { value = "'" + value; }
		return '"' + String(value).replace(/"/g, '""') + '"';
	}

	function toCsv(rows, columns) {
		columns = columns || columnsOf(rows);
		var lines = [columns.map(csvCell).join(',')];
		(rows || []).forEach(function(row) {
			lines.push(columns.map(function(column) { return csvCell(row[column]); }).join(','));
		});
		return '\uFEFF' + lines.join('\r\n');
	}

	return {
		columnsOf: columnsOf,
		validateRows: validateRows,
		parseInput: parseInput,
		cleanNumber: cleanNumber,
		profile: profile,
		convertColumn: convertColumn,
		sortRows: sortRows,
		deduplicateRows: deduplicateRows,
		groupRows: groupRows,
		appendRows: appendRows,
		joinRows: joinRows,
		createProject: createProject,
		parseProject: parseProject,
		csvCell: csvCell,
		toCsv: toCsv
	};
});
