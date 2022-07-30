(function() {
  var callWithJQuery;

  callWithJQuery = function(pivotModule) {
    if (typeof exports === "object" && typeof module === "object") {
      return pivotModule(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
      return define(["jquery"], pivotModule);
    } else {
      return pivotModule(jQuery);
    }
  };

  callWithJQuery(function($) {
    return $.pivotUtilities.export_renderers = {
      "TSV Export": function(pivotData, opts) {
        var agg, colAttrs, colKey, colKeys, defaults, i, j, k, l, len, len1, len2, len3, len4, len5, m, n, r, result, row, rowAttr, rowAttrs, rowKey, rowKeys, text;
        defaults = {
          localeStrings: {}
        };
        $(".pvtRendererArea").css("display","block");
        opts = $.extend(true, {}, defaults, opts);
        rowKeys = pivotData.getRowKeys();
        if (rowKeys.length === 0) {
          rowKeys.push([]);
        }
        colKeys = pivotData.getColKeys();
        if (colKeys.length === 0) {
          colKeys.push([]);
        }
        rowAttrs = pivotData.rowAttrs;
        colAttrs = pivotData.colAttrs;
        result = [];
        row = [];
        for (i = 0, len = rowAttrs.length; i < len; i++) {
          rowAttr = rowAttrs[i];
          row.push(rowAttr);
        }
        if (colKeys.length === 1 && colKeys[0].length === 0) {
          row.push(pivotData.aggregatorName);
        } else {
          for (j = 0, len1 = colKeys.length; j < len1; j++) {
            colKey = colKeys[j];
            row.push(colKey.join("-"));
          }
        }
        result.push(row);
        for (k = 0, len2 = rowKeys.length; k < len2; k++) {
          rowKey = rowKeys[k];
          row = [];
          for (l = 0, len3 = rowKey.length; l < len3; l++) {
            r = rowKey[l];
            row.push(r);
          }
          for (m = 0, len4 = colKeys.length; m < len4; m++) {
            colKey = colKeys[m];
            agg = pivotData.getAggregator(rowKey, colKey);
            if (agg.value() != null) {
              row.push(agg.value());
            } else {
              row.push("");
            }
          }
          result.push(row);
        }
        text = "";
        for (n = 0, len5 = result.length; n < len5; n++) {
          r = result[n];
          text += r.join("\t") + "\n";
        }
        return $("<textarea>").text(text).css({
          width: ($(window).width() / 2) + "px",
          height: ($(window).height() / 2) + "px"
        });
      },
      "Crossex": function(pivotData, opts) {
        var agg, colAttrs, colKey, colKeys, defaults, i, j, k, l, len, len1, len2, len3, len4, len5, m, n, r, result, row, rowAttr, rowAttrs, rowKey, rowKeys, text;
        defaults = {
          localeStrings: {}
        };                
        $(".pvtRendererArea").css("display","none !important");
        opts = $.extend(true, {}, defaults, opts);        
        var headers = Object.keys(pivotData.input[0]);
        rowKeys = pivotData.getRowKeys();
        if (rowKeys.length === 0) {
          rowKeys.push([]);
        }
        colKeys = pivotData.getColKeys();
        if (colKeys.length === 0) {
          colKeys.push([]);
        }
        rowAttrs = pivotData.rowAttrs;
        colAttrs = pivotData.colAttrs;
        result = [];
        row = [];
        for (i = 0, len = rowAttrs.length; i < len; i++) {
          rowAttr = rowAttrs[i];
          row.push(rowAttr);
        }
        if (colKeys.length === 1 && colKeys[0].length === 0) {
          row.push(pivotData.aggregatorName);
        } else {
          for (j = 0, len1 = colKeys.length; j < len1; j++) {
            colKey = colKeys[j];
            row.push(colKey.join("-"));
          }
        }
        result.push(row);
        for (k = 0, len2 = rowKeys.length; k < len2; k++) {
          rowKey = rowKeys[k];
          row = [];
          for (l = 0, len3 = rowKey.length; l < len3; l++) {
            r = rowKey[l];
            row.push(r);
          }
          for (m = 0, len4 = colKeys.length; m < len4; m++) {
            colKey = colKeys[m];
            agg = pivotData.getAggregator(rowKey, colKey);
            if (agg.value() != null) {
              row.push(agg.value());
            } else {
              row.push("");
            }
          }
          result.push(row);
        }
        var X_Axis="None";
        var Y_Axis="None";
        var Color_By="None";
        var Facet_Rows_By="None";
        var Facet_Cols_By="None"; 
        
        var data=pivotData.input;   
        if (rowAttrs.length > 0 || colAttrs.length>0) {
          data=result;
          headers = Object.keys(data[0]);
        }
        console.log('data',data,'rowattrs',rowAttrs,'colattrs',colAttrs,'colKeys',colKeys,'rowKeys',rowKeys); 
           
        if (rowAttrs.length > 0) {X_Axis=rowKeys[0];headers=rowKeys}
        if (colAttrs.length > 0) {Y_Axis=colAttrs[0];}
        if (rowAttrs.length > 1) {Color_By=rowAttrs[1];}
        if (rowAttrs.length > 2) {Facet_Rows_By=rowAttrs[2];}
        if (colKeys.length > 1) {Facet_Cols_By=colAttrs[1];}

        var melement=document.querySelector("#pivot_id > table > tbody > tr:nth-child(3) ");
        var elemDiv = document.createElement('div');
        elemDiv.setAttribute("id","smartplot_id");
        melement.appendChild(elemDiv);
        crossex("smartplot_id", data, [
          {"editable":true},
          {"exportable":true},
          {"link":true},		      
          {"name": "X_Axis","value": X_Axis,"bind": {"options": headers}}, 
          {"name": "Y_Axis","value": Y_Axis,"bind": {"options": headers}}, 
          {"name": "Color_By","value": Color_By,"bind": {"options": headers}}, 
          {"name": "Facet_Rows_By","value": Facet_Rows_By,"bind": {"options": headers}}, 
          {"name": "Facet_Cols_By","value": Facet_Cols_By,"bind": {"options": headers}}, 
          {"name": "Sum_By","value": "None","bind": {"options": headers}}, 
          {"name": "Opacity_By","value": "None","bind": {"options": headers}}, 
          {"name": "Facet_Cols_By","value": "None","bind": {"options": headers}}, 
          {"name": "Filter_By_Value","value": "None","bind": {"options": headers}}, 
          {"name": "Filter_Additional","value": "None","bind": {"options": headers}}, 
          {"name": "Stroke_By","value": "None","bind": {"options": headers}}
        ]);

        return $("<textarea>").css("display","none");
        
        
      }      
    };
  });

}).call(this);
