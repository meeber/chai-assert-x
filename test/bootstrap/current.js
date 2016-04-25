require("./common");

var foolishrc = require("../../script/util/foolishrc");

global[foolishrc.mainExport] = require("../../build/current");
