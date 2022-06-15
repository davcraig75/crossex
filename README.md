# Crossex
Data Visualization of Dataframes and Tables
**Version: 1.10210426**

## To do

1. Add summary preview
2. Add correlation view
3. Add chromosome/type
4. Add BED support
5. Add Kaplan Meyer
6. Add Pie
7. Distribution
## Installation

This page provides for building and installation of crosscorrelate.  There are typically **2** to **3** lines of HTML required.

* Add `<div>` element with the `id` that will hold the graph. Style parameters may be added here.
* Source the `crosscorrelate.js` script either in header or in the `<body>`. 
* Call the `crosscorrelate` function, adding in optional parameters.

### Unit Test 1

Paste `HTML` into an existing page.

``` 
<!-- element where graph is pasted-->
<div id="crosscorrelate_el" style="max-width:1000px"></div>

<!-- Script Loading in Data-->
<script type="text/javascript">
var myjson=fetch('https://raw.githubusercontent.com/davcraig75/crosscorrelate/main/public/iris.json')
.then(res => res.json()).then((out) => {
     console.log('loaded sample JSON! ', out);
});
</script>

<!-- Calling CrossCorrelate Function-->
<script type="text/javascript" src="https://raw.githubusercontent.com/davcraig75/crosscorrelate/main/crosscorrelate.js">
   var choices=["sepalLength","sepalWidth","species","petalLength","petalWidth"];
	CrossCorrelate("crosscorrelate_el", myjson, [
		{"name": "X_Axis","value":"sepalLength","bind": {"options": choices},
		{"name": "Y_Axis","value":"sepalLength","bind": {"options": choices},
		{"name": "Facet_Rows_By","value": "None","bind": {"options": choices},
		{"name": "Facet_Cols_By","value": "None","bind": {"options": choices},
		{"name": "Size_By","value": "None","bind": {"options": choices},
		{"name": "Filter_Additional","value": "None","bind": {"options": choices}
	]);	
</script>
```


## Browser Support

Browser supported include all Browsers supporting ES6, or typically 2016 version or later for Chrome, Firefox, Opera, Safari, Edge.