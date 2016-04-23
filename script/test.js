/* global config echo exec */

require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var detectBuild = require("../detect-build");

var fullBuild = detectBuild();
var words = fullBuild.split("-");
var build = words[0];
var shim = words[1] ? " -r babel-polyfill" : "";

var tests = process.argv.length > 2 ? process.argv.slice(2)
          : ["src", "current", "legacy", "legacy-shim"];

for (var i = 0; i < tests.length; i++) {
  echo("*** BEGIN TEST " + tests[i]);

  switch (tests[i]) {
    case "src":
      exec("BABEL_ENV=" + build + " mocha -c" + shim + " -r test/bootstrap/src"
         + " test/");
      break;
    default:
      throw Error("Invalid test: " + tests[i]);
  }

  echo("*** END TEST " + tests[i]);
}
