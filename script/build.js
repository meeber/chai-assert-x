var sh = require("shelljs");

sh.set("-e");

var detectBuild = require("./util/detect-build");

function createBuild (build) {
  sh.exec("BABEL_ENV=" + build + " babel"
        + " -s inline"
        + " -d build/" + build + "/"
        + " src/");

  sh.mkdir("build/" + build + "/test");

  sh.exec("BABEL_ENV=" + build + " babel"
        + " -s inline"
        + " -o build/" + build + "/test/index.js"
        + " test/index.js");
}

function main () {
  sh.exec("npm run clean build");
  sh.exec("npm run test coverage");

  var builds = ["current", "legacy", "legacy-shim"];

  var i;

  for (i = 0; i < builds.length; i++) {
    sh.echo("*** BEGIN BUILD " + builds[i]);

    switch (builds[i]) {
      case "current":
      case "legacy":
        createBuild(builds[i]);
        break;
      case "legacy-shim":
        sh.cp("script/resource/legacy-shim.js", "build/");
        break;
      default:
        throw Error("Invalid build: " + builds[i]);
    }

    sh.echo("*** END BUILD " + builds[i]);
  }

  sh.exec("npm run test " + detectBuild());
  sh.exec("npm run bundle");
}

main();
