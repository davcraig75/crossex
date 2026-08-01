# Example data library

Nine datasets, each chosen because it produces a specific chart well. Nothing here is
embedded in the application bundle — the files are fetched on demand, so the library can
grow without making the app heavier.

`manifest.json` is the source of truth. For every dataset it records the source, the license,
and one or more **claims**: a column mapping plus the chart that mapping should produce.

Those claims are not decoration. [`e2e/example-library.spec.js`](../e2e/example-library.spec.js)
loads every dataset, applies every mapping from a clean state, and asserts that the app
actually chose the named chart and drew something. If a claim in this table stops being true,
the test suite fails.

## The datasets

| Dataset | Rows | Demonstrates | Source | License |
|---|---:|---|---|---|
| `penguins.csv` | 344 | Scatter, box, violin, strip | Palmer Station Antarctica LTER | CC0-1.0 |
| `seattle-weather.csv` | 1461 | Histogram + density, ridgeline, waffle, 1-D heatmap, box | NOAA NCDC | Public domain (US Gov) |
| `crimea-nightingale.csv` | 72 | **Nightingale rose**, stacked bar, waffle | Florence Nightingale (1859) | Public domain |
| `unemployment-industries.csv` | 1708 | **Stream graph**, grouped bar, line | US Census CPS / BLS | Public domain (US Gov) |
| `gapminder.csv` | 682 | Bubble scatter, faceted scatter, box over time | Gapminder Foundation | CC-BY-4.0 |
| `co2-concentration.csv` | 741 | Line / time series (the Keeling curve) | Scripps CO2 Program | CC-BY-4.0 |
| `barley.csv` | 120 | **Marimekko**, grouped bar, faceted box, heatmap | USDA Tech. Bulletin 735 (1940) | Public domain (US Gov) |
| `us-budget-change.csv` | 8 | **Waterfall**, treemap, donut | US OMB, FY2016 receipts | Public domain (US Gov) |
| `project-plan.csv` | 18 | **Gantt** | *Synthetic — authored for this library* | CC0-1.0 |

Datasets marked *via vega-datasets* were retrieved from
[vega/vega-datasets](https://github.com/vega/vega-datasets), which republishes them with
provenance; each retains its original source license, recorded per-dataset in the manifest.

## A note on two of them

**`crimea-nightingale.csv`** is the data behind the original polar-area diagram. In 1858
Florence Nightingale drew British Army deaths in the Crimea split by cause to show that most
soldiers were dying of preventable disease rather than wounds — and used the chart to argue
for sanitary reform. Loading it and choosing the `rose` layout reconstructs the argument.
It is reshaped to long format (one row per month per cause) so the cause breakdown is
mappable to color.

**`project-plan.csv` is synthetic.** It describes no real project. It exists because a Gantt
chart needs paired start/end columns and no suitable public dataset was small enough to be
worth bundling. It is labelled `"synthetic": true` in the manifest, and the test suite
requires anything so labelled to say so in its description.

## Adding a dataset

1. Drop the CSV in this folder (keep it under ~100KB so share links stay viable).
2. Add an entry to `manifest.json` with `source`, `license`, and at least one claim in
   `demonstrates`. Each claim needs a `mapping` (signal → value) and an `expect` (the chart
   mode signal that should become true — e.g. `show_parts_graph`).
3. Run `npx playwright test e2e/example-library.spec.js`. The suite will tell you if the
   mapping does not actually produce the chart you claimed.
4. `npm run build:all` copies the folder into `public/` and `docs/`.
