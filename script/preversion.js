/* global exec */
require("shelljs/global");

exec("git checkout master");
exec("git merge dev");
exec("npm run build");
exec("npm run test");
exec("git add -A");
