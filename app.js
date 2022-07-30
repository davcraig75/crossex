//////////////////////////////////////////////////////////////////////////////////
// Not LIVE
//////////////////////////////////////////////////////////////////////////////////
var pjson = require('./package.json');
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
var debug = require("debug")("ripple:server");
const fs = require("fs");
const app = express();
require("dotenv").config();
var port = normalizePort(process.env.API_PORT || "8080");
var version = process.env.VERSION;
app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app_name = "crossex";

// ALLOW CORS (Modify as appropriate)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
itgz = require("./src/lz-string.js");
var itg_comp = function(file) {
  return itgz.compressToEncodedURIComponent(fs.readFileSync(file, "utf8"));
};
var itg_engz = function(data) {
  return itgz.compressToEncodedURIComponent(JSON.stringify(data)).toString();
};

d3 = require("./src/d3-dsv.v1.min.js");

/////////////////////////////////////////////////////////////////////////////////
// Convert csv to json
//////////////////////////////////////////////////////////////////////////////////



var data = {
  min_smartplot: [],
  demo: itg_comp("src/penguins.csv"),
  cc_css: itg_comp("src/inc/cc_styles.css"),
  pvt_css: itg_comp("src/lib/pivot.css"),
  ext_styles:itg_comp("src/ext_styles.css"),
  save_icon: itg_comp("src/inc/file-download-solid.svg"),
  body: itg_comp("views/body.ejs"),
  crossex_html: itg_comp("views/crossex_html.ejs"),
  crossex_spec: itg_comp("views/crossex."+pjson.version+".vg.json"),
  itgversion: pjson.version
};

var file_str=fs.readFileSync("src/penguins.csv", "utf8");
dat_json = d3.csvParse(file_str, d3.autoType);
var template_data = {
  min_smartplot: [],
  cc_css: itg_comp("src/inc/cc_styles.css"),
  bootstrap_css:itg_comp("src/bootstrap.min.css"),
  jqueryui_css:itg_comp("src/jquery-ui.css"),
  save_icon: itg_comp("src/inc/file-download-solid.svg"),
  body: itg_comp("views/body.ejs"),
  crossex_html: itg_comp("views/crossex_html.ejs"),
  crossex_spec: itg_comp("views/crossex."+pjson.version+".vg.json"),
  itgversion: pjson.version
};
/////////////////////////////////////////////////////////////////////////////////
// Start server & Paths
/////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));


/////////////////////////////////////////////////////////////////////////////////
// Webpage From Node
//////////////////////////////////////////////////////////////////////////////////
app.get("/", function(req, res) {
  res.render("stand_alone.ejs", data);
});

app.get("/template", function(req, res) {
  res.render("template.ejs", template_data);
});
//////////////////////////////////////////////////////////////////////////////////
// Compile Javascript
//////////////////////////////////////////////////////////////////////////////////
if (process.argv[2] == "build_site") {
  app.render("wrapper.ejs", data, function(err, javascript) {
    fs.writeFile("public/" + app_name + "_site.js", javascript, function(err) {
      if (err) console.error(err);
      console.log("Built javascript");
      fs.writeFile(app_name  + "_site.js", javascript, function(err) {
        if (err) console.error(err);
        console.log("Built javascript");
        process.exit();
      });   
    });
 
  });
}

if (process.argv[2] == "build") {
  app.render("crossex_base.ejs", data, function(err, javascript) {
    fs.writeFile(app_name + ".js", javascript, function(err) {
      if (err) console.error(err);
      console.log("Built javascript");
      fs.writeFile("public/" + app_name  + ".js", javascript, function(err) {
        if (err) console.error(err);
        console.log("Built javascript in public");
        process.exit();
      });   
    });
  });
}

//////////////////////////////////////////////////////////////////////////////////
// Server
/** Event listeners for HTTP  */
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
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/src',express.static(path.join(__dirname, 'src')));
app.use(compression());
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("ITG RESTful API server started on: " + port);

//////////////////////////////////////////////////////////////////////////////////
