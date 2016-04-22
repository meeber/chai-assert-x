/* global echo exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var tests = process.argv.length > 2 ? process.argv.slice(2)
: ["src", "current", "legacy", "legacy-shim"];

for (var i = 0; i < tests.length; i++) {
  echo("*** BEGIN TEST " + tests[i]);

  switch (tests[i]) {
    case "src":
      // source-map-support must come before babel-core
      exec("BABEL_ENV=current mocha -c -r source-map-support/register"
      + " -r babel-core/register test/bootstrap/");
      break;
    case "current":
    case "legacy":
      exec("mocha -c build/" + tests[i] + "/test/bootstrap/");
      break;
    case "legacy-shim":
      exec("mocha -c -r babel-polyfill build/legacy/test/bootstrap/");
      break;
    default:
      throw Error("Invalid test: " + tests[i]);
  }

  echo("*** END TEST " + tests[i]);
}
