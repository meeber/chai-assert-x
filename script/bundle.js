/* global cp echo exec mkdir */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

function createBundle (bundle) {
  var words = bundle.split("-");
  var build = words[0];
  var shim = words[1];

  mkdir("-p", "bundle/" + bundle + "/test/");

  // Release bundle
  exec("browserify -d -s chaiAssertX " + bundle + ".js"
  + " | exorcist bundle/" + bundle + "/bundle.js.map"
  + " > bundle/" + bundle + "/bundle.js");

  // Test bundle
  var polyfill = shim ? " -r babel-polyfill" : "";

  exec("browserify -d" + polyfill
  + " build/" + build + "/test/bootstrap/"
  + " | exorcist bundle/" + bundle + "/test/tests.js.map"
  + " > bundle/" + bundle + "/test/tests.js");

  cp(
    "node_modules/mocha/mocha.css",
    "node_modules/mocha/mocha.js",
    "bundle/" + bundle + "/test/"
  );

  cp(
    "node_modules/mocha/lib/template.html",
    "bundle/" + bundle + "/test/index.html"
  );
}

var bundles = process.argv.length > 2 ? process.argv.slice(2)
: ["current", "legacy", "legacy-shim"];

exec("npm run clean bundle");

for (var i = 0; i < bundles.length; i++) {
  echo("*** BEGIN BUNDLE " + bundles[i]);

  switch (bundles[i]) {
    case "current":
    case "legacy":
    case "legacy-shim":
      createBundle(bundles[i]);
      break;
    default:
      throw Error("Invalid bundle: " + bundles[i]);
  }

  echo("*** END BUNDLE " + bundles[i]);
}
