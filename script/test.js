/* global config echo exec */

require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var detectBuild = require("../detect-build");

function runBuildTest (test) {
  // Note: There isn't a legacy-shim test build. Instead, use legacy test build.
  // The shim gets added by build/legacy-shim.js which is required by bootstrap.

  var env = test.split("-")[0];

  exec("mocha -c -r test/bootstrap/" + test + " build/" + env + "/test/");
}

function runSrcTest () {
  var build = detectBuild().split("-");
  var env = build[0];
  var shim = build[1] === "shim" ? "-r babel-polyfill" : "";

  exec("BABEL_ENV=" + env
     + " mocha -c "
     + shim
     + " -r test/bootstrap/src"
     + " test/");

  exec("npm run lint");
}

function main () {
  var tests = process.argv.length > 2 ? process.argv.slice(2)
            : ["src", detectBuild()];

  var i;

  for (i = 0; i < tests.length; i++) {
    echo("*** BEGIN TEST " + tests[i]);

    switch (tests[i]) {
      case "current":
      case "legacy":
      case "legacy-shim":
        runBuildTest(tests[i]);
        break;
      case "src":
        runSrcTest();
        break;
      default:
        throw Error("Invalid test: " + tests[i]);
    }

    echo("*** END TEST " + tests[i]);
  }
}

main();
