<%- include('../src/lz-string.js') %>

var add_css=true;
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("<%-crossex_spec%>"));
var crossex_html=itgz.decompressFromEncodedURIComponent("<%=crossex_html%>");
crossex_html = crossex_html.replace("itgversion","<%-itgversion%>");
var ccPanel,ccPanelProxy;
ccPanelProxy={};
ccPanel={};
var NA_VALUES = new Set(["na", "NA", "null", "NULL", "Null", "unknown", "Unknown", "N/A", "n/a", "#N/A"]);

var SIGNAL_HEADER_FILTERS = {
	"Facet_By":        { maxDistinct: 150 },
	"Filter_Out_From": { maxDistinct: 150 },
	"Filter_By_Value": { numericOnly: true },
	"Facet_Rows_By":   { maxDistinct: 150 },
	"Facet_Cols_By":   { maxDistinct: 150 },
	"Filter_Additional": { maxDistinct: 150 },
	"Sum_By":          { numericOnly: true },
	"Size_By":         {},
	"X_Axis":          {},
	"Search_By":       {},
	"SortX_By":        {},
	"Y_Axis":          {},
	"Stroke_By":       {},
	"Color_By":        {}
};

var INTERACTIVE_SIGNAL_HANDLERS = {
	'xcur':   [{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}],
	'ycur':   [{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}],
	'delta':  [{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update": "down ? [x()-down[0], y()-down[1]] : [0,0]"}],
	'anchor': [{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}],
	'zoom':   [{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}],
	'dist1':  [{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}],
	'dist2':  [{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}],
	'xdom':   [{"events": {"signal": "delta"},"update": "[xcur[0] - span(xcur) * delta[0] / Plot_Width, xcur[1] - span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}],
	'ydom':   [{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}],
	'down':   [{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}]
};

var INTERACTIVE_SIGNAL_NAMES = Object.keys(INTERACTIVE_SIGNAL_HANDLERS);

function setInteractiveSignals(spec, signalMap, enable) {
	INTERACTIVE_SIGNAL_NAMES.forEach(function(name) {
		if (enable) {
			spec.signals[signalMap[name]]['on'] = INTERACTIVE_SIGNAL_HANDLERS[name];
		} else {
			delete spec.signals[signalMap[name]]['on'];
		}
	});
	spec.signals[signalMap['Interactive_']]['value'] = enable;
}

var TAB_CONFIG = [
	{id: 'defaultOpen', panel: 'None'},
	{id: 'Search_tablinks', panel: 'Search'},
	{id: 'Charts_tablinks', panel: 'Charts'},
	{id: 'Axis_tablinks', panel: 'Axis'},
	{id: 'Marks_tablinks', panel: 'Marks'},
	{id: 'Fonts_tablinks', panel: 'Fonts'},
	{id: 'Coloring_tablinks', panel: 'Coloring'},
	{id: 'Filtering_tablinks', panel: 'Filtering'},
	{id: 'Margins_tablinks', panel: 'Margins'},
	{id: 'Summary_tablinks', panel: 'Summary'}
];

var _resizeHandlers = {};
var _cookieDebounceTimers = {};

// Full datasets and call arguments per element, so the render-sample
// control can re-run crossex without re-parsing. Charts and the
// correlation matrix use the (possibly sampled) render data; the
// Summary tab always uses the full data.
var _fullData = {};
var _crossexOpts = {};
// Type/NA/distinct results per dataset, so re-rendering the same data
// (e.g. changing the render sample) skips the full-table scan
var _typeCache = new WeakMap();
var SAMPLE_AUTO_THRESHOLD = 150000;
var SAMPLE_AUTO_DEFAULT = 100000;

function getSampleSetting(element, nrows) {
	var stored = null;
	try { stored = window.localStorage.getItem('crossexSampleN_' + element); } catch (e) {}
	if (stored != null) { return parseInt(stored, 10) || 0; }
	return nrows > SAMPLE_AUTO_THRESHOLD ? SAMPLE_AUTO_DEFAULT : 0;
}

// Uniform sample without replacement (partial Fisher-Yates on indices),
// returned in original row order
function sampleRows(data, n) {
	var len = data.length;
	var idx = new Array(len);
	for (var i = 0; i < len; i++) { idx[i] = i; }
	for (var s = 0; s < n; s++) {
		var j = s + Math.floor(Math.random() * (len - s));
		var tmp = idx[s]; idx[s] = idx[j]; idx[j] = tmp;
	}
	var chosen = idx.slice(0, n).sort(function(a, b) { return a - b; });
	var out = new Array(n);
	for (var o = 0; o < n; o++) { out[o] = data[chosen[o]]; }
	return out;
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

var crossexloader=function crossexloader(element,status) {	
	if(status) {
		document.getElementById("cc_loader"+element).style['z-index'] = 999;
		document.getElementById("cc_loader"+element).style['display'] = 'block';
	} else {
		document.getElementById("cc_loader"+element).style['z-index'] = 0;
		document.getElementById("cc_loader"+element).style['display'] = 'none'

	}
}

// Settings persist in localStorage: cookies cap at ~4KB (the full signal state
// is larger and silently failed to save) and get sent with every HTTP request.
function saveSignalsToCookie(signalsArray, cookieName) {
    const signalState = {};
    signalsArray.forEach(signal => {
        if (signal.value !== undefined) {
            signalState[signal.name] = signal.value;
        }
    });
    saveSignalState(cookieName, signalState);
    return signalState;
}

function saveSignalState(storageName, signalState) {
    try {
        window.localStorage.setItem(storageName, JSON.stringify(signalState));
    } catch (e) { /* storage full or unavailable (private mode) */ }
}

function loadSignalsFromCookie(storageName) {
    try {
        const stored = window.localStorage.getItem(storageName);
        if (stored) {
            return JSON.parse(stored);
        }
        // Migrate state saved by older cookie-based versions
        const name = storageName + "=";
        const cookieArray = decodeURIComponent(document.cookie).split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const c = cookieArray[i].trim();
            if (c.indexOf(name) == 0) {
                const state = JSON.parse(c.substring(name.length));
                saveSignalState(storageName, state);
                return state;
            }
        }
    } catch (e) { /* corrupted state — fall through to defaults */ }
    return null;
}

// Clear all persisted settings (localStorage and legacy cookies)
function clearAllCookies() {
    try {
        Object.keys(window.localStorage).forEach(function(key) {
            if (key.indexOf('vegaSignals_') == 0 || key.indexOf('crossexSampleN_') == 0) {
                window.localStorage.removeItem(key);
            }
        });
    } catch (e) {}
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}


var Index = function Index(items, name) {
	var index = -1;
	for (var i = 0; i < items.length; ++i) {
		if (items[i].name == name) {
			index = i;
			break;
		}
	}
	return index;
};

// Create index map for O(1) lookups instead of O(n) searches
var createIndexMap = function(items) {
	var map = {};
	for (var i = 0; i < items.length; ++i) {
		if (items[i].name) {
			map[items[i].name] = i;
		}
	}
	return map;
};

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var json2csv = function json2csv(filename,json) {
    var fields = [];
	var excluded = new Set(["Y_Value", "Col_Value", "X_Value", "Row_Value", "Count","None","O_Value","Color_Value","Cstr","Xstr","Ystr","Size_Value"]);
    var seen = new Set();
    for (var j=0;j<json.length;j++) {
        for (var key in json[j]) {
            if (!seen.has(key) && !excluded.has(key)) {
                seen.add(key);
                fields.push(key);
            }
        }
    }
    var replacer = function(key, value) { return value === null ? '' : value } 
    var csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
	var csvData = new Blob([csv], { type: 'text/csv' });
	var a = document.createElement('a')
	var csvUrl = URL.createObjectURL(csvData);
	a.href =  csvUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(csvUrl);
}

function getContentWidth (elementNode) {
	var styles = window.getComputedStyle(elementNode, null);
	var w=elementNode.clientWidth
	- parseFloat(styles.paddingLeft)
	- parseFloat(styles.paddingRight);
	w=w-28;
	if (w<0) {w=0;}
	return w
}

function setWidth_smart(element,widthNode) {
	if (!widthNode) {
		widthNode=document.getElementById(element);
	}
	var buf=document.getElementById("cc_tabscontent" + element).offsetWidth+document.getElementById("defaultOpen"+element).offsetWidth;
	var width=getContentWidth(widthNode)-buf;
	if (width<40){width=40;}
	return width;
}

function ccOpenCity(evt, cityName,element) {
	var tablinks = [];
	var cc_tabcontent = [];
	TAB_CONFIG.forEach(function(tab) {
		tablinks.push(document.getElementById(tab.id + element));
		cc_tabcontent.push(document.getElementById(tab.panel + element));
	});
	for (var i = 0; i < cc_tabcontent.length; i++) {
		cc_tabcontent[i].style.display = "none";
	}
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	ccPanelProxy[element][element]=document.getElementById(cityName).offsetWidth;
	evt.currentTarget.className += " active";
}

function initAndListen(listener, id, result) {
	if (result.view.signal(listener) == true) {
		document.getElementById(id).style.display = "block";
	} else {
		document.getElementById(id).style.display = "none";
	}
	result.view.addSignalListener(listener, function(name, value) {
		if (value) {
			document.getElementById(id).style.display = "block";
		} else {
			document.getElementById(id).style.display = "none";
		}
	});
}

function corrColTypes(df, cols) {
	var colTypes = {};
	cols.forEach(function(col) {
		var isNum = true;
		for (var r = 0; r < df.length; ++r) {
			if (!isNumeric(df[r][col]) && df[r][col] != null && df[r][col] != "NA") {
				isNum = false;
				break;
			}
		}
		colTypes[col] = isNum ? "num" : "cat";
	});
	return colTypes;
}

// Tie-averaged ranks via index sort — same semantics as stats.rank but
// without allocating an {idx, val} object per row
function rankArray(vals) {
	var n = vals.length;
	var order = new Array(n);
	for (var i = 0; i < n; ++i) { order[i] = i; }
	order.sort(function(a, b) {
		var x = vals[a], y = vals[b];
		return x < y ? -1 : x > y ? 1 : a - b;
	});
	var r = new Float64Array(n);
	var tie = -1, p, mu;
	for (var j = 0; j < n; ++j) {
		var v = vals[order[j]];
		if (tie < 0 && p === v) {
			tie = j - 1;
		} else if (tie > -1 && p !== v) {
			mu = 1 + (j - 1 + tie) / 2;
			for (; tie < j; ++tie) { r[order[tie]] = mu; }
			tie = -1;
		}
		r[order[j]] = j + 1;
		p = v;
	}
	if (tie > -1) {
		mu = 1 + (n - 1 + tie) / 2;
		for (; tie < n; ++tie) { r[order[tie]] = mu; }
	}
	return r;
}

// Spearman r^2 for one column pair; aligned arrays avoid per-row object allocation
function corrPairR2(df, col1, col2, isNum1, isNum2) {
	var v1s = [], v2s = [];
	for (var i = 0; i < df.length; ++i) {
		var raw1 = df[i][col1], raw2 = df[i][col2];
		if (raw1 != 'NA' && raw1 != '' && raw2 != 'NA' && raw2 != '') {
			v1s.push(isNum1 ? Number(raw1) : raw1);
			v2s.push(isNum2 ? Number(raw2) : raw2);
		}
	}
	var n = v1s.length;
	var ra = rankArray(v1s), rb = rankArray(v2s);
	var s = 0;
	for (var k = 0; k < n; ++k) {
		var d = ra[k] - rb[k];
		s += d * d;
	}
	var rho = 1 - 6 * s / (n * (n * n - 1));
	return rho * rho;
}

// Rank correlation stabilizes well below this row count (SE ≈ 1/sqrt(n) ≈ 0.007
// at 20k) — one consistent subsample keeps the matrix fast on huge tables.
var CORR_MAX_ROWS = 20000;

// The matrix is symmetric with a constant diagonal (rank corr of a column with
// itself is always 1), so only the upper triangle is computed and then mirrored.
var corrmatrix = function (df, cols) {
	if (!cols) {
		cols = Object.keys(df[0]);
	}
	if (df.length > CORR_MAX_ROWS) {
		df = sampleRows(df, CORR_MAX_ROWS);
	}
	var colTypes = corrColTypes(df, cols);
	var corr = [];
	for (var ci = 0; ci < cols.length; ++ci) {
		var col1 = cols[ci];
		corr.push({"var1": col1, "var2": col1, "% Variance": 1});
		for (var cj = ci + 1; cj < cols.length; ++cj) {
			var col2 = cols[cj];
			var r2 = corrPairR2(df, col1, col2, colTypes[col1] === "num", colTypes[col2] === "num");
			corr.push({"var1": col1, "var2": col2, "% Variance": r2});
			corr.push({"var1": col2, "var2": col1, "% Variance": r2});
		}
	}
	return corr;
};

// Async version - processes column pairs in chunks to avoid UI freeze
var corrmatrixAsync = function (df, cols, callback) {
	if (!cols) {
		cols = Object.keys(df[0]);
	}
	if (df.length > CORR_MAX_ROWS) {
		df = sampleRows(df, CORR_MAX_ROWS);
	}
	var colTypes = corrColTypes(df, cols);
	var corr = [];
	var pairs = [];
	for (var ci = 0; ci < cols.length; ++ci) {
		corr.push({"var1": cols[ci], "var2": cols[ci], "% Variance": 1});
		for (var cj = ci + 1; cj < cols.length; ++cj) {
			pairs.push([cols[ci], cols[cj]]);
		}
	}
	var idx = 0;
	var CHUNK_SIZE = Math.max(1, Math.ceil(pairs.length / 20)); // ~20 frames
	function processChunk() {
		var end = Math.min(idx + CHUNK_SIZE, pairs.length);
		for (; idx < end; idx++) {
			var col1 = pairs[idx][0], col2 = pairs[idx][1];
			var r2 = corrPairR2(df, col1, col2, colTypes[col1] === "num", colTypes[col2] === "num");
			corr.push({"var1": col1, "var2": col2, "% Variance": r2});
			corr.push({"var1": col2, "var2": col1, "% Variance": r2});
		}
		if (idx < pairs.length) {
			requestAnimationFrame(processChunk);
		} else {
			callback(corr);
		}
	}
	requestAnimationFrame(processChunk);
};

function escapeHtml(s) {
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtStat(v) {
	if (v == null || v !== v) { return ''; }
	if (Number.isInteger(v) && Math.abs(v) < 1e15) { return String(v); }
	var a = Math.abs(v);
	if (a >= 1e6 || (a > 0 && a < 0.001)) { return v.toExponential(2); }
	return String(parseFloat(v.toPrecision(4)));
}

// One pass over the data per column: count/missing/distinct for everything,
// Welford mean/sd plus min/max/median for numeric, mode for categorical.
// Numeric distinct comes free from the sorted array; categorical value
// tracking is capped so an ID-like column can't allocate a 300k-key map.
var SUMMARY_MAX_TRACKED = 10000;
function summarizeColumn(data, col, isNum) {
	var n = 0, missing = 0, mean = 0, M2 = 0, min = Infinity, max = -Infinity;
	var counts = isNum ? null : Object.create(null);
	var trackedKeys = 0, sawUntracked = false;
	// typed array + native numeric sort is several times faster than a
	// growing JS array with a comparator on large columns
	var nums = isNum ? new Float64Array(data.length) : null;
	for (var i = 0; i < data.length; ++i) {
		var v = data[i][col];
		if (v == null || v === '' || (typeof v !== 'number' && NA_VALUES.has(v))) { missing++; continue; }
		if (isNum) {
			var x = typeof v === 'number' ? v : Number(v);
			if (x !== x) { missing++; continue; }
			nums[n] = x;
			n++;
			var delta = x - mean;
			mean += delta / n;
			M2 += delta * (x - mean);
			if (x < min) { min = x; }
			if (x > max) { max = x; }
		} else {
			n++;
			if (counts[v] !== undefined) {
				counts[v]++;
			} else if (trackedKeys < SUMMARY_MAX_TRACKED) {
				counts[v] = 1;
				trackedKeys++;
			} else {
				sawUntracked = true;
			}
		}
	}
	var row = {col: col, type: isNum ? 'num' : 'cat', n: n, missing: missing};
	if (isNum) {
		var distinct = 0;
		if (n > 0) {
			nums = nums.subarray(0, n);
			nums.sort();
			distinct = 1;
			for (var d = 1; d < n; ++d) {
				if (nums[d] !== nums[d - 1]) { distinct++; }
			}
			row.min = min;
			row.max = max;
			row.mean = mean;
			row.sd = n > 1 ? Math.sqrt(M2 / (n - 1)) : 0;
			row.median = stats.quantile(nums, 0.5);
		}
		row.distinct = distinct;
	} else {
		row.distinct = sawUntracked ? '≥' + SUMMARY_MAX_TRACKED : trackedKeys;
		var top = null, topCount = -1;
		for (var k in counts) {
			if (counts[k] > topCount) { topCount = counts[k]; top = k; }
		}
		if (top !== null) { row.top = top + ' (' + topCount + (sawUntracked ? '+' : '') + ')'; }
	}
	return row;
}

function summaryTableHtml(rows) {
	var html = '<table class="cc_summary"><thead><tr><th>Column</th><th>Type</th><th>n</th><th>Miss</th><th>Uniq</th><th>Min</th><th>Median</th><th>Mean</th><th>SD</th><th>Max</th><th>Top Value</th></tr></thead><tbody>';
	rows.forEach(function(r) {
		html += '<tr><td>' + escapeHtml(r.col) + '</td><td>' + r.type + '</td><td>' + r.n + '</td><td>' + r.missing + '</td><td>' + r.distinct + '</td>';
		html += '<td>' + fmtStat(r.min) + '</td><td>' + fmtStat(r.median) + '</td><td>' + fmtStat(r.mean) + '</td><td>' + fmtStat(r.sd) + '</td><td>' + fmtStat(r.max) + '</td>';
		html += '<td>' + (r.top != null ? escapeHtml(r.top) : '') + '</td></tr>';
	});
	html += '</tbody></table>';
	return html;
}

// Lazily fills the Summary tab; one column per frame so wide data can't freeze the UI
function renderSummary(element, data, mycolumns) {
	var container = document.getElementById('Summary_Table' + element);
	if (!container || container.getAttribute('data-rendered') == '1') { return; }
	container.setAttribute('data-rendered', '1');
	if (!data || !data.length || !mycolumns || !mycolumns.length) {
		container.innerHTML = '<span>No data loaded</span>';
		container.removeAttribute('data-rendered');
		return;
	}
	container.innerHTML = '<span>Computing…</span>';
	var rows = [];
	var idx = 0;
	function processColumn() {
		rows.push(summarizeColumn(data, mycolumns[idx].feature, mycolumns[idx].type == 'num'));
		idx++;
		if (idx < mycolumns.length) {
			requestAnimationFrame(processColumn);
		} else {
			container.innerHTML = summaryTableHtml(rows);
		}
	}
	requestAnimationFrame(processColumn);
}

var crossex = function crossex(element, data, options,widthid) {
	_crossexOpts[element] = {options: options, widthid: widthid};
	//legacy
	var ElementWidth=0;
	//data=JSON.parse(JSON.stringify(data).replace(/\"null\"/gi,"\"\"").replace(/\"NA\"/gi,"\"\"").replace(/\"unknown\"/gi,"\"\""));
	var cur_name=element;
	var widthNode=document.getElementById(cur_name);	
	ElementWidth=0;
	var d=0;
	while (ElementWidth==0 && d <8) {
		d=d+1;
		widthNode=widthNode.parentElement;
		ElementWidth=getContentWidth(widthNode);
	}
	if(widthid) {
		widthNode=document.getElementById(widthid);	
		ElementWidth=getContentWidth(widthNode);
	}
	var loc_crossex_html =  crossex_html;
	var local_vgspec = JSON.stringify(crossex_spec);
	var element_node = document.getElementById(element);
	var mymax = 150;
	var loc_crossex_htmlRes = loc_crossex_html.replace(/\-ccnm/g, element);
	element_node.innerHTML = loc_crossex_htmlRes;
	ccPanel={};
	ccPanelProxy[element]={};
	var res = local_vgspec.replace(/\-ccnm/g, element);
	var spec = JSON.parse(res);
	var hide_panel=false;
	var editable=false;
	var exportable=true;
	var new_signalsString = JSON.stringify(options);
	var col_names=[];
	var sum_cols=[];
	var datatyped=false;
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	if (add_css) {
		var css = itgz.decompressFromEncodedURIComponent("<%=cc_css%>"),
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		add_css=false;
	}
	crossexloader(element,true);
	

	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		for (var i=0;i<repSignalsJson.length;++i) {
			if (typeof repSignalsJson[i]['hide_panel'] !== 'undefined') {
				hide_panel=true;
				document.querySelector('#cc_panel'+element).style.display = "none";
				document.querySelector('#cc_tab'+element).style.display = "none";
				document.querySelector('#cc_tabscontent'+element).style.display = "none";
				continue;
			}
			if (typeof repSignalsJson[i]['Links_Editable'] !== 'undefined') {
				document.getElementById('#Links_Options' + element).style.display = "block";
				continue;
			}
			if (typeof repSignalsJson[i]['editable'] !== 'undefined') {
				if (repSignalsJson[i]['editable']==1) {
					editable=true;
				} else {
					editable=false;
				}
				continue;
			}
			if (typeof repSignalsJson[i]['exportable'] !== 'undefined') {
				if (repSignalsJson[i]['exportable']==1) {
					exportable=true;
				} else {
					exportable=false;
				}
				continue;
			}
			var index = signalMap[repSignalsJson[i].name];

			if (index !== undefined){
				spec.signals[index].value = repSignalsJson[i].value;
				if (repSignalsJson[i].bind != null) {
					if (repSignalsJson[i].bind.element != null) {
						spec.signals[index].bind.element = repSignalsJson[i].bind.element;
					}
					if (repSignalsJson[i].bind.options != null) {
						var headers = repSignalsJson[i].bind.options;
						var finalheaders = [];
						var signalName = repSignalsJson[i].name;
						var signalFilter = SIGNAL_HEADER_FILTERS[signalName];
						// Single pass per column: detect types, clean NAs, count distinct.
						// Distinct sets are capped just above the largest dropdown
						// threshold (150) — high-cardinality columns (IDs) would
						// otherwise hold every value in memory for no benefit.
						// NAs become null rather than `delete`: the Vega spec uses
						// isValid(), which treats null and undefined the same, and
						// deleting keys pushes V8 objects into slow dictionary mode.
						if (!datatyped) {
							var cached = _typeCache.get(data);
							if (cached) {
								colInfo = cached.colInfo;
								sum_cols = cached.sum_cols;
								col_names = cached.col_names;
								datatyped = true;
							}
						}
						if (!datatyped) {
							var colInfo = {};
							var DISTINCT_CAP = 151;
							var nrows = data.length;
							for (var h = 0; h < headers.length; ++h) {
								var col = headers[h];
								var ci = { isNum: true, distinct: new Set() };
								colInfo[col] = ci;
								var dset = ci.distinct;
								for (var k = 0; k < nrows; ++k) {
									var v = data[k][col];
									if (v == null || v === "") { continue; }
									// numbers can't be NA strings and are trivially numeric —
									// skipping those checks avoids ~2 hash/parse calls per cell
									if (typeof v !== 'number') {
										if (NA_VALUES.has(v)) {
											data[k][col] = null;
											continue;
										}
										if (ci.isNum && !isNumeric(v)) {
											ci.isNum = false;
										}
									}
									if (dset.size < DISTINCT_CAP) {
										dset.add(v);
									}
								}
								sum_cols.push({"feature": col, "type": ci.isNum ? "num" : "cat"});
								col_names.push(col);
							}
							_typeCache.set(data, {colInfo: colInfo, sum_cols: sum_cols, col_names: col_names});
							datatyped = true;
						}
						headers.forEach(function(element) {
							var ln = colInfo ? colInfo[element].distinct.size : new Set(data.map(function(x) { return x[element]; })).size;
							var isNum = colInfo ? colInfo[element].isNum : true;
							if (ln > 0 && signalFilter) {
								if ((!signalFilter.maxDistinct || ln < signalFilter.maxDistinct) &&
									(!signalFilter.numericOnly || isNum)) {
									finalheaders.push(element);
								}
							}
						});
						if (!finalheaders.includes("None")) {
							finalheaders.push("None");
						}
						if (!finalheaders.includes("Sum") && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Sum");
						}
						if (!finalheaders.includes("Count") && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Count");
						}					
						spec.signals[index].bind.options = finalheaders;
					}
				}
				if (repSignalsJson[i].value != null) {
					spec.signals[index].value = repSignalsJson[i].value;
				}
			} else {
				var dataIndex = dataMap[repSignalsJson[i].name];
				if (dataIndex !== undefined){
					if ('values' in repSignalsJson[i]) {spec.data[dataIndex]['values'] = JSON.stringify(repSignalsJson[i].values);}
					spec.data[dataIndex]['transform']=JSON.parse("[]");
				}
			}
		}
	}
	spec.data[dataMap["mycolumns"]].values = sum_cols;
	if (data != null) {
		_fullData[element] = data;
		var renderData = data;
		var sampleN = getSampleSetting(element, data.length);
		var noticeEl = document.getElementById('cc_sample_notice' + element);
		if (sampleN > 0 && data.length > sampleN) {
			renderData = sampleRows(data, sampleN);
			if (noticeEl) {
				noticeEl.textContent = 'Rendering ' + sampleN.toLocaleString() + ' of ' + data.length.toLocaleString() +
					' rows (uniform sample). Summary tab uses all rows. Change under Filtering ▸ Render sample.';
				noticeEl.style.display = 'block';
			}
		} else if (noticeEl) {
			noticeEl.style.display = 'none';
		}
		spec.data[dataMap["mydata"]].values = renderData;
		var sampleSel = document.getElementById('Render_Sample_Select' + element);
		if (sampleSel) {
			sampleSel.value = String(sampleN);
			sampleSel.onchange = function() {
				try { window.localStorage.setItem('crossexSampleN_' + element, this.value); } catch (e) {}
				var opts = _crossexOpts[element];
				crossexloader(element, true);
				delay(30).then(function() { crossex(element, _fullData[element], opts.options, opts.widthid); });
			};
		}
	}
	spec.data[dataMap["col_names"]].values = col_names;
	//spec.data[Index(spec.data, "covariance")].values=corrmatrix(spec.data[Index(spec.data, "mydata")].values,col_names);

	let amyview;
	crossexloader(element,true);
	delay().then(() => drawGraph(amyview,element,spec,widthNode,hide_panel,editable,exportable));
};


function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable) {
	if (myview) {
		myview.finalize();
	}
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	if (spec.signals[signalMap['Interactive_']]['value']==true) {
		setInteractiveSignals(spec, signalMap, true);
	}
	// Set up tab listeners
	TAB_CONFIG.forEach(function(tab) {
		var el = document.getElementById(tab.id + element);
		el.addEventListener('click', function(event) { ccOpenCity(event, tab.panel + element, element); });
	});
	// Summary table is computed on first open, not up front; it always
	// summarizes the full dataset even when the chart renders a sample
	document.getElementById('Summary_tablinks' + element).addEventListener('click', function() {
		renderSummary(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
	});
	var cookieName = 'vegaSignals_' + element;
	var savedSignals = loadSignalsFromCookie(cookieName);
	if (savedSignals) {
		spec.signals.forEach(function(signal) {
			if (signal.name && savedSignals.hasOwnProperty(signal.name)) {
				var saved = savedSignals[signal.name];
				// a dropdown value saved for a previous dataset may name a column
				// that no longer exists — restoring it would draw an empty chart
				if (signal.bind && signal.bind.options && signal.bind.options.indexOf(saved) < 0) {
					return;
				}
				signal.value = saved;
			}
		});
	}

	vegaEmbed('#view_crossex' + element, spec, {
		renderer: 'canvas',
		width: setWidth_smart(element,widthNode),
		tooltip: true,
		warn: false,
		actions: {
			export: exportable,
			csv:exportable,
			source: false,
			editor: true,
			editorURL: "https://vega.github.io/editor/",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		myview = result.view.run();
		// Save initial signal state to cookie if it doesn't exist
		if (!loadSignalsFromCookie(cookieName)) {
			saveSignalsToCookie(spec.signals, cookieName);
		}

		// Add debounced listeners to update cookie when any signal changes
		var pendingCookieState = loadSignalsFromCookie(cookieName) || {};
		spec.signals.forEach(function(signal) {
			if (signal.value !== undefined && signal.name) {
				result.view.addSignalListener(signal.name, function(name, value) {
					pendingCookieState[name] = value;
					clearTimeout(_cookieDebounceTimers[cookieName]);
					_cookieDebounceTimers[cookieName] = setTimeout(function() {
						saveSignalState(cookieName, pendingCookieState);
					}, 250);
				});
			}
		});
		// Remove previous resize handler before adding new one
		if (_resizeHandlers[element]) {
			window.removeEventListener('resize', _resizeHandlers[element]);
		}
		_resizeHandlers[element] = function() {
			result.view.width(setWidth_smart(element,widthNode)).run();
		};
		window.addEventListener('resize', _resizeHandlers[element]);
		//initialize instance
		var save_icon=document.querySelector("#view_crossex"+ element+" > details > summary");
		save_icon.innerHTML="<div id='Exporting'>"+itgz.decompressFromEncodedURIComponent("<%=save_icon%>")+"</div>";
		if (!hide_panel) {
			ccPanelProxy[element] = new Proxy(ccPanel, {
				set: function (target, key, value) {
					target[key] = value;
					result.view.width(setWidth_smart(element,widthNode)).run();
					return true;
				}
			});
			initAndListen('show_scatter_graph', 'Scatter_Options' + element, result,element);
			initAndListen('show_hist_graph', 'Hist_Options' + element, result,element);
			initAndListen('show_hzbox_graphs', 'Violin_Options' + element, result,element);
			initAndListen('show_grid_graphs', 'Grid_Options' + element, result,element);
			initAndListen('show_stacked_graphs', 'Stacked_Options' + element, result,element);
			initAndListen('show_box_graphs', 'Violin_Options' + element, result,element);
			var checkbox = document.querySelector('#Interactive_'+element + '> div > label > input[type=checkbox]');
			var DownloadCSVNode=document.querySelector("#view_crossex"+element+" > details > div > a:nth-child(1)");
			DownloadCSVNode.addEventListener('click', function(e) {
				var ds=result.view.data('mydata');
				json2csv('crossex.'+element+'.csv',ds)
			}, false);
			var cross_checkbox=document.querySelector("#Show_Covariance"+element + "> div > label > input[type=checkbox]");
			cross_checkbox.addEventListener('change', (event) => {
				if (event.currentTarget.checked ) {
					document.getElementById("Violin_Options"+element).style['display']='none';
					crossexloader(element,true);
					corrmatrixAsync(spec.data[dataMap["mydata"]].values, spec.data[dataMap["col_names"]].values, function(corr) {
						result.view.change('covariance', vega.changeset().insert(corr).remove(function () {return true})).runAsync().then(function() { crossexloader(element,false); });
					});
				} else {
					document.getElementById("Violin_Options"+element).style['display']='block';
				}
				myview = result.view;
			});
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Search_By","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","SortX_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","LogY_","Jitter_" ,"Weight_Contour","Tips_","Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point","Min_Point","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Include_Only","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Manual_Color","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Plot_Padding","Title_Height","X_Axis_Height","Row_Header_Width","Row_Height","Max_Facets","Legend_Height","Legend_Cols","ContourCounts","Resolve","Contour_Levels","CellSize_"];
				for (var i = 0; i < new_signals_ar.length; i++) {
					spec.signals[signalMap[new_signals_ar[i]]]['value']=result.view.signal(new_signals_ar[i]);
				}
				result.finalize();
				delete result.view;
				delete result.spec;
				delete result.vgSpec;
				delete result.finalize;
				setInteractiveSignals(spec, signalMap, event.currentTarget.checked);
				myview = result.view;
				delay().then(() => drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable));
				return;
			});
		}
		crossexloader(element,false);
	}).catch(console.error);
}
