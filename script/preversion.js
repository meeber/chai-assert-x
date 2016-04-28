var sh = require("shelljs");

sh.set("-e");

sh.exec("git checkout master");
sh.exec("git merge dev");
sh.exec("npm run build");
sh.exec("git add -A");
