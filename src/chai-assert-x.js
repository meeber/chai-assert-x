var {getFnArgs} = require("./utils");

let swapFirstTwo = fn => (e, a, ...r) => fn(a, e, ...r);

function swap (fn) {
  console.log(fn.toString(), getFnArgs(fn));
}

function chaiAssertX (_chai, utils) {
  let assert = _chai.assert;
  let swapx = {
    fail: swapFirstTwo(assert.fail),
    isOk: assert.isOk,
    isNotOk: assert.isNotOk,
    equal: swapFirstTwo(assert.equal),
    notEqual: swapFirstTwo(assert.notEqual),
    strictEqual: swapFirstTwo(assert.strictEqual),
    notStrictEqual: swapFirstTwo(assert.notStrictEqual),
    deepEqual: swapFirstTwo(assert.deepEqual),
    // TODO: Enable upcoming chai assertion
    // deepStrictEqual: swapFirstTwo(assert.deepStrictEqual),
    notDeepEqual: swapFirstTwo(assert.notDeepEqual),
    isAbove: swapFirstTwo(assert.isAbove),
    isAtLeast: swapFirstTwo(assert.isAtLeast),
    isBelow: swapFirstTwo(assert.isBelow),
    isAtMost: swapFirstTwo(assert.isAtMost),
    isTrue: assert.isTrue,
    isNotTrue: assert.isNotTrue,
    isFalse: assert.isFalse,
    isNotFalse: assert.isNotFalse,
    isNull: assert.isNull,
    isNotNull: assert.isNotNull,
    isNaN: assert.isNaN,
    isNotNaN: assert.isNotNaN,
    isUndefined: assert.isUndefined,
    isDefined: assert.isDefined,
    isFunction: assert.isFunction,
    isNotFunction: assert.isNotFunction,
    isObject: assert.isObject,
    isNotObject: assert.isNotObject,
    isArray: assert.isArray,
    isNotArray: assert.isNotArray,
    isString: assert.isString,
    isNotString: assert.isNotString,
    isNumber: assert.isNumber,
    isNotNumber: assert.isNotNumber,
    isBoolean: assert.isBoolean,
    isNotBoolean: assert.isNotBoolean,
    typeOf: swapFirstTwo(assert.typeOf),
    notTypeOf: swapFirstTwo(assert.notTypeOf),
    instanceOf: swapFirstTwo(assert.instanceOf),
    notInstanceOf: swapFirstTwo(assert.notInstanceOf),
    include: swapFirstTwo(assert.include),
    notInclude: swapFirstTwo(assert.notInclude),
    match: swapFirstTwo(assert.match),
    notMatch: swapFirstTwo(assert.notMatch),
    property: swapFirstTwo(assert.property),
    notProperty: swapFirstTwo(assert.notProperty),
    deepProperty: swapFirstTwo(assert.deepProperty),
    notDeepProperty: swapFirstTwo(assert.notDeepProperty),
  };

  _chai.assertx = {};

  // Create an assertx version of any assert that's registered in the swap chart
  // with the actual and expected parameters swapped when applicable. Doing it
  // this way prevents errors from being thrown if future versions of chai
  // removes an existing assert, and prevents unexpected parameter ordering if
  // chai adds a new assert.
  Reflect.ownKeys(assert)
  .filter(key => utils.type(assert[key]) === "function")
  .forEach(key => { _chai.assertx[key] = swap(assert[key]) });
}

module.exports = chaiAssertX;
