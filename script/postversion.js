/* global exec */
require("shelljs/global");

exec("git checkout dev");
exec("git merge master");
exec("git push");
exec("git push --tags");
exec("npm publish");
