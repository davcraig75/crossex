<%-  include ../src/lz-string.js  %>

var add_css=true;
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("<%-crossex_spec%>"));
var crossex_html=itgz.decompressFromEncodedURIComponent("<%=crossex_html%>");
crossex_html.replace("itgversion","<%-itgversion%>");
var ccPanel,ccPanelProxy;
ccPanelProxy={};
ccPanel={};
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

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

var json2csv = function json2csv(filename,json) {
    var fields = [];
	var filtered = ["Y_Value", "Col_Value", "X_Value", "Row_Value", "Count","None","O_Value","Color_Value","Cstr","Xstr","Ystr","Size_Value"];
    for (var j=0;j<json.length;j++) {
        Object.keys(json[j]).forEach(function(key){
            if(fields.indexOf(key) == -1 && !(filtered.includes(key))) 
            {
                fields.push(key);
            }
        });
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
    a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);	
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
	width=getContentWidth(widthNode)-buf;	
	if (width<40){width=40;}
	return width;
}

function ccOpenCity(evt, cityName,element) {
	var max_width=0;
	var cc_tabcontent=new Array(6);
	var tablinks=new Array(6);
	tablinks[0]=document.getElementById('defaultOpen'+element);
	tablinks[1]=document.getElementById('Search_tablinks'+element);
	tablinks[2]=document.getElementById('Charts_tablinks'+element);
	tablinks[3]=document.getElementById('Axis_tablinks'+element);
	tablinks[4]=document.getElementById('Marks_tablinks'+element);
	tablinks[5]=document.getElementById('Fonts_tablinks'+element);
	tablinks[6]=document.getElementById('Filtering_tablinks'+element);
	tablinks[7]=document.getElementById('Coloring_tablinks'+element);
	tablinks[8]=document.getElementById('Margins_tablinks'+element);	
	cc_tabcontent[0]=document.getElementById('None'+element);
	cc_tabcontent[1]=document.getElementById('Search'+element);
	cc_tabcontent[2]=document.getElementById('Charts'+element);
	cc_tabcontent[3]=document.getElementById('Axis'+element);
	cc_tabcontent[4]=document.getElementById('Marks'+element);
	cc_tabcontent[5]=document.getElementById('Fonts'+element);
	cc_tabcontent[6]=document.getElementById('Filtering'+element);
	cc_tabcontent[7]=document.getElementById('Coloring'+element);
	cc_tabcontent[8]=document.getElementById('Margins'+element);
	for (var i = 0; i < cc_tabcontent.length; i++) {
		cc_tabcontent[i].style.display = "none";
	}
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	ccPanelProxy[element][element]=document.getElementById(cityName).offsetWidth;
	//if(cityName=='None'+element) {
	//	document.getElementById("cc_tab" + element).style.opacity="0.5"
	//} else {
	//	document.getElementById("cc_tab" + element).style.opacity="1"
	//}
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

var corrmatrix =  function (df,cols) {
	if (!cols) {
		cols=Object.keys(df[0])
	}
	var colTypes={};
	var corr=[];
	cols.forEach(function(col) {  
		var isNum=true;
		df.forEach(function(row) {
			if (!isNumeric(row[col]) && row[col] != null && row[col] != "NA") {
				isNum=false;
			}
		});
		if (isNum) {
			colTypes[col]="num";
		} else {
			colTypes[col]="cat";
		}
	});
	var ca=0;
	cols.forEach(function(col1) {  
		if (!corr[col1]) {
			corr[col1]={};
		}
		cols.forEach(function(col2) { 
			var pair=[];
			for(i=0;i<df.length;++i) {
				var v1=df[i][col1];
				var v2=df[i][col2];
				if(colTypes[col1]=="num") {
					v1=Number(v1);
				}
				if(colTypes[col2]=="num") {
					v2=Number(v2);
				}				
				if((df[i][col1]!='NA' && df[i][col1]!='')  && (df[i][col2]!='NA' && df[i][col2]!='')) {
					pair.push({col1:v1,col2:v2})
				}
			}
			if(colTypes[col1]=="cat" && colTypes[col2]=="num") {
			corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			} else if (colTypes[col2]=="cat" && colTypes[col1]=="num") {
			corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			} else {
				corr.push({"var1":col1,"var2":col2,"% Variance":Math.pow(stats.cor.rank(pair,'col1','col2'),2)});
			}
			++ca;
		});		
	});
	return corr;
};

var icc=function icc(df,col1,col2) {
	var distinct = [...new Set(df.map(x => x[col1]))]; 
	var catCount=distinct.length;
	var c=0;
	var varianceSum=0;
	var icc=0;
	if(catCount<20 && catCount>1) {		
		while (catCount--) {
			var len = df.length;
			var td=[];
			while (len--) {
				if(df[len][col1]==distinct[catCount]) {
					td.push({'c':df[len][col2]});
				}
			}
			varianceSum=varianceSum+stats.variance(td,'c');
			c++;
		}
		var varComp=varianceSum/c;
		var avar=stats.variance(df,col2);
		var icc=varComp/avar;	
		icc=Math.min(1,Math.max(1-icc,0));
	}
	return icc;
}

var crossex = function crossex(element, data, options,widthid) {
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
		for (i=0;i<repSignalsJson.length;++i) {
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
			var index = Index(spec.signals, repSignalsJson[i].name);			
			
			let na_values = ["na", "NA", "null","NULL","Null","unknown","Unknown","N/A","n/a","#N/A"];
			if (index>=0){
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
							var isNum=true;
							if (!datatyped) {
								for (k=0;k<data.length;++k) {
									var v=data[k][element];
									if (na_values.includes(v)) {
										delete data[k][element];
									} 
									if (data[k][element]!=null && data[k][element]!="") {
										if (!isNumeric(data[k][element])) {
											isNum=false;
										}
									}						
								}									
								if (isNum) {
									sum_cols.push({"feature":element,"type":"num"})
								} else {
									sum_cols.push({"feature":element,"type":"cat"})
								}
								col_names.push(element);								
							}
							if (ln > 0) {							
								if (repSignalsJson[i].name == "Facet_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_Out_From" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_By_Value" && isNum) {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "Facet_Rows_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Facet_Cols_By" && ln < mymax) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Filter_Additional" && ln < mymax) {
									finalheaders.push(element);						
								} else if (repSignalsJson[i].name == "Sum_By" && isNum) {
									finalheaders.push(element);								
								} else if (repSignalsJson[i].name == "Size_By" ) {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "X_Axis") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Search_By") {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "SortX_By") {
									finalheaders.push(element);									
								} else if (repSignalsJson[i].name == "Y_Axis") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Stroke_By") {
									finalheaders.push(element);
								} else if (repSignalsJson[i].name == "Color_By") {
									finalheaders.push(element);
								}
							}
						});
						datatyped=true;
						if (!finalheaders.includes.None) {
							finalheaders.push("None");
						}
						if (!finalheaders.includes.Sum && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Sum");
						}
						if (!finalheaders.includes.Count && (repSignalsJson[i].name == "X_Axis" || repSignalsJson[i].name == "Y_Axis")) {
							finalheaders.push("Count");
						}					
						spec.signals[index].bind.options = JSON.parse(JSON.stringify(finalheaders));
					}
				}
				if (repSignalsJson[i].value != null) {
					spec.signals[index].value = repSignalsJson[i].value;
				}
			} else {
				var dataIndex = Index(spec.data, repSignalsJson[i].name);
				if (dataIndex>=0){
					if ('values' in repSignalsJson[i]) {spec.data[dataIndex]['values'] = JSON.stringify(repSignalsJson[i].values);}
					spec.data[dataIndex]['transform']=JSON.parse("[]");
				}
			}
		}
	}
	spec.data[Index(spec.data, "mycolumns")].values = JSON.parse(JSON.stringify(sum_cols));
	if (data != null) {
		spec.data[Index(spec.data, "mydata")].values = JSON.parse(JSON.stringify(data));
	}
	spec.data[Index(spec.data, "col_names")].values = col_names;
	//spec.data[Index(spec.data, "covariance")].values=corrmatrix(spec.data[Index(spec.data, "mydata")].values,col_names);

	let amyview;
	crossexloader(element,true);
	delay().then(() => drawGraph(amyview,element,spec,widthNode,hide_panel,editable,exportable));
};


function drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable) {
	if (myview) {
		myview.finalize();
	 }
	if (spec.signals[Index(spec.signals, 'Interactive_')]['value']==true) {
		spec.signals[Index(spec.signals, 'xcur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(xdom)"}];
		spec.signals[Index(spec.signals, 'ycur')]['on']=[{"events": "mousedown, touchstart, touchend","update": "slice(ydom)"}];
		spec.signals[Index(spec.signals, 'delta')]['on']=[{"events": [{"source": "scope","type": "mousemove","consume": true,"between": [{"type": "mousedown"},{"source": "scope", "type": "mouseup"}]},{"type": "touchmove","consume": true,"filter": "event.touches.length === 1"}],"update":  "down ? [x()-down[0], y()-down[1]] : [0,0]"}];
		spec.signals[Index(spec.signals, 'anchor')]['on']=[{"events": "wheel","update": "[invert('x_cont_scale', x()), invert('y_cont_scale', y())]"},{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "[(xdom[0] + xdom[1]) / 2, (ydom[0] + ydom[1]) / 2]"}];
		spec.signals[Index(spec.signals, 'zoom')]['on']=[{"events": "wheel!","force": true,"update": "pow(1.001, event.deltaY * pow(16, event.deltaMode))"},{"events": {"signal": "dist2"},"force": true,"update": "dist1 / dist2"}];
		spec.signals[Index(spec.signals, 'dist1')]['on']=[{"events": {"type": "touchstart","filter": "event.touches.length===2"},"update": "pinchDistance(event)"},{"events": {"signal": "dist2"}, "update": "dist2"}];
		spec.signals[Index(spec.signals, 'dist2')]['on']=[{"events": {"type": "touchmove","consume": true,"filter": "event.touches.length===2"},"update": "pinchDistance(event)"}];
		spec.signals[Index(spec.signals, 'xdom')]['on']=[{"events": {"signal": "delta"},"update": "[xcur[0] - span(xcur) * delta[0] / Plot_Width, xcur[1] - span(xcur) * delta[0] / Plot_Width]"},{"events": {"signal": "zoom"},"update": "[anchor[0] + (xdom[0] - anchor[0]) * zoom, anchor[0] + (xdom[1] - anchor[0]) * zoom]"}];
		spec.signals[Index(spec.signals, 'ydom')]['on']=[{"events": {"signal": "delta"},"update": "[ycur[0] + span(ycur) * delta[1] / Plot_Height, ycur[1] + span(ycur) * delta[1] / Plot_Height]"},{"events": {"signal": "zoom"},"update": "[anchor[1] + (ydom[0] - anchor[1]) * zoom, anchor[1] + (ydom[1] - anchor[1]) * zoom]"}];
		spec.signals[Index(spec.signals, 'down')]['on']=[{"events": "touchend", "update": "down"},{"events": "mousedown, touchstart","update": "xy()"}];
	}
	var defaultOpen = document.getElementById('defaultOpen'+element);
	defaultOpen.addEventListener('click',function(event) {ccOpenCity(event, 'None'+element,element)});
	var Search_tablinks = document.getElementById('Search_tablinks'+element);
	Search_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Search'+element,element)});	
	var Charts_tablinks = document.getElementById('Charts_tablinks'+element);
	Charts_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Charts'+element,element)});
	var Axis_tablinks = document.getElementById('Axis_tablinks'+element);
	Axis_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Axis'+element,element)});
	var Marks_tablinks = document.getElementById('Marks_tablinks'+element);
	Marks_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Marks'+element,element)});
	var Fonts_tablinks = document.getElementById('Fonts_tablinks'+element);
	Fonts_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Fonts'+element,element)});
	var Coloring_tablinks = document.getElementById('Coloring_tablinks'+element);
	Coloring_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Coloring'+element,element)});
	var Filtering_tablinks = document.getElementById('Filtering_tablinks'+element);
	Filtering_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Filtering'+element,element)});
	var Margins_tablinks = document.getElementById('Margins_tablinks'+element);
	Margins_tablinks.addEventListener('click',function(event) {ccOpenCity(event, 'Margins'+element,element)});	
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
			editorURL: "https://itg.usc.edu/editor",
			scaleFactor: 2
		},
		defaultStyle: true
	}).then(function(result) {
		myview = result.view.run();
		window.addEventListener('resize', function(event) {
			result.view.width(setWidth_smart(element,widthNode)).run();
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
					delay().then(() => result.view.change('covariance', vega.changeset().insert(corrmatrix(spec.data[Index(spec.data, "mydata")].values,spec.data[Index(spec.data, "col_names")].values)).remove(function () {return true})).runAsync().then(crossexloader(element,false)));						
				} else {
					document.getElementById("Violin_Options"+element).style['display']='block';
				}				
				myview = result.view;
			});
			checkbox.addEventListener('change', (event) => {
				var new_signals_ar=["X_Axis","Search_By","Y_Axis","Facet_Rows_By","Facet_Cols_By","Color_By","Size_By","SortX_By","Stats_","LogY_","LogX_","Interactive_","Points_","Map_XY_Cat_","Grid_Radius","Boxplot_","Violin_","Outliers_","Dashes_","LogY_","Jitter_" ,"Contours_","Regression_","Histogram_","Histogram_Ratio","Histogram_Bins_Size","Sum_By","AxisTitle_Font","AxisFontSize","X_Axis_Angle","Y_Axis_Angle","Title_Font","Legend_Font","TickCount","Opacity_By","Jitter_Radius","Dash_Height","Violin_Width","Dash_Width","Dash_Radius","Max_Point","Min_Point","Reverse_X","Reverse_Y","Reverse_Size","Filter_Out_From","Filter_Additional","Filter_If","Datatype_X","Datatype_Y","Datatype_Color","Filter_By_Value","filter_min","filter_max","Include_Only","Palette","Reverse_Color","Grid_Opacity","Boxplot_Opacity","Opacity_","Contour_Opacity","Cnt_St_Opacity","Dash_Opacity","Manual_Color","Max_Color","Min_Color","Max_Plot_Width","Max_Plot_Height","Plot_Padding","Title_Height","X_Axis_Height","Row_Header_Width","Row_Height","Max_Facets","Legend_Height","Legend_Cols"];			
				for (i = 0; i < new_signals_ar.length; i++) {
					spec.signals[Index(spec.signals, new_signals_ar[i])]['value']=result.view.signal(new_signals_ar[i]);
				}
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
					myview = result.view;
					delay().then(() =>drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable));
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
					myview = result.view;;
					delay().then(() => drawGraph(myview,element,spec,widthNode,hide_panel,editable,exportable));
				}
				return;
			});	
		}
		crossexloader(element,false);			
	}).catch(console.error);
}
