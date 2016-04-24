var subject = require("./common");

require("babel-core/register");

global[subject] = require("../../src/");
