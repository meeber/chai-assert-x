var fs = require("fs");
var yaml = require("js-yaml");

module.exports = yaml.safeLoad(fs.readFileSync(".foolishrc", "utf8"));
