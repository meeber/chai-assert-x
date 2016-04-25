require("./common");
require("babel-core/register");

var foolishrc = require("../../script/util/foolishrc");

global[foolishrc.mainExport] = require("../../src/");
