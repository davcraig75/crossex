# Crossex Codebase Guide for AI Agents

## Project Overview

**Crossex** is a data visualization tool for interactive exploration of tabular datasets. It enables dynamic chart creation with linked filtering, faceting, and statistical views. The project supports both web-based (Express.js) and Electron desktop deployments.

**Current version:** 1.20260225

## Architecture

### Component Structure

```
app.js (Express server) → EJS templates → Compiled standalone JS bundle
  ↓
views/ (templates with embedded JS/CSS/assets)
  ├── crossex_base.js (core Vega rendering & interaction logic)
  ├── crossex_ext.js (UI extensions, input handling)
  ├── stats.js (statistical inference & type detection)
  ├── *.vg.json (Vega specification templates)
  └── *.ejs (HTML & asset compression)
```

### Data Flow

1. **Input**: CSV/TSV data pasted or loaded via `d3.csvParse()`/`d3.tsvParse()`
2. **Type Inference**: `stats.js` analyzes data to detect numeric vs. categorical columns
3. **Options Mapping**: User selects chart encoding (X_Axis, Y_Axis, Color_By, Facet_Rows_By, Facet_Cols_By)
4. **Spec Rendering**: `crossex_base.js` injects data into Vega spec via signals
5. **Visualization**: Vega-Embed renders interactive chart with linked filtering

### Build & Deployment

| Command | Output | Purpose |
|---------|--------|---------|
| `npm start` or `node app.js` | Express server on :8080 | Live development |
| `npm run dev` | Express server on :8080 (nodemon) | Auto-reload dev loop |
| `node app.js build` | `crossex.js` (root + `public/` + R package lib) | Embeddable library, Vega bundled |
| `node app.js build_site` | `crossex_site.js` (root + `public/`), `electron/index.html` | Full standalone site/UI |
| `node app.js build_pages` | `docs/index.html` + local libs | GitHub Pages static demo |
| `npx electron-builder` (from `electron/`) | packaged desktop app | Electron distributable |

Routes:
- `/` → `stand_alone.ejs` (full app page, self-contained)
- `/public/*` → Static assets
- `/src/*` → Data files & libraries

There is no `/template` route — `template.ejs` is an embedding-sample template rendered at build time, not served live.

## Key Patterns & Conventions

### Template Compilation (EJS)

Files are **not** direct JavaScript—they're EJS templates compiled at build time:
- `views/crossex_base.ejs` includes: lz-string, d3, vega-core, vega-embed, stats.js, crossex_base.js
- Assets (CSS, JSON) are embedded as compressed strings via `itg_comp()`
- **Critical**: When editing, edit `.ejs` files, not compiled `.js` files; then rebuild

Example: `data.crossex_spec = itg_comp("views/crossex."+pjson.version+".vg.json")`

### Data Encoding via Vega Signals

Chart behavior is controlled by Vega signals (interactive inputs):
```javascript
// In crossex.1.20260225.vg.json (single-line minified spec; ~156 top-level signals)
"signals": [
  {"name": "X_Axis", "value": "island", "bind": {"input": "select", ...}},
  {"name": "Y_Axis", "value": "...", "bind": {...}},
  ...
]
```

These drive data transforms and encodings in the Vega spec. The figure that actually renders is emergent — chosen from the X/Y column types plus toggle signals (`Boxplot_`, `Violin_`, `Barplot_`, `Line_`, `Contours_`, `Regression_`, `Histogram_`, `ECDF_`, `QQNorm_`, `Map_XY_Cat_`, …) — there is no single "chart type" dropdown.

### Data Type Inference

Column type detection lives in `stats.js` (`infer()`, `typeAll()`, `inferAll()`), not in `crossex_base.js`:
- **Numeric**: Parsed float values, treated as quantitative
- **Categorical**: String/mixed values, treated as ordinal/nominal
- **Optimization**: `optimize_axis()` (`crossex_ext.js`) auto-assigns axes based on cardinality and type

Logic: fewer unique values → facet rows; more values → color/detail; most numerous numeric → Y-axis.

### Compression & Serialization

All static content (CSS, HTML, JSON specs) is **LZ-compressed** for transport:
```javascript
// Server-side compression
var itg_comp = function(file) {
  return itgz.compressToEncodedURIComponent(fs.readFileSync(file, "utf8"));
};

// Client-side decompression
var crossex_spec = JSON.parse(itgz.decompressFromEncodedURIComponent("<%-crossex_spec%>"));
```

This enables embedding the entire app in a single script tag with minimal payload.

### UI Interaction Model

Tabbed interface, driven by the button strip in `crossex_html.ejs` (`*_tablinks`/`*_btn` elements):
1. **None** (default) - chart view
2. **Search** - filter/highlight data
3. **Charts** - axes, facets, chart-type sub-panels (Scatter/Violin-Box/Grid/Stacked)
4. **Interact** - pan/zoom, tooltips, brush-select, saved views
5. **Axis** - log/reverse/sort/manual limits
6. **Marks** - points, regression, jitter, shape, stroke, contours
7. **Fonts** - typography control
8. **Filtering** - dynamic filters, render-sample cap
9. **Coloring** - palette, color scale mapping, opacity
10. **Margins** - layout adjustment
11. **Summary** - per-column statistics table
12. **Transforms** - formula-based derived columns, reshape/melt

Plus three panel-level overlays outside the tab strip: **Table** (virtual-scrolling data grid), **Overview** (per-column distribution cards), and **3D** (WebGL unit view). Each tab/overlay updates Vega spec signals or swaps the panel content, triggering a reactive re-render.

### CSV/JSON Export

The export menu (top-right of the chart) offers PNG, SVG, CSV, and "open in Vega Editor":
- CSV export filters out internal computed columns (Y_Value, X_Value, Row_Value, Col_Value, Count, etc.) and exports only user-visible data
- Uses the standard `Blob` + download-link pattern

## Development Workflows

### Adding a New Data Column Feature

1. Modify Vega spec (`.vg.json`) to add signal & data transform
2. Update `crossex_base.js` to handle signal binding
3. Update type inference in stats.js if new type needed
4. Run `node app.js build` to recompile
5. Test on `/` route

### Updating Templates

- Edit `views/*.ejs` files
- Run `node app.js build` to compile
- Do NOT directly edit generated `.js` files—changes will be overwritten

### Adding Static Assets

1. Place file in `src/` or `inc/`
2. Reference in EJS template via `<%-  include path %>`
3. Compress via `itg_comp()` in `app.js` data object
4. Rebuild templates

### Debugging

- **Server-side**: Modify `app.js`, restart with `npm start` (there is no `npm test` script)
- **Client-side**: Browser DevTools on `http://localhost:8080`
- **Vega specs**: Validate against https://vega.github.io/editor/ (copy spec JSON)
- **Type detection**: Add console logs in `stats.js::infer()` to trace inference

## External Dependencies

| Library | Role | Notes |
|---------|------|-------|
| Express.js | HTTP server | Serves templates & static assets |
| EJS | Template engine | Compiles views with embedded assets |
| lz-string | Compression | Minimizes script size for distribution |
| d3-dsv | CSV/TSV parsing | `d3.csvParse()`, `d3.tsvParse()` |
| Vega-Core + Vega-Embed | Visualization | Full data viz runtime & reactive signals |
| jQuery + jQuery-UI | UI toolkit | Drag, resize, tabs, selectors |
| stats.js | Statistical inference | Type detection & column analysis |

## File Reference

### Core Entry Points
- [app.js](../app.js) - Express server, build pipeline
- [views/crossex_base.js](../views/crossex_base.js) - Main rendering & interaction (~2,600 lines)
- [views/crossex_ext.js](../views/crossex_ext.js) - UI extensions, axis optimizer, gallery (~730 lines)
- [views/stats.js](../views/stats.js) - Type inference & profiling (~1,300 lines)
- [src/lib/crossex3d.js](../src/lib/crossex3d.js) - Dependency-free WebGL 3D unit view

### Templates & Specs
- [views/crossex_base.ejs](../views/crossex_base.ejs) - Main app wrapper
- [views/crossex.1.20260225.vg.json](../views/crossex.1.20260225.vg.json) - Current Vega spec (single-line minified JSON; keep the filename's version suffix in sync with `package.json`)
- [views/wrapper.ejs](../views/wrapper.ejs) - Standalone script builder
- [views/body.ejs](../views/body.ejs) - UI component HTML (landing page, chart gallery)
- [views/crossex_html.ejs](../views/crossex_html.ejs) - Control panel tabs & widget chrome

### Data & Styles
- [src/penguins.csv](../src/penguins.csv) - Demo dataset
- [src/inc/cc_styles.css](../src/inc/cc_styles.css) - Core styles
- [src/inc/vega-embed-cc.js](../src/inc/vega-embed-cc.js) - Custom Vega embed

## Common Tasks

**Task: Add a new filter type**
- Add signal to Vega spec `.vg.json`
- Add the control's markup to `crossex_html.ejs` and wire its signal binding in `crossex_base.js`
- Add transform logic in Vega `transform` array
- Rebuild & test

**Task: Optimize chart for large datasets**
- Reduce Vega signal responsiveness (debounce in client JS)
- Add aggregation transforms (count, bin) to Vega spec
- Enable data sampling in stats.js type inference

**Task: Change default demo data**
- Replace `src/penguins.csv` with new file
- Update variable name in `app.js` data object
- Rebuild templates

## Browser & Device Support

Verified (2026-07-07) across all three rendering engines — Blink (Chrome/Edge), WebKit (Safari), Gecko (Firefox) — desktop and mobile (iPhone/iPad/Android), for every figure type including the WebGL 3D view: identical rendering, zero console/page errors, no layout overflow. See the README's [Browser & Device Support](../README.md#browser--device-support) section for the full matrix. The app is a single self-contained page with no server calls at runtime, so compatibility risk is low and concentrated in the WebGL 3D view and canvas-based Vega rendering — re-check both after touching `src/lib/crossex3d.js` or the Vega spec's mark/encoding definitions.

## Notes for Next Developer

1. **Version matching**: File versions in `.vg.json` filename (`crossex.1.20260225.vg.json`) must match `package.json` version. Update both when rolling new releases.
2. **Compression trade-off**: LZ compression saves ~60-70% payload but adds client-side decompression latency. Monitor with prod builds.
3. **Signal binding**: Vega signals automatically sync with UI controls via `bind` property. Any new interactive feature must follow this pattern.
4. **Type inference**: The `stats.js` type detection is critical for auto-axis assignment. If adding new data types (e.g., dates), extend `infer()` and `typeAll()` functions.
