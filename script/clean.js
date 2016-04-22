/* global config echo rm */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var targets = process.argv.length > 2 ? process.argv.slice(2)
: ["build", "bundle"];

for (var i = 0; i < targets.length; i++) {
  echo("*** BEGIN CLEAN " + targets[i]);

  switch (targets[i]) {
    case "bundle":
      rm("-rf", "bundle/legacy-shim");
      // Fall through
    case "build":
      rm("-rf", targets[i] + "/current", targets[i] + "/legacy");
      break;
    default:
      throw Error("Invalid target: " + targets[i]);
  }

  echo("*** END CLEAN " + targets[i]);
}
