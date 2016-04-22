// See README for usage details

var semver = require("semver");

if (semver.gte(process.version, "v6.0.0-rc.0"))
  module.exports = require("./current");
else if (typeof Reflect === "object")
  module.exports = require("./legacy");
else
  module.exports = require("./legacy-shim");
