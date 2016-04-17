var semver = require("semver");

if (semver.gte(process.version, "v6.0.0-rc.1")) {
  module.exports = require("./dist/chai-assert-x");
} else {
  require("babel-polyfill");
  module.exports = require("./dist/legacy/chai-assert-x");
}
