
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

// ---- Load data from a URL (CSV / TSV / JSON) --------------------------------
// Fetches a remote table and resolves to parsed rows (with a .columns array).
// The delimiter/format is detected from the response body by parseInputData(),
// so the URL's file extension doesn't matter. Cross-origin URLs must return
// permissive CORS headers (raw file hosts and most open-data portals do); when
// they don't the browser blocks the read and the caller shows a clear message.
function ccFetchData(url) {
	return fetch(url, { redirect: 'follow' }).then(function(res) {
		if (!res.ok) { throw new Error('HTTP ' + res.status + ' ' + res.statusText); }
		return res.text();
	}).then(function(text) {
		var struct = parseInputData(text);
		if (!struct || !struct.length) { throw new Error('no rows parsed from the response'); }
		return struct;
	});
}

// Load URL button on the main input: reveals an inline URL field, then fetches
// and graphs it through the normal single-chart path.
(function wireLoadUrl() {
	var btn = document.getElementById('load_url');
	var bar = document.getElementById('cc_url_bar');
	var field = document.getElementById('cc_url_field');
	var go = document.getElementById('cc_url_go');
	var cancel = document.getElementById('cc_url_cancel');
	if (!btn || !bar) { return; }
	btn.onclick = function() {
		var show = bar.style.display === 'none';
		bar.style.display = show ? 'block' : 'none';
		if (show) { field.focus(); }
	};
	cancel.onclick = function() { bar.style.display = 'none'; };
	function run() {
		var url = field.value.trim();
		if (!url) { return; }
		var label = go.innerHTML;
		go.innerHTML = 'Fetching…';
		ccFetchData(url).then(function(struct) {
			go.innerHTML = label;
			bar.style.display = 'none';
			_loadedFile = null;
			_lastRawText = null; // remote data isn't embedded in share links
			var input = document.getElementById('myccinput');
			input.value = '[Loaded from URL: ' + url + ' — ' + struct.length.toLocaleString() + ' rows. Editing this box discards it.]';
			input.style.display = 'block';
			graphStruct(struct);
			ccToast('Loaded ' + struct.length.toLocaleString() + ' rows from URL');
		}).catch(function(err) {
			go.innerHTML = label;
			ccToast('Could not load URL: ' + err.message);
		});
	}
	go.onclick = run;
	field.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') { e.preventDefault(); run(); }
	});
})();

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
	ccToast('Saved settings cleared');
};

// ---- Small toast for button feedback ----------------------------------------
function ccToast(text) {
	var t = document.getElementById('cc_toast');
	if (!t) { return; }
	t.textContent = text;
	t.className = 'show';
	clearTimeout(t._t);
	t._t = setTimeout(function() { t.className = ''; }, 2600);
}

// ---- Dark theme toggle -------------------------------------------------------
function setDarkMode(on) {
	try { window.localStorage.setItem('ccDarkMode', on ? '1' : '0'); } catch (e) {}
	document.documentElement.classList.toggle('cc-dark', on);
	document.getElementById('dark_toggle').innerHTML = on ? 'Light Mode' : 'Dark Mode';
	// the core stylesheet (all dark-mode rules) is normally injected on first
	// chart draw — on the empty landing state (hero, no chart yet) it may not
	// exist yet, so make sure it's there before relying on .cc-dark selectors
	ensureCoreCss();
	// re-render the current chart so the dark Vega config applies
	if (_fullData.smartplot_id && _crossexOpts.smartplot_id) {
		crossexloader('smartplot_id', true);
		delay(30).then(function() {
			crossex('smartplot_id', _fullData.smartplot_id,
				_crossexOpts.smartplot_id.options, _crossexOpts.smartplot_id.widthid);
		});
	}
}
document.getElementById('dark_toggle').onclick = function() { setDarkMode(!ccDarkMode()); };
if (ccDarkMode()) {
	document.documentElement.classList.add('cc-dark');
	document.getElementById('dark_toggle').innerHTML = 'Light Mode';
	// returning in dark mode with no chart drawn yet (still on the hero/gallery
	// landing state) — same lazy-css gap as setDarkMode() above
	ensureCoreCss();
}

// ---- Shareable state via URL hash --------------------------------------------
// The link carries the full signal state, transform definitions, and (when it
// fits) the raw input data, lz-compressed into the fragment. Opening such a
// link rebuilds the exact view; nothing is sent to any server.
var _lastRawText = null;
var SHARE_TEXT_MAX = 250000;   // raw chars; compressed links stay well under browser limits
var SHARE_HASH_MAX = 60000;

function waitLoaderIdle(cb, tries) {
	tries = tries || 0;
	if (tries > 300) { return; }
	var l = document.getElementById('cc_loadersmartplot_id');
	if (l && l.style.display === 'none') { cb(); }
	else { setTimeout(function() { waitLoaderIdle(cb, tries + 1); }, 150); }
}

document.getElementById('share_link').onclick = function() {
	if (!_lastStruct) { ccToast('Graph some data first, then share'); return; }
	var payload = {
		v: 1,
		s: loadSignalsFromCookie('vegaSignals_smartplot_id') || {},
		t: (typeof _transforms !== 'undefined' && _transforms.smartplot_id) ? _transforms.smartplot_id : []
	};
	var note = '';
	if (_lastRawText) {
		payload.d = _lastRawText;
	} else {
		note = ' (settings only — dataset too large for a link)';
	}
	var hash = '#cc=' + itgz.compressToEncodedURIComponent(JSON.stringify(payload));
	if (hash.length > SHARE_HASH_MAX && payload.d) {
		delete payload.d;
		note = ' (settings only — dataset too large for a link)';
		hash = '#cc=' + itgz.compressToEncodedURIComponent(JSON.stringify(payload));
	}
	try { history.replaceState(null, '', hash); } catch (e) {}
	var url = location.href.split('#')[0] + hash;
	// no prompt() fallback: it blocks the main thread, and the link is already
	// in the address bar thanks to replaceState
	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(url).then(function() {
			ccToast('Link copied to clipboard' + note);
		}, function() {
			ccToast('Link is in the address bar — copy it from there' + note);
		});
	} else {
		ccToast('Link is in the address bar — copy it from there' + note);
	}
};

function applySharedTransforms(list, idx) {
	idx = idx || 0;
	if (idx >= list.length) { return; }
	waitLoaderIdle(function() {
		var nameIn = document.getElementById('cc_tr_namesmartplot_id');
		var formulaIn = document.getElementById('cc_tr_formulasmartplot_id');
		var apply = document.getElementById('cc_tr_applysmartplot_id');
		if (!nameIn || !formulaIn || !apply) { return; }
		nameIn.value = list[idx].name;
		formulaIn.value = list[idx].formula;
		apply.click();
		setTimeout(function() { applySharedTransforms(list, idx + 1); }, 500);
	});
}

// Deferred one tick: this section sits above the graph-button handler in the
// bundle, and clicking it during evaluation would hit an unattached handler.
setTimeout(function restoreFromHash() {
	var m = location.hash.match(/^#cc=(.+)$/);
	if (!m) { return; }
	var payload = null;
	try { payload = JSON.parse(itgz.decompressFromEncodedURIComponent(m[1])); } catch (e) {}
	if (!payload || payload.v !== 1) { return; }
	if (payload.s) {
		var store = loadSignalsFromCookie('vegaSignals_smartplot_id') || {};
		Object.assign(store, payload.s);
		saveSignalState('vegaSignals_smartplot_id', store);
	}
	if (payload.d) {
		var input = document.getElementById('myccinput');
		input.value = payload.d;
		input.style.display = 'block';
		var btn = document.getElementById('graph_button');
		btn.innerHTML = 'Graph Data';
		btn.click();
		if (payload.t && payload.t.length) { applySharedTransforms(payload.t); }
		ccToast('Restored shared view');
	}
}, 0);

document.getElementById("graph_button").onclick = function clicks() {
	var btn = document.getElementById("graph_button");
	// rows already parsed (large file re-graph, or generated demo) — reuse them
	if (_loadedFile && _loadedFile.struct) {
		_lastRawText = null;
		graphStruct(_loadedFile.struct);
		return;
	}
	var string = _loadedFile ? _loadedFile.text : document.getElementById("myccinput").value;
	// keep small raw inputs so Share Link can embed the data in the URL
	_lastRawText = (!_loadedFile && string && string.length <= SHARE_TEXT_MAX) ? string : null;
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
// The clean column list captured before crossex/Vega renders: Vega injects
// derived fields (X_Value, Color_Value, …) onto the shared row objects, so
// Object.keys(row) is unreliable afterwards. The dashboard reads this.
var _lastColumns = null;

function graphStruct(struct) {
	convertDates(struct);
	_lastStruct = struct;
	_lastColumns = (struct.columns || (struct[0] ? Object.keys(struct[0]) : [])).slice();
	// the gallery start page and the marketing hero only belong to the empty state
	var gal = document.getElementById('cc_gallery');
	if (gal) { gal.style.display = 'none'; }
	var hero = document.getElementById('cc_hero');
	if (hero) { hero.style.display = 'none'; }
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

// ---- Gallery: start-page example launcher -----------------------------------
// Each card seeds the saved signal state for the demo dataset (penguins) and
// then graphs it, so the example opens exactly as pictured. The widget
// restores signals from localStorage after render, which is why seeding
// works; overlays (3D, overview) and the correlation matrix need a real
// click after the chart is up, handled by galleryAfterRender.
var GALLERY_BASE_SIGNALS = {
	X_Axis: 'flipper_length_mm', Y_Axis: 'body_mass_g', Color_By: 'None',
	Size_By: 'None', Stroke_By: 'None', Opacity_By: 'None', SortX_By: 'None',
	Facet_Rows_By: 'None', Facet_Cols_By: 'None', Sum_By: 'None',
	Filter_Out_From: 'None', Filter_Additional: 'None', Filter_By_Value: 'None',
	Include_Only: ' ', Term: '-',
	Line_: false, Boxplot_: true, Violin_: false, Outliers_: false,
	Histogram_: false, Contours_: false, Regression_: false, Jitter_: false,
	ECDF_: false, QQNorm_: false, Show_Covariance: false
};

var GALLERY_PRESETS = {
	scatter:   { signals: { Color_By: 'species' } },
	line:      { signals: { X_Axis: 'year', Color_By: 'species', Line_: true } },
	histogram: { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species' } },
	ecdf:      { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species', ECDF_: true } },
	qqnorm:    { signals: { X_Axis: 'body_mass_g', Y_Axis: 'None', Color_By: 'species', QQNorm_: true } },
	box:       { signals: { X_Axis: 'species', Color_By: 'species' } },
	violin:    { signals: { X_Axis: 'species', Color_By: 'species', Violin_: true, Boxplot_: false } },
	stacked:   { signals: { X_Axis: 'island', Y_Axis: 'Count', Color_By: 'species' } },
	heatmap:   { signals: { X_Axis: 'island', Y_Axis: 'species' } },
	facet:     { signals: { X_Axis: 'bill_length_mm', Y_Axis: 'bill_depth_mm', Color_By: 'species', Facet_Cols_By: 'island' } },
	corr:      { click: 'covariance' },
	threed:    { signals: { Color_By: 'species' }, click: 'ThreeD_btn' },
	overview:  { click: 'Overview_btn' }
};

function galleryAfterRender(action) {
	var tries = 0;
	(function poll() {
		tries++;
		if (tries > 120) { return; }
		var loader = document.getElementById('cc_loadersmartplot_id');
		if (!loader || loader.style.display !== 'none') { setTimeout(poll, 120); return; }
		if (action === 'covariance') {
			var cb = document.querySelector('#Show_Covariancesmartplot_id input[type=checkbox]');
			if (cb && !cb.checked) { cb.click(); }
		} else {
			var btn = document.getElementById(action + 'smartplot_id');
			if (btn) { btn.click(); }
		}
	})();
}

function launchGalleryExample(key) {
	var preset = GALLERY_PRESETS[key];
	if (!preset) { return; }
	var store = loadSignalsFromCookie('vegaSignals_smartplot_id') || {};
	Object.assign(store, GALLERY_BASE_SIGNALS, preset.signals || {});
	saveSignalState('vegaSignals_smartplot_id', store);
	document.getElementById('default_data').click();
	// normalize the show/hide toggle so the graph click always graphs
	document.getElementById('myccinput').style.display = 'block';
	var btn = document.getElementById('graph_button');
	btn.innerHTML = 'Graph Data';
	btn.click();
	if (preset.click) { setTimeout(function() { galleryAfterRender(preset.click); }, 250); }
}

document.querySelectorAll('#cc_gallery [data-gallery]').forEach(function(card) {
	card.addEventListener('click', function() {
		launchGalleryExample(card.getAttribute('data-gallery'));
	});
});

// Hero CTAs: one loads the demo straight away, the other jumps to the paste box
var heroDemoBtn = document.getElementById('hero_demo_btn');
if (heroDemoBtn) {
	heroDemoBtn.addEventListener('click', function() {
		document.getElementById('default_data').click();
		document.getElementById('myccinput').style.display = 'block';
		var btn = document.getElementById('graph_button');
		btn.innerHTML = 'Graph Data';
		btn.click();
	});
}
var heroPasteBtn = document.getElementById('hero_paste_btn');
if (heroPasteBtn) {
	heroPasteBtn.addEventListener('click', function() {
		var input = document.getElementById('myccinput');
		input.scrollIntoView({behavior: 'smooth', block: 'center'});
		input.focus();
	});
}


