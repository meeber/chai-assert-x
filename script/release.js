var sh = require("shelljs");

sh.set("-e");

function main () {
  var version = process.argv.length > 2 ? process.argv[3] : "";

  sh.exec("npm version " + version + " -m 'Finalize v%s'");
}

main();
