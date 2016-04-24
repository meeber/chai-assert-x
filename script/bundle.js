/* global config cp echo exec mkdir */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

function createBundle (bundle) {
  var words = bundle.split("-");
  var build = words[0];

  mkdir("-p", "bundle/" + bundle + "/test/");

  // Release bundle
  exec("browserify -d -s chaiAssertX build/" + bundle
     + " | exorcist bundle/" + bundle + "/bundle.js.map"
     + " > bundle/" + bundle + "/bundle.js");

  // Test bundle
  exec("browserify -d test/bootstrap/bundle.js"
     + " -o bundle/" + bundle + "/test/bootstrap.js");

  exec("BABEL_ENV=" + build + " babel -s inline"
     + " -o bundle/" + bundle + "/test/test.js"
     + " test/index.js");

  cp(
    "node_modules/mocha/mocha.css",
    "node_modules/mocha/mocha.js",
    "bundle/" + bundle + "/test/"
  );

  cp("script/resource/test.html", "bundle/" + bundle + "/test/index.html");
}

function main () {
  exec("npm run clean bundle");

  var bundles = process.argv.length > 2 ? process.argv.slice(2)
              : ["current", "legacy", "legacy-shim"];

  var i;

  for (i = 0; i < bundles.length; i++) {
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
}

main();
