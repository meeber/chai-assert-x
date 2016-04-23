require("source-map-support/register");
require("babel-core/register");

// eslint-disable-next-line no-native-reassign
if (typeof window === "object") global = window;

global.chai = require("chai");

global.expect = global.chai.expect;
