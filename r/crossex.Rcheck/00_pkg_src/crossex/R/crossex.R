# crossex: htmlwidgets wrapper around the crossex JavaScript library.
# The bundled JS (inst/htmlwidgets/lib/crossex/crossex.js) is built from the
# repository root with `npm run build`; man pages are hand-maintained.

#' Interactive data exploration widget
#'
#' Renders a full exploration environment for a data frame: configurable
#' charts, faceting, filtering, formula transforms, summary statistics, a data
#' table, and a 3D unit view, with PNG/SVG/CSV export.
#'
#' @param data A data frame. Factors are converted to character; `Date` and
#'   `POSIXt` columns are converted to decimal years (e.g. `2023.4986`) so
#'   they plot on a continuous axis.
#' @param x,y Column names for the initial X and Y axes. Defaults to the
#'   first and second columns. Use `"None"` for a one-variable histogram.
#' @param color,size Optional column names for the color and point-size
#'   encodings; default `"None"`.
#' @param facet_rows,facet_cols Optional column names that split the chart
#'   into a grid of subplots; default `"None"`.
#' @param editable Show the control panel (tabs on the left). Default `TRUE`.
#' @param exportable Enable PNG/SVG/CSV export actions. Default `TRUE`.
#' @param hide_panel Hide the control panel entirely, for locked-down
#'   dashboard views. Default `FALSE`.
#' @param width,height Widget size, passed to
#'   [htmlwidgets::createWidget()]. Defaults fill the container.
#' @param elementId Optional explicit DOM id for the widget element.
#'
#' @return An object of class `htmlwidget` that prints itself in the RStudio
#'   viewer or browser, and renders inside Shiny apps and R Markdown documents.
#'
#' @examples
#' crossex(iris)
#' crossex(iris, x = "Sepal.Length", y = "Sepal.Width", color = "Species")
#' crossex(mtcars, x = "wt", y = "mpg", facet_cols = "cyl")
#'
#' @seealso [crossexOutput()] and [renderCrossex()] for Shiny.
#' @export
crossex <- function(data, x = NULL, y = NULL, color = NULL, size = NULL,
                    facet_rows = NULL, facet_cols = NULL,
                    editable = TRUE, exportable = TRUE, hide_panel = FALSE,
                    width = NULL, height = NULL, elementId = NULL) {
  if (!is.data.frame(data)) {
    stop("`data` must be a data.frame", call. = FALSE)
  }
  if (nrow(data) < 1L || ncol(data) < 1L) {
    stop("`data` must have at least one row and one column", call. = FALSE)
  }
  df <- as.data.frame(data, stringsAsFactors = FALSE)
  for (nm in names(df)) {
    col <- df[[nm]]
    if (is.factor(col)) {
      df[[nm]] <- as.character(col)
    } else if (inherits(col, "Date") || inherits(col, "POSIXt")) {
      df[[nm]] <- decimal_year(col)
    }
  }
  cols <- names(df)

  pick <- function(v, default, arg) {
    if (is.null(v)) {
      return(default)
    }
    v <- as.character(v)[[1L]]
    if (!v %in% c(cols, "None", "Sum", "Count")) {
      stop("unknown column in `", arg, "`: ", v, call. = FALSE)
    }
    v
  }
  sig <- function(name, value) {
    list(name = name, value = value, bind = list(options = as.list(cols)))
  }

  options <- list(
    list(editable = isTRUE(editable)),
    list(exportable = isTRUE(exportable)),
    sig("X_Axis", pick(x, cols[[1L]], "x")),
    sig("Y_Axis", pick(y, if (length(cols) > 1L) cols[[2L]] else "None", "y")),
    sig("Color_By", pick(color, "None", "color")),
    sig("Size_By", pick(size, "None", "size")),
    sig("Opacity_By", "None"),
    sig("Stroke_By", "None"),
    sig("Facet_Rows_By", pick(facet_rows, "None", "facet_rows")),
    sig("Facet_Cols_By", pick(facet_cols, "None", "facet_cols")),
    sig("Sum_By", "None"),
    sig("SortX_By", "None"),
    sig("Search_By", pick(x, cols[[1L]], "x")),
    sig("Filter_By_Value", "None"),
    sig("Filter_Additional", "None"),
    sig("Filter_Out_From", "None")
  )
  # presence of the flag alone hides the panel in the JS API, so only add it
  # when requested
  if (isTRUE(hide_panel)) {
    options <- c(options, list(list(hide_panel = TRUE)))
  }

  htmlwidgets::createWidget(
    name = "crossex",
    x = list(data = df, options = options),
    width = width,
    height = height,
    package = "crossex",
    elementId = elementId,
    sizingPolicy = htmlwidgets::sizingPolicy(
      defaultWidth = "100%",
      defaultHeight = 620,
      viewer.fill = TRUE,
      browser.fill = TRUE,
      knitr.figure = FALSE,
      knitr.defaultHeight = 620
    )
  )
}

# Date/POSIXt -> decimal year, matching the JavaScript app's convention
decimal_year <- function(col) {
  t <- as.POSIXct(col, tz = "UTC")
  lt <- as.POSIXlt(t)
  year <- lt$year + 1900L
  start <- as.numeric(ISOdate(year, 1L, 1L, 0L, 0L, 0L, tz = "UTC"))
  end <- as.numeric(ISOdate(year + 1L, 1L, 1L, 0L, 0L, 0L, tz = "UTC"))
  out <- round(year + (as.numeric(t) - start) / (end - start), 4L)
  out[is.na(col)] <- NA_real_
  out
}

#' Shiny bindings for crossex
#'
#' Output and render functions for using crossex widgets within Shiny
#' applications and interactive R Markdown documents.
#'
#' @param outputId Output variable to read from.
#' @param width,height Must be a valid CSS unit (like `"100%"`, `"600px"`)
#'   or a number, which will be coerced to a string and have `"px"` appended.
#' @param expr An expression that generates a crossex widget.
#' @param env The environment in which to evaluate `expr`.
#' @param quoted Is `expr` a quoted expression (with `quote()`)? This is
#'   useful if you want to save an expression in a variable.
#'
#' @return `crossexOutput()` returns a Shiny output element;
#'   `renderCrossex()` returns a Shiny render function.
#'
#' @examples
#' if (interactive() && requireNamespace("shiny", quietly = TRUE)) {
#'   library(shiny)
#'   shinyApp(
#'     ui = fluidPage(crossexOutput("explorer", height = "700px")),
#'     server = function(input, output) {
#'       output$explorer <- renderCrossex(crossex(iris, color = "Species"))
#'     }
#'   )
#' }
#'
#' @name crossex-shiny
NULL

#' @rdname crossex-shiny
#' @export
crossexOutput <- function(outputId, width = "100%", height = "620px") {
  htmlwidgets::shinyWidgetOutput(outputId, "crossex", width, height,
                                 package = "crossex")
}

#' @rdname crossex-shiny
#' @export
renderCrossex <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) {
    expr <- substitute(expr)
  }
  htmlwidgets::shinyRenderWidget(expr, crossexOutput, env, quoted = TRUE)
}
