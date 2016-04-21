/* global echo exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var tests = process.argv.length > 2 ? process.argv.slice(2)
: ["src", "node-current", "node-legacy", "node-legacy-shim"];

for (var i = 0; i < tests.length; i++) {
  echo("*** BEGIN " + tests[i]);

  switch (tests[i]) {
    case "src":
      // source-map-support must come before babel-core
      exec("BABEL_ENV=current mocha -c -r source-map-support/register"
      + " -r babel-core/register test/bootstrap/");
      break;
    case "node-current":
      exec("mocha -c dist/node-current/test/bootstrap/");
      break;
    case "node-legacy":
      exec("mocha -c dist/node-legacy/test/bootstrap/");
      break;
    case "node-legacy-shim":
      exec("mocha -c -r babel-polyfill dist/node-legacy/test/bootstrap/");
      break;
    default:
      throw Error("Invalid test: " + tests[i]);
  }

  echo("*** END " + tests[i]);
}
