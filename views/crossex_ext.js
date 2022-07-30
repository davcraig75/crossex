
function initDrag(e) {
	startX = e.clientX;
	startY = e.clientY;
	startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
	startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
	document.documentElement.addEventListener('mousemove', doDrag, false);
	document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
	p.style.width = (startWidth + e.clientX - startX) + 'px';
	p.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
	document.documentElement.removeEventListener('mousemove', doDrag, false);
	document.documentElement.removeEventListener('mouseup', stopDrag, false);
	var elmnt = document.getElementById(myid);
	myresult.view.width(setWidth_smart(myid)).signal('chart_height_min', elmnt.offsetHeight - 200).run();
}

function draggable(myid) {
	p = document.getElementById(myid);
	p.addEventListener('click', function init() {
		p.removeEventListener('click', init, false);
		p.className = p.className + ' resizable';
		var resizer = document.createElement('div');
		resizer.className = 'resizer';
		p.appendChild(resizer);
		resizer.addEventListener('mousedown', initDrag, false);
	}, false);
}

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
	headers.forEach(function(element) {
		var distinct = [...new Set(struct.map(x => x[element]))];
		var ln = distinct.length;
		if (typeof(struct[0][element]) === 'string') {
			if (ln < max_cat && ln > my_low_cat ) {
				my_low_cat = ln;
				max_cat_name = element;

			}		
			if (ln < max_cat && ln < my_high_cat ) {
				my_low_cat = ln;
				min_cat_name = element;
			}					
			if (ln >= 1 & ln <= min_cat & alt_cat_name == "None" & min_cat_name != "None") {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 & ln <= min_cat) {
				min_cat = ln;
				min_cat_name = element;
			} else if (ln >= 1 & ln <= alt_cat) {
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
	return [x_axis_name, y_axis_name, split_to_panels1_by_name, split_to_panels1_by_name, color_by_name];
}
document.getElementById("default_data").onclick = function fun() {
	document.getElementById("myccinput").innerHTML = itg_decomp("<%=demo%>");
};

document.getElementById("graph_button").onclick = function clicks() {
	toggle("myccinput");
	string = document.getElementById("myccinput").value;
	var n = string.search(/\t/);
	var struct;
	if (n > 0) {
		struct = d3.tsvParse(string, d3.autoType);
	} else {
		struct = d3.csvParse(string, d3.autoType);
	}
	var headers = struct.columns;
	var axis = optimize_axis(headers, struct);
	var init_val=headers[1];
	if (headers.length<4) {init_val="None"} 
	crossex("smartplot_id", struct, [
		{"editable":true},
		{"exportable":true},
		{"link":true},		

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
		"value":  axis[4],
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
	}],"About");
}
/*
	toggle("myccinput");
	string = document.getElementById("myccinput").value;
	var n = string.search(/\t/);
	var struct;
	if (n > 0) {
		struct = d3.tsvParse(string, d3.autoType);
	} else {
		struct = d3.csvParse(string, d3.autoType);
	}
	var headers = struct.columns;
	var axis = optimize_axis(headers, struct);
	var init_val=headers[1];
	if (headers.length<4) {init_val="None"} 


	
	    // When using the 'TSV Export' Renderer, you can
    // copy from this textarea straight into Excel.
//
    $(function(){
        var renderers = $.extend($.pivotUtilities.renderers,
		$.pivotUtilities.export_renderers);
		$("#pivot_id").pivotUI(struct, {
			renderers: renderers,
			cols: [], rows: [],
			rendererName: "Crossex"
		});
		
    });
};
*/

