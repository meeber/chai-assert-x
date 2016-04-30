require("./common");

var foolishrc = require("../util/foolishrc");

global[foolishrc.mainExport] = require("../../build/legacy");
