/* global rm */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

var targets = process.argv.length > 2 ? process.argv.slice(2)
: ["build", "bundle"];

for (var i = 0; i < targets.length; i++) {
  echo("*** BEGIN CLEAN " + targets[i]);

  switch (targets[i]) {
    case "build":
    case "bundle":
      rm("-rf", targets[i]);
      break;
    default:
      throw Error("Invalid target: " + targets[i]);
  }

  echo("*** END CLEAN " + targets[i]);
}
