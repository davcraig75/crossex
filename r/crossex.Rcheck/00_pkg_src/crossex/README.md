# crossex for R

Interactive data exploration for data frames: one call opens a full
exploration environment — configurable charts (scatter, line, histogram,
box, violin, stacked bar, heatmap, correlation matrix), faceting, filtering,
formula-based column transforms, summary statistics, a raw-data table, a 3D
unit view, and PNG/SVG/CSV export. Everything runs client side (Vega is
bundled); nothing leaves your machine.

## Installation

Until the package is on CRAN, install straight from GitHub:

```r
# install.packages("remotes")
remotes::install_github("davcraig75/crossex", subdir = "r/crossex")
```

Or from a local checkout of this repository:

```r
install.packages("r/crossex", repos = NULL, type = "source")
```

## Usage

```r
library(crossex)

# One call — explore interactively in the RStudio Viewer or your browser
crossex(iris)

# Preset the view
crossex(iris, x = "Sepal.Length", y = "Sepal.Width", color = "Species")

# Facet into subplots
crossex(mtcars, x = "wt", y = "mpg", facet_cols = "cyl")

# Locked-down dashboard style (no control panel)
crossex(iris, x = "Petal.Length", y = "Petal.Width",
        color = "Species", hide_panel = TRUE)
```

### Shiny

```r
library(shiny)
library(crossex)

shinyApp(
  ui = fluidPage(crossexOutput("explorer", height = "700px")),
  server = function(input, output) {
    output$explorer <- renderCrossex(crossex(iris, color = "Species"))
  }
)
```

### R Markdown / Quarto

Any chunk that returns a `crossex()` widget renders it in HTML output.

## Notes

* Factors are converted to character; `Date`/`POSIXt` columns become decimal
  years (e.g. `2023.4986`) so they plot on continuous axes.
* Settings persist per widget in the browser's localStorage.
* The bundled JavaScript is built from the repository root with
  `npm run build` (see the main README).
