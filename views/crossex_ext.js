
function toggle(id) {
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "block";
		document.getElementById("graph_button").innerHTML = "View Graph";
	} else {
		x.style.display = "none";
		document.getElementById("graph_button").innerHTML = "View Data";
	}
}

function optimize_axis(headers, struct) {
	var min_cat = 8;
	var max_cat = 200;
	var my_low_cat = -1;
	var my_high_cat = max_cat;
	var alt_cat = 8;
	var min_num = 8;
	var max_num = 8;
	var min_cat_name = "None";
	var alt_cat_name = "None";
	var max_cat_name = "None";
	var min_num_name = "None";
	var alt_num_name = "None";
	var alt2_num_name = "None";
	var max_num_name = "None";
	var color_by_name = "None";
	var x_axis_name = "None";
	var y_axis_name = "None";
	var split_to_panels1_by_name = "None";
	var split_to_panels2_by_name = "None";
	// Distinct counting stops at 1001 (every threshold below compares against
	// at most 200, so ID-like columns exit after ~1k rows) and scans at most
	// 50k rows — this only picks default axes, where a prefix estimate of
	// cardinality makes the same choices as an exact count.
	var OPTIMIZE_DISTINCT_CAP = 1001;
	var scanRows = Math.min(struct.length, 50000);
	headers.forEach(function(element) {
		var distinct = new Set();
		for (var r = 0; r < scanRows && distinct.size < OPTIMIZE_DISTINCT_CAP; ++r) {
			distinct.add(struct[r][element]);
		}
		var ln = distinct.size;
		if (typeof(struct[0][element]) === 'string') {
			if (ln < max_cat && ln > my_low_cat ) {
				my_low_cat = ln;
				max_cat_name = element;

			}
			if (ln < max_cat && ln < my_high_cat ) {
				my_low_cat = ln;
				min_cat_name = element;
			}
			if (ln >= 1 && ln <= min_cat && alt_cat_name == "None" && min_cat_name != "None") {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 && ln <= min_cat) {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 && ln <= alt_cat) {
				alt_cat = ln;
				alt_cat_name = element;
			}
		} else {
			if (ln < min_num) {
				min_num = ln;
				min_num_name = element;
			}
			if (ln >= max_num) {
				max_num = ln;
				alt2_num_name = alt_num_name;
				alt_num_name = max_num_name;
				max_num_name = element;
			}
		}
	});
	color_by_name = alt2_num_name;
	split_to_panels2_by_name = alt_cat_name;
	split_to_panels1_by_name = max_cat_name;
	y_axis_name = max_num_name;
	x_axis_name = max_cat_name;
	if (alt2_num_name != "None") {
		color_by_name = alt2_num_name;
		split_to_panels2_by_name = alt_cat_name;
		split_to_panels1_by_name = max_cat_name;
		y_axis_name = max_num_name;
	} else if (alt_cat_name != "None") {
		color_by_name = max_cat_name;
		split_to_panels1_by_name = min_cat_name;
		y_axis_name = max_num_name;
	} else if (min_cat_name != "None") {
		color_by_name = max_cat_name;
	}
	return [x_axis_name, y_axis_name, split_to_panels1_by_name, split_to_panels2_by_name, color_by_name];
}
// Accepts CSV, TSV, or a JSON array of row objects; returns rows with a
// .columns property (same shape d3.csvParse produces)
function parseInputData(string) {
	var trimmed = string.trim();
	if (trimmed[0] == '[' || trimmed[0] == '{') {
		try {
			var parsed = JSON.parse(trimmed);
			if (!Array.isArray(parsed)) {
				parsed = [parsed];
			}
			// union keys across the first rows in case some are sparse
			var cols = [];
			var seen = new Set();
			var limit = Math.min(parsed.length, 100);
			for (var i = 0; i < limit; i++) {
				for (var k in parsed[i]) {
					if (!seen.has(k)) {
						seen.add(k);
						cols.push(k);
					}
				}
			}
			parsed.columns = cols;
			return parsed;
		} catch (e) { /* not valid JSON — fall through to delimited parsing */ }
	}
	if (string.search(/\t/) > 0) {
		return d3.tsvParse(string, d3.autoType);
	}
	return d3.csvParse(string, d3.autoType);
}

// Large delimited text parses in ~8MB slices with a frame between each, so
// the tab stays responsive and progress can be shown. RFC-4180 quoted fields
// may contain newlines, so anything containing a quote falls back to one
// monolithic parse; JSON always parses in one shot.
var CHUNK_PARSE_BYTES = 8 * 1024 * 1024;
function parseInputDataAsync(string, onProgress, callback) {
	var trimmed = string.trim();
	if (trimmed[0] == '[' || trimmed[0] == '{' ||
		string.length < CHUNK_PARSE_BYTES || string.indexOf('"') !== -1) {
		callback(parseInputData(string));
		return;
	}
	var parseFn = string.search(/\t/) > 0 ? d3.tsvParse : d3.csvParse;
	var headerEnd = string.indexOf('\n');
	var header = string.slice(0, headerEnd);
	var rows = null;
	var pos = headerEnd + 1;
	var totalLen = string.length;
	function parseChunk() {
		var end = Math.min(pos + CHUNK_PARSE_BYTES, totalLen);
		if (end < totalLen) {
			end = string.indexOf('\n', end);
			if (end === -1) { end = totalLen; }
		}
		var part = parseFn(header + '\n' + string.slice(pos, end), d3.autoType);
		if (rows === null) {
			rows = part; // keeps .columns from the first chunk
		} else {
			for (var i = 0; i < part.length; i++) { rows.push(part[i]); }
		}
		pos = end + 1;
		if (pos < totalLen) {
			if (onProgress) { onProgress(Math.round(100 * pos / totalLen)); }
			requestAnimationFrame(parseChunk);
		} else {
			callback(rows);
		}
	}
	parseChunk();
}

// Files above this size skip the textarea (a preview is shown instead):
// a 50MB string in a DOM textarea costs seconds of layout time and doubles
// the memory held. Editing the textarea discards the loaded file.
var LARGE_FILE_BYTES = 4 * 1024 * 1024;
var _loadedFile = null;

function loadFileIntoInput(file) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var input = document.getElementById("myccinput");
		var text = e.target.result;
		if (file.size > LARGE_FILE_BYTES) {
			_loadedFile = { name: file.name, text: text };
			var preview = text.slice(0, 4000).split('\n').slice(0, 25).join('\n');
			input.value = preview + '\n…\n[Large file "' + file.name + '" (' +
				(file.size / 1048576).toFixed(1) + ' MB) loaded — preview only, the full file will be graphed. Editing this box discards it.]';
		} else {
			_loadedFile = null;
			input.value = text;
		}
		// normalize toggle state so the graph click always hides the input
		input.style.display = "block";
		document.getElementById("graph_button").innerHTML = "Graph Data";
		document.getElementById("graph_button").click();
	};
	reader.readAsText(file);
}

document.getElementById("myccinput").addEventListener('input', function() {
	_loadedFile = null;
});

document.getElementById("load_file").onclick = function fun() {
	document.getElementById("ccfileinput").click();
};

document.getElementById("ccfileinput").addEventListener('change', function(e) {
	if (e.target.files.length) {
		loadFileIntoInput(e.target.files[0]);
		e.target.value = "";
	}
});

var _dropTarget = document.getElementById("myccinput");
['dragenter', 'dragover'].forEach(function(evt) {
	_dropTarget.addEventListener(evt, function(e) {
		e.preventDefault();
		_dropTarget.classList.add('cc_dragover');
	});
});
_dropTarget.addEventListener('dragleave', function(e) {
	_dropTarget.classList.remove('cc_dragover');
});
_dropTarget.addEventListener('drop', function(e) {
	e.preventDefault();
	_dropTarget.classList.remove('cc_dragover');
	if (e.dataTransfer.files.length) {
		loadFileIntoInput(e.dataTransfer.files[0]);
	}
});

document.getElementById("default_data").onclick = function fun() {
	document.getElementById("myccinput").value = itg_decomp("<%=demo%>");
};

// Synthesizes a 5,000,000-row mixed-type dataset in the browser (no download,
// no CSV parse) and graphs it directly — a stress-test/demo for the
// large-data path. Generation is chunked so the UI stays responsive.
document.getElementById("large_demo").onclick = function fun() {
	var btn = document.getElementById("large_demo");
	if (btn.getAttribute('data-busy')) { return; }
	btn.setAttribute('data-busy', '1');
	var N = 5000000;
	var CHUNK = 250000;
	var c3 = ['low', 'medium', 'high'];
	var c8 = [], c40 = [], c500 = [];
	for (var i = 0; i < 500; i++) {
		if (i < 8) { c8.push('grp' + i); }
		if (i < 40) { c40.push('panel' + i); }
		c500.push('clinic' + i);
	}
	// mulberry32 — deterministic so repeat runs are comparable
	var seed = 1234567;
	function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
	function normal() { var u = 0, v = 0; while (!u) { u = rnd(); } while (!v) { v = rnd(); } return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
	var struct = [];
	struct.columns = ['uid', 'group', 'cohort', 'panel', 'clinic', 'expr_a', 'expr_b', 'logval', 'score', 'na_val'];
	function gen() {
		var stop = Math.min(struct.length + CHUNK, N);
		for (var r = struct.length; r < stop; r++) {
			var base = normal();
			struct.push({
				uid: 1000000 + r,
				group: c3[(rnd() * 3) | 0],
				cohort: c8[(rnd() * 8) | 0],
				panel: c40[(rnd() * 40) | 0],
				clinic: c500[(rnd() * 500) | 0],
				expr_a: +(base * 2 + 10).toFixed(3),
				expr_b: +(base * 1.5 + normal() + 8).toFixed(3),
				logval: +Math.exp(normal()).toFixed(4),
				score: +(rnd() * 100).toFixed(1),
				na_val: rnd() < 0.08 ? null : +(normal() * 5 + 50).toFixed(2)
			});
		}
		if (struct.length < N) {
			btn.innerHTML = 'Generating… ' + Math.round(100 * struct.length / N) + '%';
			requestAnimationFrame(gen);
		} else {
			btn.innerHTML = 'Load 5M Demo';
			btn.removeAttribute('data-busy');
			_loadedFile = { name: 'demo_5m', text: null, struct: struct };
			var input = document.getElementById('myccinput');
			input.value = '[Generated demo dataset: 5,000,000 rows × ' + struct.columns.length + ' columns. Editing this box discards it.]';
			input.style.display = 'block';
			document.getElementById('graph_button').innerHTML = 'Graph Data';
			document.getElementById('graph_button').click();
		}
	}
	btn.innerHTML = 'Generating… 0%';
	requestAnimationFrame(gen);
};

document.getElementById("clear_cookies").onclick = function fun() {
	clearAllCookies();
};

// ---- 3D unit view (SandDance-style) ----------------------------------------
// Every row is one WebGL mark; layouts animate between a 3D scatter and
// stacked unit columns. The renderer (src/lib/crossex3d.js, no dependencies)
// lazy-loads on first use.
var _3d = null;
var _3dData = null;
var _3dCfg = null;
var _3D_MAX_POINTS = 100000;

function numericColumns(struct) {
	var headers = struct.columns || Object.keys(struct[0] || {});
	var nums = [], cats = [];
	headers.forEach(function(col) {
		var seen = 0, numeric = true;
		for (var i = 0; i < struct.length && seen < 50; i++) {
			var v = struct[i][col];
			if (v == null || v === '') { continue; }
			seen++;
			if (typeof v !== 'number' && (isNaN(parseFloat(v)) || !isFinite(v))) { numeric = false; break; }
		}
		(numeric && seen ? nums : cats).push(col);
	});
	return { nums: nums, cats: cats, all: headers };
}

function build3dControls(struct) {
	var colInfo = numericColumns(struct);
	var wrap = document.getElementById('cc_3d_controls');
	var defaults = {
		x: colInfo.nums[0] || colInfo.all[0],
		y: colInfo.nums[1] || colInfo.all[1] || colInfo.all[0],
		z: colInfo.nums[2] || colInfo.nums[0] || colInfo.all[0],
		color: colInfo.cats[0] || 'None',
		layout: 'scatter'
	};
	_3dCfg = defaults;
	function sel(label, key, options, value) {
		return '<label>' + label + ' <select data-cc3d="' + key + '">' + options.map(function(o) {
			return '<option' + (o === value ? ' selected' : '') + '>' + o + '</option>';
		}).join('') + '</select></label>';
	}
	wrap.innerHTML =
		sel('X', 'x', colInfo.all, defaults.x) +
		sel('Y', 'y', colInfo.all, defaults.y) +
		sel('Z', 'z', colInfo.all, defaults.z) +
		sel('Color', 'color', ['None'].concat(colInfo.all), defaults.color) +
		'<span class="cc_3d_layouts">' +
		'<button data-cc3dlayout="scatter" class="cc_button active">Scatter</button>' +
		'<button data-cc3dlayout="stacks" class="cc_button">Stacks</button></span>' +
		'<button id="cc_3d_reset" class="cc_button">Reset View</button>';
	wrap.querySelectorAll('select[data-cc3d]').forEach(function(s) {
		s.addEventListener('change', function() {
			_3dCfg[s.getAttribute('data-cc3d')] = s.value;
			if (_3d) { _3d.applyConfig(_3dCfg, false); render3dLegend(); }
		});
	});
	wrap.querySelectorAll('button[data-cc3dlayout]').forEach(function(b) {
		b.addEventListener('click', function() {
			_3dCfg.layout = b.getAttribute('data-cc3dlayout');
			wrap.querySelectorAll('button[data-cc3dlayout]').forEach(function(x) { x.classList.remove('active'); });
			b.classList.add('active');
			if (_3d) { _3d.applyConfig(_3dCfg, false); }
		});
	});
	wrap.querySelector('#cc_3d_reset').addEventListener('click', function() {
		if (_3d) { _3d.resetCamera(); }
	});
}

function render3dLegend() {
	var el = document.getElementById('cc_3d_legend');
	if (!_3d || !_3d.legend) { el.innerHTML = ''; return; }
	el.innerHTML = _3d.legend.slice(0, 12).map(function(e) {
		return '<span class="cc_3d_key"><span class="cc_3d_swatch" style="background:' + e.color + '"></span>' +
			String(e.label).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>';
	}).join('');
}

document.getElementById("threed_button").onclick = function fun() {
	var wrap = document.getElementById('cc_3d_wrap');
	var note = document.getElementById('cc_3d_note');
	if (wrap.style.display !== 'none') {
		wrap.style.display = 'none';
		return;
	}
	wrap.style.display = 'block';
	if (!_lastStruct || !_lastStruct.length) {
		note.textContent = 'Load or paste data first, then click Graph Data.';
		return;
	}
	if (_3dData === _lastStruct && _3d) { return; }
	note.textContent = 'Loading 3D renderer…';
	loadScriptsSequentially(window.crossex3d ? [] : ['src/lib/crossex3d.js']).then(function() {
		_3dData = _lastStruct;
		var rows = _lastStruct.length > _3D_MAX_POINTS ? sampleRows(_lastStruct, _3D_MAX_POINTS) : _lastStruct;
		note.textContent = rows.length.toLocaleString() + ' rows shown' +
			(rows.length < _lastStruct.length ? ' (uniform sample of ' + _lastStruct.length.toLocaleString() + ')' : '') +
			' — drag to orbit, scroll to zoom, click a point for details, double-click to reset.';
		build3dControls(_lastStruct);
		var stage = document.getElementById('cc_3d_stage');
		if (_3d) { _3d.destroy(); }
		_3d = crossex3d.create(stage, function(row, cx, cy) {
			var tip = document.getElementById('cc_3d_tip') || (function() {
				var d = document.createElement('div');
				d.id = 'cc_3d_tip';
				d.className = 'cc_3d_tip';
				document.body.appendChild(d);
				return d;
			})();
			if (!row) { tip.style.display = 'none'; return; }
			var keys = Object.keys(row).filter(function(k) {
				return ['X_Value', 'Col_Value', 'Y_Value', 'Row_Value', 'Count', 'None', 'O_Value', 'Color_Value',
					'Cstr', 'Xstr', 'Ystr', 'Size_Value', 'jitter', 'xfocus', 'yfocus', 'Stroke_Value',
					'ecdf_rank', 'ecdf_n', 'ecdf_p', 'SortX_Value', 'Term'].indexOf(k) < 0;
			}).slice(0, 10);
			tip.innerHTML = keys.map(function(k) {
				return '<b>' + k + '</b>: ' + String(row[k]).replace(/&/g, '&amp;').replace(/</g, '&lt;');
			}).join('<br>');
			tip.style.display = 'block';
			tip.style.left = Math.min(window.innerWidth - 220, cx + 12) + 'px';
			tip.style.top = (cy + 12) + 'px';
			clearTimeout(tip._hideTimer);
			tip._hideTimer = setTimeout(function() { tip.style.display = 'none'; }, 4000);
		});
		if (_3d) { _3d.setData(rows, _3dCfg); render3dLegend(); }
	}).catch(function(err) {
		note.textContent = '3D view unavailable: ' + err.message;
	});
};

// Pivot table (PivotTable.js) over the loaded dataset. The app itself has no
// jQuery dependency, so the jQuery/jQuery-UI/pivot stack (~410KB) loads
// lazily the first time the button is used instead of blocking every page load.
function loadScriptsSequentially(urls) {
	return urls.reduce(function(chain, url) {
		return chain.then(function() {
			return new Promise(function(resolve, reject) {
				var s = document.createElement('script');
				s.src = url;
				s.onload = resolve;
				s.onerror = function() { reject(new Error('could not load ' + url)); };
				document.head.appendChild(s);
			});
		});
	}, Promise.resolve());
}

var PIVOT_LIBS = [
	'src/lib/jquery-3.6.0.min.js',
	'src/lib/jquery-ui.min.js',
	'src/lib/jquery.ui.touch-punch.min.js',
	'src/lib/pivot.js'
];
var _pivotLibsPromise = null;

function ensurePivotLibs() {
	if (window.jQuery && jQuery.fn.pivotUI) { return Promise.resolve(); }
	if (!_pivotLibsPromise) {
		_pivotLibsPromise = loadScriptsSequentially(PIVOT_LIBS);
	}
	return _pivotLibsPromise;
}

var _pivotInited = null;
document.getElementById("pivot_button").onclick = function fun() {
	var wrap = document.getElementById('cc_pivot_wrap');
	var note = document.getElementById('cc_pivot_note');
	if (wrap.style.display !== 'none') {
		wrap.style.display = 'none';
		return;
	}
	wrap.style.display = 'block';
	if (!_lastStruct || !_lastStruct.length) {
		note.textContent = 'Load or paste data first, then click Graph Data.';
		return;
	}
	if (_pivotInited === _lastStruct) { return; }
	note.textContent = 'Loading pivot libraries…';
	ensurePivotLibs().then(function() {
		if (_pivotInited === _lastStruct) { return; }
		_pivotInited = _lastStruct;
		var rows = _lastStruct.length > 50000 ? sampleRows(_lastStruct, 50000) : _lastStruct;
		note.textContent = 'Pivot over ' + rows.length.toLocaleString() + ' rows' +
			(rows.length < _lastStruct.length ? ' (uniform sample of ' + _lastStruct.length.toLocaleString() + ')' : '') +
			' — drag fields to rows/columns.';
		// Vega's formula transforms annotate the raw rows in place — hide those
		// derived fields (same set the CSV export filters out)
		jQuery('#cc_pivot').pivotUI(rows, {
			hiddenAttributes: ["X_Value", "Col_Value", "Y_Value", "Row_Value", "Count", "None", "O_Value", "Color_Value", "Cstr", "Xstr", "Ystr", "Size_Value", "jitter", "xfocus", "yfocus", "Stroke_Value", "ecdf_rank", "ecdf_n", "ecdf_p", "SortX_Value", "Term"]
		}, true);
	}).catch(function(err) {
		note.textContent = 'Pivot table unavailable: ' + err.message;
	});
};

document.getElementById("graph_button").onclick = function clicks() {
	var btn = document.getElementById("graph_button");
	// rows already parsed (large file re-graph, or generated demo) — reuse them
	if (_loadedFile && _loadedFile.struct) {
		graphStruct(_loadedFile.struct);
		return;
	}
	var string = _loadedFile ? _loadedFile.text : document.getElementById("myccinput").value;
	if (!string || !string.trim()) {
		return;
	}
	var prevLabel = btn.innerHTML;
	btn.innerHTML = "Working…";
	// let the label paint before parsing starts
	setTimeout(function() {
		parseInputDataAsync(string, function(pct) {
			btn.innerHTML = "Parsing… " + pct + "%";
		}, function(struct) {
			if (!struct || !struct.length) {
				btn.innerHTML = prevLabel;
				return;
			}
			if (_loadedFile) {
				// keep the parsed rows for re-graphs and let the raw text
				// (hundreds of MB for big files) be garbage collected
				_loadedFile.struct = struct;
				_loadedFile.text = null;
			}
			graphStruct(struct);
		});
	}, 30);
};

// d3.autoType parses ISO-like strings into Date objects, but the chart engine
// is numeric/categorical. Date columns become decimal years (e.g. 2023.4521):
// quantitative, sortable, and readable on a linear axis — enable the Line
// option under Scatter for a time-series view.
function convertDates(struct) {
	if (!struct.length) { return; }
	var headers = struct.columns || Object.keys(struct[0]);
	headers.forEach(function(col) {
		var isDate = false;
		var seen = 0;
		for (var i = 0; i < struct.length && seen < 50; i++) {
			var v = struct[i][col];
			if (v == null || v === '') { continue; }
			seen++;
			if (v instanceof Date) { isDate = true; break; }
		}
		if (!isDate) { return; }
		for (var r = 0; r < struct.length; r++) {
			var d = struct[r][col];
			if (d instanceof Date) {
				if (isNaN(+d)) { struct[r][col] = null; continue; }
				var y0 = +new Date(d.getFullYear(), 0, 1);
				var y1 = +new Date(d.getFullYear() + 1, 0, 1);
				struct[r][col] = Math.round((d.getFullYear() + (+d - y0) / (y1 - y0)) * 10000) / 10000;
			}
		}
	});
}

var _lastStruct = null;

function graphStruct(struct) {
	convertDates(struct);
	_lastStruct = struct;
	// new data invalidates any open pivot or 3D view
	var pivotWrap = document.getElementById('cc_pivot_wrap');
	if (pivotWrap) { pivotWrap.style.display = 'none'; }
	_pivotInited = null;
	var threedWrap = document.getElementById('cc_3d_wrap');
	if (threedWrap) { threedWrap.style.display = 'none'; }
	_3dData = null;
	toggle("myccinput");
	var headers = struct.columns;
	var axis = optimize_axis(headers, struct);
	var init_val=headers[1];
	if (headers.length<4) {init_val="None"}
	//console.log(JSON.stringify(struct));
	crossex("smartplot_id", struct, [
		{"editable":true},
		{"exportable":true},
		{"link":true},		
		{"corrmatrix":true},
		{
			"name": "Search_By",
			"value": axis[0],
			"bind": {
				"options": headers
			}
		},
		{
			"name": "X_Axis",
			"value": axis[0],
			"bind": {
				"options": headers
			}
		}, {
			"name": "Y_Axis",
			"value": axis[1],
			"bind": {
				"options": headers
			}
		}, {
			"name": "Facet_Rows_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Facet_Cols_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Color_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Sum_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "SortX_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Size_By",
			"value":  "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Opacity_By",
			"value": 'None',
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_By_Value",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_Additional",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Filter_Out_From",
			"value": "None",
			"bind": {
				"options": headers
			}
		}, {
			"name": "Stroke_By",
			"value": "None",
			"bind": {
				"options": headers
			}
		}
	],"About");
}


