/* global config echo exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

function createBuild (build) {
  exec("BABEL_ENV=" + build + " babel -s inline -d build/" + build + "/ src/");
}

var builds = process.argv.length > 2 ? process.argv.slice(2)
: ["current", "legacy"];

exec("npm run clean build");

for (var i = 0; i < builds.length; i++) {
  echo("*** BEGIN BUILD " + builds[i]);

  switch (builds[i]) {
    case "current":
    case "legacy":
      createBuild(builds[i]);
      break;
    default:
      throw Error("Invalid build: " + builds[i]);
  }

  echo("*** END BUILD " + builds[i]);
}
