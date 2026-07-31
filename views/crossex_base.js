<%- include('../src/lz-string.js') %>

var add_css=true;
// Injects the core widget stylesheet (incl. all dark-mode rules) once. Normally
// lazy — first chart draw pulls it in — but the standalone page's empty landing
// state (hero + gallery, no chart yet) needs it too if dark mode is toggled early.
function ensureCoreCss() {
	if (!add_css) { return; }
	var css = itgz.decompressFromEncodedURIComponent("<%=cc_css%>");
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
	add_css = false;
}
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("<%-crossex_spec%>"));
// crossex() needs the spec as a string on every call (for the element-id
// substitution); stringifying the ~350KB object once here instead of per
// call saves ~15ms on each re-graph
var crossex_spec_str = JSON.stringify(crossex_spec);
// The "Datatype -> Numerical" pulldown coerces a column with this expression
// function instead of Vega's toNumber(), which turns spreadsheet values like
// "1,200", "$1,200", or " 1 200 " into NaN. ccnum() cleans separators/currency
// and maps anything non-finite to null, matching CrossexData.cleanNumber so the
// axis and the Data Lab agree. Registered once, before any view is parsed.
(function registerCcNum() {
	if (typeof vega === 'undefined' || typeof vega.expressionFunction !== 'function') { return; }
	vega.expressionFunction('ccnum', function(value) {
		return (typeof CrossexData !== 'undefined' && CrossexData.cleanNumber)
			? CrossexData.cleanNumber(value)
			: (isFinite(+value) ? +value : null);
	});
})();
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
	"Opacity_By":      { numericOnly: true },
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

// Vega's heatmap transform crashes ("reading 'forEach'") when a signal reflow
// reaches it before its mark items exist — which happens when density contours
// are switched on inside already-created facet cells. That one error kills the
// whole dataflow run, so contours never appear. Skip source-less pulses; the
// data pulse that follows renders normally.
(function hardenHeatmapTransform() {
	try {
		var proto = vega && vega.transforms && vega.transforms.heatmap && vega.transforms.heatmap.prototype;
		if (!proto || proto._ccHardened) { return; }
		proto._ccHardened = true;
		var baseTransform = proto.transform;
		proto.transform = function(_, pulse) {
			try { pulse.materialize(pulse.SOURCE); } catch (e) { /* fall through */ }
			if (!pulse.source) { return pulse.StopPropagation; }
			return baseTransform.call(this, _, pulse);
		};
	} catch (e) { /* vega absent or internals moved — keep stock behavior */ }
})();

// Repair legacy spec details that otherwise leave visible controls inert.
// Keeping this normalization here also protects embedded/R builds that load
// the same Vega spec without requiring consumers to migrate saved projects.
function normalizeGraphSpec(spec) {
	if (!spec || !spec.scales) { return; }
	if (!spec.scales.some(function(scale) { return scale.name === 'opacity_scale'; })) {
		spec.scales.push({
			name: 'opacity_scale', type: 'linear', zero: false,
			domain: {data: 'mydata', field: 'O_Value'}, range: [0.12, 1]
		});
	}
	(function visit(node) {
		if (!node || typeof node !== 'object') { return; }
		if (node.name === 'scatter_point_mark' && node.encode && node.encode.update) {
			node.encode.update.fillOpacity = [
				{test: "Opacity_By!='None' && isFinite(toNumber(datum.O_Value))", scale: 'opacity_scale', field: 'O_Value'},
				{signal: 'Opacity_'}
			];
		}
		if (node.name === 'MyOutliers_' && Array.isArray(node.transform)) {
			var oldFilter = node.transform.find(function(transform) { return transform.type === 'filter'; });
			var measure = oldFilter && oldFilter.expr.indexOf("datum['X_Value'] >=") >= 0 ? 'X_Value' : 'Y_Value';
			node.transform = [
				{type: 'joinaggregate', fields: [measure, measure], ops: ['q1', 'q3'], as: ['outlier_q1', 'outlier_q3']},
				{type: 'filter', expr: "datum['" + measure + "'] >= datum.outlier_q3 + (datum.outlier_q3-datum.outlier_q1)*2 || datum['" + measure + "'] <= datum.outlier_q1 - (datum.outlier_q3-datum.outlier_q1)*2"}
			];
		}
		if (node.name === 'perrow_facets' && node.marks && node.marks[0] && node.marks[0].encode) {
			node.marks[0].encode.update.opacity = [
				{signal: "if(Jitter_ || (Color_By=='None' && Size_By=='None'), 0, Opacity_)"}
			];
		}
		if (node.name === 'count_heat_facets' && node.marks && node.marks[0] && node.marks[0].encode) {
			node.marks[0].encode.update.opacity = {
				signal: "if(!Jitter_ && Color_By=='None' && Size_By=='None', Grid_Opacity, 0)"
			};
		}
		Object.keys(node).forEach(function(key) { visit(node[key]); });
	})(spec);
}

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
	{id: 'Interact_tablinks', panel: 'Interact'},
	{id: 'Charts_tablinks', panel: 'Charts'},
	{id: 'Axis_tablinks', panel: 'Axis'},
	{id: 'Marks_tablinks', panel: 'Marks'},
	{id: 'Filtering_tablinks', panel: 'Filtering'},
	{id: 'Margins_tablinks', panel: 'Margins'},
	{id: 'Summary_tablinks', panel: 'Summary'},
	{id: 'Transforms_tablinks', panel: 'Transforms'}
];

var _resizeHandlers = {};
var _cookieDebounceTimers = {};
var _panelObservers = {};
var _panelResizeTimers = {};

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
// Vega rebuilds the full per-cell scaffolding on every facet change; beyond
// ~10k rendered rows the transition takes many seconds and beyond ~50k the
// tab dies. Faceted views therefore render at most this many rows.
var FACET_SAMPLE_MAX = 10000;
var _renderCount = {};

function facetsRequested(element, repSignalsJson) {
	var saved = loadSignalsFromCookie('vegaSignals_' + element) || {};
	var vals = [saved['Facet_Rows_By'], saved['Facet_Cols_By']];
	if (repSignalsJson) {
		repSignalsJson.forEach(function(sig) {
			if ((sig.name === 'Facet_Rows_By' || sig.name === 'Facet_Cols_By') &&
				!(sig.name in saved) && sig.value != null) {
				vals.push(sig.value);
			}
		});
	}
	return vals.some(function(v) { return v && v !== 'None'; });
}

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

var _loaderTokens = {};
var _loaderTokenSeq = 0;

// The rendering overlay covers both the chart and its controls. `inert` keeps
// keyboard users from changing a second option while Vega is still processing
// the first one; pointer-events is the fallback for browsers without inert.
// A token prevents an older async render from dismissing a newer overlay.
var crossexloader=function crossexloader(element,status,token) {
	var loader = document.getElementById('cc_loader' + element);
	if (!loader) { return null; }
	var graph = document.getElementById('cc_graph' + element);
	var blocked = [
		document.getElementById('cc_panel' + element),
		document.getElementById('cc_tabscontent' + element),
		document.getElementById('cc_graph_container' + element)
	].filter(Boolean);
	if(status) {
		token = ++_loaderTokenSeq;
		_loaderTokens[element] = token;
		loader.style.zIndex = 999;
		loader.style.display = 'flex';
		loader.setAttribute('aria-hidden', 'false');
		if (graph) {
			graph.classList.add('cc-rendering');
			graph.setAttribute('aria-busy', 'true');
		}
		blocked.forEach(function(node) { node.inert = true; node.setAttribute('aria-disabled', 'true'); });
		return token;
	}
	if (token != null && _loaderTokens[element] !== token) { return false; }
	loader.style.zIndex = 0;
	loader.style.display = 'none';
	loader.setAttribute('aria-hidden', 'true');
	if (graph) {
		graph.classList.remove('cc-rendering');
		graph.setAttribute('aria-busy', 'false');
	}
	blocked.forEach(function(node) { node.inert = false; node.removeAttribute('aria-disabled'); });
	return true;
}

function nextPaint() {
	return new Promise(function(resolve) {
		requestAnimationFrame(function() { requestAnimationFrame(resolve); });
	});
}

// Vega may queue a second run from a signal listener (QQ data is one example).
// Stay busy until the view has remained idle through a paint boundary.
function waitForViewIdle(view) {
	var running = view && view._running;
	return Promise.resolve(running).catch(function() {}).then(nextPaint).then(function() {
		if (view && view._running && view._running !== running) { return waitForViewIdle(view); }
	});
}

function wireRenderBusyOverlay(element, view) {
	var controls = document.getElementById('cc_tabscontent' + element);
	if (!controls || controls.getAttribute('data-render-busy-wired')) { return; }
	controls.setAttribute('data-render-busy-wired', '1');
	function isPlotControlEvent(event) {
		var target = event.target;
		if (!event.isTrusted || !target || !target.closest || !target.closest('.vega-bind')) { return false; }
		if (event.type === 'input') { return target.type === 'range' || target.type === 'number'; }
		return event.type === 'change';
	}
	function deferRenderEvent(event) {
		if (!isPlotControlEvent(event)) { return; }
		var target = event.target;
		var eventType = event.type;
		var graph = document.getElementById('cc_graph' + element);
		// A range input can emit a trailing change event after its input event.
		// Once rendering starts, discard that and any other user change.
		if (graph && graph.classList.contains('cc-rendering')) {
			event.stopImmediatePropagation();
			event.preventDefault();
			return;
		}
		var restoreFocus = document.activeElement === target;
		event.stopImmediatePropagation();
		event.preventDefault();
		var loaderNode = document.getElementById('cc_loader' + element);
		var token = crossexloader(element, true);
		// Two frames guarantee that the compositor paints the spinner before a
		// long synchronous Vega dataflow begins.
		nextPaint().then(function() {
			if (!target.isConnected || document.getElementById('cc_loader' + element) !== loaderNode) {
				crossexloader(element, false, token);
				return;
			}
			target.dispatchEvent(new Event(eventType, { bubbles: true }));
			return waitForViewIdle(view).then(function() {
				if (crossexloader(element, false, token) && restoreFocus && target.isConnected) { target.focus(); }
			});
		}).catch(function(err) {
			crossexloader(element, false, token);
			console.error(err);
		});
	}
	controls.addEventListener('input', deferRenderEvent, true);
	controls.addEventListener('change', deferRenderEvent, true);
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
	var csvData = new Blob([CrossexData.toCsv(json, fields)], { type: 'text/csv;charset=utf-8' });
	var a = document.createElement('a');
	var csvUrl = URL.createObjectURL(csvData);
	a.href =  csvUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(csvUrl); }, 1000);
};

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
	// widget torn down (a closed dashboard editor) or hidden (single-chart UI
	// behind the dashboard): resize callbacks may still fire — return the
	// floor instead of crashing on missing nodes or sizing Vega to zero
	var panel = document.getElementById("cc_tabscontent" + element);
	var opener = document.getElementById("defaultOpen" + element);
	if (!widthNode || !panel || !opener) { return 40; }
	var buf=panel.offsetWidth+opener.offsetWidth;
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
	// picking a config tab exits any full-container overlay, back to the chart
	hideOverlays(element);
}

// The chart area hosts mutually-exclusive overlays (overview, 3D, table, pivot)
function hideOverlays(element, except) {
	['cc_overview', 'cc_3d', 'cc_table', 'cc_pivot'].forEach(function(id) {
		if (id === except) { return; }
		var el = document.getElementById(id + element);
		if (el) { el.style.display = 'none'; }
	});
	var tip = document.getElementById('cc_3d_tip');
	if (tip) { tip.style.display = 'none'; }
	// opening an overlay: overlays anchor to the container's visible box, so
	// a chart scrolled sideways must not leave the overlay off-screen
	if (except) {
		var gc = document.getElementById('cc_graph_container' + element);
		if (gc) { gc.scrollLeft = 0; gc.scrollTop = 0; }
	}
}

// ---- Contextual option visibility -------------------------------------------
// Each panel control only affects some chart modes (the signal→mark usage in
// the Vega spec is the ground truth for these rules). Show a control only
// while the visible graph actually reads its signal, so every tab presents
// just the options that do something. Hidden controls stay in the DOM and
// keep their signal values — nothing is lost by toggling display.
function optionContext(view) {
	function sig(name, dflt) {
		try {
			var v = view.signal(name);
			return v === undefined ? dflt : v;
		} catch (e) { return dflt; }
	}
	var corr = !!sig('Show_Covariance', false);
	var qq = !!sig('QQNorm_', false) && !corr;   // QQ replaces every chart but the matrix
	var plain = !corr && !qq;
	var ctx = {
		corr: corr,
		qq: qq,
		scatter: plain && !!sig('show_scatter_graph', false),
		// show_hist_graph is true for any numeric X; the histogram area is only
		// real when Y is not a plotted column (pure histogram) or the marginal
		// histogram is enabled on a scatter
		box: plain && !!sig('show_box_graphs', false),
		hzbox: plain && !!sig('show_hzbox_graphs', false),
		stacked: plain && !!sig('show_stacked_graphs', false),
		grid: plain && !!sig('show_grid_graphs', false),
		xCat: !!sig('Xord', false),
		yCat: !!sig('Yord', false),
		facetRows: sig('Facet_Rows_By', 'None') !== 'None',
		facetCols: sig('Facet_Cols_By', 'None') !== 'None',
		colored: sig('Color_By', 'None') !== 'None',
		sized: sig('Size_By', 'None') !== 'None',
		stroked: sig('Stroke_By', 'None') !== 'None',
		filtered: sig('Filter_Out_From', 'None') !== 'None' || sig('Filter_Additional', 'None') !== 'None',
		valueFilter: sig('Filter_By_Value', 'None') !== 'None',
		contours: !!sig('Contours_', false),
		violin: !!sig('Violin_', false),
		boxOn: !!sig('Boxplot_', false),
		dashes: !!sig('Dashes_', false),
		jitter: !!sig('Jitter_', false),
		boxPoints: !!sig('Box_Points_', false),
		yHist: !!sig('Histogram_Y_', false),
		parts: !!sig('show_parts_graph', false),
		catLayout: sig('Cat_Layout', 'bars'),
		density: !!sig('Density_', false),
		ridge: !!sig('Ridgeline_', false),
		linked: !!sig('Link', false),
		gridsOn: !!sig('Grids_', false)
	};
	var yPlotted = ['None', 'Count', 'Sum'].indexOf(sig('Y_Axis', 'None')) < 0;
	var xPlotted = ['None', 'Count', 'Sum'].indexOf(sig('X_Axis', 'None')) < 0;
	ctx.xIsCol = xPlotted;
	ctx.yIsCol = yPlotted;
	ctx.pureHist = plain && !ctx.xCat && xPlotted && !yPlotted;
	ctx.margHist = ctx.scatter && !!sig('Histogram_', false);
	ctx.hist = ctx.pureHist || ctx.margHist;
	ctx.faceted = ctx.facetRows || ctx.facetCols;
	// Color_By numeric → continuous color scale (Cord is true for categorical)
	ctx.colorNumeric = ctx.colored && !sig('Cord', false);
	ctx.legend = (ctx.colored || ctx.stroked || ctx.filtered) && !corr;
	// grid-eligible even while the heat map toggle is off, so Map_XY_Cat_
	// stays reachable to turn the grid back on
	ctx.gridEligible = plain && ctx.xCat && ctx.yCat && yPlotted;
	ctx.anyChart = ctx.scatter || ctx.pureHist || ctx.box || ctx.hzbox || ctx.stacked || ctx.grid || ctx.parts;
	return ctx;
}

// Control/section slot id → is it relevant for the current context?
// Ids not listed are always shown.
var CONTROL_RELEVANCE = {
	// Charts: variables
	'Facet_Rows_By':     function(c) { return !c.corr && !c.grid; },   // GRIDS only facets by columns
	'Facet_Cols_By':     function(c) { return !c.corr && !c.hzbox; },  // HZBOXES only facets by rows
	'Color_By':          function(c) { return !c.corr; },
	'Size_By':           function(c) { return c.scatter || c.grid; },
	'Stats_':            function(c) { return c.scatter || c.box || c.hzbox; },
	// Charts: per-graph-type sections. The categorical section stays visible
	// for every part-of-whole layout so the Layout selector can switch back.
	'Stacked_Options':   function(c) { return c.stacked || c.parts; },
	'Stack_Grouped_':    function(c) { return c.stacked && c.colored; },
	'Donut_Ratio':       function(c) { return c.parts && c.catLayout === 'donut'; },
	'Cloud_Options':     function(c) { return c.parts && c.catLayout === 'cloud'; },
	'Density_':          function(c) { return c.hist; },
	// the count scale belongs to the histogram itself, so it appears for a
	// pure histogram or a scatter's X marginal — the Y marginal reports counts on hover
	'Count_Axis_':       function(c) { return c.pureHist || c.margHist || c.qq === false && c.hist && !c.scatter; },
	'Density_Bandwidth': function(c) { return c.hist && c.density; },
	'Ridgeline_':        function(c) { return c.hzbox && c.violin; },
	'Ridge_Overlap':     function(c) { return c.hzbox && c.violin && c.ridge; },
	'Grid_Options':      function(c) { return c.gridEligible || c.corr; },   // Grid_Radius also rounds matrix cells
	'Map_XY_Cat_':       function(c) { return c.gridEligible; },
	'Grid_Spacing':      function(c) { return c.grid; },
	'Grid_Radius':       function(c) { return c.grid || c.corr; },
	'Violin_Options':    function(c) { return c.box || c.hzbox; },
	'Violin_Bandwidth':  function(c) { return (c.box || c.hzbox) && c.violin; },
	'Violin_Steps':      function(c) { return (c.box || c.hzbox) && c.violin; },
	'Scatter_Options':   function(c) { return c.scatter; },
	'Hist_Options':      function(c) { return c.hist || c.qq; },
	'Histogram_Ratio':   function(c) { return c.margHist; },
	'Histogram_Bins_Size': function(c) { return c.hist || (c.scatter && c.yHist); },   // QQ ignores binning
	'Histogram_Y_':      function(c) { return c.scatter; },
	'ECDF_':             function(c) { return c.pureHist; },
	// Search: the highlight marks only exist on scatter plots
	'Search_Options':    function(c) { return c.scatter; },
	// Interact
	'PanZoom_Options':   function(c) { return !c.grid; },
	'Interactive_':      function(c) { return c.scatter || c.hist; },
	'cc_reset_zoom':     function(c) { return c.scatter || c.hist; },
	'Brush_Options':     function(c) { return c.scatter; },
	// Axis
	'SortX_By':          function(c) { return c.stacked; },
	'LogY_':             function(c) { return c.scatter || c.box; },
	'LogX_':             function(c) { return c.scatter || c.hist || c.hzbox; },
	'Reverse_X':         function(c) { return c.scatter || c.hist || c.hzbox || c.grid || c.corr; },
	'Reverse_Y':         function(c) { return c.scatter || c.box || c.grid || c.corr; },
	'Limit_Options':     function(c) { return c.scatter || c.hist || c.box || c.hzbox || c.stacked; },
	// per-row scatter domains only exist without column facets (a row axis
	// can't describe cells whose extents differ per column)
	'Uniform_YLim':      function(c) { return (c.box && c.facetRows) || (c.scatter && c.facetRows && !c.facetCols); },
	'Uniform_XLim':      function(c) { return c.stacked; },
	// the box value scales take their domain from ydom/xdom, so the manual
	// limits apply to box plots (vertical: Y, horizontal: X) as well
	'Y_Upper_Lim':       function(c) { return c.scatter || c.box; },
	'Y_Lower_Lim':       function(c) { return c.scatter || c.box; },
	'X_Upper_Lim':       function(c) { return c.scatter || c.hist || c.hzbox; },
	'X_Lower_Lim':       function(c) { return c.scatter || c.hist || c.hzbox; },
	// Marks
	'Point_Options':     function(c) { return c.scatter || c.box || c.hzbox || c.grid || c.stacked; },
	'Jitter_':           function(c) { return c.box || c.hzbox || c.grid; },
	'Stroke_By':         function(c) { return c.scatter || c.box || c.hzbox || c.stacked; },
	'Stroke_Width':      function(c) { return (c.scatter || c.box || c.hzbox || c.stacked) && c.stroked; },
	'Jitter_Radius':     function(c) { return (c.box || c.hzbox || c.grid) && c.jitter; },
	'Dash_Height':       function(c) { return (c.box || c.hzbox) && c.dashes; },
	'Dash_Width':        function(c) { return (c.box || c.hzbox) && c.dashes; },
	'Dash_Radius':       function(c) { return (c.box || c.hzbox) && c.dashes; },
	// viol_width/viol_ht scale every distribution mark (violin, box, bars,
	// dashes, jitter track), so the width control applies to all box charts
	'Violin_Width':      function(c) { return c.box || c.hzbox; },
	'Median_Thickness':  function(c) { return (c.box || c.hzbox) && c.boxOn; },
	// the grid heat map sizes cells from its own bandwidth-based scale, so the
	// point-size controls only apply where marks read Max_Point/size_scale
	'Max_Point':         function(c) { return c.scatter || c.box || c.hzbox; },
	'Min_Point':         function(c) { return c.scatter && c.sized; },
	'Shape':             function(c) { return c.scatter || ((c.box || c.hzbox) && (c.jitter || c.boxPoints)); },
	'Reverse_Size':      function(c) { return c.scatter && c.sized; },
	// Opacity is a marker property: base Mark Opacity (points, box value
	// points, stacked bars, encoded grid cells) and Opacity By (scatter only)
	// sit on the Marks tab beside size/shape
	'Mark_Opacity':      function(c) { return c.scatter || c.stacked || ((c.box || c.hzbox) && (c.jitter || c.boxPoints)) || (c.grid && (c.colored || c.sized || c.jitter)); },
	'Opacity_':          function(c) { return c.scatter || c.stacked || ((c.box || c.hzbox) && (c.jitter || c.boxPoints)) || (c.grid && (c.colored || c.sized || c.jitter)); },
	'Opacity_By':        function(c) { return c.scatter; },
	'Contour_Options':   function(c) { return c.scatter && c.contours; },
	'Link_Options':      function(c) { return c.scatter; },
	'LinkField':         function(c) { return c.linked; },
	'LinkURL':           function(c) { return c.linked; },
	'LinkTail':          function(c) { return c.linked; },
	// Fonts
	'Show_Titles':       function(c) { return c.legend; },
	'Y_Axis_Angle':      function(c) { return c.hzbox; },
	'Legend_Font':       function(c) { return c.legend; },
	'TickCount':         function(c) { return !c.grid && !c.corr; },
	// Filtering
	'Datatype_Options':  function(c) { return c.xIsCol || c.yIsCol || c.colored; },
	'Datatype_X':        function(c) { return c.xIsCol; },
	'Datatype_Y':        function(c) { return c.yIsCol; },
	'Datatype_Color':    function(c) { return c.colored; },
	'filter_min':        function(c) { return c.valueFilter; },
	'filter_max':        function(c) { return c.valueFilter; },
	// Coloring
	'Background_Color':  function(c) { return c.anyChart && !c.grid; },
	'Reverse_Color':     function(c) { return c.colored || c.grid || c.corr; },
	// base Mark Opacity + Opacity By now live with the marker controls; this
	// Coloring section only carries the per-chart-type opacities, so hide it
	// (and its header) unless one of those actually applies
	'Opacity_Options':   function(c) { return c.box || c.hzbox || c.grid || c.corr || c.gridsOn || (c.scatter && c.contours); },
	'Grid_Opacity':      function(c) { return c.gridsOn || c.grid || c.corr; },
	'Boxplot_Opacity':   function(c) { return (c.box || c.hzbox) && c.boxOn; },
	'Violin_Opacity':    function(c) { return (c.box || c.hzbox) && c.violin; },
	'Contour_Opacity':   function(c) { return c.scatter && c.contours; },
	'Cnt_St_Opacity':    function(c) { return c.scatter && c.contours; },
	'Dash_Opacity':      function(c) { return (c.box || c.hzbox) && c.dashes; },
	'ColorScale_Options': function(c) { return c.colorNumeric; },
	// Margins
	'Facet_Options':     function(c) { return c.faceted; },
	'Row_Height':        function(c) { return c.facetRows; },
	'Legend_Options':    function(c) { return c.legend; }
};

// A tab hides only when nothing on it can affect the visible graph.
// (The merged Marks & Colors and Filter & Search tabs always carry something
// relevant, so no tabs currently hide — kept for future rules.)
var TAB_RELEVANCE = {};

// Signals whose changes can flip any of the predicates above
var RELEVANCE_TRIGGERS = ['show_scatter_graph', 'show_hist_graph', 'show_box_graphs',
	'show_hzbox_graphs', 'show_stacked_graphs', 'show_grid_graphs', 'Show_Covariance',
	'QQNorm_', 'Xord', 'Yord', 'X_Axis', 'Y_Axis', 'Color_By', 'Cord', 'Size_By',
	'Stroke_By', 'Facet_Rows_By', 'Facet_Cols_By', 'Filter_Out_From', 'Filter_Additional',
	'Filter_By_Value', 'Contours_', 'Violin_', 'Boxplot_', 'Dashes_', 'Jitter_',
	'Box_Points_', 'Link', 'Grids_', 'Histogram_', 'Histogram_Y_',
	'Cat_Layout', 'Density_', 'Ridgeline_', 'Count_Axis_'];

function updateOptionRelevance(element, view) {
	var ctx = optionContext(view);
	Object.keys(CONTROL_RELEVANCE).forEach(function(id) {
		var node = document.getElementById(id + element);
		if (node) { node.style.display = CONTROL_RELEVANCE[id](ctx) ? 'block' : 'none'; }
	});
	var activeHidden = false;
	Object.keys(TAB_RELEVANCE).forEach(function(id) {
		var btn = document.getElementById(id + element);
		if (!btn) { return; }
		var show = TAB_RELEVANCE[id](ctx);
		btn.style.display = show ? 'block' : 'none';
		if (!show && btn.className.indexOf(' active') >= 0) { activeHidden = true; }
	});
	// The open tab lost every option: fall back to the chart-variables tab.
	// Deferred, because opening a tab resizes the chart with a synchronous
	// view.run(), which is illegal inside the signal listener that got us here.
	if (activeHidden) {
		setTimeout(function() {
			var charts = document.getElementById('Charts_tablinks' + element);
			if (charts) { charts.click(); }
		}, 0);
	}
}

function wireOptionRelevance(element, view) {
	RELEVANCE_TRIGGERS.forEach(function(sig) {
		try {
			view.addSignalListener(sig, function() { updateOptionRelevance(element, view); });
		} catch (e) { /* signal absent in this spec */ }
	});
	updateOptionRelevance(element, view);
}

// ---- Direct manipulation: edit the chart by clicking it ---------------------
// Drag axis titles and the legend block; double-click axes, the legend, or
// empty space to edit titles, limits, colors, and free-text labels. Every edit
// lands in a CC_* signal, so it rides the same persistence as panel controls
// (localStorage, saved views, the Interactive_ rebuild) and acts as an
// override on top of whatever the panel computes.
var _ccDirectEdit = {};
var _ccSuppressClick = {};
var _ccNoteSeq = 0;

function ccSchemeColors(name, n) {
	var s = null;
	try { s = vega.scheme(String(name || '').toLowerCase()); } catch (e) {}
	if (typeof s === 'function') {
		var out = [];
		for (var i = 0; i < n; i++) { out.push(s(n === 1 ? 0.5 : i / (n - 1))); }
		return out;
	}
	if (Array.isArray(s) && s.length) { return s.slice(); }
	return ['#4c78a8', '#f58518', '#e45756', '#72b7b2', '#54a24b', '#eeca3b', '#b279a2', '#ff9da6', '#9d755d', '#bab0ac'];
}

// normalize any CSS color to #rrggbb so <input type=color> accepts it
function ccToHex(color) {
	try {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = String(color);
		var v = ctx.fillStyle;
		if (/^#[0-9a-f]{6}$/i.test(v)) { return v; }
	} catch (e) {}
	return '#4c78a8';
}

function ccHexLerp(a, b, t) {
	function ch(hex, i) { return parseInt(hex.substr(1 + i * 2, 2), 16); }
	a = ccToHex(a); b = ccToHex(b);
	var r = Math.round(ch(a, 0) + (ch(b, 0) - ch(a, 0)) * t);
	var g = Math.round(ch(a, 1) + (ch(b, 1) - ch(a, 1)) * t);
	var bl = Math.round(ch(a, 2) + (ch(b, 2) - ch(a, 2)) * t);
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
}

// unique category values in the order Vega's sorted ordinal domain uses
function ccCatDomain(rows, col) {
	var seen = new Set(), out = [];
	for (var i = 0; i < rows.length; i++) {
		var v = rows[i][col];
		if (v == null || v === '') { continue; }
		var k = String(v);
		if (!seen.has(k)) { seen.add(k); out.push(v); }
	}
	out.sort(function(a, b) { return a < b ? -1 : a > b ? 1 : 0; });
	return out;
}

// Apply the stored color/note overrides to a spec about to be parsed.
// Idempotent: always writes the canonical value for the current override
// state, so the Interactive_ rebuild (same spec object) stays correct.
function applyOverridePatches(spec, signalMap, dataMap) {
	function sval(n) {
		var i = signalMap[n];
		return i === undefined ? undefined : spec.signals[i].value;
	}
	var noteIdx = dataMap['cc_notes_data'];
	if (noteIdx !== undefined) {
		spec.data[noteIdx].values = Array.isArray(sval('CC_Notes')) ? sval('CC_Notes') : [];
	}
	var scales = spec.scales || [];
	var catScale = null, contScale = null;
	scales.forEach(function(s) {
		if (s.name === 'color_scale_cat') { catScale = s; }
		if (s.name === 'color_scale_cont') { contScale = s; }
	});
	if (catScale) {
		var overrides = sval('CC_Cat_Colors') || {};
		var colorBy = sval('Color_By');
		var range = null;
		if (Object.keys(overrides).length && colorBy && colorBy !== 'None' && dataMap['mydata'] !== undefined) {
			var domain = ccCatDomain(spec.data[dataMap['mydata']].values || [], colorBy);
			if (domain.length) {
				var defaults = ccSchemeColors(sval('Palette'), Math.max(domain.length, 10));
				range = domain.map(function(v, i) { return overrides[String(v)] || defaults[i % defaults.length]; });
			}
		}
		catScale.range = range || {scheme: {signal: 'Palette'}};
	}
	if (contScale) {
		var g = sval('CC_Cont_Range');
		if (Array.isArray(g) && g.length === 2) {
			var stops = [];
			for (var i = 0; i < 20; i++) { stops.push(ccHexLerp(g[0], g[1], i / 19)); }
			contScale.range = stops;
		} else {
			contScale.range = {scheme: {signal: 'Palette'}, count: 20};
		}
	}
}

// Persist override state, then re-init the widget so spec-level patches
// (color scale ranges) apply — same path a saved-view restore takes.
function ccReinit(element, extraState) {
	var store = loadSignalsFromCookie('vegaSignals_' + element) || {};
	Object.keys(extraState || {}).forEach(function(k) { store[k] = extraState[k]; });
	saveSignalState('vegaSignals_' + element, store);
	var opts = _crossexOpts[element];
	crossexloader(element, true);
	delay(30).then(function() { crossex(element, _fullData[element], opts.options, opts.widthid); });
}

function wireDirectEdit(element, view) {
	var container = document.getElementById('view_crossex' + element);
	if (!container) { return; }

	function sig(name, dflt) {
		try {
			var v = view.signal(name);
			return v === undefined ? dflt : v;
		} catch (e) { return dflt; }
	}
	function setSignals(map) {
		Object.keys(map).forEach(function(k) {
			try { view.signal(k, map[k]); } catch (e) {}
		});
		view.runAsync();
	}
	function syncNotes(notes) {
		// strip Vega tuple metadata (_id) — re-inserting an already-stamped
		// tuple is silently dropped, which would freeze notes after their
		// first render
		var clean = (notes || []).map(function(n) {
			return {id: n.id, x: n.x, y: n.y, text: n.text, fontSize: n.fontSize, color: n.color, angle: n.angle || 0};
		});
		try {
			view.signal('CC_Notes', clean);
			view.change('cc_notes_data', vega.changeset().remove(function() { return true; })
				.insert(clean.map(function(n) { return Object.assign({}, n); })));
			view.runAsync();
		} catch (e) {}
	}
	function chartCoords(event) {
		var canvas = container.querySelector('canvas');
		if (!canvas) { return {x: 0, y: 0}; }
		var rect = canvas.getBoundingClientRect();
		var origin = view._origin || [0, 0];
		return {x: event.clientX - rect.left - origin[0], y: event.clientY - rect.top - origin[1]};
	}
	// Vega marks axes non-interactive, so its own picking never returns their
	// items. Walk the scenegraph instead: absolute bounds of axis titles, note
	// texts, and the legend block, tested against the pointer position.
	function ccHitTest(clientX, clientY) {
		var canvas = container.querySelector('canvas');
		if (!canvas) { return null; }
		var rect = canvas.getBoundingClientRect();
		var origin = view._origin || [0, 0];
		var px = clientX - rect.left - origin[0];
		var py = clientY - rect.top - origin[1];
		var hitTitle = null, hitNote = null, hitLegend = null, hitGTitle = null;
		function contains(b, ox, oy, pad) {
			return b && px >= ox + b.x1 - pad && px <= ox + b.x2 + pad &&
				py >= oy + b.y1 - pad && py <= oy + b.y2 + pad;
		}
		(function collect(mark, ox, oy, orient) {
			if (!mark || !mark.items) { return; }
			mark.items.forEach(function(item) {
				if (mark.role === 'axis-title' && orient && contains(item.bounds, ox, oy, 5)) {
					hitTitle = {type: 'title', orient: orient};
				}
				if ((mark.role === 'title-text' || mark.role === 'title-subtitle') && contains(item.bounds, ox, oy, 5)) {
					hitGTitle = {type: 'gtitle'};
				}
				if (mark.name === 'cc_note_mark' && contains(item.bounds, ox, oy, 4)) {
					hitNote = {type: 'note', datum: item.datum};
				}
				if (mark.name === 'chart_footer' && contains(item.bounds, ox, oy, 0)) {
					hitLegend = {type: 'legend'};
				}
				if (mark.marktype === 'group' && item.items) {
					var nextOrient = mark.role === 'axis' ? item.orient : orient;
					item.items.forEach(function(child) {
						collect(child, ox + (item.x || 0), oy + (item.y || 0), nextOrient);
					});
				}
			});
		})(view.scenegraph().root, 0, 0, null);
		var hit = hitNote || hitTitle || hitGTitle || hitLegend;
		if (hit && hit.type === 'title' && hit.orient !== 'left' && hit.orient !== 'bottom') { return null; }
		return hit;
	}

	// ---- popover -----------------------------------------------------------
	var host = document.getElementById('cc_graph' + element) || container;
	function popover() {
		var pop = document.getElementById('cc_editpop' + element);
		if (!pop) {
			pop = document.createElement('div');
			pop.id = 'cc_editpop' + element;
			pop.className = 'cc_editpop';
			host.appendChild(pop);
		}
		return pop;
	}
	function openPop(event, html) {
		var pop = popover();
		pop.innerHTML = html;
		pop.style.display = 'block';
		var hostRect = host.getBoundingClientRect();
		var left = event.clientX - hostRect.left + 8;
		var top = event.clientY - hostRect.top + 8;
		pop.style.left = Math.max(4, Math.min(left, hostRect.width - 250)) + 'px';
		pop.style.top = Math.max(4, top - Math.max(0, top + pop.offsetHeight - hostRect.height)) + 'px';
		pop.querySelector('[data-cc-close]').onclick = closePop;
		return pop;
	}
	function closePop() {
		var pop = document.getElementById('cc_editpop' + element);
		if (pop) { pop.style.display = 'none'; pop.innerHTML = ''; }
	}
	function field(label, id, type, value, attrs) {
		return '<label class="cc_ep_row"><span>' + label + '</span>' +
			'<input id="' + id + '" type="' + type + '" value="' + escapeHtml(String(value)) + '" ' + (attrs || '') + '></label>';
	}
	function popShell(title, body, buttons) {
		return '<div class="cc_ep_head"><b>' + escapeHtml(title) + '</b>' +
			'<span class="cc_tr_x" data-cc-close title="close">✕</span></div>' +
			body + '<div class="cc_ep_btns">' + buttons + '</div>';
	}

	// ---- axis dialog -------------------------------------------------------
	function openAxisDialog(event, axis) {
		var isX = axis === 'x';
		var p = isX ? 'X' : 'Y';
		var sizeSig = isX ? 'X_Axis_Height' : 'Row_Header_Width';
		var body =
			field('Title', 'cc_ep_title' + element, 'text', sig('CC_' + p + '_Title', ''), 'placeholder="column name"') +
			field('Min', 'cc_ep_min' + element, 'text', sig(p + '_Lower_Lim', ''), 'placeholder="auto"') +
			field('Max', 'cc_ep_max' + element, 'text', sig(p + '_Upper_Lim', ''), 'placeholder="auto"') +
			field('Ticks', 'cc_ep_ticks' + element, 'number', sig('TickCount', 5), 'min="1" max="50"') +
			field('Label angle', 'cc_ep_angle' + element, 'number', sig(p + '_Axis_Angle', 0), 'step="5"') +
			field('Font size', 'cc_ep_font' + element, 'number', sig('AxisFontSize', 12), 'min="4" max="40"') +
			field(isX ? 'Axis height' : 'Axis width', 'cc_ep_size' + element, 'number', sig(sizeSig, isX ? 40 : 50), 'min="0" max="400"');
		var pop = openPop(event, popShell((isX ? 'X' : 'Y') + ' Axis', body,
			'<button data-cc-apply>Apply</button><button data-cc-reset>Reset</button>'));
		pop.querySelector('[data-cc-apply]').onclick = function() {
			var upd = {};
			upd['CC_' + p + '_Title'] = document.getElementById('cc_ep_title' + element).value;
			upd[p + '_Lower_Lim'] = document.getElementById('cc_ep_min' + element).value;
			upd[p + '_Upper_Lim'] = document.getElementById('cc_ep_max' + element).value;
			upd['TickCount'] = +document.getElementById('cc_ep_ticks' + element).value || 5;
			upd[p + '_Axis_Angle'] = +document.getElementById('cc_ep_angle' + element).value || 0;
			upd['AxisFontSize'] = +document.getElementById('cc_ep_font' + element).value || 12;
			upd[sizeSig] = +document.getElementById('cc_ep_size' + element).value || sig(sizeSig, 0);
			setSignals(upd);
			closePop();
		};
		pop.querySelector('[data-cc-reset]').onclick = function() {
			var upd = {};
			upd['CC_' + p + '_Title'] = '';
			upd['CC_' + p + 'T_DX'] = 0;
			upd['CC_' + p + 'T_DY'] = 0;
			upd[p + '_Lower_Lim'] = '';
			upd[p + '_Upper_Lim'] = '';
			setSignals(upd);
			closePop();
		};
	}

	// ---- chart title dialog ------------------------------------------------
	function openTitleDialog(event) {
		var body =
			field('Title', 'cc_ep_gt' + element, 'text', sig('CC_Title', ''), 'placeholder="computed from axes"') +
			field('Subtitle', 'cc_ep_gs' + element, 'text', sig('CC_Subtitle', ''), 'placeholder="computed from settings"') +
			field('Height', 'cc_ep_gh' + element, 'number', sig('Title_Height', 40), 'min="0" max="200"');
		var pop = openPop(event, popShell('Chart Title', body,
			'<button data-cc-apply>Apply</button><button data-cc-reset>Reset</button>'));
		pop.querySelector('[data-cc-apply]').onclick = function() {
			setSignals({
				CC_Title: document.getElementById('cc_ep_gt' + element).value,
				CC_Subtitle: document.getElementById('cc_ep_gs' + element).value,
				Title_Height: +document.getElementById('cc_ep_gh' + element).value || sig('Title_Height', 40)
			});
			closePop();
		};
		pop.querySelector('[data-cc-reset]').onclick = function() {
			setSignals({CC_Title: '', CC_Subtitle: '', CC_TI_DX: 0, CC_TI_DY: 0});
			closePop();
		};
	}

	// ---- note dialog -------------------------------------------------------
	function openNoteDialog(event, datum) {
		var isNew = !datum;
		var at = isNew ? chartCoords(event) : null;
		var body =
			field('Text', 'cc_ep_ntext' + element, 'text', isNew ? '' : datum.text, 'placeholder="label text"') +
			field('Size', 'cc_ep_nsize' + element, 'number', isNew ? 14 : datum.fontSize, 'min="6" max="72"') +
			field('Color', 'cc_ep_ncolor' + element, 'color', isNew ? (ccDarkMode() ? '#e8e8e8' : '#333333') : ccToHex(datum.color), '') +
			field('Angle', 'cc_ep_nangle' + element, 'number', isNew ? 0 : (datum.angle || 0), 'step="15"');
		var pop = openPop(event, popShell(isNew ? 'New Label' : 'Edit Label', body,
			'<button data-cc-apply>' + (isNew ? 'Add' : 'Apply') + '</button>' +
			(isNew ? '' : '<button data-cc-del>Delete</button>')));
		pop.querySelector('[data-cc-apply]').onclick = function() {
			var text = document.getElementById('cc_ep_ntext' + element).value;
			if (!text) { closePop(); return; }
			var notes = (sig('CC_Notes', []) || []).slice();
			var props = {
				text: text,
				fontSize: +document.getElementById('cc_ep_nsize' + element).value || 14,
				color: document.getElementById('cc_ep_ncolor' + element).value,
				angle: +document.getElementById('cc_ep_nangle' + element).value || 0
			};
			if (isNew) {
				props.id = 'note' + (++_ccNoteSeq) + '_' + notes.length;
				props.x = at.x; props.y = at.y;
				notes.push(props);
			} else {
				notes = notes.map(function(n) {
					return n.id === datum.id ? Object.assign({}, n, props) : n;
				});
			}
			syncNotes(notes);
			closePop();
		};
		var del = pop.querySelector('[data-cc-del]');
		if (del) {
			del.onclick = function() {
				syncNotes((sig('CC_Notes', []) || []).filter(function(n) { return n.id !== datum.id; }));
				closePop();
			};
		}
	}

	// ---- legend color dialog -----------------------------------------------
	function openLegendDialog(event) {
		var colorBy = sig('Color_By', 'None');
		if (colorBy === 'None') { return; }
		if (sig('Cord', false)) {
			var domain = [];
			try { domain = view.scale('color_scale_cat').domain() || []; } catch (e) {}
			if (!domain.length) { return; }
			var scale = view.scale('color_scale_cat');
			var rows = domain.map(function(v, i) {
				return field(String(v), 'cc_ep_cat' + i + element, 'color', ccToHex(scale(v)), 'data-cc-val="' + escapeHtml(String(v)) + '"');
			}).join('');
			var pop = openPop(event, popShell('Colors ~ ' + colorBy, rows,
				'<button data-cc-apply>Apply</button><button data-cc-reset>Reset</button>'));
			pop.querySelector('[data-cc-apply]').onclick = function() {
				var map = {};
				domain.forEach(function(v, i) {
					map[String(v)] = document.getElementById('cc_ep_cat' + i + element).value;
				});
				closePop();
				ccReinit(element, {CC_Cat_Colors: map});
			};
			pop.querySelector('[data-cc-reset]').onclick = function() {
				closePop();
				ccReinit(element, {CC_Cat_Colors: {}});
			};
		} else {
			var current = sig('CC_Cont_Range', []);
			var range = [];
			try { range = view.scale('color_scale_cont').range() || []; } catch (e) {}
			var start = current.length === 2 ? current[0] : (range[0] || '#f7fbff');
			var end = current.length === 2 ? current[1] : (range[range.length - 1] || '#08306b');
			var body =
				field('Low', 'cc_ep_glo' + element, 'color', ccToHex(start), '') +
				field('High', 'cc_ep_ghi' + element, 'color', ccToHex(end), '');
			var pop = openPop(event, popShell('Gradient ~ ' + colorBy, body,
				'<button data-cc-apply>Apply</button><button data-cc-reset>Reset</button>'));
			pop.querySelector('[data-cc-apply]').onclick = function() {
				closePop();
				// a picked low→high gradient is absolute: pin Reverse_Color off
				// (its default flips the scheme) so low really maps to low
				ccReinit(element, {CC_Cont_Range: [
					document.getElementById('cc_ep_glo' + element).value,
					document.getElementById('cc_ep_ghi' + element).value
				], Reverse_Color: false});
			};
			pop.querySelector('[data-cc-reset]').onclick = function() {
				closePop();
				ccReinit(element, {CC_Cont_Range: []});
			};
		}
	}

	// ---- drag: axis titles, legend block, labels ---------------------------
	var drag = null;
	if (!container.getAttribute('data-cc-editwired')) {
		container.setAttribute('data-cc-editwired', '1');
		// a drag that just ended must not fire click actions (legend filters).
		// State lives on the shared map: this capture listener survives the
		// Interactive_ rebuild while the rest of this closure is re-wired.
		container.addEventListener('click', function(e) {
			if (_ccSuppressClick[element]) { e.stopPropagation(); e.preventDefault(); }
		}, true);
	}
	function onMove(e) {
		if (!drag) { return; }
		var dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
		if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) { return; }
		drag.moved = true;
		if (drag.type === 'title' && drag.orient === 'bottom') {
			setSignals({CC_XT_DX: drag.s0[0] + dx, CC_XT_DY: drag.s0[1] + dy});
		} else if (drag.type === 'title') {
			// left titles render rotated -90°: local +x is up, local +y is right
			setSignals({CC_YT_DX: drag.s0[0] - dy, CC_YT_DY: drag.s0[1] + dx});
		} else if (drag.type === 'legend') {
			setSignals({CC_LEG_DX: drag.s0[0] + dx, CC_LEG_DY: drag.s0[1] + dy});
		} else if (drag.type === 'gtitle') {
			setSignals({CC_TI_DX: drag.s0[0] + dx, CC_TI_DY: drag.s0[1] + dy});
		} else if (drag.type === 'note') {
			var notes = (sig('CC_Notes', []) || []).map(function(n) {
				return n.id === drag.datum.id ? Object.assign({}, n, {x: drag.s0[0] + dx, y: drag.s0[1] + dy}) : n;
			});
			syncNotes(notes);
		}
	}
	function onUp() {
		if (drag && drag.moved) {
			_ccSuppressClick[element] = true;
			setTimeout(function() { _ccSuppressClick[element] = false; }, 60);
		}
		drag = null;
		window.removeEventListener('mousemove', onMove);
		window.removeEventListener('mouseup', onUp);
	}
	// the canvas is recreated on every embed, so these listeners re-wire
	// per drawGraph and never go stale
	var canvas = container.querySelector('canvas');
	if (canvas) {
		canvas.addEventListener('mousedown', function(event) {
			var target = ccHitTest(event.clientX, event.clientY);
			if (!target) { return; }
			var s0;
			if (target.type === 'title' && target.orient === 'bottom') { s0 = [sig('CC_XT_DX', 0), sig('CC_XT_DY', 0)]; }
			else if (target.type === 'title') { s0 = [sig('CC_YT_DX', 0), sig('CC_YT_DY', 0)]; }
			else if (target.type === 'legend') { s0 = [sig('CC_LEG_DX', 0), sig('CC_LEG_DY', 0)]; }
			else if (target.type === 'gtitle') { s0 = [sig('CC_TI_DX', 0), sig('CC_TI_DY', 0)]; }
			else { s0 = [target.datum.x, target.datum.y]; }
			drag = {type: target.type, orient: target.orient, datum: target.datum,
				sx: event.clientX, sy: event.clientY, s0: s0, moved: false};
			event.preventDefault();
			window.addEventListener('mousemove', onMove);
			window.addEventListener('mouseup', onUp);
		});
		canvas.addEventListener('dblclick', function(event) {
			var target = ccHitTest(event.clientX, event.clientY);
			if (!target) { return; }
			if (target.type === 'note') { openNoteDialog(event, target.datum); }
			else if (target.type === 'title') { openAxisDialog(event, target.orient === 'left' ? 'y' : 'x'); }
			else if (target.type === 'gtitle') { openTitleDialog(event); }
			else { openLegendDialog(event); }
		});
	}

	// empty space double-click creates a label; Vega's own picking rules out
	// data marks (their dblclick opens the data table instead)
	view.addEventListener('dblclick', function(event, item) {
		if ((!item || !item.datum) && !ccHitTest(event.clientX, event.clientY)) {
			openNoteDialog(event, null);
		}
	});

	_ccDirectEdit[element] = {
		openAxisDialog: openAxisDialog,
		openLegendDialog: openLegendDialog,
		openNoteDialog: openNoteDialog,
		openTitleDialog: openTitleDialog,
		syncNotes: syncNotes,
		applyCatColors: function(map) { ccReinit(element, {CC_Cat_Colors: map || {}}); },
		applyContRange: function(pair) {
			var state = {CC_Cont_Range: pair || []};
			if (pair && pair.length === 2) { state.Reverse_Color = false; }
			ccReinit(element, state);
		},
		closePop: closePop
	};
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
// Processes column pairs in chunks (one frame per ~5% of pairs) to avoid UI freeze.
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

var SUMMARY_COLS = [
	{ key: 'col', label: 'Column' }, { key: 'type', label: 'Type' },
	{ key: 'n', label: 'n' }, { key: 'missing', label: 'Miss' },
	{ key: 'distinct', label: 'Uniq' }, { key: 'min', label: 'Min' },
	{ key: 'median', label: 'Median' }, { key: 'mean', label: 'Mean' },
	{ key: 'sd', label: 'SD' }, { key: 'max', label: 'Max' },
	{ key: 'top', label: 'Top Value' }
];

function summaryTableHtml(rows, sort) {
	var html = '<table class="cc_summary"><thead><tr>' + SUMMARY_COLS.map(function(c) {
		var arrow = sort && sort.key === c.key ? (sort.dir > 0 ? ' ▲' : ' ▼') : '';
		return '<th data-key="' + c.key + '" title="sort by ' + c.label + '">' + c.label + arrow + '</th>';
	}).join('') + '</tr></thead><tbody>';
	rows.forEach(function(r) {
		html += '<tr><td>' + escapeHtml(r.col) + '</td><td>' + r.type + '</td><td>' + r.n + '</td><td>' + r.missing + '</td><td>' + r.distinct + '</td>';
		html += '<td>' + fmtStat(r.min) + '</td><td>' + fmtStat(r.median) + '</td><td>' + fmtStat(r.mean) + '</td><td>' + fmtStat(r.sd) + '</td><td>' + fmtStat(r.max) + '</td>';
		html += '<td>' + (r.top != null ? escapeHtml(r.top) : '') + '</td></tr>';
	});
	html += '</tbody></table>';
	return html;
}

// ---- Overview: one distribution card per column ---------------------------
// Numeric columns get a mini histogram with range/mean/missing; categorical
// columns get top-category bars. Clicking a card graphs that column's
// distribution. Shown automatically on first visit (no saved settings).
var _overviewCache = new WeakMap();
var OVERVIEW_BINS = 24;
var OVERVIEW_TOP_CATS = 8;

function overviewColumn(data, col, isNum) {
	var n = 0, missing = 0, mean = 0, min = Infinity, max = -Infinity;
	if (isNum) {
		var nums = new Float64Array(data.length);
		for (var i = 0; i < data.length; ++i) {
			var v = data[i][col];
			if (v == null || v === '' || (typeof v !== 'number' && NA_VALUES.has(v))) { missing++; continue; }
			var x = typeof v === 'number' ? v : Number(v);
			if (x !== x) { missing++; continue; }
			nums[n] = x;
			n++;
			mean += (x - mean) / n;
			if (x < min) { min = x; }
			if (x > max) { max = x; }
		}
		var bins = new Array(OVERVIEW_BINS).fill(0);
		if (n > 0 && max > min) {
			var scale = OVERVIEW_BINS / (max - min);
			for (var b = 0; b < n; ++b) {
				var idx = Math.min(OVERVIEW_BINS - 1, Math.floor((nums[b] - min) * scale));
				bins[idx]++;
			}
		} else if (n > 0) {
			bins[0] = n;
		}
		return {col: col, type: 'num', n: n, missing: missing, min: min, max: max, mean: mean, bins: bins};
	}
	var counts = Object.create(null);
	var trackedKeys = 0, sawUntracked = false;
	for (var j = 0; j < data.length; ++j) {
		var c = data[j][col];
		if (c == null || c === '' || (typeof c !== 'number' && NA_VALUES.has(c))) { missing++; continue; }
		n++;
		if (counts[c] !== undefined) {
			counts[c]++;
		} else if (trackedKeys < SUMMARY_MAX_TRACKED) {
			counts[c] = 1;
			trackedKeys++;
		} else {
			sawUntracked = true;
		}
	}
	var entries = [];
	for (var k in counts) { entries.push([k, counts[k]]); }
	entries.sort(function(a, b2) { return b2[1] - a[1]; });
	return {col: col, type: 'cat', n: n, missing: missing,
		distinct: sawUntracked ? '≥' + SUMMARY_MAX_TRACKED : trackedKeys,
		top: entries.slice(0, OVERVIEW_TOP_CATS),
		otherCount: entries.slice(OVERVIEW_TOP_CATS).reduce(function(s, e) { return s + e[1]; }, 0)};
}

function overviewCardHtml(r, total) {
	var missPct = total ? Math.round(100 * r.missing / total) : 0;
	var head = '<div class="cc_ovname" title="' + escapeHtml(r.col) + '">' + escapeHtml(r.col) +
		'<span class="cc_ovtype">' + (r.type === 'num' ? 'numeric' : 'categorical') + '</span></div>';
	var body = '';
	var meta = '';
	if (r.type === 'num') {
		var peak = Math.max.apply(null, r.bins) || 1;
		body = '<div class="cc_ovhist">' + r.bins.map(function(bcount) {
			return '<div class="cc_ovbin" style="height:' + Math.max(bcount > 0 ? 4 : 0, Math.round(100 * bcount / peak)) + '%"></div>';
		}).join('') + '</div>';
		meta = fmtStat(r.min) + ' – ' + fmtStat(r.max) + ' · mean ' + fmtStat(r.mean);
	} else {
		var catPeak = (r.top[0] && r.top[0][1]) || 1;
		body = '<div class="cc_ovcats">' + r.top.map(function(e) {
			return '<div class="cc_ovcatrow"><span class="cc_ovcatlabel" title="' + escapeHtml(e[0]) + '">' + escapeHtml(e[0]) + '</span>' +
				'<span class="cc_ovcatbar"><span style="width:' + Math.max(2, Math.round(100 * e[1] / catPeak)) + '%"></span></span>' +
				'<span class="cc_ovcatn">' + e[1].toLocaleString() + '</span></div>';
		}).join('') +
		(r.otherCount > 0 ? '<div class="cc_ovcatrow cc_ovother">+ ' + r.otherCount.toLocaleString() + ' rows in other values</div>' : '') +
		'</div>';
		meta = r.distinct + ' distinct';
	}
	meta += ' · n=' + r.n.toLocaleString() + (r.missing ? ' · <span class="cc_ovmiss">' + missPct + '% missing</span>' : '');
	return '<div class="cc_ovcard" data-col="' + escapeHtml(r.col) + '">' + head + body +
		'<div class="cc_ovmeta">' + meta + '</div></div>';
}

// ---- 3D unit view (SandDance-style, WebGL) ---------------------------------
// A toggleable overlay inside the chart container, driven by the widget's own
// full dataset; the renderer (crossex3d, inlined into the bundle) has no deps.
var _3d = {};
var _3D_MAX_POINTS = 100000;
var _3D_HIDDEN_FIELDS = {X_Value:1,Col_Value:1,Y_Value:1,Row_Value:1,Count:1,None:1,O_Value:1,Color_Value:1,Cstr:1,Xstr:1,Ystr:1,Size_Value:1,jitter:1,xfocus:1,yfocus:1,Stroke_Value:1,ecdf_rank:1,ecdf_n:1,ecdf_p:1,SortX_Value:1,Term:1};

function threeDColumnLists(mycolumns) {
	var nums = [], cats = [], all = [];
	(mycolumns || []).forEach(function(c) {
		if (!c.feature || c.feature === 'None') { return; }
		all.push(c.feature);
		(c.type === 'num' ? nums : cats).push(c.feature);
	});
	return { nums: nums, cats: cats, all: all };
}

function show3dTip(row, cx, cy) {
	var tip = document.getElementById('cc_3d_tip');
	if (!tip) { tip = document.createElement('div'); tip.id = 'cc_3d_tip'; tip.className = 'cc_3d_tip'; document.body.appendChild(tip); }
	if (!row) { tip.style.display = 'none'; return; }
	var keys = Object.keys(row).filter(function(k) { return !_3D_HIDDEN_FIELDS[k]; }).slice(0, 10);
	tip.innerHTML = keys.map(function(k) { return '<b>' + escapeHtml(k) + '</b>: ' + escapeHtml(String(row[k])); }).join('<br>');
	tip.style.display = 'block';
	tip.style.left = Math.min(window.innerWidth - 240, cx + 12) + 'px';
	tip.style.top = (cy + 12) + 'px';
	clearTimeout(tip._t);
	tip._t = setTimeout(function() { tip.style.display = 'none'; }, 4000);
}

function render3dLegend(element) {
	var el = document.getElementById('cc_3d_legend' + element);
	var inst = _3d[element] && _3d[element].inst;
	if (!el) { return; }
	if (!inst || !inst.legend) { el.innerHTML = ''; return; }
	el.innerHTML = inst.legend.slice(0, 12).map(function(e) {
		return '<span class="cc_3d_key"><span class="cc_3d_swatch" style="background:' + e.color + '"></span>' + escapeHtml(String(e.label)) + '</span>';
	}).join('');
}

function build3dControls(element, lists) {
	var wrap = document.getElementById('cc_3d_controls' + element);
	var state = _3d[element];
	var cfg = state.cfg;
	function optHtml(list, value) {
		return list.map(function(o) { return '<option' + (o === value ? ' selected' : '') + '>' + escapeHtml(o) + '</option>'; }).join('');
	}
	wrap.innerHTML =
		'<label>X <select data-cc3d="x">' + optHtml(lists.all, cfg.x) + '</select></label>' +
		'<label>Y <select data-cc3d="y">' + optHtml(lists.all, cfg.y) + '</select></label>' +
		'<label>Z <select data-cc3d="z">' + optHtml(lists.all, cfg.z) + '</select></label>' +
		'<label>Color <select data-cc3d="color">' + optHtml(['None'].concat(lists.all), cfg.color) + '</select></label>' +
		'<span class="cc_3d_layouts">' +
		'<button data-cc3dlayout="scatter" class="cc_3d_btn' + (cfg.layout === 'scatter' ? ' active' : '') + '">Scatter</button>' +
		'<button data-cc3dlayout="stacks" class="cc_3d_btn' + (cfg.layout === 'stacks' ? ' active' : '') + '">Stacks</button>' +
		'</span>' +
		'<label>Size <input type="range" data-cc3dsize min="60" max="700" step="10" value="' + (cfg.pointScale || 220) + '" title="point size"></label>' +
		'<button data-cc3dreset class="cc_3d_btn">Reset</button>';
	wrap.querySelectorAll('select[data-cc3d]').forEach(function(s) {
		s.onchange = function() {
			cfg[s.getAttribute('data-cc3d')] = s.value;
			if (state.inst) { state.inst.applyConfig(cfg, false); render3dLegend(element); }
		};
	});
	wrap.querySelectorAll('button[data-cc3dlayout]').forEach(function(b) {
		b.onclick = function() {
			cfg.layout = b.getAttribute('data-cc3dlayout');
			wrap.querySelectorAll('button[data-cc3dlayout]').forEach(function(x) { x.classList.remove('active'); });
			b.classList.add('active');
			if (state.inst) { state.inst.applyConfig(cfg, false); }
		};
	});
	wrap.querySelector('input[data-cc3dsize]').oninput = function() {
		cfg.pointScale = +this.value;
		if (state.inst && state.inst.setPointScale) { state.inst.setPointScale(cfg.pointScale); }
	};
	wrap.querySelector('button[data-cc3dreset]').onclick = function() { if (state.inst) { state.inst.resetCamera(); } };
}

function open3dView(element, data, mycolumns) {
	var overlay = document.getElementById('cc_3d' + element);
	var note = document.getElementById('cc_3d_note' + element);
	if (!overlay) { return; }
	var lists = threeDColumnLists(mycolumns);
	if (typeof crossex3d === 'undefined' || !lists.all.length) {
		overlay.style.display = 'flex';
		note.textContent = (typeof crossex3d === 'undefined') ? '3D renderer is not available.' : 'No columns available to plot.';
		return;
	}
	var state = _3d[element] || (_3d[element] = {});
	var rows = data.length > _3D_MAX_POINTS ? sampleRows(data, _3D_MAX_POINTS) : data;
	if (!state.cfg || state.data !== data) {
		state.cfg = {
			x: lists.nums[0] || lists.all[0],
			y: lists.nums[1] || lists.all[1] || lists.all[0],
			z: lists.nums[2] || lists.nums[0] || lists.all[0],
			color: lists.cats[0] || 'None',
			layout: 'scatter'
		};
		state.data = data;
		state.rows = rows;
		state.rebuild = true;
	}
	note.textContent = state.rows.length.toLocaleString() + ' rows' +
		(state.rows.length < data.length ? ' (uniform sample of ' + data.length.toLocaleString() + ')' : '') +
		' — drag to orbit · scroll to zoom · click a point · double-click to reset';
	build3dControls(element, lists);
	overlay.style.display = 'flex';
	if (!state.inst || state.rebuild) {
		if (state.inst) { try { state.inst.dispose(); } catch (e) {} }
		var stage = document.getElementById('cc_3d_stage' + element);
		stage.innerHTML = '';
		// defer one frame so the just-shown overlay has real layout dimensions
		requestAnimationFrame(function() {
			state.inst = crossex3d.create(stage, show3dTip);
			state.rebuild = false;
			if (state.inst) {
				state.inst.setData(state.rows, state.cfg);
				if (state.cfg.pointScale && state.inst.setPointScale) { state.inst.setPointScale(state.cfg.pointScale); }
				render3dLegend(element);
			}
		});
	} else {
		render3dLegend(element);
	}
}

// ---- Transforms: formula -> new column -------------------------------------
// A small expression language evaluated once per row. Identifiers resolve only
// to column names, whitelisted functions, or constants, and "." is not a token,
// so a compiled formula cannot reach properties or globals. Columns are
// referenced bare (identifier-like names) or as [name with spaces].
var _transforms = {};   // element -> [{name, formula}], session-only
var _reopenTab = {};    // element -> tab button to re-select after a re-render

var TR_RESERVED = (function() {
	var r = { Sum: 1, Count: 1, None: 1 };
	for (var k in _3D_HIDDEN_FIELDS) { r[k] = 1; }
	return r;
})();

var TR_MATH_FUNCS = {
	abs: 'Math.abs', ceil: 'Math.ceil', floor: 'Math.floor', round: 'Math.round',
	sqrt: 'Math.sqrt', exp: 'Math.exp', log: 'Math.log', log2: 'Math.log2',
	log10: 'Math.log10', pow: 'Math.pow', min: 'Math.min', max: 'Math.max',
	sign: 'Math.sign'
};
var TR_ROW_FUNCS = { 'if': 'IF', num: 'NUM', str: 'STR', upper: 'UPPER', lower: 'LOWER', trim: 'TRIM', len: 'LEN' };
var TR_AGG_FUNCS = { mean: 1, median: 1, sd: 1, sum: 1, count: 1, colmin: 1, colmax: 1 };
var TR_CONSTS = { PI: 'Math.PI', E: 'Math.E', 'true': 'true', 'false': 'false', 'null': 'null', NaN: 'NaN' };

var TR_HELPERS = {
	IF: function(c, a, b) { return c ? a : b; },
	NUM: function(v) { return v == null || v === '' ? NaN : +v; },
	STR: function(v) { return v == null ? null : String(v); },
	UPPER: function(v) { return v == null ? null : String(v).toUpperCase(); },
	LOWER: function(v) { return v == null ? null : String(v).toLowerCase(); },
	TRIM: function(v) { return v == null ? null : String(v).trim(); },
	LEN: function(v) { return v == null ? null : String(v).length; }
};

// longer operators before their prefixes (** before *, === before ==)
var TR_TOKEN_RE = /\s+|"([^"]*)"|'([^']*)'|\[([^\]]+)\]|(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|(\*\*|<=|>=|===|!==|==|!=|&&|\|\||[-+*\/%(),?:<>!])/g;

function trTokenize(src) {
	var tokens = [];
	var pos = 0, m;
	TR_TOKEN_RE.lastIndex = 0;
	while ((m = TR_TOKEN_RE.exec(src)) !== null) {
		if (m.index !== pos) { break; }
		pos = TR_TOKEN_RE.lastIndex;
		if (m[1] !== undefined || m[2] !== undefined) {
			tokens.push({ t: 'str', v: m[1] !== undefined ? m[1] : m[2] });
		} else if (m[3] !== undefined) {
			tokens.push({ t: 'col', v: m[3].trim() });
		} else if (m[4] !== undefined) {
			tokens.push({ t: 'num', v: m[4] });
		} else if (m[5] !== undefined) {
			tokens.push({ t: 'ident', v: m[5] });
		} else if (m[6] !== undefined) {
			tokens.push({ t: 'op', v: m[6] });
		}
	}
	if (pos !== src.length) {
		throw new Error('unexpected character "' + src[pos] + '" in formula');
	}
	return tokens;
}

// Whole-column statistic, numeric-coerced, NA-skipped; emitted as a literal
function trAggregate(fnName, col, data, cache) {
	var key = fnName + '\u0000' + col;
	if (cache[key] !== undefined) { return cache[key]; }
	var vals = [];
	for (var i = 0; i < data.length; i++) {
		var v = data[i][col];
		if (v == null || v === '' || (typeof v !== 'number' && NA_VALUES.has(v))) { continue; }
		var x = typeof v === 'number' ? v : Number(v);
		if (x === x) { vals.push(x); }
	}
	var n = vals.length, out;
	if (fnName === 'count') {
		out = n;
	} else if (!n) {
		out = NaN;
	} else if (fnName === 'sum' || fnName === 'mean' || fnName === 'sd') {
		var s = 0;
		for (var j = 0; j < n; j++) { s += vals[j]; }
		if (fnName === 'sum') { out = s; }
		else if (fnName === 'mean') { out = s / n; }
		else {
			var mu = s / n, ss = 0;
			for (var q = 0; q < n; q++) { var d = vals[q] - mu; ss += d * d; }
			out = n > 1 ? Math.sqrt(ss / (n - 1)) : 0;
		}
	} else if (fnName === 'median') {
		vals.sort(function(a, b) { return a - b; });
		out = stats.quantile(vals, 0.5);
	} else {
		out = vals[0];
		for (var w = 1; w < n; w++) {
			if (fnName === 'colmin' ? vals[w] < out : vals[w] > out) { out = vals[w]; }
		}
	}
	cache[key] = '(' + String(out) + ')';
	return cache[key];
}

// cols maps column name -> 'num' | 'cat'; data is only read for aggregates
function trCompile(formula, cols, data) {
	var tokens = trTokenize(formula);
	if (!tokens.length) { throw new Error('the formula is empty'); }
	var aggCache = {};
	function colExpr(name) {
		var acc = 'row[' + JSON.stringify(name) + ']';
		return cols[name] === 'num' ? 'FN.NUM(' + acc + ')' : acc;
	}
	var parts = [];
	for (var i = 0; i < tokens.length; i++) {
		var tk = tokens[i];
		if (tk.t === 'str') {
			parts.push(JSON.stringify(tk.v));
		} else if (tk.t === 'num') {
			parts.push(tk.v);
		} else if (tk.t === 'op') {
			parts.push(tk.v);
		} else if (tk.t === 'col') {
			if (!(tk.v in cols)) { throw new Error('unknown column [' + tk.v + ']'); }
			parts.push(colExpr(tk.v));
		} else {
			var isCall = tokens[i + 1] && tokens[i + 1].t === 'op' && tokens[i + 1].v === '(';
			if (isCall && TR_AGG_FUNCS[tk.v] === 1) {
				var colTok = tokens[i + 2], closeTok = tokens[i + 3];
				var cname = colTok && (colTok.t === 'col' || colTok.t === 'ident') ? colTok.v : null;
				if (cname == null || !(cname in cols) || !closeTok || closeTok.v !== ')') {
					throw new Error(tk.v + '(…) takes a single column, e.g. ' + tk.v + '(colname)');
				}
				parts.push(trAggregate(tk.v, cname, data, aggCache));
				i += 3;
			} else if (isCall && TR_MATH_FUNCS[tk.v]) {
				parts.push(TR_MATH_FUNCS[tk.v]);
			} else if (isCall && TR_ROW_FUNCS[tk.v]) {
				parts.push('FN.' + TR_ROW_FUNCS[tk.v]);
			} else if (tk.v in cols) {
				parts.push(colExpr(tk.v));
			} else if (TR_CONSTS[tk.v]) {
				parts.push(TR_CONSTS[tk.v]);
			} else {
				throw new Error('unknown name "' + tk.v + '" — not a column or function');
			}
		}
	}
	try {
		return new Function('row', 'FN', '"use strict"; return (' + parts.join(' ') + ');');
	} catch (e) {
		throw new Error('could not parse the formula (' + e.message + ')');
	}
}

// Chunked so a formula over millions of rows never freezes the tab.
// NaN/Infinity/undefined all become null, which the chart treats as missing.
function trEvaluate(fn, data, name, onProgress, done) {
	var CHUNK = 100000;
	var i = 0, errors = 0, nonnull = 0;
	function run() {
		var end = Math.min(i + CHUNK, data.length);
		for (; i < end; i++) {
			var out;
			try { out = fn(data[i], TR_HELPERS); } catch (e) { errors++; out = null; }
			if (typeof out === 'number') {
				if (!isFinite(out)) { out = null; }
			} else if (out === undefined || out === '') {
				out = null;
			}
			if (out !== null) { nonnull++; }
			data[i][name] = out;
		}
		if (i < data.length) {
			if (onProgress) { onProgress(Math.round(100 * i / data.length)); }
			requestAnimationFrame(run);
		} else {
			done({ errors: errors, nonnull: nonnull });
		}
	}
	run();
}

function trColRef(name) {
	var bare = /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) &&
		!TR_MATH_FUNCS[name] && !TR_ROW_FUNCS[name] && TR_AGG_FUNCS[name] !== 1 && !TR_CONSTS[name];
	return bare ? name : '[' + name + ']';
}

// Ready-to-edit example formulas built from the loaded data's own columns
function trTemplates(cols) {
	var nums = [], cats = [];
	Object.keys(cols).forEach(function(c) { (cols[c] === 'num' ? nums : cats).push(c); });
	var t = [];
	var a = nums[0], b = nums[1];
	if (a) {
		var ra = trColRef(a);
		t.push({ label: 'log10 of ' + a, name: 'log_' + a, formula: 'log10(' + ra + ')' });
		t.push({ label: 'z-score of ' + a, name: 'z_' + a, formula: '(' + ra + ' - mean(' + ra + ')) / sd(' + ra + ')' });
		t.push({ label: 'percent of total ' + a, name: 'pct_' + a, formula: '100 * ' + ra + ' / sum(' + ra + ')' });
		t.push({ label: 'high/low split of ' + a, name: a + '_level', formula: ra + ' > median(' + ra + ') ? "high" : "low"' });
	}
	if (a && b) {
		t.push({ label: b + ' / ' + a, name: 'ratio', formula: trColRef(b) + ' / ' + ra });
		t.push({ label: b + ' - ' + a, name: 'diff', formula: trColRef(b) + ' - ' + ra });
	}
	if (cats.length >= 2) {
		var rc0 = trColRef(cats[0]), rc1 = trColRef(cats[1]);
		t.push({ label: cats[0] + ' + ' + cats[1] + ' combined', name: 'combo',
			formula: 'if(' + rc0 + ' == null || ' + rc1 + ' == null, null, str(' + rc0 + ') + " · " + str(' + rc1 + '))' });
	}
	return t;
}

function trFail(msgEl, text) {
	msgEl.className = 'cc_tr_msg';
	msgEl.textContent = text;
}

function cloneRowsForAnalysis(data, onProgress, done) {
	var columns = (data.columns || (data[0] ? Object.keys(data[0]) : [])).filter(function(column) {
		return !_3D_HIDDEN_FIELDS[column];
	}).slice();
	var output = new Array(data.length);
	var i = 0, CHUNK = 100000;
	(function run() {
		var end = Math.min(i + CHUNK, data.length);
		for (; i < end; i++) {
			var row = {};
			columns.forEach(function(column) {
				Object.defineProperty(row, column, { value: data[i][column], writable: true, enumerable: true, configurable: true });
			});
			output[i] = row;
		}
		if (i < data.length) {
			if (onProgress) { onProgress(Math.round(100 * i / data.length)); }
			requestAnimationFrame(run);
		} else { output.columns = columns; done(output); }
	})();
}

// Register a computed column on a new immutable dataset version.
function finishTransform(element, data, name, formula, redefined) {
	var opts = cloneAnalysisOptions(_crossexOpts[element].options);
	if (data.columns && data.columns.indexOf(name) < 0) { data.columns.push(name); }
	opts.forEach(function(sig) {
		if (sig && sig.name && sig.bind && sig.bind.options && sig.bind.options.indexOf(name) < 0) {
			sig.bind.options.push(name);
		}
	});
	var list = cloneTransformDefs(_transforms[element]);
	if (redefined) {
		list.forEach(function(t) { if (t.name === name) { t.formula = formula; } });
	} else {
		list.push({ name: name, formula: formula });
	}
	replaceDataset(element, data, opts, (redefined ? 'updated formula column ' : 'created formula column ') + name,
		'Transforms_tablinks', true, { type: redefined ? 'formula-update' : 'formula-add', name: name, formula: formula }, list);
}

function removeTransform(element, name) {
	var data = _fullData[element];
	var opts = cloneAnalysisOptions(_crossexOpts[element].options);
	var nextTransforms = (_transforms[element] || []).filter(function(t) { return t.name !== name; });
	if (!data) { return; }
	cloneRowsForAnalysis(data, null, function(output) {
		output.forEach(function(row) { delete row[name]; });
		var ci = output.columns.indexOf(name);
		if (ci >= 0) { output.columns.splice(ci, 1); }
		opts.forEach(function(sig) {
			if (sig && sig.name && sig.bind && sig.bind.options) {
				var oi = sig.bind.options.indexOf(name);
				if (oi >= 0) { sig.bind.options.splice(oi, 1); }
			}
		});
		// a saved selection pointing at the removed column would draw an empty chart
		var store = loadSignalsFromCookie('vegaSignals_' + element);
		if (store) {
			Object.keys(store).forEach(function(k) { if (store[k] === name) { delete store[k]; } });
			saveSignalState('vegaSignals_' + element, store);
		}
		replaceDataset(element, output, opts, 'removed formula column ' + name, 'Transforms_tablinks', true,
			{ type: 'formula-remove', name: name }, nextTransforms);
	});
}

function renderTransformList(element) {
	var wrap = document.getElementById('cc_tr_list' + element);
	if (!wrap) { return; }
	var list = _transforms[element] || [];
	wrap.innerHTML = list.map(function(t) {
		return '<div class="cc_tr_item" data-tr-name="' + escapeHtml(t.name) + '">' +
			'<span class="cc_tr_x" data-tr-remove="' + escapeHtml(t.name) + '" title="remove this column">✕</span>' +
			'<b>' + escapeHtml(t.name) + '</b> = ' + escapeHtml(t.formula) + '</div>';
	}).join('');
	wrap.querySelectorAll('[data-tr-remove]').forEach(function(x) {
		x.onclick = function(e) {
			e.stopPropagation();
			removeTransform(element, x.getAttribute('data-tr-remove'));
		};
	});
	wrap.querySelectorAll('[data-tr-name]').forEach(function(item) {
		item.onclick = function() {
			var t = (_transforms[element] || []).find(function(x2) { return x2.name === item.getAttribute('data-tr-name'); });
			if (!t) { return; }
			document.getElementById('cc_tr_name' + element).value = t.name;
			document.getElementById('cc_tr_formula' + element).value = t.formula;
		};
	});
}

function wireTransformTab(element, mycolumns) {
	var nameIn = document.getElementById('cc_tr_name' + element);
	if (!nameIn) { return; }
	var formulaIn = document.getElementById('cc_tr_formula' + element);
	var insertSel = document.getElementById('cc_tr_insert' + element);
	var templateSel = document.getElementById('cc_tr_template' + element);
	var applyBtn = document.getElementById('cc_tr_apply' + element);
	var msg = document.getElementById('cc_tr_msg' + element);
	var cols = {};
	(mycolumns || []).forEach(function(c) {
		if (c.feature && c.feature !== 'None') { cols[c.feature] = c.type; }
	});
	insertSel.innerHTML = '<option value="">insert column…</option>' +
		Object.keys(cols).map(function(c) {
			return '<option value="' + escapeHtml(c) + '">' + escapeHtml(c) + '</option>';
		}).join('');
	insertSel.onchange = function() {
		if (!this.value) { return; }
		var ref = trColRef(this.value);
		var s = formulaIn.selectionStart == null ? formulaIn.value.length : formulaIn.selectionStart;
		var e = formulaIn.selectionEnd == null ? s : formulaIn.selectionEnd;
		formulaIn.value = formulaIn.value.slice(0, s) + ref + formulaIn.value.slice(e);
		formulaIn.focus();
		formulaIn.selectionStart = formulaIn.selectionEnd = s + ref.length;
		this.value = '';
	};
	var templates = trTemplates(cols);
	templateSel.innerHTML = '<option value="">example formulas…</option>' +
		templates.map(function(t, i) {
			return '<option value="' + i + '">' + escapeHtml(t.label) + '</option>';
		}).join('');
	templateSel.onchange = function() {
		var t = templates[this.value];
		if (t) {
			nameIn.value = t.name;
			formulaIn.value = t.formula;
		}
		this.value = '';
	};
	applyBtn.onclick = function() {
		var name = (nameIn.value || '').trim();
		var formula = (formulaIn.value || '').trim();
		msg.textContent = '';
		var data = _fullData[element];
		if (!data || !data.length) { return trFail(msg, 'no data loaded'); }
		if (!name) { return trFail(msg, 'give the new column a name'); }
		if (TR_RESERVED[name]) { return trFail(msg, '"' + name + '" is a reserved name'); }
		var redefined = (_transforms[element] || []).some(function(t) { return t.name === name; });
		if (cols[name] !== undefined && !redefined) {
			return trFail(msg, '"' + name + '" already exists — pick a new name');
		}
		if (!formula) { return trFail(msg, 'enter a formula'); }
		var fn;
		try {
			fn = trCompile(formula, cols, data);
		} catch (e) {
			return trFail(msg, e.message);
		}
		applyBtn.disabled = true;
		applyBtn.textContent = 'Copying…';
		cloneRowsForAnalysis(data, function(pct) {
			applyBtn.textContent = 'Copying… ' + pct + '%';
		}, function(workingData) {
			applyBtn.textContent = 'Computing…';
			trEvaluate(fn, workingData, name, function(pct) {
				applyBtn.textContent = 'Computing… ' + pct + '%';
			}, function(res) {
			if (!res.nonnull) {
				applyBtn.disabled = false;
				applyBtn.textContent = 'Add Column';
				return trFail(msg, 'every row came out missing — check the formula' +
					(res.errors ? ' (' + res.errors + ' rows errored)' : ''));
			}
			finishTransform(element, workingData, name, formula, redefined);
			});
		});
	};
	renderTransformList(element);
	wireDataLab(element, mycolumns);
}

// ---- Data Lab: reproducible table operations and portable projects ---------
var _labSecondary = {};
var LAB_MAX_OUTPUT_ROWS = 5000000;
var LAB_MAX_PROJECT_CELLS = 5000000;

function labMessage(element, text, ok) {
	var node = document.getElementById('cc_lab_msg' + element);
	if (!node) { return; }
	node.className = 'cc_tr_msg' + (ok ? ' cc_ok' : '');
	node.textContent = text;
}

function labColumns(element) {
	var data = _fullData[element] || [];
	var bound = dtColumns(element);
	if (bound.length) { return bound; }
	return (data.columns || (data[0] ? Object.keys(data[0]) : [])).filter(function(column) {
		return !PIVOT_HIDDEN_ATTRS || PIVOT_HIDDEN_ATTRS.indexOf(column) < 0;
	}).slice();
}

function fillLabSelect(select, columns, includeNone, noneLabel) {
	if (!select) { return; }
	select.innerHTML = '';
	if (includeNone) {
		var none = document.createElement('option');
		none.value = ''; none.textContent = noneLabel || 'None'; select.appendChild(none);
	}
	columns.forEach(function(column) {
		var option = document.createElement('option');
		option.value = column; option.textContent = column; select.appendChild(option);
	});
}

function selectedLabValues(select) {
	return Array.prototype.slice.call(select.selectedOptions || []).map(function(option) { return option.value; });
}

function optionsForColumns(element, columns, presets) {
	var opts = cloneAnalysisOptions((_crossexOpts[element] && _crossexOpts[element].options) || []);
	presets = presets || {};
	opts.forEach(function(option) {
		if (!option || !option.name) { return; }
		if (option.bind && option.bind.options) { option.bind.options = columns.slice(); }
		if (presets[option.name] !== undefined) { option.value = presets[option.name]; }
		else if (option.value && ['None', 'Count', 'Sum'].indexOf(option.value) < 0 && columns.indexOf(option.value) < 0) {
			option.value = 'None';
		}
	});
	return opts;
}

function analysisProjectName() {
	return 'crossex-project-' + new Date().toISOString().slice(0, 10);
}

function exportAnalysisProject(element) {
	var data = _fullData[element];
	var columns = labColumns(element);
	if (!data || !data.length) { return labMessage(element, 'No data to export.'); }
	if (data.length * Math.max(1, columns.length) > LAB_MAX_PROJECT_CELLS) {
		return labMessage(element, 'Project export is limited to 5 million cells to protect browser memory. Export CSV for this dataset or reduce it first.');
	}
	var project;
	try {
		project = CrossexData.createProject({
			name: analysisProjectName(), data: data, columns: columns,
			options: (_crossexOpts[element] && _crossexOpts[element].options) || [],
			signals: loadSignalsFromCookie('vegaSignals_' + element) || {},
			transforms: _transforms[element] || [], operations: _analysisOperations[element] || []
		});
	} catch (error) { return labMessage(element, 'Could not create project: ' + error.message); }
	var blob = new Blob([JSON.stringify(project)], { type: 'application/json' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob); link.download = project.name + '.crossex.json';
	document.body.appendChild(link); link.click(); link.remove();
	setTimeout(function() { URL.revokeObjectURL(link.href); }, 1000);
	labMessage(element, 'Project exported with data, settings, transforms, and provenance.', true);
}

function importAnalysisProject(element, file) {
	if (!file) { return; }
	if (file.size > 512 * 1024 * 1024) { return labMessage(element, 'Project file exceeds the 512 MB safety limit.'); }
	var reader = new FileReader();
	reader.onload = function(event) {
		var project;
		try { project = CrossexData.parseProject(event.target.result); }
		catch (error) { return labMessage(element, 'Could not import project: ' + error.message); }
		if (project.signals) { saveSignalState('vegaSignals_' + element, project.signals); }
		var state = {
			data: project.data,
			options: project.options.length ? project.options : optionsForColumns(element, project.columns),
			transforms: project.transforms,
			label: 'Imported ' + (project.name || 'project'), operation: { type: 'project-import' },
			createdAt: new Date().toISOString()
		};
		_dataHistory[element] = { entries: [state], index: 0 };
		_analysisOperations[element] = project.operations.concat([{
			type: 'project-import', label: state.label, rows: project.data.length, createdAt: state.createdAt
		}]);
		applyAnalysisState(element, state, 'Transforms_tablinks');
		labMessage(element, 'Project imported.', true);
	};
	reader.onerror = function() { labMessage(element, 'Could not read the project file.'); };
	reader.readAsText(file);
}

function wireDataLab(element, mycolumns) {
	var columns = labColumns(element);
	var sortCol = document.getElementById('cc_lab_sort_col' + element);
	if (!sortCol) { return; }
	fillLabSelect(sortCol, columns);
	fillLabSelect(document.getElementById('cc_lab_dedupe_cols' + element), columns);
	fillLabSelect(document.getElementById('cc_lab_group_col' + element), columns, true, 'all rows (no groups)');
	fillLabSelect(document.getElementById('cc_lab_agg_col' + element), columns, true, 'choose value column');
	fillLabSelect(document.getElementById('cc_lab_join_left' + element), columns);

	var timeline = ensureAnalysisHistory(element, _fullData[element], _crossexOpts[element].options);
	renderAnalysisHistory(element);
	document.getElementById('cc_lab_undo' + element).onclick = function() { analysisUndo(element); };
	document.getElementById('cc_lab_redo' + element).onclick = function() { analysisRedo(element); };
	document.getElementById('cc_lab_export' + element).onclick = function() { exportAnalysisProject(element); };
	var importButton = document.getElementById('cc_lab_import' + element);
	var importFile = document.getElementById('cc_lab_import_file' + element);
	importButton.onclick = function() { importFile.click(); };
	importFile.onchange = function() { if (this.files.length) { importAnalysisProject(element, this.files[0]); this.value = ''; } };

	document.getElementById('cc_lab_sort_apply' + element).onclick = function() {
		try {
			var direction = document.getElementById('cc_lab_sort_dir' + element).value;
			var output = CrossexData.sortRows(_fullData[element], sortCol.value, direction);
			output.columns = labColumns(element);
			replaceDataset(element, output, null, 'sorted by ' + sortCol.value + ' (' + direction + ')',
				'Transforms_tablinks', true, { type: 'sort', column: sortCol.value, direction: direction });
		} catch (error) { labMessage(element, error.message); }
	};

	document.getElementById('cc_lab_dedupe_apply' + element).onclick = function() {
		try {
			var keys = selectedLabValues(document.getElementById('cc_lab_dedupe_cols' + element));
			var before = _fullData[element].length;
			var output = CrossexData.deduplicateRows(_fullData[element], keys);
			output.columns = labColumns(element);
			replaceDataset(element, output, null, 'removed ' + (before - output.length).toLocaleString() + ' duplicate rows',
				'Transforms_tablinks', true, { type: 'deduplicate', keys: keys, removed: before - output.length });
		} catch (error) { labMessage(element, error.message); }
	};

	var aggOp = document.getElementById('cc_lab_agg_op' + element);
	var aggCol = document.getElementById('cc_lab_agg_col' + element);
	function syncAggregationUi() { aggCol.disabled = aggOp.value === 'count'; }
	aggOp.onchange = syncAggregationUi; syncAggregationUi();
	document.getElementById('cc_lab_group_apply' + element).onclick = function() {
		var group = document.getElementById('cc_lab_group_col' + element).value;
		var operation = aggOp.value;
		var valueColumn = operation === 'count' ? null : aggCol.value;
		if (operation !== 'count' && !valueColumn) { return labMessage(element, 'Choose a value column to summarize.'); }
		var outputName = (document.getElementById('cc_lab_agg_name' + element).value || '').trim() ||
			(operation === 'count' ? 'count' : operation + '_' + valueColumn);
		try {
			var output = CrossexData.groupRows(_fullData[element], group ? [group] : [],
				[{ operation: operation, column: valueColumn, as: outputName }]);
			var presets = { X_Axis: group || outputName, Y_Axis: group ? outputName : 'None', Color_By: 'None', Facet_Rows_By: 'None', Facet_Cols_By: 'None' };
			replaceDataset(element, output, optionsForColumns(element, output.columns, presets),
				'grouped by ' + (group || 'all rows') + ' and calculated ' + operation,
				'Transforms_tablinks', false, { type: 'group', groupBy: group ? [group] : [], aggregation: operation,
					column: valueColumn, as: outputName });
		} catch (error) { labMessage(element, error.message); }
	};

	var secondLoad = document.getElementById('cc_lab_second_load' + element);
	var secondFile = document.getElementById('cc_lab_second_file' + element);
	var appendButton = document.getElementById('cc_lab_append_apply' + element);
	var joinButton = document.getElementById('cc_lab_join_apply' + element);
	secondLoad.onclick = function() { secondFile.click(); };
	secondFile.onchange = function() {
		if (!this.files.length) { return; }
		var file = this.files[0]; this.value = '';
		if (file.size > 512 * 1024 * 1024) { return labMessage(element, 'Second table exceeds the 512 MB safety limit.'); }
		var reader = new FileReader();
		reader.onload = function(event) {
			try {
				var rows = typeof parseInputData === 'function' ? parseInputData(event.target.result) : CrossexData.parseInput(event.target.result, window.d3);
				_labSecondary[element] = { name: file.name, rows: rows };
				document.getElementById('cc_lab_second_note' + element).textContent =
					file.name + ': ' + rows.length.toLocaleString() + ' rows × ' + rows.columns.length + ' columns';
				fillLabSelect(document.getElementById('cc_lab_join_right' + element), rows.columns);
				appendButton.disabled = false; joinButton.disabled = false;
				var leftJoin = document.getElementById('cc_lab_join_left' + element);
				var common = columns.find(function(column) { return rows.columns.indexOf(column) >= 0; });
				if (common) { leftJoin.value = common; document.getElementById('cc_lab_join_right' + element).value = common; }
				labMessage(element, 'Second table loaded.', true);
			} catch (error) { labMessage(element, 'Could not load second table: ' + error.message); }
		};
		reader.readAsText(file);
	};
	appendButton.onclick = function() {
		var second = _labSecondary[element]; if (!second) { return; }
		if (_fullData[element].length + second.rows.length > LAB_MAX_OUTPUT_ROWS) { return labMessage(element, 'Append would exceed the 5 million-row safety limit.'); }
		try {
			var output = CrossexData.appendRows(_fullData[element], second.rows,
				{ leftColumns: labColumns(element), rightColumns: second.rows.columns });
			replaceDataset(element, output, optionsForColumns(element, output.columns), 'appended ' + second.name,
				'Transforms_tablinks', false, { type: 'append', source: second.name, addedRows: second.rows.length });
		} catch (error) { labMessage(element, error.message); }
	};
	joinButton.onclick = function() {
		var second = _labSecondary[element]; if (!second) { return; }
		var leftKey = document.getElementById('cc_lab_join_left' + element).value;
		var rightKey = document.getElementById('cc_lab_join_right' + element).value;
		var type = document.getElementById('cc_lab_join_type' + element).value;
		try {
			var output = CrossexData.joinRows(_fullData[element], second.rows,
				{ leftKey: leftKey, rightKey: rightKey, type: type, maxRows: LAB_MAX_OUTPUT_ROWS,
					leftColumns: labColumns(element), rightColumns: second.rows.columns });
			replaceDataset(element, output, optionsForColumns(element, output.columns), type + ' joined ' + second.name,
				'Transforms_tablinks', false, { type: 'join', source: second.name, leftKey: leftKey, rightKey: rightKey, joinType: type });
		} catch (error) { labMessage(element, error.message); }
	};
}

var _overviewSort = {};   // element -> chosen card ordering, kept across reopens
var OVERVIEW_SORTS = [
	['orig', 'data order'], ['name', 'by name'],
	['type', 'numeric first'], ['missing', 'most missing']
];

function paintOverview(element, colStats, total) {
	var container = document.getElementById('cc_overview' + element);
	var mode = _overviewSort[element] || 'orig';
	var rows = colStats.slice();
	if (mode === 'name') {
		rows.sort(function(a, b) { return String(a.col).localeCompare(String(b.col)); });
	} else if (mode === 'type') {
		rows.sort(function(a, b) { return a.type === b.type ? 0 : (a.type === 'num' ? -1 : 1); });
	} else if (mode === 'missing') {
		rows.sort(function(a, b) { return b.missing - a.missing; });
	}
	container.innerHTML = '<div class="cc_ovheader"><b>Column Overview</b>' +
		'<select id="cc_ovsort' + element + '" class="cc_ovsort">' +
		OVERVIEW_SORTS.map(function(s) {
			return '<option value="' + s[0] + '"' + (s[0] === mode ? ' selected' : '') + '>' + s[1] + '</option>';
		}).join('') + '</select>' +
		'<span class="cc_ovhint">click a column to graph its distribution</span>' +
		'<span class="cc_ovclose" id="cc_ovclose' + element + '">✕ close</span></div>' +
		'<div class="cc_ovgrid">' + rows.map(function(r) { return overviewCardHtml(r, total); }).join('') + '</div>';
	wireOverviewActions(element);
	document.getElementById('cc_ovsort' + element).onchange = function() {
		_overviewSort[element] = this.value;
		paintOverview(element, colStats, total);
	};
}

function renderOverview(element, data, mycolumns) {
	var container = document.getElementById('cc_overview' + element);
	if (!container) { return; }
	if (!data || !data.length || !mycolumns || !mycolumns.length) {
		container.innerHTML = '<div class="cc_ovheader"><b>Column Overview</b>' +
			'<span class="cc_ovclose" id="cc_ovclose' + element + '">✕ close</span></div>' +
			'<div class="cc_ovmeta">No data loaded.</div>';
		wireOverviewActions(element);
		return;
	}
	var cached = _overviewCache.get(data);
	if (cached) {
		paintOverview(element, cached, data.length);
		return;
	}
	container.innerHTML = '<div class="cc_ovheader"><b>Column Overview</b>' +
		'<span class="cc_ovclose" id="cc_ovclose' + element + '">✕ close</span></div>' +
		'<div class="cc_ovmeta">Computing…</div>';
	wireOverviewActions(element);
	var colStats = [];
	var idx = 0;
	function processColumn() {
		var def = mycolumns[idx];
		colStats.push(overviewColumn(data, def.feature, def.type === 'num'));
		idx++;
		if (idx < mycolumns.length) {
			requestAnimationFrame(processColumn);
		} else {
			_overviewCache.set(data, colStats);
			paintOverview(element, colStats, data.length);
		}
	}
	requestAnimationFrame(processColumn);
}

function wireOverviewActions(element) {
	var container = document.getElementById('cc_overview' + element);
	var closer = document.getElementById('cc_ovclose' + element);
	if (closer) {
		closer.onclick = function() { container.style.display = 'none'; };
	}
	container.querySelectorAll('.cc_ovcard').forEach(function(card) {
		card.onclick = function() {
			var col = card.getAttribute('data-col');
			var ySel = document.querySelector('#Y_Axis' + element + ' select');
			var xSel = document.querySelector('#X_Axis' + element + ' select');
			if (xSel && ySel) {
				ySel.value = 'None';
				ySel.dispatchEvent(new Event('change', {bubbles: true}));
				xSel.value = col;
				xSel.dispatchEvent(new Event('change', {bubbles: true}));
			}
			container.style.display = 'none';
		};
	});
}

// ---- Reproducible analysis history ------------------------------------------
// Every dataset-changing operation creates a new state instead of mutating a
// prior one. Row arrays use structural sharing where safe; formulas/type
// changes clone their row objects before evaluation. A bounded timeline keeps
// undo memory predictable, while the lightweight provenance log remains full.
var _dataHistory = {};
var _analysisOperations = {};
var _applySeq = {};   // element -> render token; supersedes stale deferred renders
var ANALYSIS_HISTORY_MAX = 20;

function cloneAnalysisOptions(options) {
	try { return JSON.parse(JSON.stringify(options || [])); } catch (e) { return options || []; }
}

function cloneTransformDefs(transforms) {
	return (transforms || []).map(function(t) { return { name: t.name, formula: t.formula }; });
}

function historyLimitFor(data) {
	var cols = data && data.columns ? data.columns.length : 1;
	var cells = (data ? data.length : 0) * Math.max(1, cols);
	return cells > 5000000 ? 5 : (cells > 1000000 ? 10 : ANALYSIS_HISTORY_MAX);
}

function ensureAnalysisHistory(element, data, options) {
	var timeline = _dataHistory[element];
	if (timeline && timeline.entries[timeline.index] && timeline.entries[timeline.index].data === data) { return timeline; }
	timeline = _dataHistory[element] = {
		entries: [{ data: data, options: cloneAnalysisOptions(options), transforms: cloneTransformDefs(_transforms[element]),
			label: 'Loaded dataset', operation: { type: 'load' }, createdAt: new Date().toISOString() }],
		index: 0
	};
	_analysisOperations[element] = [{ type: 'load', label: 'Loaded dataset', rows: data ? data.length : 0,
		createdAt: timeline.entries[0].createdAt }];
	return timeline;
}

function renderAnalysisHistory(element) {
	var timeline = _dataHistory[element];
	var list = document.getElementById('cc_lab_history' + element);
	var undo = document.getElementById('cc_lab_undo' + element);
	var redo = document.getElementById('cc_lab_redo' + element);
	if (!timeline) { return; }
	if (undo) { undo.disabled = timeline.index <= 0; }
	if (redo) { redo.disabled = timeline.index >= timeline.entries.length - 1; }
	if (!list) { return; }
	list.innerHTML = '';
	timeline.entries.forEach(function(entry, index) {
		var item = document.createElement('div');
		item.className = 'cc_lab_history_item' + (index === timeline.index ? ' current' : '');
		if (index > timeline.index) { item.className += ' future'; }
		var num = document.createElement('span');
		num.className = 'cc_lab_history_num'; num.textContent = String(index + 1);
		var text = document.createElement('span');
		text.textContent = entry.label;
		var meta = document.createElement('span');
		meta.className = 'cc_lab_history_meta';
		meta.textContent = (entry.data ? entry.data.length.toLocaleString() : '0') + ' rows';
		text.appendChild(meta); item.appendChild(num); item.appendChild(text); list.appendChild(item);
	});
}

function updateRestoreUi(element) {
	var wrap = document.getElementById('cc_data_restore' + element);
	var timeline = _dataHistory[element];
	if (wrap && timeline && timeline.index > 0) {
		wrap.style.display = 'block';
		document.getElementById('cc_data_note' + element).textContent =
			'Working on a modified dataset: ' + timeline.entries[timeline.index].label + ' → ' +
			((_fullData[element] || []).length).toLocaleString() + ' rows.';
	} else if (wrap) {
		wrap.style.display = 'none';
	}
	renderAnalysisHistory(element);
}

function applyAnalysisState(element, state, reopenTab) {
	var opts = _crossexOpts[element];
	if (typeof window !== 'undefined' && typeof window.ccAnalysisDatasetChanged === 'function') {
		window.ccAnalysisDatasetChanged(element, state.data, state.label);
	}
	_reopenTab[element] = reopenTab || 'Interact_tablinks';
	// Each application supersedes any still-pending one. Without this, an earlier
	// operation's deferred render (e.g. a group apply) can fire after a newer one
	// (e.g. a project import) reset _dataHistory, rebuilding the timeline against
	// stale data and wiping the newer provenance (the imported entry).
	var token = (_applySeq[element] = (_applySeq[element] || 0) + 1);
	crossexloader(element, true);
	delay(30).then(function() {
		if (_applySeq[element] !== token) { return; }
		crossex(element, state.data, cloneAnalysisOptions(state.options), opts.widthid);
		_transforms[element] = cloneTransformDefs(state.transforms);
	});
}

function replaceDataset(element, newData, newOptions, note, reopenTab, keepTransforms, operation, transformsOverride) {
	var opts = _crossexOpts[element];
	var timeline = ensureAnalysisHistory(element, _fullData[element], opts.options);
	if (timeline.index < timeline.entries.length - 1) { timeline.entries = timeline.entries.slice(0, timeline.index + 1); }
	var state = {
		data: newData,
		options: cloneAnalysisOptions(newOptions || opts.options),
		transforms: transformsOverride !== undefined ? cloneTransformDefs(transformsOverride) :
			(keepTransforms ? cloneTransformDefs(_transforms[element]) : []),
		label: note || 'Modified dataset',
		operation: operation || { type: 'transform', label: note || 'Modified dataset' },
		createdAt: new Date().toISOString()
	};
	timeline.entries.push(state);
	timeline.index = timeline.entries.length - 1;
	var limit = historyLimitFor(newData);
	if (timeline.entries.length > limit) {
		var removeCount = timeline.entries.length - limit;
		// Preserve the original loaded dataset; discard the oldest intermediate
		// states when the memory-aware cap is reached.
		timeline.entries.splice(1, removeCount);
		timeline.index = timeline.entries.length - 1;
	}
	var log = _analysisOperations[element] = _analysisOperations[element] || [];
	log.push(Object.assign({ label: state.label, rows: newData.length, createdAt: state.createdAt }, state.operation));
	applyAnalysisState(element, state, reopenTab);
}

function analysisUndo(element) {
	var timeline = _dataHistory[element];
	if (!timeline || timeline.index <= 0) { return; }
	timeline.index--;
	applyAnalysisState(element, timeline.entries[timeline.index], 'Transforms_tablinks');
}

function analysisRedo(element) {
	var timeline = _dataHistory[element];
	if (!timeline || timeline.index >= timeline.entries.length - 1) { return; }
	timeline.index++;
	applyAnalysisState(element, timeline.entries[timeline.index], 'Transforms_tablinks');
}

function restoreOriginalData(element) {
	var timeline = _dataHistory[element];
	if (!timeline || !timeline.entries.length || timeline.index === 0) { return; }
	timeline.index = 0;
	applyAnalysisState(element, timeline.entries[0], 'Interact_tablinks');
}

// ---- Data table view ---------------------------------------------------------
// Virtual scrolling over the full dataset: only the visible window of rows is
// in the DOM, so millions of rows stay smooth. Sorting builds an index
// permutation; a third click on the same header restores data order.
var _dt = {};
var DT_ROW_H = 20;
var DT_OVERSCAN = 10;

function dtColumns(element) {
	var opts = _crossexOpts[element];
	var cols = [];
	var seen = new Set();
	(((opts && opts.options) || [])).forEach(function(sig) {
		if (sig && sig.bind && sig.bind.options) {
			sig.bind.options.forEach(function(c) {
				if (c !== 'None' && c !== 'Sum' && c !== 'Count' && !seen.has(c)) {
					seen.add(c);
					cols.push(c);
				}
			});
		}
	});
	return cols;
}

function openDataTable(element, jumpToIndex) {
	var overlay = document.getElementById('cc_table' + element);
	if (!overlay) { return; }
	hideOverlays(element, 'cc_table');
	overlay.style.display = 'flex';
	var data = _fullData[element] || [];
	var st = _dt[element];
	if (!st || st.data !== data) {
		st = _dt[element] = { data: data, cols: dtColumns(element), order: null, sortKey: null, sortDir: 1, highlight: null };
		dtRenderHead(element, st);
	}
	document.getElementById('cc_dt_info' + element).textContent =
		data.length.toLocaleString() + ' rows × ' + st.cols.length + ' columns';
	var scroll = document.getElementById('cc_dt_scroll' + element);
	document.getElementById('cc_dt_spacer' + element).style.height = (data.length * DT_ROW_H) + 'px';
	if (jumpToIndex != null) {
		// jump targets a data index; drop any sort so position == index
		st.order = null; st.sortKey = null; st.sortDir = 1;
		st.highlight = jumpToIndex;
		dtRenderHead(element, st);
		scroll.scrollTop = Math.max(0, jumpToIndex * DT_ROW_H - scroll.clientHeight / 2);
	}
	dtRenderWindow(element);
	if (!scroll.getAttribute('data-wired')) {
		scroll.setAttribute('data-wired', '1');
		scroll.addEventListener('scroll', function() {
			document.getElementById('cc_dt_head' + element).scrollLeft = scroll.scrollLeft;
			dtRenderWindow(element);
		});
	}
}

function dtRenderHead(element, st) {
	var head = document.getElementById('cc_dt_head' + element);
	head.innerHTML = '<div class="cc_dt_tr">' + st.cols.map(function(c) {
		var arrow = st.sortKey === c ? (st.sortDir > 0 ? ' ▲' : ' ▼') : '';
		return '<div class="cc_dt_th" data-col="' + escapeHtml(c) + '" title="sort by ' + escapeHtml(c) + '">' + escapeHtml(c) + arrow + '</div>';
	}).join('') + '</div>';
	head.querySelectorAll('.cc_dt_th').forEach(function(th) {
		th.onclick = function() { dtSort(element, th.getAttribute('data-col')); };
	});
}

function dtSort(element, col) {
	var st = _dt[element];
	if (st.sortKey === col) {
		if (st.sortDir === 1) {
			st.sortDir = -1;
		} else {
			st.sortKey = null; st.order = null; st.sortDir = 1;
		}
	} else {
		st.sortKey = col; st.sortDir = 1;
	}
	st.highlight = null;
	var info = document.getElementById('cc_dt_info' + element);
	if (st.sortKey) {
		info.textContent = 'sorting…';
		// let the label paint before a potentially long sort
		setTimeout(function() {
			var data = st.data, n = data.length;
			var order = new Array(n);
			for (var i = 0; i < n; i++) { order[i] = i; }
			var key = st.sortKey, dir = st.sortDir;
			order.sort(function(a, b) {
				var x = data[a][key], y = data[b][key];
				var xm = x == null || x === '', ym = y == null || y === '';
				if (xm && ym) { return a - b; }
				if (xm) { return 1; }
				if (ym) { return -1; }
				var xn = typeof x === 'number' ? x : (isNumeric(x) ? +x : NaN);
				var yn = typeof y === 'number' ? y : (isNumeric(y) ? +y : NaN);
				if (xn === xn && yn === yn) { return dir * (xn - yn) || a - b; }
				return dir * String(x).localeCompare(String(y)) || a - b;
			});
			st.order = order;
			info.textContent = n.toLocaleString() + ' rows × ' + st.cols.length + ' columns';
			dtRenderHead(element, st);
			dtRenderWindow(element);
		}, 30);
	} else {
		dtRenderHead(element, st);
		dtRenderWindow(element);
	}
}

function dtRenderWindow(element) {
	var st = _dt[element];
	if (!st) { return; }
	var scroll = document.getElementById('cc_dt_scroll' + element);
	var rowsEl = document.getElementById('cc_dt_rows' + element);
	var n = st.data.length;
	var first = Math.max(0, Math.floor(scroll.scrollTop / DT_ROW_H) - DT_OVERSCAN);
	var count = Math.ceil(scroll.clientHeight / DT_ROW_H) + DT_OVERSCAN * 2;
	var last = Math.min(n, first + count);
	var html = '';
	for (var i = first; i < last; i++) {
		var di = st.order ? st.order[i] : i;
		var row = st.data[di];
		html += '<div class="cc_dt_tr' + (st.highlight === di ? ' cc_dt_hl' : '') + '">' +
			st.cols.map(function(c) {
				var v = row[c];
				return '<div class="cc_dt_td">' + (v == null ? '' : escapeHtml(String(v))) + '</div>';
			}).join('') + '</div>';
	}
	rowsEl.style.transform = 'translateY(' + (first * DT_ROW_H) + 'px)';
	rowsEl.innerHTML = html;
}

// ---- Brush selection ---------------------------------------------------------
// The dashed rectangle is a DOM overlay; pixel -> data conversion is
// calibrated from the rendered scene itself: every scatter symbol knows both
// its pixel position and its datum, so a least-squares line through
// (pixel, value) pairs recovers each axis mapping without touching Vega's
// group-scoped scales. Works on unfaceted linear-axis scatter plots.
function brushCollectSymbols(view, xcol, ycol) {
	var pts = [];
	function walk(node, gx, gy) {
		if (!node) { return; }
		if (node.marktype === 'group') {
			(node.items || []).forEach(function(g) {
				(g.items || []).forEach(function(child) { walk(child, gx + (g.x || 0), gy + (g.y || 0)); });
			});
		} else if (node.marktype === 'symbol') {
			(node.items || []).forEach(function(it) {
				if (pts.length >= 400 || !it.datum) { return; }
				var dx = +it.datum[xcol], dy = +it.datum[ycol];
				if (dx === dx && dy === dy && it.x != null && it.y != null) {
					pts.push({ px: gx + it.x, py: gy + it.y, dx: dx, dy: dy });
				}
			});
		} else if (node.items) {
			node.items.forEach(function(it) {
				if (it.items) { walk(it, gx, gy); }
			});
		}
	}
	try { walk(view.scenegraph().root, 0, 0); } catch (e) {}
	return pts;
}

// least-squares value = a + b * pixel; null when the pixels don't spread
function brushFit(pts, pixKey, valKey) {
	var n = pts.length, sp = 0, sv = 0, spp = 0, spv = 0;
	for (var i = 0; i < n; i++) {
		sp += pts[i][pixKey]; sv += pts[i][valKey];
		spp += pts[i][pixKey] * pts[i][pixKey];
		spv += pts[i][pixKey] * pts[i][valKey];
	}
	var denom = n * spp - sp * sp;
	if (n < 2 || Math.abs(denom) < 1e-6) { return null; }
	var b = (n * spv - sp * sv) / denom;
	var a = (sv - b * sp) / n;
	if (!isFinite(a) || !isFinite(b) || b === 0) { return null; }
	return function(px) { return a + b * px; };
}

function wireBrush(element, view) {
	var toggle = document.getElementById('cc_brush_toggle' + element);
	if (!toggle) { return; }
	var hint = document.getElementById('cc_brush_hint' + element);
	var rect = document.getElementById('cc_brush_rect' + element);
	var bar = document.getElementById('cc_brush_bar' + element);
	var container = document.getElementById('cc_graph_container' + element);
	function sigOr(name, dflt) {
		try { return view.signal(name); } catch (e) { return dflt; }
	}
	function refreshAvail() {
		var scatter = sigOr('show_scatter_graph', false);
		var faceted = sigOr('Facet_Rows_By', 'None') !== 'None' || sigOr('Facet_Cols_By', 'None') !== 'None';
		var interactive = sigOr('Interactive_', false);
		var logAxes = sigOr('LogX_', false) || sigOr('LogY_', false);
		var okay = scatter && !faceted && !interactive && !logAxes;
		toggle.disabled = !okay;
		if (!okay && toggle.checked) {
			toggle.checked = false;
			container.style.cursor = '';
		}
		hint.textContent = okay ?
			'Drag a box on the chart, then keep, exclude, download, or zoom to the selection.' :
			(interactive ? 'Turn off pan/zoom above to brush.' :
				(!scatter ? 'Brush works on scatter plots (numeric X and Y).' :
					(logAxes ? 'Brush works on linear axes — turn off log scale first.' :
						'Brush works on unfaceted plots — clear the facets first.')));
	}
	['show_scatter_graph', 'Facet_Rows_By', 'Facet_Cols_By', 'Interactive_', 'LogX_', 'LogY_'].forEach(function(sig) {
		try { view.addSignalListener(sig, refreshAvail); } catch (e) {}
	});
	refreshAvail();
	toggle.onchange = function() {
		container.style.cursor = toggle.checked ? 'crosshair' : '';
		if (!toggle.checked) {
			bar.style.display = 'none';
			rect.style.display = 'none';
		}
	};
	var dragging = false, sx = 0, sy = 0, vx0 = 0, vy0 = 0;
	function canvasEl() { return container.querySelector('#view_crossex' + element + ' canvas'); }
	container.addEventListener('mousedown', function(e) {
		if (!toggle.checked) { return; }
		var cv = canvasEl();
		if (!cv) { return; }
		var b = container.getBoundingClientRect();
		var cb = cv.getBoundingClientRect();
		dragging = true;
		sx = e.clientX - b.left; sy = e.clientY - b.top;
		vx0 = e.clientX - cb.left; vy0 = e.clientY - cb.top;
		rect.style.left = sx + 'px'; rect.style.top = sy + 'px';
		rect.style.width = '0px'; rect.style.height = '0px';
		rect.style.display = 'block';
		e.preventDefault();
	});
	container.addEventListener('mousemove', function(e) {
		if (!dragging) { return; }
		var b = container.getBoundingClientRect();
		var cx = e.clientX - b.left, cy = e.clientY - b.top;
		rect.style.left = Math.min(sx, cx) + 'px';
		rect.style.top = Math.min(sy, cy) + 'px';
		rect.style.width = Math.abs(cx - sx) + 'px';
		rect.style.height = Math.abs(cy - sy) + 'px';
	});
	window.addEventListener('mouseup', function(e) {
		if (!dragging) { return; }
		dragging = false;
		setTimeout(function() { rect.style.display = 'none'; }, 150);
		var cv = canvasEl();
		if (!cv) { return; }
		var cb = cv.getBoundingClientRect();
		var vx1 = e.clientX - cb.left, vy1 = e.clientY - cb.top;
		if (Math.abs(vx1 - vx0) < 6 || Math.abs(vy1 - vy0) < 6) { return; }
		var xcol = sigOr('X_Axis', null), ycol = sigOr('Y_Axis', null);
		if (!xcol || !ycol) { return; }
		var pts = brushCollectSymbols(view, xcol, ycol);
		var fx = brushFit(pts, 'px', 'dx');
		var fy = brushFit(pts, 'py', 'dy');
		if (!fx || !fy) {
			bar.innerHTML = 'Could not map the selection — enable Points and try again. <span class="cc_ovclose" onclick="this.parentNode.style.display=\'none\'">✕</span>';
			bar.style.display = 'block';
			return;
		}
		var x0 = Math.min(fx(vx0), fx(vx1)), x1 = Math.max(fx(vx0), fx(vx1));
		var y0 = Math.min(fy(vy0), fy(vy1)), y1 = Math.max(fy(vy0), fy(vy1));
		window._ccBrushDebug = [x0, x1, y0, y1, pts.length];
		showBrushSelection(element, view, x0, x1, y0, y1);
	});
}

function showBrushSelection(element, view, x0, x1, y0, y1) {
	var xcol, ycol;
	try { xcol = view.signal('X_Axis'); ycol = view.signal('Y_Axis'); } catch (e) { return; }
	var data = _fullData[element] || [];
	var sel = [];
	for (var i = 0; i < data.length; i++) {
		var vx = data[i][xcol], vy = data[i][ycol];
		if (vx == null || vx === '' || vy == null || vy === '') { continue; }
		vx = +vx; vy = +vy;
		if (vx >= x0 && vx <= x1 && vy >= y0 && vy <= y1) { sel.push(data[i]); }
	}
	var bar = document.getElementById('cc_brush_bar' + element);
	bar.innerHTML = '<b>' + sel.length.toLocaleString() + '</b> of ' + data.length.toLocaleString() + ' rows selected&nbsp;' +
		'<button type="button" class="cc_3d_btn" data-br="keep">Keep</button>' +
		'<button type="button" class="cc_3d_btn" data-br="exclude">Exclude</button>' +
		'<button type="button" class="cc_3d_btn" data-br="csv">CSV</button>' +
		'<button type="button" class="cc_3d_btn" data-br="zoom">Zoom</button>' +
		'<span class="cc_ovclose" data-br="close">✕</span>';
	bar.style.display = 'block';
	bar.querySelectorAll('[data-br]').forEach(function(btn) {
		btn.onclick = function() {
			var act = btn.getAttribute('data-br');
			if (act === 'close') { bar.style.display = 'none'; return; }
			if (act === 'csv') {
				if (sel.length) { json2csv('crossex.' + element + '.selection.csv', sel); }
				return;
			}
			if (act === 'zoom') {
				var lims = { X_Lower_Lim: x0, X_Upper_Lim: x1, Y_Lower_Lim: y0, Y_Upper_Lim: y1 };
				Object.keys(lims).forEach(function(sig) {
					try { view.signal(sig, String(+lims[sig].toPrecision(6))); } catch (e) {}
				});
				view.runAsync();
				bar.style.display = 'none';
				return;
			}
			if (act === 'keep' && !sel.length) { return; }
			var next;
			if (act === 'keep') {
				next = sel.slice();
			} else {
				var selSet = new Set(sel);
				next = data.filter(function(r) { return !selSet.has(r); });
			}
			next.columns = data.columns;
			bar.style.display = 'none';
			replaceDataset(element, next,
				null, (act === 'keep' ? 'kept' : 'excluded') + ' brush selection', 'Interact_tablinks', true,
				{ type: 'brush-' + act, selectedRows: sel.length, xColumn: xcol, yColumn: ycol });
		};
	});
}

// ---- Saved views ---------------------------------------------------------------
// Named snapshots of the full signal state, per widget, in localStorage.
function wireViews(element) {
	var nameIn = document.getElementById('cc_views_name' + element);
	if (!nameIn) { return; }
	var saveBtn = document.getElementById('cc_views_save' + element);
	var msg = document.getElementById('cc_views_msg' + element);
	var listEl = document.getElementById('cc_views_list' + element);
	var key = 'crossexViews_' + element;
	function readViews() {
		try { return JSON.parse(window.localStorage.getItem(key)) || {}; } catch (e) { return {}; }
	}
	function writeViews(v) {
		try { window.localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
	}
	function refresh() {
		var views = readViews();
		listEl.innerHTML = Object.keys(views).sort().map(function(n) {
			return '<div class="cc_tr_item" data-view="' + escapeHtml(n) + '" title="open this view">' +
				'<span class="cc_tr_x" data-view-del="' + escapeHtml(n) + '" title="delete this view">✕</span>' +
				'<b>' + escapeHtml(n) + '</b></div>';
		}).join('');
		listEl.querySelectorAll('[data-view-del]').forEach(function(x) {
			x.onclick = function(e) {
				e.stopPropagation();
				var views2 = readViews();
				delete views2[x.getAttribute('data-view-del')];
				writeViews(views2);
				refresh();
			};
		});
		listEl.querySelectorAll('[data-view]').forEach(function(item) {
			item.onclick = function() {
				var v = readViews()[item.getAttribute('data-view')];
				if (!v) { return; }
				saveSignalState('vegaSignals_' + element, v);
				var opts = _crossexOpts[element];
				_reopenTab[element] = 'Interact_tablinks';
				crossexloader(element, true);
				delay(30).then(function() { crossex(element, _fullData[element], opts.options, opts.widthid); });
			};
		});
	}
	saveBtn.onclick = function() {
		var name = (nameIn.value || '').trim();
		msg.className = 'cc_tr_msg';
		msg.textContent = '';
		if (!name) { msg.textContent = 'name the view first'; return; }
		var views = readViews();
		views[name] = loadSignalsFromCookie('vegaSignals_' + element) || {};
		writeViews(views);
		nameIn.value = '';
		msg.className = 'cc_tr_msg cc_ok';
		msg.textContent = 'saved — click it below anytime';
		refresh();
	};
	refresh();
}

// ---- Reshape: melt wide -> long -------------------------------------------------
function wireReshape(element, mycolumns) {
	var colSel = document.getElementById('cc_melt_cols' + element);
	if (!colSel) { return; }
	var varIn = document.getElementById('cc_melt_var' + element);
	var valIn = document.getElementById('cc_melt_val' + element);
	var btn = document.getElementById('cc_melt_apply' + element);
	var msg = document.getElementById('cc_melt_msg' + element);
	var all = (mycolumns || []).map(function(c) { return c.feature; })
		.filter(function(f) { return f && f !== 'None'; });
	colSel.innerHTML = all.map(function(c) {
		return '<option>' + escapeHtml(c) + '</option>';
	}).join('');
	btn.onclick = function() {
		msg.className = 'cc_tr_msg';
		msg.textContent = '';
		var chosen = Array.prototype.map.call(colSel.selectedOptions, function(o) { return o.value; });
		if (chosen.length < 2) { msg.textContent = 'select at least two columns to melt'; return; }
		var varName = (varIn.value || '').trim() || 'variable';
		var valName = (valIn.value || '').trim() || 'value';
		var keep = all.filter(function(c) { return chosen.indexOf(c) < 0; });
		if (keep.indexOf(varName) >= 0 || keep.indexOf(valName) >= 0 || varName === valName) {
			msg.textContent = 'variable/value names collide with a kept column';
			return;
		}
		var data = _fullData[element] || [];
		var outN = data.length * chosen.length;
		if (outN > 3000000) {
			msg.textContent = 'melting would produce ' + outN.toLocaleString() + ' rows — filter or sample first';
			return;
		}
		btn.disabled = true;
		btn.textContent = 'Reshaping…';
		var out = [];
		out.columns = keep.concat([varName, valName]);
		var i = 0, CHUNK = 50000;
		(function chunk() {
			var end = Math.min(i + CHUNK, data.length);
			for (; i < end; i++) {
				var row = data[i];
				for (var c = 0; c < chosen.length; c++) {
					var nr = {};
					for (var k = 0; k < keep.length; k++) { nr[keep[k]] = row[keep[k]]; }
					nr[varName] = chosen[c];
					nr[valName] = row[chosen[c]];
					out.push(nr);
				}
			}
			if (i < data.length) { requestAnimationFrame(chunk); return; }
			var opts = _crossexOpts[element];
			var newOptions = (opts.options || []).map(function(sig) {
				if (sig && sig.name && sig.bind && sig.bind.options) {
					var preset = sig.name === 'X_Axis' || sig.name === 'Search_By' ? varName :
						(sig.name === 'Y_Axis' ? valName : 'None');
					return { name: sig.name, value: preset, bind: { options: out.columns.slice() } };
				}
				return sig;
			});
			var store = loadSignalsFromCookie('vegaSignals_' + element) || {};
			store.X_Axis = varName;
			store.Y_Axis = valName;
			store.Color_By = 'None';
			store.Facet_Rows_By = 'None';
			store.Facet_Cols_By = 'None';
			store.Sum_By = 'None';
			saveSignalState('vegaSignals_' + element, store);
			replaceDataset(element, out, newOptions,
				'melted ' + chosen.length + ' columns into ' + varName + '/' + valName,
				'Transforms_tablinks', false,
				{ type: 'melt', columns: chosen, variableColumn: varName, valueColumn: valName });
		})();
	};
}

// ---- Stats annotations ----------------------------------------------------------
// p-values for group differences shown while the Stats toggle is on:
// Welch t-test for two groups, one-way ANOVA for three or more. The F/t tail
// probabilities come from the regularized incomplete beta function.
function gammaln(x) {
	var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091,
		-1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
	var y = x, tmp = x + 5.5;
	tmp -= (x + 0.5) * Math.log(tmp);
	var ser = 1.000000000190015;
	for (var j = 0; j < 6; j++) { ser += cof[j] / ++y; }
	return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function betacf(a, b, x) {
	var MAXIT = 200, EPS = 3e-12, FPMIN = 1e-300;
	var qab = a + b, qap = a + 1, qam = a - 1;
	var c = 1, d = 1 - qab * x / qap;
	if (Math.abs(d) < FPMIN) { d = FPMIN; }
	d = 1 / d;
	var h = d;
	for (var m = 1; m <= MAXIT; m++) {
		var m2 = 2 * m;
		var aa = m * (b - m) * x / ((qam + m2) * (a + m2));
		d = 1 + aa * d; if (Math.abs(d) < FPMIN) { d = FPMIN; }
		c = 1 + aa / c; if (Math.abs(c) < FPMIN) { c = FPMIN; }
		d = 1 / d;
		h *= d * c;
		aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
		d = 1 + aa * d; if (Math.abs(d) < FPMIN) { d = FPMIN; }
		c = 1 + aa / c; if (Math.abs(c) < FPMIN) { c = FPMIN; }
		d = 1 / d;
		var del = d * c;
		h *= del;
		if (Math.abs(del - 1) < EPS) { break; }
	}
	return h;
}

// regularized incomplete beta I_x(a, b)
function ibeta(a, b, x) {
	if (x <= 0) { return 0; }
	if (x >= 1) { return 1; }
	var bt = Math.exp(gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x));
	if (x < (a + 1) / (a + b + 2)) { return bt * betacf(a, b, x) / a; }
	return 1 - bt * betacf(b, a, 1 - x) / b;
}

function fTailP(F, d1, d2) { return ibeta(d2 / 2, d1 / 2, d2 / (d2 + d1 * F)); }
function tTailP2(t, df) { return ibeta(df / 2, 0.5, df / (df + t * t)); }  // two-sided

function fmtP(p) {
	if (p !== p) { return '—'; }
	if (p < 1e-16) { return '< 1e-16'; }
	return String(parseFloat(p.toPrecision(2)));
}

function meanVar(vals) {
	var n = vals.length, m = 0, M2 = 0;
	for (var a = 0; a < n; a++) { m += vals[a]; }
	m /= n;
	for (var b = 0; b < n; b++) { var e = vals[b] - m; M2 += e * e; }
	return { n: n, mean: m, varr: n > 1 ? M2 / (n - 1) : 0 };
}

function welchTest(g1, g2) {
	var a = meanVar(g1), b = meanVar(g2);
	var se2 = a.varr / a.n + b.varr / b.n;
	if (se2 <= 0) { return { t: NaN, df: NaN, p: NaN }; }
	var t = (a.mean - b.mean) / Math.sqrt(se2);
	var df = se2 * se2 / (Math.pow(a.varr / a.n, 2) / (a.n - 1) + Math.pow(b.varr / b.n, 2) / (b.n - 1));
	return { t: t, df: df, p: tTailP2(Math.abs(t), df) };
}

function anovaTest(groups) {
	var k = groups.length, N = 0, grand = 0;
	groups.forEach(function(g) { g.forEach(function(v) { grand += v; N++; }); });
	grand /= N;
	var ssb = 0, ssw = 0;
	groups.forEach(function(g) {
		var mv = meanVar(g);
		ssb += g.length * Math.pow(mv.mean - grand, 2);
		ssw += mv.varr * (g.length - 1);
	});
	var d1 = k - 1, d2 = N - k;
	if (d2 <= 0 || ssw <= 0) { return { F: NaN, d1: d1, d2: d2, p: NaN }; }
	var F = (ssb / d1) / (ssw / d2);
	return { F: F, d1: d1, d2: d2, p: fTailP(F, d1, d2) };
}

function updateStatsBadge(element, view) {
	var badge = document.getElementById('cc_stats_badge' + element);
	if (!badge) { return; }
	var on = false, box = false, hz = false, xcol, ycol;
	try {
		on = view.signal('Stats_');
		box = view.signal('show_box_graphs');
		hz = view.signal('show_hzbox_graphs');
		xcol = view.signal('X_Axis');
		ycol = view.signal('Y_Axis');
	} catch (e) {}
	if (!on || (!box && !hz)) { badge.style.display = 'none'; return; }
	var catCol = box ? xcol : ycol;
	var numCol = box ? ycol : xcol;
	var data = _fullData[element] || [];
	var groups = Object.create(null);
	for (var i = 0; i < data.length; i++) {
		var g = data[i][catCol], v = data[i][numCol];
		if (g == null || g === '' || v == null || v === '') { continue; }
		var x = +v;
		if (x !== x) { continue; }
		(groups[g] = groups[g] || []).push(x);
	}
	var keys = Object.keys(groups).filter(function(k) { return groups[k].length > 1; });
	if (keys.length < 2 || keys.length > 100) { badge.style.display = 'none'; return; }
	var text;
	if (keys.length === 2) {
		var w = welchTest(groups[keys[0]], groups[keys[1]]);
		text = 'Welch t-test: t = ' + w.t.toFixed(2) + ', p = ' + fmtP(w.p);
	} else {
		var an = anovaTest(keys.map(function(k) { return groups[k]; }));
		text = 'ANOVA: F(' + an.d1 + ', ' + an.d2 + ') = ' + an.F.toFixed(2) + ', p = ' + fmtP(an.p);
	}
	badge.textContent = text + '  ·  ' + numCol + ' by ' + catCol;
	badge.style.display = 'block';
}

// ---- Normal QQ plot --------------------------------------------------------
// Computed in JS (Vega expressions lack a normal quantile function) from the
// rendered data for the current X column, grouped by Color_By, and injected
// into the qq_data dataset. The dashed reference line goes through the
// quartile pair, R's qqline style.
function computeQQ(view) {
	var on = false;
	try { on = view.signal('QQNorm_'); } catch (e) { return; }
	var rows = [];
	if (on) {
		var xcol = view.signal('X_Axis');
		var ccol = view.signal('Color_By');
		var data = view.data('mydata');
		var groups = {};
		for (var i = 0; i < data.length; i++) {
			var v = data[i][xcol];
			if (v == null || v === '') { continue; }
			var x = typeof v === 'number' ? v : Number(v);
			if (x !== x) { continue; }
			var g = (ccol && ccol !== 'None') ? String(data[i][ccol]) : 'all';
			(groups[g] = groups[g] || []).push(x);
		}
		var norm = gen.random.normal(0, 1);
		Object.keys(groups).forEach(function(g) {
			var vals = groups[g].sort(function(a, b) { return a - b; });
			var n = vals.length;
			if (n < 3) { return; }
			var step = Math.max(1, Math.floor(n / 800));
			for (var k = 0; k < n; k += step) {
				rows.push({theoretical: norm.icdf((k + 0.5) / n), sample: vals[k], Color_Value: g, isline: 0});
			}
			var q = function(p) { return vals[Math.max(0, Math.min(n - 1, Math.floor(p * n)))]; };
			var t25 = norm.icdf(0.25), t75 = norm.icdf(0.75);
			var slope = (q(0.75) - q(0.25)) / (t75 - t25);
			var icept = q(0.25) - slope * t25;
			var tmin = norm.icdf(0.5 / n), tmax = norm.icdf((n - 0.5) / n);
			rows.push({theoretical: tmin, sample: icept + slope * tmin, Color_Value: g, isline: 1});
			rows.push({theoretical: tmax, sample: icept + slope * tmax, Color_Value: g, isline: 1});
		});
	}
	view.change('qq_data', vega.changeset().remove(function() { return true; }).insert(rows)).runAsync();
}

function setQQFacetDisabled(element, disabled) {
	['Facet_Rows_By', 'Facet_Cols_By'].forEach(function(sig) {
		var sel = document.querySelector('#' + sig + element + ' select');
		if (!sel) { return; }
		sel.disabled = disabled;
		sel.title = disabled ? 'Not available for Normal QQ plots' : '';
	});
}

// Sortable, downloadable rendering of the computed summary rows
function paintSummary(container, element, rows) {
	var sort = { key: null, dir: 1 };
	function paint() {
		var sorted = rows.slice();
		if (sort.key) {
			sorted.sort(function(a, b) {
				var x = a[sort.key], y = b[sort.key];
				// missing values group at the bottom in either direction
				var xm = x == null || x !== x, ym = y == null || y !== y;
				if (xm && ym) { return 0; }
				if (xm) { return 1; }
				if (ym) { return -1; }
				if (typeof x === 'string' || typeof y === 'string') {
					return sort.dir * String(x).localeCompare(String(y));
				}
				return sort.dir * (x - y);
			});
		}
		container.innerHTML = '<div class="cc_summary_bar">' +
			'<button type="button" class="cc_3d_btn" data-sum-csv>Download CSV</button>' +
			'<span class="cc_summary_hint">click a header to sort</span></div>' +
			summaryTableHtml(sorted, sort);
		container.querySelectorAll('th[data-key]').forEach(function(th) {
			th.onclick = function() {
				var k = th.getAttribute('data-key');
				sort.dir = sort.key === k ? -sort.dir : 1;
				sort.key = k;
				paint();
			};
		});
		container.querySelector('[data-sum-csv]').onclick = function() {
			json2csv('crossex.' + element + '.summary.csv', rows.map(function(r) {
				return { column: r.col, type: r.type, n: r.n, missing: r.missing,
					distinct: r.distinct, min: r.min, median: r.median, mean: r.mean,
					sd: r.sd, max: r.max, top_value: r.top };
			}));
		};
	}
	paint();
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
			paintSummary(container, element, rows);
		}
	}
	requestAnimationFrame(processColumn);
}

// Single pass per column: detect types, clean NAs, count distinct.
// Distinct sets are capped just above the largest dropdown threshold (150) —
// high-cardinality columns (IDs) would otherwise hold every value in memory.
// NAs become null rather than `delete`: the Vega spec uses isValid(), which
// treats null and undefined the same, and deleting keys pushes V8 objects
// into slow dictionary mode. Results are cached per dataset; above ~20M cells
// the scan runs one column per frame so the tab never freezes.
function computeColInfo(data, headers, callback) {
	if (!data || !data.length || !headers.length) {
		callback({colInfo: {}, sum_cols: [], col_names: []});
		return;
	}
	var cached = _typeCache.get(data);
	if (cached) {
		callback(cached);
		return;
	}
	var colInfo = {};
	var sum_cols = [];
	var col_names = [];
	var DISTINCT_CAP = 151;
	var nrows = data.length;
	function scanColumn(col) {
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
	function finish() {
		var typed = {colInfo: colInfo, sum_cols: sum_cols, col_names: col_names};
		_typeCache.set(data, typed);
		callback(typed);
	}
	if (nrows * headers.length <= 20000000) {
		for (var h = 0; h < headers.length; ++h) { scanColumn(headers[h]); }
		finish();
		return;
	}
	var next = 0;
	function chunk() {
		scanColumn(headers[next]);
		next++;
		if (next < headers.length) {
			requestAnimationFrame(chunk);
		} else {
			finish();
		}
	}
	requestAnimationFrame(chunk);
}

// ---- Dark theme ---------------------------------------------------------------
// The page/panel side is CSS (.cc-dark on <html>); the chart side is a Vega
// config merged in at embed time plus the Background_Color signal default.
function ccDarkMode() {
	try { return window.localStorage.getItem('ccDarkMode') === '1'; } catch (e) { return false; }
}
var CC_DARK_VEGA_CONFIG = {
	background: '#191a21',
	axis: { labelColor: '#b7bcc7', titleColor: '#d5d9e0', gridColor: '#2c2f38', domainColor: '#565b66', tickColor: '#565b66' },
	legend: { labelColor: '#b7bcc7', titleColor: '#d5d9e0' },
	title: { color: '#e6e8ec' }
};

var _views = {};

var crossex = function crossex(element, data, options,widthid) {
	// a different dataset invalidates the session's transform list; re-renders
	// of the same array (sample change, transform apply) keep it
	if (data && _fullData[element] !== data) { _transforms[element] = []; }
	_crossexOpts[element] = {options: options, widthid: widthid};
	document.documentElement.classList.toggle('cc-dark', ccDarkMode());
	// release the previous Vega view (timers, handlers, dataflow) before the
	// container's DOM is replaced — re-renders must not stack live views
	if (_views[element]) {
		try { _views[element].finalize(); } catch (e) {}
		delete _views[element];
	}
	// a pending debounced signal-save from the old view would clobber state
	// seeded for this render (e.g. melt presetting X/Y)
	clearTimeout(_cookieDebounceTimers['vegaSignals_' + element]);
	// re-rendering wipes the container's DOM; free any prior 3D GL context first
	if (_3d[element]) {
		if (_3d[element].inst) { try { _3d[element].inst.dispose(); } catch (e) {} }
		delete _3d[element];
	}
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
	var local_vgspec = crossex_spec_str;
	var element_node = document.getElementById(element);
	var mymax = 150;
	var loc_crossex_htmlRes = loc_crossex_html.replace(/\-ccnm/g, element);
	element_node.innerHTML = loc_crossex_htmlRes;
	ccPanel={};
	ccPanelProxy[element]={};
	var res = local_vgspec.replace(/\-ccnm/g, element);
	var spec = JSON.parse(res);
	normalizeGraphSpec(spec);
	var hide_panel=false;
	var editable=false;
	var exportable=true;
	var new_signalsString = JSON.stringify(options);
	var col_names=[];
	var sum_cols=[];
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	ensureCoreCss();
	crossexloader(element,true);
	

	var repSignalsJson = null;
	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		// panel flags don't need column types — apply them before the
		// (possibly async) type scan so hidden panels never flash visible
		for (var f=0;f<repSignalsJson.length;++f) {
			if (typeof repSignalsJson[f]['hide_panel'] !== 'undefined') {
				hide_panel=true;
				document.querySelector('#cc_panel'+element).style.display = "none";
				document.querySelector('#cc_tab'+element).style.display = "none";
				document.querySelector('#cc_tabscontent'+element).style.display = "none";
			} else if (typeof repSignalsJson[f]['Links_Editable'] !== 'undefined') {
				document.getElementById('#Links_Options' + element).style.display = "block";
			} else if (typeof repSignalsJson[f]['editable'] !== 'undefined') {
				editable = repSignalsJson[f]['editable']==1;
			} else if (typeof repSignalsJson[f]['exportable'] !== 'undefined') {
				exportable = repSignalsJson[f]['exportable']==1;
			}
		}
	}
	// union of every dropdown's column list — typed in one pre-pass
	var allHeaders = [];
	var seenHeader = new Set();
	if (repSignalsJson) {
		repSignalsJson.forEach(function(sig) {
			if (sig.name != null && sig.bind && sig.bind.options != null) {
				sig.bind.options.forEach(function(hname) {
					if (!seenHeader.has(hname)) {
						seenHeader.add(hname);
						allHeaders.push(hname);
					}
				});
			}
		});
	}
	computeColInfo(data, allHeaders, function(typed) {
	var colInfo = typed.colInfo;
	sum_cols = typed.sum_cols;
	col_names = typed.col_names;
	if (repSignalsJson != null) {
		for (var i=0;i<repSignalsJson.length;++i) {
			if (repSignalsJson[i].name == null) {
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
						headers.forEach(function(hname) {
							var info = colInfo[hname];
							var ln = info ? info.distinct.size : 0;
							var isNum = info ? info.isNum : false;
							if (ln > 0 && signalFilter) {
								if ((!signalFilter.maxDistinct || ln < signalFilter.maxDistinct) &&
									(!signalFilter.numericOnly || isNum)) {
									finalheaders.push(hname);
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
		ensureAnalysisHistory(element, data, options);
		var renderData = data;
		var sampleN = getSampleSetting(element, data.length);
		var facetCapped = false;
		if (facetsRequested(element, repSignalsJson) && data.length > FACET_SAMPLE_MAX &&
			(sampleN === 0 || sampleN > FACET_SAMPLE_MAX)) {
			sampleN = FACET_SAMPLE_MAX;
			facetCapped = true;
		}
		var noticeEl = document.getElementById('cc_sample_notice' + element);
		var sampleMsg = '';
		if (sampleN > 0 && data.length > sampleN) {
			renderData = sampleRows(data, sampleN);
			sampleMsg = 'Rendering ' + sampleN.toLocaleString() + ' of ' + data.length.toLocaleString() +
				' rows (uniform sample' + (facetCapped ? '; faceted views are capped for responsiveness' : '') +
				'). Summary tab uses all rows. Change under Filtering ▸ Render sample.';
		}
		// The host page (standalone site) folds this into the banner above the
		// chart; embedded widgets have no banner, so they keep the inline strip.
		var hostNotice = typeof window !== 'undefined' && window.ccSampleNotice;
		if (hostNotice) {
			if (noticeEl) { noticeEl.style.display = 'none'; }
			try { window.ccSampleNotice(sampleMsg); } catch (e) {}
		} else if (noticeEl) {
			noticeEl.textContent = sampleMsg;
			noticeEl.style.display = sampleMsg ? 'block' : 'none';
		}
		_renderCount[element] = renderData.length;
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

	let amyview;
	crossexloader(element,true);
	delay().then(() => drawGraph(amyview,element,spec,widthNode,hide_panel,editable,exportable));
	});
};

// Pivot table (PivotTable.js) over the loaded dataset, rendered into the same
// chart-area overlay tabs use. The jQuery/jQuery-UI/pivot stack (~410KB) has
// no place in the base widget payload, so it loads lazily on first use.
var PIVOT_LIBS = [
	'src/lib/jquery-3.6.0.min.js',
	'src/lib/jquery-ui.min.js',
	'src/lib/jquery.ui.touch-punch.min.js',
	'src/lib/pivot.js'
];
var PIVOT_HIDDEN_ATTRS = ["X_Value", "Col_Value", "Y_Value", "Row_Value", "Count", "None", "O_Value", "Color_Value", "Cstr", "Xstr", "Ystr", "Size_Value", "jitter", "xfocus", "yfocus", "Stroke_Value", "ecdf_rank", "ecdf_n", "ecdf_p", "SortX_Value", "Term"];
var _pivotLibsPromise = null;
var _pivotCssInjected = false;
var _pivotInited = {};

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

function ensurePivotLibs() {
	if (!_pivotCssInjected) {
		_pivotCssInjected = true;
		var pvtCss = itgz.decompressFromEncodedURIComponent("<%=pvt_css%>");
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(pvtCss));
		head.appendChild(style);
	}
	if (window.jQuery && jQuery.fn.pivotUI) { return Promise.resolve(); }
	if (!_pivotLibsPromise) {
		_pivotLibsPromise = loadScriptsSequentially(PIVOT_LIBS);
	}
	return _pivotLibsPromise;
}

// Pivot overlay: same mutual-exclusion + full-container real estate as the
// Data Table / Overview / 3D View tabs (see hideOverlays).
// Seed the pivot with a live cross-tab instead of a bare grand total: the
// first two low-cardinality non-numeric columns become rows x cols.
function pickPivotCategoricals(rows) {
	var hidden = new Set(PIVOT_HIDDEN_ATTRS);
	var scan = rows.slice(0, 500);
	var picks = [];
	if (!scan.length) { return picks; }
	var colNames = Object.keys(scan[0]);
	for (var c = 0; c < colNames.length && picks.length < 2; c++) {
		var name = colNames[c];
		if (hidden.has(name)) { continue; }
		var distinct = new Set();
		var categorical = true;
		for (var i = 0; i < scan.length; i++) {
			var v = scan[i][name];
			if (v == null || v === '') { continue; }
			if (typeof v === 'number' || (typeof v === 'string' && v !== '' && !isNaN(+v))) { categorical = false; break; }
			distinct.add(String(v));
			if (distinct.size > 24) { categorical = false; break; }
		}
		if (categorical && distinct.size >= 2) { picks.push(name); }
	}
	return picks;
}

function openPivotView(element, data) {
	var overlay = document.getElementById('cc_pivot' + element);
	var note = document.getElementById('cc_pivot_info' + element);
	var body = document.getElementById('cc_pivot_body' + element);
	if (!overlay) { return; }
	hideOverlays(element, 'cc_pivot');
	overlay.style.display = 'flex';
	if (!data || !data.length) {
		note.textContent = '';
		body.innerHTML = '<div class="cc_ovmeta">No data loaded.</div>';
		return;
	}
	// a full re-render (dark mode, sample change, restore view) rebuilds this
	// container from scratch even when the underlying data array is unchanged
	if (_pivotInited[element] === data && body.querySelector('table.pvtTable')) { return; }
	note.textContent = 'Loading pivot libraries…';
	body.innerHTML = '';
	ensurePivotLibs().then(function() {
		// re-query rather than close over `body`: a full re-render (dark mode,
		// sample change) while libs were still loading would have replaced it
		var liveBody = document.getElementById('cc_pivot_body' + element);
		var liveNote = document.getElementById('cc_pivot_info' + element);
		if (!liveBody || liveBody.querySelector('table.pvtTable')) { return; }
		_pivotInited[element] = data;
		var rows = data.length > 50000 ? sampleRows(data, 50000) : data;
		if (liveNote) {
			liveNote.textContent = 'Pivot over ' + rows.length.toLocaleString() + ' rows' +
				(rows.length < data.length ? ' (uniform sample of ' + data.length.toLocaleString() + ')' : '');
		}
		var cats = pickPivotCategoricals(rows);
		jQuery(liveBody).pivotUI(rows, {
			hiddenAttributes: PIVOT_HIDDEN_ATTRS,
			rows: cats.slice(0, 1),
			cols: cats.slice(1, 2)
		}, true);
	}).catch(function(err) {
		var liveNote = document.getElementById('cc_pivot_info' + element);
		if (liveNote) { liveNote.textContent = 'Pivot table unavailable: ' + err.message; }
	});
}

function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable) {
	var renderToken = crossexloader(element, true);
	if (myview) {
		myview.finalize();
	}
	// Create index maps for O(1) lookups
	var signalMap = createIndexMap(spec.signals);
	var dataMap = createIndexMap(spec.data);
	if (spec.signals[signalMap['Interactive_']]['value']==true) {
		setInteractiveSignals(spec, signalMap, true);
	}
	// The Interactive_ toggle re-runs drawGraph on the same DOM, so every
	// listener here must attach exactly once — duplicates make the overlay
	// buttons (3D, Table, Overview, Pivot) toggle open+closed in one click.
	function wireOnce(id, type, fn) {
		var node = document.getElementById(id + element);
		if (!node || node.getAttribute('data-cc-once-' + type)) { return; }
		node.setAttribute('data-cc-once-' + type, '1');
		node.addEventListener(type, fn);
	}
	// Set up tab listeners
	TAB_CONFIG.forEach(function(tab) {
		wireOnce(tab.id, 'click', function(event) { ccOpenCity(event, tab.panel + element, element); });
	});
	// Summary table is computed on first open, not up front; it always
	// summarizes the full dataset even when the chart renders a sample
	wireOnce('Summary_tablinks', 'click', function() {
		renderSummary(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
	});
	// Overview toggles a column-distribution overlay over the chart area
	wireOnce('Overview_btn', 'click', function() {
		var ov = document.getElementById('cc_overview' + element);
		if (ov.style.display === 'none') {
			hideOverlays(element, 'cc_overview');
			renderOverview(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
			ov.style.display = 'block';
		} else {
			ov.style.display = 'none';
		}
	});
	// 3D view toggles a WebGL unit-visualization overlay over the chart area
	wireOnce('ThreeD_btn', 'click', function() {
		var td = document.getElementById('cc_3d' + element);
		if (td.style.display === 'none' || !td.style.display) {
			hideOverlays(element, 'cc_3d');
			open3dView(element, _fullData[element] || spec.data[dataMap['mydata']].values, spec.data[dataMap['mycolumns']].values);
		} else {
			td.style.display = 'none';
		}
	});
	// Data table overlay: full rows, virtual scrolled
	wireOnce('Table_btn', 'click', function() {
		var t = document.getElementById('cc_table' + element);
		if (t.style.display === 'none' || !t.style.display) {
			openDataTable(element);
		} else {
			t.style.display = 'none';
		}
	});
	wireOnce('cc_dt_close', 'click', function() {
		document.getElementById('cc_table' + element).style.display = 'none';
	});
	wireOnce('cc_3d_close', 'click', function() {
		document.getElementById('cc_3d' + element).style.display = 'none';
		var tip = document.getElementById('cc_3d_tip');
		if (tip) { tip.style.display = 'none'; }
	});
	// Pivot table overlay: drag-and-drop PivotTable.js over the full dataset
	wireOnce('Pivot_btn', 'click', function() {
		var p = document.getElementById('cc_pivot' + element);
		if (p.style.display === 'none' || !p.style.display) {
			openPivotView(element, _fullData[element] || spec.data[dataMap['mydata']].values);
		} else {
			p.style.display = 'none';
		}
	});
	wireOnce('cc_pivot_close', 'click', function() {
		document.getElementById('cc_pivot' + element).style.display = 'none';
	});
	// Facet changes rebuild every cell's scaffolding inside Vega — on large
	// rendered data that freezes or crashes the tab. Intercept the dropdown
	// before Vega sees it and re-render through the sampler instead.
	['Facet_Rows_By', 'Facet_Cols_By'].forEach(function(sigName) {
		var wrap = document.getElementById(sigName + element);
		if (!wrap || wrap.getAttribute('data-facet-guard')) { return; }
		wrap.setAttribute('data-facet-guard', '1');
		wrap.addEventListener('change', function(e) {
			var full = _fullData[element];
			if (!full || full.length <= FACET_SAMPLE_MAX) { return; }
			var newVal = e.target.value;
			var count = _renderCount[element] || 0;
			var otherName = sigName === 'Facet_Rows_By' ? 'Facet_Cols_By' : 'Facet_Rows_By';
			var otherSel = document.querySelector('#' + otherName + element + ' select');
			var otherVal = otherSel ? otherSel.value : 'None';
			var enteringFacet = newVal !== 'None' && count > FACET_SAMPLE_MAX;
			var leavingFacet = newVal === 'None' && otherVal === 'None' && count <= FACET_SAMPLE_MAX;
			if (!enteringFacet && !leavingFacet) { return; }
			e.stopImmediatePropagation();
			e.preventDefault();
			var store = loadSignalsFromCookie('vegaSignals_' + element) || {};
			store[sigName] = newVal;
			saveSignalState('vegaSignals_' + element, store);
			var opts = _crossexOpts[element];
			crossexloader(element, true);
			delay(30).then(function() { crossex(element, full, opts.options, opts.widthid); });
		}, true);
	});
	wireTransformTab(element, spec.data[dataMap['mycolumns']].values);
	wireReshape(element, spec.data[dataMap['mycolumns']].values);
	wireViews(element);
	updateRestoreUi(element);
	var restoreBtn = document.getElementById('cc_restore_btn' + element);
	if (restoreBtn) { restoreBtn.onclick = function() { restoreOriginalData(element); }; }
	// re-select a tab after a re-render it triggered (e.g. applying a transform)
	if (_reopenTab[element]) {
		var reopenBtn = document.getElementById(_reopenTab[element] + element);
		delete _reopenTab[element];
		if (reopenBtn) { reopenBtn.click(); }
	}
	var cookieName = 'vegaSignals_' + element;
	var savedSignals = loadSignalsFromCookie(cookieName);
	var firstVisit = !savedSignals;
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
	// color/label overrides from on-chart editing patch the spec pre-parse
	applyOverridePatches(spec, signalMap, dataMap);

	var embedOpts = {
		renderer: 'canvas',
		width: setWidth_smart(element,widthNode),
		tooltip: true,
		warn: false,
		actions: {
			export: exportable,   // menu offers both PNG and SVG downloads
			csv:exportable,
			source: false,
			editor: true,
			editorURL: "https://vega.github.io/editor/",
			scaleFactor: 2
		},
		defaultStyle: true
	};
	// legend chip follows the theme (not saved state) so its text stays readable
	var legBgIdx = signalMap['CC_LEG_BG'];
	if (legBgIdx !== undefined) {
		spec.signals[legBgIdx].value = ccDarkMode() ? 'rgba(30,32,40,0.85)' : 'rgba(255,255,255,0.85)';
	}
	if (ccDarkMode()) {
		embedOpts.config = CC_DARK_VEGA_CONFIG;
		// only override the chart background when the user hasn't customized it
		var bgIdx = signalMap['Background_Color'];
		if (bgIdx !== undefined) {
			var bg = spec.signals[bgIdx].value;
			if (!bg || bg === '#FFF' || bg === '#FFFFFF' || String(bg).toLowerCase() === 'white' || bg === '#ffffff') {
				spec.signals[bgIdx].value = CC_DARK_VEGA_CONFIG.background;
			}
		}
	}
	vegaEmbed('#view_crossex' + element, spec, embedOpts).then(function(result) {
		myview = result.view.run();
		_views[element] = result.view;
		wireRenderBusyOverlay(element, result.view);
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
			// the Interactive_ rebuild deletes result.view before this handler
			// is replaced — a resize in that window must not crash
			if (result.view) { result.view.width(setWidth_smart(element,widthNode)).run(); }
		};
		window.addEventListener('resize', _resizeHandlers[element]);
		// The control panel grows when contextual controls appear (e.g. Sum_By
		// for stacked charts). Shrink the chart to fit instead of letting the
		// widget overflow into a horizontal scrollbar.
		if (window.ResizeObserver) {
			if (_panelObservers[element]) {
				_panelObservers[element].disconnect();
			}
			var lastPanelW = -1, prevPanelW = -1;
			_panelObservers[element] = new ResizeObserver(function(entries) {
				var w = entries[0].contentRect.width;
				if (w === lastPanelW) { return; }
				// bouncing between two widths (scrollbar feedback) must not
				// re-trigger renders forever
				if (w === prevPanelW) { return; }
				prevPanelW = lastPanelW;
				lastPanelW = w;
				clearTimeout(_panelResizeTimers[element]);
				_panelResizeTimers[element] = setTimeout(function() {
					// result.view is deleted during the Interactive_ rebuild;
					// a pending panel-resize tick must not touch it
					if (result.view) { result.view.width(setWidth_smart(element, widthNode)).run(); }
				}, 120);
			});
			_panelObservers[element].observe(document.getElementById('cc_tabscontent' + element));
		}
		// First visit with no saved settings: open with the column overview
		if (firstVisit && !hide_panel && _fullData[element] && _fullData[element].length) {
			renderOverview(element, _fullData[element], spec.data[dataMap['mycolumns']].values);
			document.getElementById('cc_overview' + element).style.display = 'block';
		}
		// QQ plot data is computed in JS whenever its inputs change
		['QQNorm_', 'X_Axis', 'Color_By'].forEach(function(sig) {
			result.view.addSignalListener(sig, function() { computeQQ(result.view); });
		});
		computeQQ(result.view);
		// computeQQ only groups by Color_By (Vega has no normal-quantile
		// expression to facet natively) — grey out the facet dropdowns while
		// QQNorm_ is active so the UI never implies a split that isn't drawn
		result.view.addSignalListener('QQNorm_', function(name, value) { setQQFacetDisabled(element, value); });
		setQQFacetDisabled(element, result.view.signal('QQNorm_'));
		// Brush selection, zoom reset, and the group-difference stats badge
		wireBrush(element, result.view);
		// On-chart editing: drag titles/legend/labels, double-click to edit
		if (!hide_panel) { wireDirectEdit(element, result.view); }
		var resetZoomBtn = document.getElementById('cc_reset_zoom' + element);
		if (resetZoomBtn) {
			resetZoomBtn.onclick = function() {
				['X_Lower_Lim', 'X_Upper_Lim', 'Y_Lower_Lim', 'Y_Upper_Lim'].forEach(function(sig) {
					try { result.view.signal(sig, ''); } catch (e) {}
				});
				result.view.runAsync();
			};
		}
		['Stats_', 'X_Axis', 'Y_Axis'].forEach(function(sig) {
			try {
				result.view.addSignalListener(sig, function() { updateStatsBadge(element, result.view); });
			} catch (e) {}
		});
		updateStatsBadge(element, result.view);
		// double-clicking a mark opens the data table scrolled to that row
		result.view.addEventListener('dblclick', function(event, item) {
			if (!item || !item.datum) { return; }
			var full = _fullData[element];
			if (!full) { return; }
			var idx = full.indexOf(item.datum);
			if (idx >= 0) { openDataTable(element, idx); }
		});
		// Correlation matrix cells click through to the underlying pair
		result.view.addEventListener('click', function(event, item) {
			if (!item || !item.datum || item.datum.var1 === undefined || item.datum.var2 === undefined) { return; }
			var covCb = document.querySelector('#Show_Covariance' + element + ' input[type=checkbox]');
			var xSel = document.querySelector('#X_Axis' + element + ' select');
			var ySel = document.querySelector('#Y_Axis' + element + ' select');
			if (!xSel || !ySel || !result.view.signal('Show_Covariance')) { return; }
			xSel.value = item.datum.var1;
			xSel.dispatchEvent(new Event('change', {bubbles: true}));
			ySel.value = item.datum.var2;
			ySel.dispatchEvent(new Event('change', {bubbles: true}));
			if (covCb && covCb.checked) { covCb.click(); }
		});
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
			wireOptionRelevance(element, result.view);
			var checkbox = document.querySelector('#Interactive_'+element + '> div > label > input[type=checkbox]');
			var DownloadCSVNode=document.querySelector("#view_crossex"+element+" > details > div > a:nth-child(1)");
			DownloadCSVNode.addEventListener('click', function(e) {
				// export the full dataset, not the (possibly sampled) render data
				var ds=_fullData[element] || result.view.data('mydata');
				json2csv('crossex.'+element+'.csv',ds)
			}, false);
			var cross_checkbox=document.querySelector("#Show_Covariance"+element + "> div > label > input[type=checkbox]");
			cross_checkbox.addEventListener('change', (event) => {
				if (event.currentTarget.checked ) {
					crossexloader(element,true);
					corrmatrixAsync(spec.data[dataMap["mydata"]].values, spec.data[dataMap["col_names"]].values, function(corr) {
						result.view.change('covariance', vega.changeset().insert(corr).remove(function () {return true})).runAsync().then(function() { crossexloader(element,false); });
					});
				}
				myview = result.view;
			});
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Search_By","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","SortX_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","Box_Points_","Histogram_Y_","Violin_Bandwidth","steps","Median_Thickness","Cat_Layout","Stack_Grouped_","Donut_Ratio","Density_","Count_Axis_","Density_Bandwidth","Ridgeline_","Ridge_Overlap","Cloud_Min_Font","Cloud_Max_Font","Cloud_Angle","Cloud_Padding","LogY_","Jitter_" ,"Weight_Contour","Tips_","Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point","Min_Point","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Title_Height","X_Axis_Height","Row_Header_Width","Row_Height","Max_Facets","Legend_Height","Legend_Cols","PlotTitle_Height","graph_title","Show_Titles","ContourCounts","resolve","ContourLevels","CellSize_","Line_","ECDF_","QQNorm_","CC_X_Title","CC_Y_Title","CC_XT_DX","CC_XT_DY","CC_YT_DX","CC_YT_DY","CC_LEG_DX","CC_LEG_DY","CC_Cat_Colors","CC_Cont_Range","CC_Notes","CC_Title","CC_Subtitle","CC_TI_DX","CC_TI_DY"];
				for (var i = 0; i < new_signals_ar.length; i++) {
					if (signalMap[new_signals_ar[i]] === undefined) { continue; }
					try {
						spec.signals[signalMap[new_signals_ar[i]]]['value'] = result.view.signal(new_signals_ar[i]);
					} catch (e) { /* signal not in this view */ }
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
		crossexloader(element,false,renderToken);
	}).catch(function(err) {
		crossexloader(element,false,renderToken);
		console.error(err);
	});
}
