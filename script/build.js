/* global cp echo exec mkdir */
require("shelljs/global");

function buildBrowserRelease (rel) {
  var keys = rel.split("-");
  var ver = keys[1];
  var shim = keys[2];

  mkdir("-p", "dist/" + rel + "/src/", "dist/" + rel + "/test/");

  // Release bundle
  var srcEntry = ver + (shim ? "-shim" : "") + ".js";

  exec("browserify -d -s chaiAssertX " + srcEntry
  + " | exorcist dist/" + rel + "/src/chai-assert-x.js.map"
  + " > dist/" + rel + "/src/chai-assert-x.js");

  // Test bundle
  var polyfill = shim ? " -r babel-polyfill" : "";

  exec("browserify -d" + polyfill
  + " dist/node-" + ver + "/test/bootstrap/"
  + " | exorcist dist/" + rel + "/test/tests.js.map"
  + " > dist/" + rel + "/test/tests.js");

  cp(
    "node_modules/mocha/mocha.css",
    "node_modules/mocha/mocha.js",
    "dist/" + rel + "/test/"
  );

  cp(
    "node_modules/mocha/lib/template.html",
    "dist/" + rel + "/test/index.html"
  );
}

function buildNodeRelease (rel) {
  var keys = rel.split("-");
  var ver = keys[1];

  exec("BABEL_ENV=" + ver + " babel -s inline -d dist/" + rel + "/src/ src/");
  exec("BABEL_ENV=" + ver + " babel -s inline -d dist/" + rel + "/test/ test/");
}

var builds = process.argv.length > 2 ? process.argv.slice(2)
: [
  "node-current",
  "node-legacy",
  "browser-current",
  "browser-legacy",
  "browser-legacy-shim",
];

exec("npm run clean");

for (var i = 0; i < builds.length; i++) {
  echo("*** BEGIN " + builds[i]);

  switch (builds[i]) {
    case "node-current":
    case "node-legacy":
      buildNodeRelease(builds[i]);
      break;
    case "browser-current":
    case "browser-legacy":
    case "browser-legacy-shim":
      buildBrowserRelease(builds[i]);
      break;
    default:
      throw Error("Invalid build: " + builds[i]);
  }

  echo("*** END " + builds[i]);
}
