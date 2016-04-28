var sh = require("shelljs");

sh.set("-e");

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

  var builds = process.argv.length > 2 ? process.argv.slice(2)
             : ["current", "legacy", "legacy-shim"];

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
}

main();
