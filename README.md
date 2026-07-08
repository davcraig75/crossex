# Crossex

**Interactive data exploration and visualization for tables and dataframes.**

**[▶ Try the live demo](https://davcraig75.github.io/crossex/)** — the full app runs client-side on GitHub Pages; paste your own data or load the demos.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.20260225-green.svg)](https://github.com/davcraig75/crossex)

Crossex lets users paste or load tabular data and instantly explore it through dynamically configurable charts. Drop a CSV into the tool and start dragging variables onto axes, facets, colors, and filters -- no code required. Embed it on any web page with a single `<script>` tag, or run the full interactive designer locally.

Built on [Vega](https://vega.github.io/vega/), a declarative visualization grammar.

---

## Table of Contents

- [Why Crossex](#why-crossex)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Embedding on a Web Page](#embedding-on-a-web-page)
- [API Reference](#api-reference)
- [User Guide](#user-guide)
- [Chart Types](#chart-types)
- [Control Panel Reference](#control-panel-reference)
- [Project Structure](#project-structure)
- [Building the Library](#building-the-library)
- [Browser Support](#browser-support)
- [License](#license)

---

## Why Crossex

Most charting libraries require you to decide your chart type and axis mappings upfront. Crossex takes a different approach: give it a table, and it builds a complete exploration environment where users can:

- **Switch axes, colors, facets, and filters on the fly** using dropdown menus
- **Automatically detect** whether columns are numeric or categorical and adjust chart types accordingly
- **Facet data into subplot grids** by any categorical variable
- **Filter, search, and drill down** without writing code
- **Export** the current view as PNG or download filtered data as CSV

It is designed for scenarios where you want to hand someone a dataset and let them explore it themselves -- dashboards, reports, research tools, or internal apps.

---

## Quick Start

### Try it instantly

```bash
git clone https://github.com/davcraig75/crossex.git
cd crossex
npm install
npm start
```

Open `http://localhost:8080`. Paste any CSV or TSV data into the text area and click **Graph Data**.

### Embed on any page in 3 lines

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<div id="my_graph"></div>
<script src="crossex.js"></script>
```

Then call `crossex()` with your data (see [Embedding](#embedding-on-a-web-page) below).

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)

### Install

```bash
git clone https://github.com/davcraig75/crossex.git
cd crossex
npm install
```

### Run the local server

```bash
npm start
```

Starts an Express server on port **8080** (configurable via `API_PORT` environment variable).

| Route | Description |
|-------|-------------|
| `http://localhost:8080/` | Standalone graph designer with data input |

### Run in development mode

```bash
npm run dev
```

Uses [nodemon](https://nodemon.io/) for auto-reload on file changes.

### Deploying the live demo (GitHub Pages)

The app is fully client-side, so it runs on GitHub Pages as static files. `npm run build:pages` renders the standalone page and its local libraries into `docs/`; commit that folder and point Pages at it (Settings ▸ Pages ▸ Deploy from a branch ▸ `/docs`). The published demo lives at <https://davcraig75.github.io/crossex/>.

---

## Embedding on a Web Page

Crossex can be embedded on any HTML page. The `crossex.js` library bundles the Vega engine -- the only external dependency is D3 (for CSV/TSV parsing).

### Minimal Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Crossex Example</title>
</head>
<body>
    <script src="https://d3js.org/d3.v7.min.js"></script>

    <!-- Container element -->
    <div id="my_graph" style="max-width:1200px"></div>

    <!-- Crossex library (Vega is bundled) -->
    <script src="crossex.js"></script>

    <script>
        fetch('data.json')
            .then(res => res.json())
            .then(function(data) {
                var columns = Object.keys(data[0]);

                crossex("my_graph", data, [
                    {"editable": true},
                    {"exportable": true},
                    {"name": "X_Axis",    "value": columns[0], "bind": {"options": columns}},
                    {"name": "Y_Axis",    "value": columns[1], "bind": {"options": columns}},
                    {"name": "Color_By",  "value": "None",     "bind": {"options": columns}},
                    {"name": "Size_By",   "value": "None",     "bind": {"options": columns}},
                    {"name": "Facet_Rows_By", "value": "None", "bind": {"options": columns}},
                    {"name": "Facet_Cols_By", "value": "None", "bind": {"options": columns}}
                ]);
            });
    </script>
</body>
</html>
```

### Loading CSV/TSV Directly

```js
// D3 auto-detects numeric vs string columns
var data = d3.csvParse(csvString, d3.autoType);
var columns = data.columns;

crossex("my_graph", data, [
    {"editable": true},
    {"exportable": true},
    {"name": "X_Axis", "value": columns[0], "bind": {"options": columns}},
    {"name": "Y_Axis", "value": columns[1], "bind": {"options": columns}}
]);
```

### Pre-configured Dashboard

You can lock specific axes and hide the control panel to create a focused view:

```js
crossex("dashboard_chart", data, [
    {"exportable": true},
    {"hide_panel": true},
    {"name": "X_Axis",         "value": "date"},
    {"name": "Y_Axis",         "value": "revenue"},
    {"name": "Color_By",       "value": "region"},
    {"name": "Facet_Cols_By",  "value": "product"}
]);
```

---

## API Reference

### `crossex(element, data, options, widthid)`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `element` | string | Yes | ID of the container `<div>` (without `#`) |
| `data` | array | Yes | Array of row objects `[{col1: val, col2: val}, ...]` |
| `options` | array | Yes | Array of config flags and signal bindings |
| `widthid` | string | No | ID of an element to use for width calculation |

### Config Flags

These are simple key-value objects mixed into the options array:

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `{"editable": true}` | boolean | `false` | Show the settings/control panel |
| `{"exportable": true}` | boolean | `true` | Enable PNG/CSV export buttons |
| `{"hide_panel": true}` | boolean | `false` | Completely hide the control panel |
| `{"corrmatrix": true}` | boolean | `false` | Enable correlation matrix toggle |

### Signal Bindings

Signal bindings control which data columns are mapped to visual encodings. Each has this form:

```json
{
    "name": "X_Axis",
    "value": "column_name",
    "bind": {"options": ["col1", "col2", "col3"]}
}
```

- **`name`** -- The signal to set (see table below)
- **`value`** -- Initial column selection, or `"None"` to disable
- **`bind.options`** -- Array of column names to show in the dropdown

| Signal | Description | Dropdown Filter |
|--------|-------------|-----------------|
| `X_Axis` | X axis variable | All columns |
| `Y_Axis` | Y axis variable | All columns |
| `Color_By` | Color encoding | All columns |
| `Size_By` | Point size encoding | All columns |
| `Opacity_By` | Opacity encoding | All columns |
| `Stroke_By` | Stroke/outline encoding | All columns |
| `Search_By` | Column for text search | All columns |
| `SortX_By` | Sort X categories by this column | All columns |
| `Sum_By` | Aggregate by sum | Numeric only |
| `Facet_Rows_By` | Split into row subplots | Max 150 distinct values |
| `Facet_Cols_By` | Split into column subplots | Max 150 distinct values |
| `Filter_Out_From` | Column to exclude values from | Max 150 distinct values |
| `Filter_Additional` | Additional filter column | Max 150 distinct values |
| `Filter_By_Value` | Numeric range filter | Numeric only |

You can also set non-dropdown signals directly by omitting `bind`:

```js
{"name": "Palette",             "value": "tableau20"},
{"name": "Max_Plot_Height",     "value": 400},
{"name": "Dashes_",             "value": false},
{"name": "Histogram_Bins_Size", "value": 50}
```

### Data Format

Crossex accepts an array of plain objects. Each object is a row; keys are column names.

```json
[
    {"species": "setosa", "sepal_length": 5.1, "sepal_width": 3.5},
    {"species": "versicolor", "sepal_length": 7.0, "sepal_width": 3.2}
]
```

Missing values (`"NA"`, `"null"`, `"N/A"`, `"unknown"`, `""`) are automatically detected and excluded from calculations.

---

## User Guide

### Getting Data In

**In the standalone app** (`http://localhost:8080/`):

The start page shows a **chart gallery** — one card per chart type (scatter, line, histogram, box, violin, stacked bar, heatmap, correlation matrix, faceted grid, 3D unit view, column overview). Clicking a card loads the demo dataset pre-configured to that example, so you can see every chart type in one click. The gallery disappears as soon as a graph is drawn.

To use your own data:

1. Paste CSV, TSV, or a JSON array of row objects into the text area — or click **Load File**, or drag and drop a file onto the text area
2. Click **Graph Data**
3. The tool auto-detects delimiters (tab vs comma) and column types (numeric vs categorical)

Or click **Load Demo Data** to load a sample dataset, or **Load 5M Demo** to synthesize a 5,000,000-row mixed-type dataset in the browser (no download) and explore the large-data path.

**Share Link** copies a URL that encodes the current settings, transform definitions, and (for inputs up to ~250 KB) the data itself, lz-compressed into the fragment — opening it rebuilds the exact view with nothing sent to any server. **Dark Mode** switches the whole app (panels, overlays, and the chart itself) to a dark palette; the choice persists.

**Pivot Table** opens a drag-and-drop PivotTable.js view of the loaded data below the chart (capped at a uniform 50,000-row sample for very large datasets). The **Data Table** button (grid icon in the chart's tab strip) opens a virtual-scrolling raw-row grid over the full dataset — click a header to sort (third click restores data order), and double-click any chart point to jump to its row. The **3D View** (cube icon in the chart's tab strip, alongside the other panel buttons) opens a SandDance-style unit visualization *in the chart area* — every row is one WebGL mark — with animated transitions between a 3D scatter and stacked unit columns, orbit/zoom camera, per-column color, a point-size slider, and click-for-details, up to 100,000 points. The dependency-free renderer is bundled into the widget, so it also works in embedded `crossex()` instances. Picking any panel tab returns to the Vega chart. Date-like columns parsed from CSV/TSV are converted to decimal years (e.g. 2023.4521) so they behave as quantitative axes; combine with the **Line** toggle for time-series charts.

Large inputs are handled without freezing the page: big delimited files parse in chunks with a progress indicator, files larger than a few MB are held in memory and only previewed in the text area (parsed once, reused for re-graphs), and column typing runs incrementally on very wide/tall tables. Datasets over 150,000 rows are rendered from a uniform 100,000-row sample by default, and faceted views render at most 10,000 rows (rebuilding every facet cell is expensive inside the Vega dataflow) — a banner always shows exactly what is displayed, and you can change the cap under **Filtering ▸ Render sample**. The Summary tab and CSV export always use the full dataset — tested through 5 million rows.

**Embedded on a page**: pass data directly via the `crossex()` function (see [API](#api-reference)).

### Exploring Your Data

Once data is loaded, use the **control panel tabs** on the left to configure the visualization:

1. **Select axes** -- Use the Charts tab to pick X and Y columns
2. **Add color** -- Use the Coloring tab to map a column to color
3. **Facet** -- Split data into a grid of subplots by one or two categorical variables
4. **Filter** -- Narrow down to specific subsets using the Filtering tab
5. **Search** -- Highlight specific values with the Search tab

The chart type is chosen automatically based on your data types:
- **Two numeric columns** -> scatter plot
- **One categorical + one numeric** -> box/violin plot
- **Two categorical columns** -> grid/heatmap
- **One variable (Y = "None")** -> histogram

### Interactivity

Toggle **Interactive mode** (checkbox in the control panel) to enable:
- **Pan** -- Click and drag to move the view
- **Zoom** -- Scroll wheel or pinch gesture
- **Tooltips** -- Hover over points to see values

### Exporting

Click the export icon (top-right of the chart) to:
- **Download PNG** -- High-resolution (2x) image
- **Download SVG** -- Vector image, ideal for publications
- **Download CSV** -- Current filtered data as CSV
- **Open in Vega Editor** -- Edit the raw Vega spec for advanced customization

### Settings Persistence

All settings (axis selections, filters, palettes, etc.) are saved to browser localStorage and restored automatically on your next visit. Saved column selections that don't exist in the currently loaded dataset are ignored, so switching datasets always produces a valid chart.

Click **Clear Settings** to reset everything to defaults.

---

## Chart Types

| Type | When Used | Key Options |
|------|-----------|-------------|
| **Scatter Plot** | Two numeric axes | Points, Regression, Contours (per facet cell, grouped by color), Jitter |
| **Line / Time Series** | Two numeric axes + the Line toggle (Scatter options) | Mean line per color group, sorted by X; date columns auto-convert to decimal years |
| **Histogram** | One numeric axis (Y = "None") | Bin size, Ratio, ECDF overlay, Normal QQ plot |
| **Box Plot** | Categorical X + Numeric Y | Outliers toggle |
| **Violin Plot** | Categorical X + Numeric Y | Violin width, Dashes |
| **Stacked Bar** | Categorical axes with Sum_By | Sum column selection |
| **Grid / Heatmap** | Two categorical axes | Cells colored by row count by default (hover for the count); map Color_By/Size_By or enable Jitter for per-row views |
| **Correlation Matrix** | All numeric columns | Show Covariance toggle; click any cell to open that pair's plot |

---

## Control Panel Reference

### Search Tab
Search and highlight data points by text matching against any column.

### Interact Tab
- **Pan/zoom** (drag + scroll) and **tooltips** toggles
- **Reset Zoom** clears any manual axis limits
- **Brush mode** — on an unfaceted, linear-axis scatter plot, drag a box around points, then **Keep** or **Exclude** them (replacing the working dataset, with one-click *Restore Original Data*), download just the selection as **CSV**, or **Zoom** the axes to the box
- **Saved Views** — name the current full settings state (axes, colors, filters, everything) and flip back to it with one click; views persist in the browser

### Charts Tab
Set X and Y axis columns. The **Stats** toggle overlays fitted r²/slope on scatter plots and n/μ/σ per category — and, on box/violin charts, a badge with the group-difference test: **Welch t-test** for two groups, **one-way ANOVA** for three or more, computed over the full dataset. Shows chart-type-specific sub-panels:
- **Scatter options** -- Contour density overlay, histogram margins, regression
- **Violin/Box options** -- Box plot, violin, dashes, bar plot toggles
- **Grid options** -- Grid spacing, radius, categorical mapping
- **Stacked options** -- Sum aggregation column

### Axis Tab
- **Log scale** for X and/or Y
- **Reverse** axis direction
- **Sort** X categories by another column
- **Manual limits** -- Set min/max for X and Y axes
- **Uniform limits** -- Share axis ranges across facets

### Marks Tab
- **Points** -- Show/hide data points
- **Regression** -- Overlay fitted line
- **Outliers** -- Highlight statistical outliers
- **Jitter** -- Add random offset to overlapping points (configurable radius)
- **Point size** -- Min/max point size range
- **Shape** -- Point symbol (circle, square, diamond, triangles, …)
- **Stroke** -- Map a column to point outline color
- **Tooltips** -- Enable hover info
- **Contour levels** -- Number and weighting of density contours
- **Dash/violin dimensions** -- Height, width, radius of marks

### Fonts Tab
- Font sizes for axis titles, tick labels, chart title, and legend
- Label rotation angles for X and Y axes
- Tick count control

### Coloring Tab
- **40+ color palettes** including:
  - Categorical: `category10`, `category20`, `tableau10`, `tableau20`, `accent`, `paired`, `pastel1`, `dark2`
  - Sequential: `viridis`, `magma`, `plasma`, `inferno`, `turbo`, `cividis`, `blues`, `reds`, `oranges`
  - Diverging: `spectral`, `blueorange`, `redblue`, `purplegreen`, `redyellowblue`
- **Reverse** color direction
- **Manual colors** -- Pick min/max colors with a color picker
- **Background color** control
- **Per-element opacity** -- Independent opacity for points, boxes, violins, contours, grid cells, and dashes

### Filtering Tab
- **Exclude values** from a specific column
- **Additional filter** on a second column
- **Numeric range filter** -- Set min/max on any numeric column
- **Include only** -- Text-match to keep specific values
- **Data type overrides** -- Force a column to be treated as numeric or categorical
- **Render sample** -- Cap how many rows are drawn (uniform sample) for large datasets; a banner shows when active

### Margins Tab
- Plot width, height, and padding
- Title, axis label, and legend area sizing
- Row/column facet header dimensions
- Maximum number of facets to display
- Legend column count

### Summary Tab
Per-column statistics for the full dataset: type, valid/missing/distinct counts, min, median, mean, standard deviation, max, and the most frequent value for categorical columns. Computed on first open. Click any column header to sort the table by that statistic (click again to reverse), and use **Download CSV** to save the summary itself.

### Transforms Tab
The *fx* button opens the Transforms tab: name a new column, type a formula, and **Add Column** computes it for every row and makes it available in every dropdown (axes, color, facets, filters, summary, 3D view, export). Formulas reference columns by name (`body_mass_g / 1000`) or in brackets when the name has spaces (`[bill length]`), and support:

- Arithmetic, comparisons, boolean logic, and `test ? a : b` conditionals
- Per-row functions: `abs ceil floor round sqrt exp log log2 log10 pow min max sign if num str upper lower trim len`
- Whole-column statistics evaluated once: `mean(col) median(col) sd(col) sum(col) count(col) colmin(col) colmax(col)` — e.g. a z-score is `(x - mean(x)) / sd(x)`
- Text literals in quotes: `bill_length_mm > median(bill_length_mm) ? "long" : "short"`

An **insert column** picker drops any column reference into the formula at the cursor, and **example formulas** offers ready-made templates (log, z-score, percent of total, ratio, difference, high/low split, combined categories) built from your own columns. Created columns are listed in the tab — click one to edit and re-apply it, or ✕ to remove it everywhere. Rows that error, divide by zero, or produce non-finite values become missing (NA). Formulas are compiled once and evaluated in chunks, so transforms work on multi-million-row datasets without freezing the page.

The tab's **Reshape** section melts wide data into long form: select two or more columns and they become `variable`/`value` pairs (names configurable) — the natural shape for multi-series plots (X = variable, Y = value, color by any kept column). Melting replaces the working dataset; *Restore Original Data* (Interact tab) undoes it.

### Overview
The bar-chart button at the bottom of the tab strip toggles a Column Overview: one card per column showing its distribution (a mini histogram for numeric columns, top-category bars for categorical ones) with range, mean, distinct and missing counts. Clicking a card graphs that column's distribution; a sort control orders the cards by data order, name, type, or missingness. The Overview opens automatically the first time a dataset is viewed with no saved settings.

---

## Project Structure

```
crossex/
├── app.js                    # Express server, routes, and build system
├── package.json              # Dependencies and npm scripts
├── LICENSE                   # MIT License
├── crossex.js                # Built library (embeddable, Vega bundled)
├── crossex_site.js           # Built site wrapper (full UI + styles)
│
├── views/
│   ├── crossex_base.js       # Core: data loading, signal wiring, Vega handoff
│   ├── crossex_ext.js        # Extensions: drag resize, axis optimizer, data input
│   ├── crossex_base.ejs      # EJS template that produces crossex.js
│   ├── wrapper.ejs           # EJS template that produces crossex_site.js
│   ├── stand_alone.ejs       # Full HTML page served at /
│   ├── template.ejs          # Bootstrap dashboard template (embedding sample)
│   ├── crossex_html.ejs      # UI component: tabs, panels, controls
│   ├── body.ejs              # Data input: textarea, buttons
│   ├── stats.js              # Statistics: correlation, z-tests, formatting
│   └── *.vg.json             # Vega specification
│
├── src/
│   ├── inc/                  # Vega engine, vega-embed, core styles, icons
│   ├── lz-string.js          # LZ compression for asset bundling
│   ├── d3-dsv.v1.min.js      # D3 CSV/TSV parser (server-side)
│   ├── d3.v7.min.js          # D3 (included in template builds)
│   └── *.css, *.js           # jQuery UI, Bootstrap, pivot table
│
├── public/                   # Static files served by Express
│   ├── crossex.js            # Built library copy
│   ├── crossex_site.js       # Built site copy
│   └── crossex.html          # Example standalone page
│
├── r/crossex/                # R package (htmlwidgets wrapper, CRAN-ready)
│   ├── R/crossex.R           # crossex(), crossexOutput(), renderCrossex()
│   └── inst/htmlwidgets/     # widget binding + bundled crossex.js
│
└── electron/                 # Electron desktop app
    ├── main.js               # Main process
    ├── index.html            # Desktop entry point
    └── dist/                 # Built desktop binaries
```

### How the build works

Crossex uses **EJS templates as a build system** -- no Webpack or Rollup required. The Node server renders EJS templates that `<%- include %>` source files, concatenating them into single output files:

```
crossex_base.ejs  ──renders──>  crossex.js      (Vega + stats + core logic)
wrapper.ejs       ──renders──>  crossex_site.js  (above + lz-string + UI + styles + extensions)
```

Large assets (CSS, HTML, SVG, Vega specs) are compressed with [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) at build time and decompressed in the browser.

---

## Building the Library

Build **`crossex.js`** (embeddable library with Vega bundled):

```bash
npm run build
```

Build **`crossex_site.js`** (full standalone site with UI, styles, and data input):

```bash
npm run build:site
```

Both commands write output to `./` and `./public/`.

---

## R Package

`r/crossex/` wraps the library as an [htmlwidget](https://www.htmlwidgets.org/): one call opens the full explorer for any data frame, in the RStudio Viewer, Shiny, or R Markdown.

```r
# until it's on CRAN, install from GitHub:
remotes::install_github("davcraig75/crossex", subdir = "r/crossex")

library(crossex)
crossex(iris)                                             # explore interactively
crossex(iris, x = "Sepal.Length", y = "Sepal.Width",
        color = "Species")                                # preset the view
crossex(mtcars, x = "wt", y = "mpg", facet_cols = "cyl")  # faceted
```

For Shiny use `crossexOutput("id")` / `renderCrossex(crossex(df))`. The package passes `R CMD check --as-cran` (one NOTE: new submission); `npm run build` keeps its bundled JavaScript in sync. See `r/crossex/README.md` for details and CRAN submission notes.

---

## Browser & Device Support

Crossex is a single self-contained page with no build step and no server calls — everything runs client-side, so it behaves the same anywhere a modern (ES6, 2017+) engine is available.

The full figure set — scatter, line, histogram, box, violin, bar, grid/heatmap, ECDF, QQ, correlation matrix, column overview, and the WebGL 3D unit view — was rendered on every major engine and checked for visually identical output, correct axes, and a clean console:

| Engine | Desktop | Mobile |
|--------|---------|--------|
| Blink (Chrome, Edge, Opera, Brave) | ✅ | ✅ Android Chrome |
| WebKit (Safari) | ✅ | ✅ iOS Safari — iPhone & iPad |
| Gecko (Firefox) | ✅ | ✅ |

- **Identical rendering across engines** — Vega's canvas output and the dependency-free WebGL 3D view render the same in Blink, WebKit, and Gecko, with no console or page errors.
- **Responsive layout** — the start-page gallery reflows from four columns down to one, buttons wrap, and charts scale to the viewport with no horizontal scrolling, from 320 px phones through tablets to desktops.
- **Touch** — pan, pinch-to-zoom, and tap-to-open controls work on phones and tablets; the config panel opens as an overlay, so the chart keeps full width when closed.
- **No runtime dependency** except D3 (CSV/TSV parsing) when embedding; the standalone page bundles everything, including the Vega engine.

---

## License

[MIT](LICENSE) -- Copyright (c) 2021 David Craig
