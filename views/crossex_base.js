<%-  include ../src/lz-string.js  %>

var add_css=true;
var crossex_spec = JSON.parse(itg_decomp("<%-crossex_spec%>"));
var crossex_html=itg_decomp("<%=crossex_html%>");
crossex_html.replace("itgversion","<%-itgversion%>");
var ccPanel,ccPanelProxy;
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
function getContentWidth (elementNode) {
	var styles = window.getComputedStyle(elementNode, null);
	var w=elementNode.clientWidth
	- parseFloat(styles.paddingLeft)
	- parseFloat(styles.paddingRight);
	if (w<0) {
		w=0;
	}
	return w
}
function setWidth_smart(element,widthNode) {
	if (!widthNode) {
		widthNode=document.getElementById(element);
	}
	var width = getContentWidth(widthNode);
	var buf=document.getElementById("cc_tabscontent" + element).offsetWidth+document.getElementById("defaultOpen"+element).offsetWidth;
	width=width-buf-20;
	if (width<40){width=40;}
	return width;
}

function ccOpenCity(evt, cityName,element) {
	var max_width=0;
	var cc_tabcontent=new Array(5);
	var tablinks=new Array(5);
	tablinks[0]=document.getElementById('defaultOpen'+element);
	tablinks[1]=document.getElementById('Axis_tablinks'+element);
	tablinks[2]=document.getElementById('Marks_tablinks'+element);
	tablinks[3]=document.getElementById('Fonts_tablinks'+element);
	tablinks[4]=document.getElementById('Filtering_tablinks'+element);
	tablinks[5]=document.getElementById('Coloring_tablinks'+element);
	tablinks[6]=document.getElementById('Margins_tablinks'+element);	
	cc_tabcontent[0]=document.getElementById('None'+element);
	cc_tabcontent[1]=document.getElementById('Axis'+element);
	cc_tabcontent[2]=document.getElementById('Marks'+element);
	cc_tabcontent[3]=document.getElementById('Fonts'+element);
	cc_tabcontent[4]=document.getElementById('Filtering'+element);
	cc_tabcontent[5]=document.getElementById('Coloring'+element);
	cc_tabcontent[6]=document.getElementById('Margins'+element);
	for (i = 0; i < cc_tabcontent.length; i++) {
		cc_tabcontent[i].style.display = "none";
	}
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	ccPanelProxy[element]=document.getElementById(cityName).offsetWidth;
	console.log('defaultOpen'+element,cityName);
	if(cityName=='None'+element) {
		document.getElementById("cc_tab" + element).style.opacity="0.5"

	} else {
		document.getElementById("cc_tab" + element).style.opacity="1"
		console.log('here');
	}
	//console.log('element',element,evt,cityName);
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
var getKeys = function (arr) {
	var key, keys = [];
	for (i = 0; i < arr.length; i++) {
		for (key in arr[i]) {
			if (arr[i].hasOwnProperty(key)) {
				keys[key]=1;
			}
		}
	}
	return Object.keys(keys);
};

var crossex = function crossex(element, data, options,widthid) {
	//legacy
	var ElementWidth=0;
	data=JSON.parse(JSON.stringify(data).replace(/\"null\"/gi,"\"\""));
	var widthNode=document.getElementById(element);	
	if(widthid) {
		widthNode=document.getElementById(widthid);	
	}
	ElementWidth=getContentWidth(widthNode);
	var loc_crossex_html =  crossex_html;
	var local_vgspec = JSON.stringify(crossex_spec);
	var element_node = document.getElementById(element);
	var mymax = 150;
	var loc_crossex_htmlRes = loc_crossex_html.replace(/\-ccnm/g, element);
	element_node.innerHTML = loc_crossex_htmlRes;
	ccPanel={};
	ccPanelProxy={};
	var res = local_vgspec.replace(/\-ccnm/g, element);
	var spec = JSON.parse(res);
	var mycols=[];
	
	var new_signalsString = JSON.stringify(options);
	if (new_signalsString != null) {
		repSignalsJson = JSON.parse(new_signalsString.replace(/\-ccnm/g, element));
		for (i=0;i<repSignalsJson.length;++i) {
			var index = Index(spec.signals, repSignalsJson[i].name);
			spec.signals[index].value = repSignalsJson[i].value;
			if (repSignalsJson[i].bind != null) {
				if (repSignalsJson[i].bind.element != null) {
					spec.signals[index].bind.element = repSignalsJson[i].bind.element;
				}
				if (repSignalsJson[i].bind.options != null) {
					var headers = repSignalsJson[i].bind.options;
					var finalheaders = [];
					headers.forEach(function(element) {
						var distinct = [...new Set(data.map(x => x[element]))];
						var ln = distinct.length;
						if (ln > 1) {
							
							if (repSignalsJson[i].name == "Facet_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Filter_Out_From" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Facet_Rows_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Facet_Cols_By" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Filter_Additional" && ln < mymax) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Sum_By" ) {
								finalheaders.push(element);								
							} else if (repSignalsJson[i].name == "Size_By" ) {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "X_Axis") {
								finalheaders.push(element);
							} else if (repSignalsJson[i].name == "Y_Axis") {
								finalheaders.push(element);
								if(ln<10000){mycols.push(element)};
							} else if (repSignalsJson[i].name == "Color_By") {
								finalheaders.push(element);
							}
						}
					});
					if (!finalheaders.includes.None) {
						finalheaders.push("None");
					}
					spec.signals[index].bind.options = JSON.parse(JSON.stringify(finalheaders));
				}
			}
			if (repSignalsJson[i].value != null) {
				spec.signals[index].value = repSignalsJson[i].value;
			}
		}
	}
	spec.data[Index(spec.data, "columns")].values = JSON.parse(JSON.stringify(mycols));
	if (data != null) {
		spec.data[Index(spec.data, "mydata")].values = JSON.parse(JSON.stringify(data));
	}
	if (add_css) {
		var css = itg_decomp("<%=cc_css%>"),
		head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style');
		head.appendChild(style);
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		add_css=false;
	}
	drawGraph(element,spec,widthNode);
};
function drawGraph(element,spec,widthNode) {	
	vegaEmbed('#view_crossex' + element, spec, {
		renderer: 'canvas',
		width: setWidth_smart(element,widthNode),
		tooltip: true,
		warn: false,
		actions: {
			export: true,
			source: false,
			editor: false,
			editorURL: "https://itg.usc.edu/editor",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		ccPanelProxy = new Proxy(ccPanel, {
			set: function (target, key, value) {
				target[key] = value;
				result.view.width(setWidth_smart(element,widthNode)).run();
				return true;
			}
		});	
		initAndListen('show_scatter_graph', 'Scatter_Options' + element, result,element);
		initAndListen('show_hist_graph', 'Hist_Options' + element, result,element);
		initAndListen('show_grid_graphs', 'Grid_Options' + element, result,element);
		initAndListen('show_stacked_graphs', 'Stacked_Options' + element, result,element);
		initAndListen('show_box_graphs', 'Violin_Options' + element, result,element);
		window.addEventListener('resize', function(event) {
			result.view.width(setWidth_smart(element,widthNode)).run();
		});	
		var checkbox = document.querySelector('#Interactive_'+element + '> div > label > input[type=checkbox]');
		checkbox.addEventListener('change', (event) => {
			result.finalize();
			delete result.view;
			delete result.spec;
			delete result.vgSpec;
			delete result.finalize;
			if (event.currentTarget.checked) {
				spec.signals[Index(spec.signals, 'xcur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}];
				spec.signals[Index(spec.signals, 'ycur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}];
				spec.signals[Index(spec.signals, 'Interactive_')]['value']=true;
				spec.signals[Index(spec.signals, 'delta')]['on']=[{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update":  "down ? [x()-down[0], y()-down[1]] : [0,0]"}];
				spec.signals[Index(spec.signals, 'anchor')]['on']=[{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}];
				spec.signals[Index(spec.signals, 'zoom')]['on']=[{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}];
				spec.signals[Index(spec.signals, 'dist1')]['on']=[{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}];
				spec.signals[Index(spec.signals, 'dist2')]['on']=[{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}];
				spec.signals[Index(spec.signals, 'xdom')]['on']=[{"events": {"signal": "delta"},"update": "[xcur[0] + span(xcur) * delta[0] / Plot_Width, xcur[1] + span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}];
				spec.signals[Index(spec.signals, 'ydom')]['on']=[{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}];
				spec.signals[Index(spec.signals, 'down')]['on']=[{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}];
				drawGraph(element,spec,widthNode);
			} else {
				delete spec.signals[Index(spec.signals, 'xcur')]['on'];
				spec.signals[Index(spec.signals, 'Interactive_')]['value']=false;
				delete spec.signals[Index(spec.signals, 'ycur')]['on'];
				delete spec.signals[Index(spec.signals, 'delta')]['on'];
				delete spec.signals[Index(spec.signals, 'anchor')]['on'];
				delete spec.signals[Index(spec.signals, 'zoom')]['on'];
				delete spec.signals[Index(spec.signals, 'dist1')]['on'];
				delete spec.signals[Index(spec.signals, 'dist2')]['on'];
				delete spec.signals[Index(spec.signals, 'xdom')]['on'];
				delete spec.signals[Index(spec.signals, 'ydom')]['on'];
				delete spec.signals[Index(spec.signals, 'down')]['on'];
				drawGraph(element,spec,widthNode);
			}
			return;
		});			
	}).catch(console.error);
}