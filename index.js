// eslint-disable-next-line no-var
var detectBuild = require("./script/util/detect-build");

// eslint-disable-next-line prefer-template
module.exports = require("./build/" + detectBuild());
