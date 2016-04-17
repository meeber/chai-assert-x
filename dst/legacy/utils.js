"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var OVERRIDE = Object.freeze({fail: 1, operator: 0});

// If the index number of the "actual" argument needs to move from its default
// of 0 in order to achieve an expected-first assertion syntax for the given
// function, then return a function wrapper that accepts arguments in the new
// order and when called performs the necessary mapping to pass these arguments
// onto the original function. Otherwise, return the original function without a
// wrapper.
function createFnWrapper (fn, name) {
  var newActualIndex = getNewActualIndex(fn, name);

  if (newActualIndex === 0) return fn;

  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    params.unshift(params.splice(newActualIndex, 1)[0]);
    return fn.apply(undefined, params);
  };
}

// Return an array containing the names of the given function's arguments in
// order, with all white space and comments removed. This won't work with uglify
// or arrow functions.
function getArgOrder (fn) {
  return fn.toString().match(/function\s.*?\(([^)]*)\)/)[1].split(",").map(function (arg) {
    return arg.replace(/\/\*.*\*\//, "").trim();
  });
}

// Return the index number of where the "actual" argument should be in the given
// function's argument list in order to achieve expected-first syntax.
//
// Normal Chai assertion syntax requires the first argument to be the actual
// value being tested, followed by zero or more expected/test values, followed
// by an optional msg value. To achieve expected-first syntax, the actual
// argument should instead be the last argument if there's no msg argument, or
// the second-to-last argument if there is a msg argument. There are a couple of
// exceptions to this behavior that must be manually overridden.
function getNewActualIndex (fn, name) {
  if (name && OVERRIDE.hasOwnProperty(name)) return OVERRIDE[name];

  var argOrder = getArgOrder(fn);
  var numArgs = argOrder.length;

  return numArgs < 2 ? 0 : argOrder[numArgs - 1] === "msg" ? numArgs - 2 : numArgs - 1;
}

exports.createFnWrapper = createFnWrapper;
exports.getNewActualIndex = getNewActualIndex;
exports.getArgOrder = getArgOrder;
