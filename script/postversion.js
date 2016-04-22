/* global config exec */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

exec("git checkout dev");
exec("git merge master");
exec("git push");
exec("git push --tags");
exec("npm publish");
