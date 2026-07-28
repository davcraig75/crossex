# Crossex

**Interactive data exploration and visualization for tables and dataframes.**

**[▶ Try the live demo](https://davcraig75.github.io/crossex/)** — the full app runs client-side on GitHub Pages; paste your own data or load the demos.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.20260728-green.svg)](https://github.com/davcraig75/crossex)

Crossex lets users paste or load tabular data and instantly explore it through dynamically configurable charts. Drop a CSV into the tool and start dragging variables onto axes, facets, colors, and filters -- no code required. Embed it on any web page with a single `<script>` tag, or run the full interactive designer locally.

Built on [Vega](https://vega.github.io/vega/), a declarative visualization grammar.

See the [product audit and release roadmap](PRODUCT_ROADMAP.md) for the current ship-readiness plan, prioritized capabilities, and release gates.

---

## Table of Contents

- [Why Crossex](#why-crossex)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Embedding on a Web Page](#embedding-on-a-web-page)
- [API Reference](#api-reference)
- [User Guide](#user-guide)
- [Dashboards](#dashboards)
- [Chart Types](#chart-types)
- [Performance](#performance)
- [Control Panel Reference](#control-panel-reference)
- [Project Structure](#project-structure)
- [Building the Library](#building-the-library)
- [Browser & Device Support](#browser--device-support)
- [License](#license)

---

## Why Crossex

Most charting libraries require you to decide your chart type and axis mappings upfront. Crossex takes a different approach: give it a table, and it builds a complete exploration environment where users can:

- **Switch axes, colors, facets, and filters on the fly** using dropdown menus
- **Automatically detect** whether columns are numeric or categorical and adjust chart types accordingly
- **Facet data into subplot grids** by any categorical variable
- **Filter, search, and drill down** without writing code
- **Export** the current view as PNG or download filtered data as CSV
- **Review data quality** with duplicate, missing, constant, mixed-type, and identifier checks, then override column types when needed

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

- [Node.js](https://nodejs.org/) (v20+)

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

The start page shows a **chart gallery** — one card per chart type (scatter, line, histogram, ECDF, normal QQ plot, box, violin, stacked bar, heatmap, correlation matrix, faceted grid, 3D unit view, column overview). Clicking a card loads the demo dataset pre-configured to that example, so you can see every chart type in one click. The gallery (and the hero banner above it) disappears as soon as a graph is drawn.

To use your own data:

1. Paste CSV, TSV, or a JSON array of row objects into the text area — or click **Load File**, drag and drop a file onto the text area, or click **Load URL** and paste a link to a CSV/TSV/JSON file
2. Click **Graph Data**
3. The tool auto-detects delimiters (tab vs comma) and column types (numeric vs categorical)

Or click **Load Demo Data** to load a sample dataset, or **Load 5M Demo** to synthesize a 5,000,000-row mixed-type dataset in the browser (no download) and explore the large-data path.

**Load URL** fetches a remote table directly in the browser: paste a link to a `.csv`, `.tsv`, or `.json` file and the format is detected from the response body (the extension doesn't matter). The fetch is client-side, so the URL must allow cross-origin reads (raw-file hosts like GitHub raw, gists, and most open-data portals do); the same button is available inside the dashboard's data loader.

**Share Link** copies a URL that encodes the current settings, transform definitions, and (for inputs up to ~250 KB) the data itself, lz-compressed into the fragment — opening it rebuilds the exact view with nothing sent to any server. **Dark Mode** switches the whole app (panels, overlays, and the chart itself) to a dark palette; the choice persists.

A second row of icons in the chart's tab strip switches the *entire chart area* between views — each one replaces the Vega chart in place rather than opening a separate panel, and clicking any config tab (or the chart icon itself) switches back:

- **Data Table** opens a virtual-scrolling raw-row grid over the full dataset — click a header to sort (third click restores data order), and double-click any chart point to jump to its row.
- **Overview** opens the [Column Overview](#overview) described below.
- **3D View** opens a SandDance-style unit visualization — every row is one WebGL mark — with animated transitions between a 3D scatter and stacked unit columns, orbit/zoom camera, per-column color, a point-size slider, and click-for-details, up to 100,000 points. The dependency-free renderer is bundled into the widget, so it also works in embedded `crossex()` instances.
- **Pivot Table** opens a drag-and-drop [PivotTable.js](https://github.com/nicolaskruchten/pivottable) view of the loaded data (capped at a uniform 50,000-row sample for very large datasets); its jQuery/jQuery-UI/PivotTable.js stack (~410 KB) loads lazily the first time you open it, so it costs nothing until you use it.

Date-like columns parsed from CSV/TSV are converted to decimal years (e.g. 2023.4521) so they behave as quantitative axes; combine with the **Line** toggle for time-series charts.

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

## Dashboards

Beyond the single-chart explorer, the **Dashboard** button turns crossex into a lightweight dashboard builder: a grid of independent charts, each a full crossex widget, driven from one or more datasets.

Click **Dashboard** in the button row to enter. If a dataset is already loaded it becomes "Dataset 1" and a first chart is added automatically; otherwise the empty canvas walks you through adding data.

**Building a dashboard**

- **+ Add chart** drops a new tile onto the grid, laid out in the first free slot (no overlaps). Every tile is a real crossex chart, so it gets the full engine — automatic chart-type selection, sampling for large data, and its own PNG/SVG/CSV export menu.
- **Reposition** a chart by dragging its title bar; **resize** it by dragging the bottom-right corner. Tiles snap to a column grid (6/8/12/16 columns, selectable), and resizing re-fits the chart to its new size. **Tidy** repacks every tile into a clean, gap-free layout.
- **Configure** a chart with the ⚙ button. The **Chart** tab sets the title, chart type (scatter, line, regression, histogram, box, violin, bar, heatmap), X/Y columns, color, size, facets, palette, and a stats overlay. Changes apply live.
- **⧉ duplicate** and **✕ remove** are on each tile's header.

**Viewing and replacing a chart's data**

The ⚙ config popover's **Data** tab shows the dataset behind that chart — its name, row/column counts, and a preview of the first rows — and lets you **replace** it in place: paste new data, upload a file, or fetch a URL (CSV/TSV/JSON). Replacing re-derives valid axis choices for the new columns. When more than one dataset is loaded, a picker points the chart at any of them, so a single dashboard can mix several sources.

**Data sources**

- **+ Add data** loads a dataset into the dashboard (paste, file, URL, the built-in demo, or the data already open in the single-chart view). Each source appears as a chip in the **Data sources** bar; click a chip to add a chart from it.
- Different charts can read different datasets, so one board can combine, say, a live CSV feed and a pasted table.

**Saving and sharing**

- The layout, every chart's configuration, and small/URL datasets **auto-save to the browser** and restore on your next visit (URL datasets are re-fetched).
- **Export** downloads the whole dashboard — layout, configs, and all rows — as a `.json` file; **Import** restores it. Nothing is sent to any server.
- **Dark** switches the whole board (and every chart) to the dark palette.

Like the rest of crossex, the dashboard runs entirely client-side; it's part of the standalone site (`crossex_site.js`), not the embeddable `crossex.js` library.

---

## Chart Types

| Type | When Used | Key Options |
|------|-----------|-------------|
| **Scatter Plot** | Two numeric axes | Points, Regression, Contours (per facet cell, grouped by color), Jitter |
| **Line / Time Series** | Two numeric axes + the Line toggle (Scatter options) | Mean line per color group, sorted by X; date columns auto-convert to decimal years |
| **Histogram** | One numeric axis (Y = "None") | Bin size, Ratio, ECDF overlay, Normal QQ plot |
| **Box Plot** | Categorical X + Numeric Y | Outliers toggle |
| **Violin Plot** | Categorical X + Numeric Y | Distribution width, Dashes |
| **Stacked Bar** | Categorical axes with Sum_By | Sum column selection |
| **Grid / Heatmap** | Two categorical axes | Cells colored by row count by default (hover for the count); map Color_By/Size_By or enable Jitter for per-row views |
| **Correlation Matrix** | All numeric columns | Show Covariance toggle; click any cell to open that pair's plot |

---

## Performance

Crossex runs entirely in the browser's main thread — no server, no build step at runtime — so every code path that can touch a large dataset is chunked to yield between frames instead of blocking the tab:

| Path | Behavior |
|------|----------|
| Delimited (CSV/TSV) parsing | Files parse in ~8 MB slices via `requestAnimationFrame`, with a progress indicator; JSON and quoted-field CSVs parse in one shot |
| Column type detection | One synchronous pass under ~20M cells; above that, one column scanned per frame |
| Chart rendering | Datasets over 150,000 rows render from a uniform 100,000-row sample by default; faceted views cap at 10,000 rows (rebuilding every facet cell is expensive inside the Vega dataflow) |
| Correlation matrix | Computed over a 20,000-row sample, in chunks of column pairs (~20 frames) |
| 3D Unit View | Up to 100,000 points, one WebGL draw call |
| Pivot Table | Aggregated over a uniform 50,000-row sample |
| Formula columns (Transforms tab) | Compiled once, evaluated in 100,000-row chunks per frame |
| "Load 5M Demo" | Synthesizes 5,000,000 rows in 250,000-row batches per frame |

The Summary tab and CSV export always operate on the full, unsampled dataset — a sample only ever affects what's *drawn*. A banner above the chart always shows exactly what's being rendered, and the render sample size is adjustable under **Filtering ▸ Render sample**.

All of the above yields via `requestAnimationFrame` rather than a Web Worker, so it stays on the main thread — heavy individual frames (e.g. the largest parsing chunks) can still cause brief, recoverable jank on slower machines rather than a hard freeze. Moving parsing and column typing to a Web Worker is the next architectural step for very large files; it isn't done yet.

---

## Control Panel Reference

Tabs on the left rail are grouped: chart building, then appearance (axis, marks, colors, titles, layout), then data work (highlight, filter, interact), then analysis (summary, transforms), then alternate views (table, overview, 3D, pivot). **Tabs and individual controls appear only when they apply to the visible chart** — a scatter plot shows contour and opacity-encoding options but no violin controls; a histogram hides the Marks tab entirely; the correlation matrix pares the panel down to the essentials. Hidden controls keep their values and reappear the moment they become relevant.

### Charts Tab
Set X and Y axis columns, facets, color, and size. The **Stat Annotations** toggle overlays fitted r²/slope on scatter plots and n/μ/σ per category — and, on box/violin charts, a badge with the group-difference test: **Welch t-test** for two groups, **one-way ANOVA** for three or more, computed over the full dataset. Chart-type-specific sections appear underneath:
- **Scatter** -- Density contours, regression line, points, mean line, marginal histogram
- **Box/Violin** -- Box plot, violin, outliers, value dashes, bar overlay toggles
- **Grid** -- Heat map grid toggle (two categorical axes), fixed cell size, cell corner radius
- **Stacked** -- Sum aggregation column
- **Distribution** -- Histogram bins, ECDF overlay, normal QQ plot (histogram ratio when a marginal histogram is on)

### Axis Tab
- **Log scale** for X and/or Y (numeric axes)
- **Reverse** axis direction
- **Sort X By** another column (stacked bars)
- **Manual limits** -- Set min/max for the value axes (scatter, histogram, and box charts)
- **Shared limits** -- Share axis ranges across facets

### Marks Tab
- **Jitter** -- Add random offset to overlapping points (configurable radius, both box orientations and heat maps)
- **Outline** -- Map a column to point outline color, with width control
- **Point size** -- Max Point Size sets the size of every point (scatter and jittered box points); min size and reverse appear when a Size By column is set
- **Point shape** -- circle, square, diamond, triangles, … (scatter and jittered points)
- **Opacity** -- Mark opacity for points, stacked bars, and encoded heat cells, plus an Opacity By column encoding, right beside size and shape
- **Distribution width** -- Width of each category's violin/box/bar/dash track on box charts
- **Contours** -- Resolve, bandwidth, levels, weighting, and cell size (when density contours are on)
- **Link Points** -- Make scatter points clickable links built from a column value
- **Dash dimensions** -- Thickness, width, radius of value dashes (when dashes are on)

### Coloring Tab
- **40+ color palettes** including:
  - Categorical: `category10`, `category20`, `tableau10`, `tableau20`, `accent`, `paired`, `pastel1`, `dark2`
  - Sequential: `viridis`, `magma`, `plasma`, `inferno`, `turbo`, `cividis`, `blues`, `reds`, `oranges`
  - Diverging: `spectral`, `blueorange`, `redblue`, `purplegreen`, `redyellowblue`
- **Reverse** color direction
- **Background color** control
- **Per-element opacity** -- Independent opacity for the non-point marks on screen: boxes, violins, contours, grid cells, dashes (point/mark opacity lives on the Marks tab)
- **Color scale** -- Pin the numeric min/max values of a continuous color scale

### Titles & Fonts Tab
- **Title prefix** text and a **legend titles** toggle
- Font sizes for axis titles, tick labels, chart title, and legend
- Label rotation angles for X and Y axes
- Tick count control

### Margins Tab
- Plot width, height, and padding
- Title, axis label, and header area sizing
- **Facets** (when faceting) -- row height, facet title height, and the maximum number of facets to draw
- **Legends** (when a legend is shown) -- legend height and column count

### Search Tab
Highlight the scatter points whose column matches a value. Appears for scatter plots.

### Filtering Tab
- **Exclude values** from a specific column (click legend entries to toggle)
- **Also filter by** a second column
- **Exclude value** -- Drop rows where any mapped column equals a value
- **Value range filter** -- Set min/max on any numeric column
- **Data type overrides** -- Force a mapped column to be treated as numeric or categorical
- **Render sample** -- Cap how many rows are drawn (uniform sample) for large datasets; a banner shows when active

### Interact Tab
- **Pan & zoom** (drag + scroll) and **tooltips** toggles
- **Reset Zoom** clears any manual axis limits
- **Brush mode** — on an unfaceted, linear-axis scatter plot, drag a box around points, then **Keep** or **Exclude** them (replacing the working dataset, with one-click *Restore Original Data*), download just the selection as **CSV**, or **Zoom** the axes to the box
- **Saved Views** — name the current full settings state (axes, colors, filters, everything) and flip back to it with one click; views persist in the browser

### Summary Tab
Per-column statistics for the full dataset: type, valid/missing/distinct counts, min, median, mean, standard deviation, max, and the most frequent value for categorical columns. Computed on first open. Click any column header to sort the table by that statistic (click again to reverse), and use **Download CSV** to save the summary itself.

### Transforms Tab
The *fx* button opens the Transforms tab: name a new column, type a formula, and **Add Column** computes it for every row and makes it available in every dropdown (axes, color, facets, filters, summary, 3D view, export). Formulas reference columns by name (`body_mass_g / 1000`) or in brackets when the name has spaces (`[bill length]`), and support:

- Arithmetic, comparisons, boolean logic, and `test ? a : b` conditionals
- Per-row functions: `abs ceil floor round sqrt exp log log2 log10 pow min max sign if num str upper lower trim len`
- Whole-column statistics evaluated once: `mean(col) median(col) sd(col) sum(col) count(col) colmin(col) colmax(col)` — e.g. a z-score is `(x - mean(x)) / sd(x)`
- Text literals in quotes: `bill_length_mm > median(bill_length_mm) ? "long" : "short"`

An **insert column** picker drops any column reference into the formula at the cursor, and **example formulas** offers ready-made templates (log, z-score, percent of total, ratio, difference, high/low split, combined categories) built from your own columns. Created columns are listed in the tab — click one to edit and re-apply it, or ✕ to remove it everywhere. Rows that error, divide by zero, or produce non-finite values become missing (NA). Formulas are compiled once and evaluated in chunks, so transforms work on multi-million-row datasets without freezing the page.

The tab's **Reshape** section melts wide data into long form: select two or more columns and they become `variable`/`value` pairs (names configurable) — the natural shape for multi-series plots (X = variable, Y = value, color by any kept column).

The **Data Lab** in the same tab makes analysis reproducible:

- Every formula, type override, melt, brush subset, sort, deduplication, summary, append, and join creates a visible immutable history step with **Undo** and **Redo**.
- **Sort** rows by any column and **Deduplicate** using selected keys or complete rows.
- **Group & summarize** with count, sum, mean, minimum, or maximum.
- Load a second CSV/TSV/JSON table to **Append Rows** or perform left, inner, and full joins with collision-safe column names.
- **Export Project** saves the exact current data, chart settings, signals, formulas, and provenance log in a versioned `.crossex.json` file; **Import Project** restores it without a server or account.

History is memory-aware for very large datasets and always preserves the original loaded state. *Restore Original Data* in the Interact tab jumps directly back to it.

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
│   ├── data_utils.js          # Tested parsing, profiling, table operations, projects
│   ├── crossex_ext.js        # Extensions: axis optimizer, data input, URL loading
│   ├── crossex_dash.js       # Dashboard builder (site-only): grid of chart tiles
│   ├── crossex_base.ejs      # EJS template that produces crossex.js
│   ├── wrapper.ejs           # EJS template that produces crossex_site.js
│   ├── stand_alone.ejs       # Full HTML page served at /
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

Build and verify every web, Electron, docs, and R distribution:

```bash
npx playwright install chromium   # once per development machine
npm run verify
```

`npm run verify` rebuilds all artifacts, runs the shared data/server unit tests, exercises desktop and mobile intake workflows in a real Chromium browser, runs automated accessibility checks, and verifies that every duplicated distribution is synchronized.

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
