require("source-map-support/register");
require("babel-core/register");

global.chai = require("chai");

global.expect = global.chai.expect;

module.exports = "chaiAssertX";
