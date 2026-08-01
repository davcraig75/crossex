//////////////////////////////////////////////////////////////////////////////////
// Not LIVE
//////////////////////////////////////////////////////////////////////////////////
var pjson = require('./package.json');
const express = require("express");
const compression = require("compression");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
var debug = require("debug")("ripple:server");
const fs = require("fs");

const projectRoot = __dirname;
const fromRoot = function() {
  return path.join.apply(path, [projectRoot].concat(Array.prototype.slice.call(arguments)));
};

dotenv.config();

const app = express();
var port = normalizePort(process.env.API_PORT || "8080");
app.set("port", port);

// View engine
app.set("view engine", "ejs");
app.set("views", fromRoot("views"));

// Middleware - compression first for best effect
app.use(compression());

// The server has no write API: keep the middleware surface intentionally
// small and add the baseline headers expected from a production static app.
// A CSP is not sent here because the distributable intentionally contains an
// inline, self-contained script; deployment owners can use a nonce/hash CSP.
app.disable("x-powered-by");
app.use(function(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

var app_name = "crossex";

// ALLOW CORS (Modify as appropriate)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Static files (cache for 1 hour; browsers revalidate with ETag after that)
var static_opts = { maxAge: "1h" };
app.use(express.static(fromRoot('public'), static_opts));
app.use('/public', express.static(fromRoot('public'), static_opts));
app.use('/src', express.static(fromRoot('src'), static_opts));

// Compression utilities
var itgz = require("./src/lz-string.js");
var itg_comp = function(file) {
  return itgz.compressToEncodedURIComponent(fs.readFileSync(fromRoot(file), "utf8"));
};
var itg_engz = function(data) {
  return itgz.compressToEncodedURIComponent(JSON.stringify(data)).toString();
};

var d3 = require("./src/d3-dsv.v1.min.js");

/////////////////////////////////////////////////////////////////////////////////
// Template data
//////////////////////////////////////////////////////////////////////////////////
var data = {
  min_smartplot: [],
  demo: itg_comp("src/penguins.csv"),
  cc_css: itg_comp("src/inc/cc_styles.css"),
  pvt_css: itg_comp("src/lib/pivot.css"),
  ext_styles: itg_comp("src/ext_styles.css"),
  save_icon: itg_comp("src/inc/file-download-solid.svg"),
  body: itg_comp("views/body.ejs"),
  crossex_html: itg_comp("views/crossex_html.ejs"),
  crossex_spec: itg_comp("views/crossex." + pjson.version + ".vg.json"),
  itgversion: pjson.version
};

var file_str = fs.readFileSync(fromRoot("src/penguins.csv"), "utf8");
var dat_json = d3.csvParse(file_str, d3.autoType);


/////////////////////////////////////////////////////////////////////////////////
// Webpage From Node
//////////////////////////////////////////////////////////////////////////////////
app.get("/", function(req, res) {
  res.setHeader("Cache-Control", "no-cache");
  res.render("stand_alone", data);
});

app.get("/healthz", function(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.json({ status: "ok", version: pjson.version });
});


//////////////////////////////////////////////////////////////////////////////////
// Compile Javascript
//////////////////////////////////////////////////////////////////////////////////
var build_mode = process.argv[2] == "build" || process.argv[2] == "build_site" || process.argv[2] == "build_pages";

// The standalone page is fully self-contained except for these local libs,
// referenced by relative path from index.html
var page_assets = [
  ["src/lib/jquery-3.6.0.min.js", "src/lib"],
  ["src/lib/jquery-ui.min.js", "src/lib"],
  ["src/lib/jquery.ui.touch-punch.min.js", "src/lib"],
  ["src/lib/pivot.js", "src/lib"],
  ["src/d3-dsv.v1.min.js", "src"],
  ["public/crossex.120.png", ""]
];
function copyPageAssets(destRoot) {
  page_assets.forEach(function(asset) {
    var destDir = fromRoot(destRoot, asset[1]);
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(fromRoot(asset[0]), path.join(destDir, path.basename(asset[0])));
  });
  copyExamples(destRoot);
}

// The example library is fetched on demand rather than bundled, so every build
// target needs its own copy of the folder (build_pages wipes docs/ first).
function copyExamples(destRoot) {
  var src = fromRoot("examples");
  if (!fs.existsSync(src)) { return; }
  var dest = fromRoot(destRoot, "examples");
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(function(name) {
    if (!/\.(csv|json)$/.test(name)) { return; }
    fs.copyFileSync(path.join(src, name), path.join(dest, name));
  });
}

function renderToString(view) {
  return new Promise(function(resolve, reject) {
    app.render(view, data, function(err, output) {
      if (err) { reject(err); } else { resolve(output); }
    });
  });
}

if (process.argv[2] == "build_site") {
  renderToString("wrapper").then(function(javascript) {
    javascript = javascript.trimEnd() + "\n";
    fs.writeFileSync(fromRoot("public", app_name + "_site.js"), javascript);
    copyExamples("public");
    console.log("Built crossex_site.js -> public/");
    fs.writeFileSync(fromRoot(app_name + "_site.js"), javascript);
    console.log("Built crossex_site.js -> root");
    return renderToString("stand_alone");
  }).then(function(html) {
    fs.writeFileSync(fromRoot("electron", "index.html"), html);
    copyPageAssets("electron");
    console.log("Built index.html + libs -> electron/");
  }).catch(function(err) {
    console.error(err);
    process.exitCode = 1;
  });
}

// Static GitHub Pages demo: the whole app as ~6 files under docs/
if (process.argv[2] == "build_pages") {
  renderToString("stand_alone").then(function(html) {
    fs.rmSync(fromRoot("docs"), { recursive: true, force: true });
    fs.mkdirSync(fromRoot("docs"), { recursive: true });
    fs.writeFileSync(fromRoot("docs", "index.html"), html);
    fs.writeFileSync(fromRoot("docs", ".nojekyll"), "");
    copyPageAssets("docs");
    console.log("Built GitHub Pages demo -> docs/");
  }).catch(function(err) {
    console.error(err);
    process.exitCode = 1;
  });
}

if (process.argv[2] == "build") {
  renderToString("crossex_base").then(function(javascript) {
    javascript = javascript.trimEnd() + "\n";
    fs.writeFileSync(fromRoot(app_name + ".js"), javascript);
    console.log("Built crossex.js -> root");
    fs.writeFileSync(fromRoot("public", app_name + ".js"), javascript);
    console.log("Built crossex.js -> public/");
    fs.writeFileSync(fromRoot("electron", app_name + ".js"), javascript);
    console.log("Built crossex.js -> electron/");
    // keep the R package's bundled library in sync
    var rlib = fromRoot("r", "crossex", "inst", "htmlwidgets", "lib", "crossex");
    fs.mkdirSync(rlib, { recursive: true });
    fs.writeFileSync(path.join(rlib, app_name + ".js"), javascript);
    console.log("Built crossex.js -> " + rlib + "/");
  }).catch(function(err) {
    console.error(err);
    process.exitCode = 1;
  });
}

//////////////////////////////////////////////////////////////////////////////////
// Server
//////////////////////////////////////////////////////////////////////////////////
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onListening() {
  var addr = this.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

function startServer(listenPort) {
  var server = http.createServer(app);
  listenPort = listenPort === undefined ? port : listenPort;
  server.listen(listenPort);
  server.on("error", onError);
  server.on("listening", onListening);
  return server;
}

if (require.main === module && !build_mode) {
  var server = startServer(port);
  console.log("ITG RESTful API server started on: " + port);

  ["SIGINT", "SIGTERM"].forEach(function(signal) {
    process.once(signal, function() {
      server.close(function() { process.exit(0); });
    });
  });
}

module.exports = { app: app, startServer: startServer };

//////////////////////////////////////////////////////////////////////////////////
