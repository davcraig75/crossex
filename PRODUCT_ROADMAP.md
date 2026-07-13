# Crossex product audit and roadmap

Last reviewed: 2026-07-10

## Product assessment

Crossex already has the breadth of a serious analysis product: automatic chart selection, faceting, filtering, large-data sampling, correlation and summary statistics, formula columns, melt/reshape, brush actions, saved and shared views, a virtualized table, 3D, pivoting, and a multi-dataset dashboard builder. Its strongest differentiators are that the full workflow stays in the browser, needs no account, and can also ship as an embedded widget, an R htmlwidget, a static site, or an Electron app.

The main product risk is coherence rather than missing chart types. Advanced capabilities are spread across an icon rail, landing-page prose, gallery presets, and a separate dashboard surface. The implementation is also concentrated in generated, monolithic bundles with very little automated coverage. A production release should therefore prioritize workflow clarity, data correctness, accessibility, reproducible builds, and measurable performance before expanding the visualization grammar.

## What ships well today

- Multiple input paths: paste, file, URL, JSON, CSV, TSV, demo, and generated stress data.
- Strong exploratory depth: dynamic mappings, chart variants, facets, filters, transforms, statistics, tables, pivoting, brushing, 3D, and export.
- Client-side privacy and offline-friendly static distribution.
- Practical large-data behaviors: chunked parsing, incremental typing, sampling controls, and virtualized tabular display.
- Reusable output surfaces: web app, script embed, dashboards, Electron, GitHub Pages, and R/Shiny.

## Gaps and risks

### P0 — release confidence

- Browser workflows lack automated end-to-end coverage; visual behavior is currently regression-tested manually.
- Generated bundles are duplicated across root, public, Electron, docs, and R packaging, which makes stale distributions easy to ship.
- The runtime and build previously depended on the caller's working directory.
- The Node server lacked health checks and baseline production headers.
- The Electron manifest and security settings were still close to starter defaults.
- CSV exports needed spreadsheet-formula neutralization.
- Remote and local inputs needed explicit size, timeout, protocol, and JSON-shape validation.
- A strict Content Security Policy is not currently possible without changing the self-contained inline-script distribution; this should be handled with nonce/hash output or a split asset build.

### P1 — first-run experience and accessibility

- The landing page explains the feature set, but the primary journey still reads as “many buttons plus a large gallery.” A compact workspace entry card with Paste / File / URL / Demo as equal source choices would reduce scanning.
- The icon rail is powerful but needs a searchable command/control index, clearer active states, and contextual empty states.
- Keyboard and assistive-technology coverage must extend from the landing controls into Vega interactions, overlays, pivot drag/drop alternatives, dashboard movement/resizing, and focus management in modals.
- Errors should be persistent and actionable when data cannot be parsed; transient toasts should be reserved for success feedback.
- Claims such as row counts tested and browser compatibility should be generated from repeatable benchmarks/test reports.

### P1 — data workflow capabilities

- Add an import preview with delimiter, encoding, header-row, missing-value, decimal, date-format, and column-type overrides.
- Add dataset quality checks: duplicate rows/keys, missingness patterns, constant columns, high-cardinality IDs, outliers, and invalid values.
- Add undo/redo and a visible transformation history with deterministic replay.
- Add joins, append/union, group-and-summarize, sort, deduplicate, pivot-longer/wider, and type conversion.
- Add project files that capture data-source references, transforms, views, dashboards, annotations, and version metadata in one portable format.
- Add provenance: show whether a view is using full, filtered, transformed, or sampled rows and make exported results reproduce that state.

### P2 — analysis and communication

- Linked filters and cross-highlighting between dashboard tiles.
- Chart annotations, reference lines/bands, labels, notes, and presentation/print layouts.
- More statistical tools only where they form a complete workflow: confidence intervals, effect sizes, multiple-testing correction, missing-data summaries, and model diagnostics.
- Export the declarative Vega spec and a reproducible code snippet alongside PNG/SVG/CSV.
- Optional local-first collaboration through portable project files; any hosted sharing should remain opt-in and make upload boundaries explicit.

### P2 — architecture and performance

- Move parsing, profiling, formulas, correlation, and reshape operations into Web Workers with cancellation and progress.
- Stream remote and local delimited input rather than retaining both a full source string and row objects.
- Split the site shell, core explorer, 3D, and pivot/dashboard features so the initial landing page does not parse a megabyte-scale script.
- Establish performance budgets for initial bundle execution, first demo chart, 100k/1m-row import, interaction latency, peak memory, and export.
- Gradually extract pure modules for parsing, profiling, transforms, state schemas, and CSV export so they can be unit-tested without a DOM.

## Delivery plan

### Milestone 1 — release foundation (implemented)

- Reproducible builds from any directory, synchronized artifacts, CI verification, server smoke tests, dependency audit, health endpoint, graceful shutdown, and baseline headers.
- Safer inputs and exports: JSON row validation, URL protocol/timeout/size limits, file size limit, visible parse errors, and spreadsheet-safe CSV.
- Landing accessibility: semantic buttons and labels, skip link, live status, keyboard gallery, focus visibility, dark-mode state, and reduced-motion behavior.
- Harden Electron defaults and align its product metadata/license.

Exit gate: `npm run verify` succeeds, generated artifacts are clean, dependency audit is clean, and manual smoke checks pass in Chrome, Firefox, and Safari.

### Milestone 2 — trustworthy data intake

- Extract and unit-test parsing/export/state utilities.
- Build import preview and schema/type override UI.
- Add quality report and persistent error panel.
- Add Playwright coverage for every input path, first chart, filters, transforms, table/pivot/3D, share link, export, saved views, and dashboard import/export.
- Run automated accessibility checks plus a keyboard-only acceptance pass.

Progress as of 2026-07-10: parsing, row validation, profiling, type conversion, and CSV serialization have been extracted into a shared tested module. The main explorer now provides persistent import errors, a data-quality report, duplicate/missing/constant/mixed/identifier checks, and Number/Text/Date overrides; dashboard datasets use the same profiler. Desktop and mobile Chromium tests now cover intake, malformed data, quality review, type overrides, keyboard gallery launch, and automated serious/critical accessibility checks. Import delimiter/encoding controls and complete explorer-overlay browser coverage remain.

### Milestone 3 — reproducible analysis workspace

- Undo/redo, transform history, project format with schema migrations, and full provenance indicators.
- Join/append/group/sort/deduplicate/type conversion and pivot-wider.
- Worker-based parsing/profiling/transforms with cancellation and memory budgets.

Progress as of 2026-07-11: the reproducible workspace is implemented for formulas, type overrides, melt, brush subsets, sorting, deduplication, group-and-summarize, append, and left/inner/full joins. Dataset-changing actions create memory-aware immutable states with undo/redo and a visible timeline that preserves the original dataset. Versioned `.crossex.json` projects round-trip current data, options, signals, formulas, and provenance. Pure operation tests and desktop/mobile browser tests cover the workflow. Worker-based execution and multi-aggregation/group-column UI remain performance and ergonomics follow-ups.

### Milestone 4 — dashboard and communication

- Linked dashboard filters, global controls, annotations, responsive presentation layouts, print/PDF, Vega/code export, and documented embed events/API.
- Versioned release notes, signed desktop builds, support matrix, privacy statement, and deployment guide.

## Release checklist

- `npm ci && npm run verify` and `npm audit --omit=dev` pass.
- Generated root/public/docs/Electron/R artifacts are synchronized and committed.
- Browser smoke matrix covers paste, file, URL, share, exports, every overlay, dark mode, mobile layout, and a large-data sample.
- Keyboard-only and screen-reader journeys can load data, configure a chart, inspect results, and export.
- Performance budgets and memory ceilings pass on a representative low-end laptop and mobile device.
- Electron packaging is tested per target OS, including downloads and blocked navigation.
- Package versions, licenses, privacy copy, documentation, and screenshots match the release.
