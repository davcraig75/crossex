<%-  include ../src/lz-string.js  %>

var add_css=true;
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("<%-crossex_spec%>"));
var crossex_html=itgz.decompressFromEncodedURIComponent("<%=crossex_html%>");
crossex_html = crossex_html.replace("itgversion","<%-itgversion%>");
var ccPanel,ccPanelProxy;
ccPanelProxy={};
ccPanel={};
var NA_VALUES_SET = new Set(["na", "NA", "null", "NULL", "Null", "unknown", "Unknown", "N/A", "n/a", "#N/A"]);

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
	{id: 'Margins_tablinks', panel: 'Margins'}
];

var _resizeHandlers = {};
var _cookieDebounceTimers = {};

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

function saveSignalsToCookie(signalsArray, cookieName) {
    const signalState = {};
    signalsArray.forEach(signal => {
        if (signal.value !== undefined) {
            signalState[signal.name] = signal.value;
        }
    });
    // Save to cookie (expires in 365 days)
    const expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = cookieName + '=' + JSON.stringify(signalState) + ';expires=' + expires.toUTCString() + ';path=/';
    return signalState;
}

// Helper function to load signals from cookie
function loadSignalsFromCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return null;
}

// Helper function to clear all cookies
function clearAllCookies() {
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
	var filtered = ["Y_Value", "Col_Value", "X_Value", "Row_Value", "Count","None","O_Value","Color_Value","Cstr","Xstr","Ystr","Size_Value"];
    var filteredSet = {};
    for (var f = 0; f < filtered.length; ++f) filteredSet[filtered[f]] = 1;
    var seen = {};
    for (var j = 0; j < json.length; j++) {
        var keys = Object.keys(json[j]);
        for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            if (!seen[key] && !filteredSet[key]) {
                seen[key] = 1;
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

var corrmatrix = function(df, cols) {
	if (!cols) {
		cols = Object.keys(df[0]);
	}
	var colTypes = {};
	cols.forEach(function(col) {
		var isNum = true;
		for (var i = 0; i < df.length; ++i) {
			var v = df[i][col];
			if (v != null && v !== "NA" && !isNumeric(v)) {
				isNum = false;
				break;
			}
		}
		colTypes[col] = isNum ? "num" : "cat";
	});
	var corr = [];
	var cache = {};
	for (var ci = 0; ci < cols.length; ++ci) {
		for (var cj = 0; cj < cols.length; ++cj) {
			var col1 = cols[ci], col2 = cols[cj];
			var cacheKey = ci < cj ? ci + ',' + cj : cj + ',' + ci;
			var variance;
			if (cache[cacheKey] !== undefined) {
				variance = cache[cacheKey];
			} else {
				var pair = [];
				var isNum1 = colTypes[col1] === "num";
				var isNum2 = colTypes[col2] === "num";
				for (var i = 0; i < df.length; ++i) {
					var v1 = df[i][col1];
					var v2 = df[i][col2];
					if ((v1 !== 'NA' && v1 !== '') && (v2 !== 'NA' && v2 !== '')) {
						pair.push({col1: isNum1 ? Number(v1) : v1, col2: isNum2 ? Number(v2) : v2});
					}
				}
				var r = stats.cor.rank(pair, 'col1', 'col2');
				variance = r * r;
				cache[cacheKey] = variance;
			}
			corr.push({"var1": col1, "var2": col2, "% Variance": variance});
		}
	}
	return corr;
};

// Deep clone Vega spec, replacing -ccnm placeholders with element name
function cloneSpecWithElement(obj, element) {
	if (typeof obj === 'string') {
		return obj.indexOf('-ccnm') !== -1 ? obj.replace(/-ccnm/g, element) : obj;
	}
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	if (Array.isArray(obj)) {
		var arr = new Array(obj.length);
		for (var i = 0; i < obj.length; ++i) {
			arr[i] = cloneSpecWithElement(obj[i], element);
		}
		return arr;
	}
	var clone = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			clone[key] = cloneSpecWithElement(obj[key], element);
		}
	}
	return clone;
}

// Single-pass data preprocessing: NA cleaning, type detection, distinct counts
// Async with chunked yielding to prevent Chrome timeouts on large datasets
var PREPROCESS_CHUNK_SIZE = 5000;

function preprocessData(data, headers) {
	var columnInfo = {};
	var sum_cols = [];
	var col_names = [];
	for (var h = 0; h < headers.length; ++h) {
		columnInfo[headers[h]] = { isNum: true, distinctSet: {} };
	}

	function processChunk(startRow, endRow) {
		for (var k = startRow; k < endRow; ++k) {
			for (var h = 0; h < headers.length; ++h) {
				var header = headers[h];
				var v = data[k][header];
				if (typeof v === 'string' && NA_VALUES_SET.has(v)) {
					delete data[k][header];
					v = undefined;
				}
				if (v !== undefined && v !== null) {
					columnInfo[header].distinctSet[v] = 1;
				}
				if (v != null && v !== "" && columnInfo[header].isNum) {
					if (!isNumeric(v)) {
						columnInfo[header].isNum = false;
					}
				}
			}
		}
	}

	function finalize() {
		for (var h = 0; h < headers.length; ++h) {
			var header = headers[h];
			var info = columnInfo[header];
			info.distinctCount = Object.keys(info.distinctSet).length;
			delete info.distinctSet;
			sum_cols.push({ "feature": header, "type": info.isNum ? "num" : "cat" });
			col_names.push(header);
		}
		return { columnInfo: columnInfo, sum_cols: sum_cols, col_names: col_names };
	}

	// For small datasets, process synchronously and return a resolved promise
	if (data.length <= PREPROCESS_CHUNK_SIZE) {
		processChunk(0, data.length);
		return Promise.resolve(finalize());
	}

	// For large datasets, yield to the browser between chunks
	return new Promise(function(resolve) {
		var offset = 0;
		function nextChunk() {
			var end = Math.min(offset + PREPROCESS_CHUNK_SIZE, data.length);
			processChunk(offset, end);
			offset = end;
			if (offset < data.length) {
				setTimeout(nextChunk, 0);
			} else {
				resolve(finalize());
			}
		}
		nextChunk();
	});
}

var crossex = function crossex(element, data, options,widthid) {
	var ElementWidth=0;
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
	var loc_crossex_html = crossex_html;
	var element_node = document.getElementById(element);
	var mymax = 150;
	var loc_crossex_htmlRes = loc_crossex_html.replace(/\-ccnm/g, element);
	element_node.innerHTML = loc_crossex_htmlRes;
	ccPanel={};
	ccPanelProxy[element]={};
	var spec = cloneSpecWithElement(crossex_spec, element);
	var hide_panel=false;
	var editable=false;
	var exportable=true;
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

	// Preprocess data: extract headers, run single-pass NA cleaning + type detection
	var allHeaders = null;
	if (options) {
		for (var i = 0; i < options.length; ++i) {
			if (options[i].bind && options[i].bind.options) {
				allHeaders = options[i].bind.options;
				break;
			}
		}
	}
	if (!allHeaders && data && data.length > 0) {
		allHeaders = Object.keys(data[0]);
	}
	var preprocessPromise = allHeaders ? preprocessData(data, allHeaders) : Promise.resolve({ columnInfo: {}, sum_cols: [], col_names: [] });

	preprocessPromise.then(function(preprocessed) {
		if (options != null) {
			var repSignalsJson = JSON.parse(JSON.stringify(options).replace(/\-ccnm/g, element));
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
							headers.forEach(function(col) {
								var info = preprocessed.columnInfo[col];
								var ln = info ? info.distinctCount : 0;
								var isNum = info ? info.isNum : true;
								if (ln > 0 && signalFilter) {
									if ((!signalFilter.maxDistinct || ln < signalFilter.maxDistinct) &&
										(!signalFilter.numericOnly || isNum)) {
										finalheaders.push(col);
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
						spec.data[dataIndex]['transform']=[];
					}
				}
			}
		}
		spec.data[dataMap["mycolumns"]].values = preprocessed.sum_cols;
		if (data != null) {
			spec.data[dataMap["mydata"]].values = data;
		}
		spec.data[dataMap["col_names"]].values = preprocessed.col_names;
		var amyview;
		crossexloader(element,true);
		delay().then(function() { drawGraph(amyview,element,spec,widthNode,hide_panel,editable,exportable,signalMap,dataMap,data,preprocessed.col_names); });
	});
};


function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable,signalMap,dataMap,originalData,colNames) {
	if (myview) {
		myview.finalize();
	}
	if (!signalMap) { signalMap = createIndexMap(spec.signals); }
	if (!dataMap) { dataMap = createIndexMap(spec.data); }
	if (spec.signals[signalMap['Interactive_']]['value']==true) {
		setInteractiveSignals(spec, signalMap, true);
	}
	// Set up tab listeners
	TAB_CONFIG.forEach(function(tab) {
		var el = document.getElementById(tab.id + element);
		el.addEventListener('click', function(event) { ccOpenCity(event, tab.panel + element, element); });
	});
	var cookieName = 'vegaSignals_' + element;
	var savedSignals = loadSignalsFromCookie(cookieName);
	if (savedSignals) {
		spec.signals.forEach(function(signal) {
			if (signal.name && savedSignals.hasOwnProperty(signal.name)) {
				signal.value = savedSignals[signal.name];
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
						var expires = new Date();
						expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
						document.cookie = cookieName + '=' + JSON.stringify(pendingCookieState) + ';expires=' + expires.toUTCString() + ';path=/';
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
					delay().then(() => result.view.change('covariance', vega.changeset().insert(corrmatrix(originalData || data,colNames || spec.data[dataMap["col_names"]].values)).remove(function () {return true})).runAsync().then(crossexloader(element,false)));
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
				delay().then(() => drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable,signalMap,dataMap,originalData,colNames));
				return;
			});
		}
		crossexloader(element,false);
	}).catch(console.error);
}
