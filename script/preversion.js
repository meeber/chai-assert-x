/* global exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

exec("git checkout master");
exec("git merge dev");
exec("npm run build");
exec("npm run test");
exec("git add -A");
