/* global rm */
require("shelljs/global");

// Older versions of node swallow some errors if this isn't set
config.fatal = true;

rm("-rf", "dist/");
