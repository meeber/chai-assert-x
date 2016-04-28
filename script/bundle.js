var sh = require("shelljs");

sh.set("-e");

var foolishrc = require("./util/foolishrc");

function createBundle (bundle) {
  // Note: The legacy-shim and legacy bootstrap/test are identical. The shim for
  // legacy-shim is provided via its bundle.js; it will apply to tests too.

  var env = bundle.split("-")[0];

  sh.mkdir("-p", "bundle/" + bundle + "/test/");

  // Release bundle
  sh.exec("browserify -d -s " + foolishrc.mainExport + " build/" + bundle
        + " | exorcist bundle/" + bundle + "/bundle.js.map"
        + " > bundle/" + bundle + "/bundle.js");

  // Test bootstrap bundle
  sh.exec("browserify -d test/bootstrap/common.js"
        + " -o bundle/" + bundle + "/test/bootstrap.js");

  // Test bundle
  sh.exec("browserify -d build/" + env + "/test/"
        + " | exorcist bundle/" + bundle + "/test/test.js.map"
        + " > bundle/" + bundle + "/test/test.js");

  sh.cp(
    "node_modules/mocha/mocha.css",
    "node_modules/mocha/mocha.js",
    "bundle/" + bundle + "/test/"
  );

  sh.cp("script/resource/test.html", "bundle/" + bundle + "/test/index.html");
}

function main () {
  sh.exec("npm run clean bundle");

  var bundles = process.argv.length > 2 ? process.argv.slice(2)
              : ["current", "legacy", "legacy-shim"];

  var i;

  for (i = 0; i < bundles.length; i++) {
    sh.echo("*** BEGIN BUNDLE " + bundles[i]);

    switch (bundles[i]) {
      case "current":
      case "legacy":
      case "legacy-shim":
        createBundle(bundles[i]);
        break;
      default:
        throw Error("Invalid bundle: " + bundles[i]);
    }

    sh.echo("*** END BUNDLE " + bundles[i]);
  }
}

main();
