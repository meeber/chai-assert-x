require("./common");
require("babel-core/register");

var foolishrc = require("../util/foolishrc");

global[foolishrc.mainExport] = require("../../src/");
