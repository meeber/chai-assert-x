/* global config cp echo exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

function createBuild (build) {
  exec("BABEL_ENV=" + build + " babel -s inline -d build/" + build + "/ src/");
}

function main () {
  exec("npm run clean build");

  var builds = process.argv.length > 2 ? process.argv.slice(2)
             : ["current", "legacy", "legacy-shim"];

  var i;

  for (i = 0; i < builds.length; i++) {
    echo("*** BEGIN BUILD " + builds[i]);

    switch (builds[i]) {
      case "current":
      case "legacy":
        createBuild(builds[i]);
        break;
      case "legacy-shim":
        cp("script/resource/legacy-shim.js", "build/");
        break;
      default:
        throw Error("Invalid build: " + builds[i]);
    }

    echo("*** END BUILD " + builds[i]);
  }
}

main();
