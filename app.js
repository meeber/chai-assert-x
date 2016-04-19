require("source-map-support/register");
var semver = require("semver");

if (semver.gte(process.version, "v6.0.0-rc.0"))
  module.exports = require("./dist");
else
  module.exports = require("./legacy");
