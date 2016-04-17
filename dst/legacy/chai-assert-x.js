"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

function chaiAssertX (_chai, utils) {
  var assert = _chai.assert;

  _chai.assertx = {};

  Object.keys(assert).filter(function (key) {
    return utils.type(assert[key]) === "function";
  }).forEach(function (key) {
    return _chai.assertx[key] = (0, _utils.createFnWrapper)(assert[key], key);
  });
}

exports.default = chaiAssertX;
module.exports = exports["default"];
