/* global config echo exec */

require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var detectBuild = require("../detect-build");

function runTest (env, shim, test, target) {
  exec("BABEL_ENV=" + env
     + " mocha -c "
     + shim
     + " -r test/bootstrap/" + test
     + " " + target);
}

function main () {
  var build = detectBuild().split("-");
  var env = build[0];
  var shim = build[1] ? "-r babel-polyfill" : "";

  var tests = process.argv.length > 2 ? process.argv.slice(2) : ["main"];

  var i, target;

  for (i = 0; i < tests.length; i++) {
    echo("*** BEGIN TEST " + tests[i]);

    switch (tests[i]) {
      case "current":
      case "legacy":
      case "legacy-shim":
      case "main":
        target = "test/index.js";
        break;
      case "src":
        target = "test/";
        break;
      default:
        throw Error("Invalid test: " + tests[i]);
    }

    runTest(env, shim, tests[i], target);

    echo("*** END TEST " + tests[i]);
  }
}

main();
