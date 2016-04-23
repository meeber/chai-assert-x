// eslint-disable-next-line no-var
var semver = require("semver");

module.exports = function detectBuild () {
  return semver.gte(process.version, "v6.0.0-rc.0") ? "current"
       : typeof Reflect === "object" ? "legacy"
       : "legacy-shim";
};
