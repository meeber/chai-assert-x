var sh = require("shelljs");

sh.set("-e");

sh.exec("git checkout dev");
sh.exec("git merge master");
sh.exec("git push");
sh.exec("git push --tags");
sh.exec("npm publish");
