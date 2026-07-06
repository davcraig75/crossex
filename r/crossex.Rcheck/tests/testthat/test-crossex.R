test_that("crossex creates an htmlwidget with the expected shape", {
  w <- crossex(head(iris))
  expect_s3_class(w, "htmlwidget")
  expect_s3_class(w, "crossex")
  expect_named(w$x, c("data", "options"))
  sig_names <- vapply(
    Filter(function(o) !is.null(o$name), w$x$options),
    function(o) o$name, character(1)
  )
  expect_true(all(c("X_Axis", "Y_Axis", "Color_By", "Facet_Cols_By") %in% sig_names))
})

test_that("axis and encoding defaults follow the columns", {
  w <- crossex(mtcars, x = "wt", y = "mpg", color = "cyl")
  opt <- Filter(function(o) identical(o$name, "X_Axis"), w$x$options)[[1]]
  expect_identical(opt$value, "wt")
  expect_identical(sort(unlist(opt$bind$options)), sort(names(mtcars)))
})

test_that("bad inputs are rejected", {
  expect_error(crossex(1:3), "data.frame")
  expect_error(crossex(iris, x = "nope"), "unknown column")
  expect_error(crossex(iris[0, ]), "at least one row")
})

test_that("factors and dates are converted for the widget", {
  df <- data.frame(
    f = factor(c("a", "b")),
    d = as.Date(c("2023-07-02", "2024-01-01"))
  )
  w <- crossex(df)
  expect_type(w$x$data$f, "character")
  expect_true(is.numeric(w$x$data$d))
  expect_equal(w$x$data$d[2], 2024)
  expect_gt(w$x$data$d[1], 2023.4)
  expect_lt(w$x$data$d[1], 2023.6)
})

test_that("hide_panel flag is only present when requested", {
  w1 <- crossex(head(iris))
  w2 <- crossex(head(iris), hide_panel = TRUE)
  has_flag <- function(w) {
    any(vapply(w$x$options, function(o) !is.null(o$hide_panel), logical(1)))
  }
  expect_false(has_flag(w1))
  expect_true(has_flag(w2))
})
