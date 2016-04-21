/* global exec mkdir */
require("shelljs/global");

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
      exec("BABEL_ENV=default babel -s inline -d dist/node-current/src/ src/");
      exec("BABEL_ENV=default babel -s inline -d dist/node-current/test/"
      + " test/");
      break;
    case "node-legacy":
      exec("BABEL_ENV=legacy babel -s inline -d dist/node-legacy/src/ src/");
      exec("BABEL_ENV=legacy babel -s inline -d dist/node-legacy/test/ test/");
      break;
    case "browser-current":
      mkdir("-p", "dist/browser-current/src/", "dist/browser-current/test/");
      exec("browserify -d -i source-map-support -s chaiAssertX current.js"
      + " | exorcist dist/browser-current/src/chai-assert-x.js.map"
      + " > dist/browser-current/src/chai-assert-x.js");
      exec("browserify -d -i source-map-support"
      + " dist/node-current/test/bootstrap/"
      + " | exorcist dist/browser-current/test/chai-assert-x.test.js.map"
      + " > dist/browser-current/test/chai-assert-x.test.js");
      break;
    case "browser-legacy":
      mkdir("-p", "dist/browser-legacy/src/", "dist/browser-legacy/test/");
      exec("browserify -d -i source-map-support -s chaiAssertX legacy.js"
      + " | exorcist dist/browser-legacy/src/chai-assert-x.js.map"
      + " > dist/browser-legacy/src/chai-assert-x.js");
      exec("browserify -d -i source-map-support"
      + " dist/node-legacy/test/bootstrap/"
      + " | exorcist dist/browser-legacy/test/chai-assert-x.test.js.map"
      + " > dist/browser-legacy/test/chai-assert-x.test.js");
      break;
    case "browser-legacy-shim":
      mkdir(
        "-p",
        "dist/browser-legacy-shim/src/",
        "dist/browser-legacy-shim/test/"
      );
      exec("browserify -d -i source-map-support -s chaiAssertX legacy-shim.js"
      + " | exorcist dist/browser-legacy-shim/src/chai-assert-x.js.map"
      + " > dist/browser-legacy-shim/src/chai-assert-x.js");
      exec("browserify -d -i source-map-support -r babel-polyfill"
      + " dist/node-legacy/test/bootstrap/"
      + " | exorcist dist/browser-legacy-shim/test/chai-assert-x.test.js.map"
      + " > dist/browser-legacy-shim/test/chai-assert-x.test.js");
      break;
    default:
      throw Error("Invalid build: " + builds[i]);
  }

  echo("*** END " + builds[i]);
}
