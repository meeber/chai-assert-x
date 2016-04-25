var foolishrc = require("./foolishrc");
var semver = require("semver");

module.exports = function detectBuild () {
  return semver.gte(process.version, foolishrc.minCurNodeVer) ? "current"
       : typeof Reflect === "object" ? "legacy"
       : "legacy-shim";
};
