# Crossex Codebase Guide for AI Agents

## Project Overview

**Crossex** is a data visualization tool for interactive exploration of tabular datasets. It enables dynamic chart creation with linked filtering, faceting, and statistical views. The project supports both web-based (Express.js) and Electron desktop deployments.

**Current version:** 1.20260120

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
| `npm test` or `node app.js` | Express server on :8080 | Live development |
| `node app.js build` | `crossex.js` | Standalone script for embedding |
| `node app.js build_site` | `crossex_site.js` | Optimized for web hosting |
| `electron-builder --mac` | `.app` bundle | Desktop application |

Routes:
- `/` → `stand_alone.ejs` (full app page)
- `/template` → `template.ejs` (embedded widget)
- `/public/*` → Static assets
- `/src/*` → Data files & libraries

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
// In crossex.1.20260120.vg.json
"signals": [
  {"name": "X_Axis", "value": "island", "bind": {"input": "select", ...}},
  {"name": "Y_Axis", "value": "...", "bind": {...}},
  ...
]
```

These drive data transforms and encodings in the Vega spec.

### Data Type Inference

In `crossex_base.js` (lines 266-376), the system auto-detects column types:
- **Numeric**: Parsed float values, treated as quantitative
- **Categorical**: String/mixed values, treated as ordinal/nominal
- **Optimization**: `optimize_axis()` (crossex_ext.js) auto-assigns axes based on cardinality and type

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

Tabbed interface in `crossex_base.js::ccOpenCity()`:
1. **None** (default) - chart view
2. **Search** - filter data
3. **Charts** - chart type selector
4. **Axis** - axis bindings
5. **Marks** - mark encoding options
6. **Fonts** - typography control
7. **Filtering** - dynamic filters
8. **Coloring** - color scale mapping
9. **Margins** - layout adjustment

Each tab updates Vega spec signals, triggering reactive re-render.

### CSV/JSON Export

Export function (`json2csv`, crossex_base.js:45-70):
- Filters out internal columns (Y_Value, X_Value, Row_Value, Col_Value, Count, etc.)
- Exports user-visible data only
- Uses `Blob` + download link pattern (IE-compatible)

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

- **Server-side**: Modify `app.js`, restart with `npm test`
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
- [views/crossex_base.js](../views/crossex_base.js) - Main rendering & interaction (547 lines)
- [views/crossex_ext.js](../views/crossex_ext.js) - UI extensions (271 lines)
- [views/stats.js](../views/stats.js) - Type inference & profiling

### Templates & Specs
- [views/crossex_base.ejs](../views/crossex_base.ejs) - Main app wrapper
- [views/crossex.1.20260120.vg.json](../views/crossex.1.20260120.vg.json) - Current Vega spec (6068 lines)
- [views/wrapper.ejs](../views/wrapper.ejs) - Standalone script builder
- [views/body.ejs](../views/body.ejs) - UI component HTML

### Data & Styles
- [src/penguins.csv](../src/penguins.csv) - Demo dataset
- [src/inc/cc_styles.css](../src/inc/cc_styles.css) - Core styles
- [src/inc/vega-embed-cc.js](../src/inc/vega-embed-cc.js) - Custom Vega embed

## Common Tasks

**Task: Add a new filter type**
- Add signal to Vega spec `.vg.json`
- Implement UI control in `crossex_base.js::ccOpenCity()`
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

## Notes for Next Developer

1. **Version matching**: File versions in `.vg.json` filename (`crossex.1.20260120.vg.json`) must match `package.json` version. Update both when rolling new releases.
2. **Compression trade-off**: LZ compression saves ~60-70% payload but adds client-side decompression latency. Monitor with prod builds.
3. **Signal binding**: Vega signals automatically sync with UI controls via `bind` property. Any new interactive feature must follow this pattern.
4. **Type inference**: The `stats.js` type detection is critical for auto-axis assignment. If adding new data types (e.g., dates), extend `infer()` and `typeAll()` functions.
