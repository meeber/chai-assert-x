/* global chai chaiAssertX */

chai.use(chaiAssertX);

let assert = chai.assert;
let assertx = chai.assertx;
let expect = chai.expect;

describe("assertx", function () {
  it(".fail", function () {
    let expected = 42;
    let actual = 43;

    expect(() => assertx.fail(expected, actual, "failure"))
      .to.throw("failure")
      .and.to.deep.include({expected, actual});
  });

  it(".ok", function () {
    let actual = false;

    assertx.ok(true);

    expect(() => assertx.ok(actual))
      .to.throw("expected false to be truthy")
      .and.to.deep.include({actual});
  });

  it(".notOk", function () {
    let actual = true;

    assertx.notOk(false);

    expect(() => assertx.notOk(actual))
      .to.throw("expected true to be falsy")
      .and.to.deep.include({actual});
  });

  it(".equal", function () {
    let expected = 42;
    let actual = 43;

    assertx.equal(expected, 42);

    expect(() => assertx.equal(expected, actual))
      .to.throw("expected 43 to equal 42")
      .and.to.deep.include({expected, actual});
  });

  it(".notEqual", function () {
    let expected = "42";
    let actual = 42;

    assertx.notEqual(expected, 43);

    expect(() => assertx.notEqual(expected, actual))
      .to.throw("expected 42 to not equal '42'")
      .and.to.deep.include({expected, actual});
  });

  it(".strictEqual", function () {
    let expected = [42];
    let actual = [42];

    assertx.strictEqual(expected, expected);

    expect(() => assertx.strictEqual(expected, actual))
      .to.throw("expected [ 42 ] to equal [ 42 ]")
      .and.to.deep.include({expected, actual});
  });

  it(".notStrictEqual", function () {
    let expected = [42];
    let actual = expected;

    assertx.notStrictEqual(expected, [42]);

    // Ehh I guess expected/actual doesn't really matter on this one
    expect(() => assertx.notStrictEqual(expected, actual))
      .to.throw("expected [ 42 ] to not equal [ 42 ]")
      .and.to.deep.include({expected, actual});
  });

  it(".deepEqual", function () {
    let expected = {cat: {sound: "meow"}};
    let actual = {cat: {sound: "mrow"}};

    assertx.deepEqual(expected, expected);
    // TODO: Enable upcoming chai assertion
    // assertx.deepStrictEqual(expected, expected);

    expect(() => assertx.deepEqual(expected, actual))
      .to.throw("expected { cat: { sound: 'mrow' } } to deeply equal"
              + " { cat: { sound: 'meow' } }")
      .and.to.deep.include({expected, actual});

    // TODO: Enable upcoming chai assertion
    // expect(() => assertx.deepStrictEqual(expected, actual))
    // .to.throw("expected { cat: { sound: \'mrow\' } } to deeply equal"
    //   + " { cat: { sound: \'meow\' } }")
    // .and.to.deep.include({expected, actual});
  });

  it(".notDeepEqual", function () {
    let expected = {cat: {sound: "meow"}};
    let actual = expected;

    assertx.notDeepEqual(expected, {cat: {sound: "mrow"}});

    // Ehh I guess expected/actual doesn't really matter on this one
    expect(() => assertx.notDeepEqual(expected, actual))
      .to.throw("expected { cat: { sound: 'meow' } } to not deeply equal"
              + " { cat: { sound: 'meow' } }")
      .and.to.deep.include({expected, actual});
  });

  it(".isAbove", function () {
    // Added in Chai v2.0.0
    if (typeof assert.isAbove !== "function") this.skip();

    let above = 43;
    let actual = 42;

    assertx.isAbove(above, 44);

    expect(() => assertx.isAbove(above, actual))
      .to.throw("expected 42 to be above 43")
      .and.to.deep.include({actual});
  });

  it(".isAtLeast", function () {
    // Added in Chai v3.3.0
    if (typeof assert.isAtLeast !== "function") this.skip();

    let atLeast = 43;
    let actual = 42;

    assertx.isAtLeast(atLeast, 44);

    expect(() => assertx.isAtLeast(atLeast, actual))
      .to.throw("expected 42 to be at least 43")
      .and.to.deep.include({actual});
  });

  it(".isBelow", function () {
    // Added in Chai v2.0.0
    if (typeof assert.isBelow !== "function") this.skip();

    let below = 41;
    let actual = 42;

    assertx.isBelow(below, 40);

    expect(() => assertx.isBelow(below, actual))
      .to.throw("expected 42 to be below 41")
      .and.to.deep.include({actual});
  });

  it(".isAtMost", function () {
    // Added in Chai v3.3.0
    if (typeof assert.isAtMost !== "function") this.skip();

    let atMost = 41;
    let actual = 42;

    assertx.isAtMost(atMost, 40);

    expect(() => assertx.isAtMost(atMost, actual))
      .to.throw("expected 42 to be at most 41")
      .and.to.deep.include({actual});
  });

  it(".isTrue", function () {
    let actual = false;

    assertx.isTrue(true);

    expect(() => assertx.isTrue(actual))
      .to.throw("expected false to be true")
      .and.to.deep.include({actual});
  });

  it(".isNotTrue", function () {
    // Added in Chai v3.3.0
    if (typeof assert.isNotTrue !== "function") this.skip();

    let actual = true;

    assertx.isNotTrue(false);

    expect(() => assertx.isNotTrue(actual))
      .to.throw("expected true to not equal true")
      .and.to.deep.include({actual});
  });

  it(".isFalse", function () {
    let actual = true;

    assertx.isFalse(false);

    expect(() => assertx.isFalse(actual))
      .to.throw("expected true to be false")
      .and.to.deep.include({actual});
  });

  it(".isNotFalse", function () {
    // Added in Chai v3.3.0
    if (typeof assert.isNotFalse !== "function") this.skip();

    let actual = false;

    assertx.isNotFalse(true);

    expect(() => assertx.isNotFalse(actual))
      .to.throw("expected false to not equal false")
      .and.to.deep.include({actual});
  });

  it(".isNull", function () {
    let actual = 42;

    assertx.isNull(null);

    expect(() => assertx.isNull(actual))
      .to.throw("expected 42 to equal null")
      .and.to.deep.include({actual});
  });

  it(".isNotNull", function () {
    let actual = null;

    assertx.isNotNull(42);

    expect(() => assertx.isNotNull(actual))
      .to.throw("expected null to not equal null")
      .and.to.deep.include({actual});
  });

  it(".isNaN", function () {
    // Added in Chai v3.1.0
    if (typeof assert.isNaN !== "function") this.skip();

    let actual = 42;

    assertx.isNaN(NaN);

    expect(() => assertx.isNaN(actual))
      .to.throw("expected 42 to be NaN")
      .and.to.deep.include({actual});
  });

  it(".isNotNaN", function () {
    // Added in Chai v3.1.0
    if (typeof assert.isNotNaN !== "function") this.skip();

    let actual = NaN;

    assertx.isNotNaN(42);

    // TODO: Can't deep.include to check actual cause it's NaN, find other way
    expect(() => assertx.isNotNaN(actual))
      .to.throw("expected NaN not to be NaN");
  });

  it(".isUndefined", function () {
    let actual = 42;

    assertx.isUndefined(undefined);

    expect(() => assertx.isUndefined(actual))
      .to.throw("expected 42 to equal undefined")
      .and.to.deep.include({actual});
  });

  it(".isDefined", function () {
    let actual;

    assertx.isDefined(42);

    // Note: Older versions of Chai didn't properly set "actual"
    expect(() => assertx.isDefined(actual))
      .to.throw("expected undefined to not equal undefined");
  });

  it(".isFunction", function () {
    let actual = 42;

    assertx.isFunction(() => {});

    expect(() => assertx.isFunction(actual))
      .to.throw("expected 42 to be a function")
      .and.to.deep.include({actual});
  });

  it(".isNotFunction", function () {
    let actual = () => {};

    assertx.isNotFunction(42);

    expect(() => assertx.isNotFunction(actual))
      .to.throw(/expected \[Function(: actual)*\] not to be a function/)
      .and.to.deep.include({actual});
  });

  it(".isObject", function () {
    let actual = 42;

    assertx.isObject({});

    expect(() => assertx.isObject(actual))
      .to.throw("expected 42 to be an object")
      .and.to.deep.include({actual});
  });

  it(".isNotObject", function () {
    let actual = {};

    assertx.isNotObject(42);

    expect(() => assertx.isNotObject(actual))
      .to.throw("expected {} not to be an object")
      .and.to.deep.include({actual});
  });

  it(".isArray", function () {
    let actual = 42;

    assertx.isArray([]);

    expect(() => assertx.isArray(actual))
      .to.throw("expected 42 to be an array")
      .and.to.deep.include({actual});
  });

  it(".isNotArray", function () {
    let actual = [];

    assertx.isNotArray(42);

    expect(() => assertx.isNotArray(actual))
      .to.throw("expected [] not to be an array")
      .and.to.deep.include({actual});
  });

  it(".isString", function () {
    let actual = 42;

    assertx.isString("cat");

    expect(() => assertx.isString(actual))
      .to.throw("expected 42 to be a string")
      .and.to.deep.include({actual});
  });

  it(".isNotString", function () {
    let actual = "cat";

    assertx.isNotString(42);

    expect(() => assertx.isNotString(actual))
      .to.throw("expected 'cat' not to be a string")
      .and.to.deep.include({actual});
  });

  it(".isNumber", function () {
    let actual = "cat";

    assertx.isNumber(42);

    expect(() => assertx.isNumber(actual))
      .to.throw("expected 'cat' to be a number")
      .and.to.deep.include({actual});
  });

  it(".isNotNumber", function () {
    let actual = 42;

    assertx.isNotNumber("cat");

    expect(() => assertx.isNotNumber(actual))
      .to.throw("expected 42 not to be a number")
      .and.to.deep.include({actual});
  });

  it(".isBoolean", function () {
    let actual = 42;

    assertx.isBoolean(true);

    expect(() => assertx.isBoolean(actual))
      .to.throw("expected 42 to be a boolean")
      .and.to.deep.include({actual});
  });

  it(".isNotBoolean", function () {
    let actual = true;

    assertx.isNotBoolean(42);

    expect(() => assertx.isNotBoolean(actual))
      .to.throw("expected true not to be a boolean")
      .and.to.deep.include({actual});
  });

  it(".typeOf", function () {
    let type = "number";
    let actual = /meow/;

    assertx.typeOf("regexp", actual);

    expect(() => assertx.typeOf(type, actual))
      .to.throw("expected /meow/ to be a number")
      .and.to.deep.include({actual});
  });

  it(".notTypeOf", function () {
    let type = "regexp";
    let actual = /meow/;

    assertx.notTypeOf("number", actual);

    expect(() => assertx.notTypeOf(type, actual))
      .to.throw("expected /meow/ not to be a regexp")
      .and.to.deep.include({actual});
  });

  it(".instanceOf", function () {
    function Cat () {}
    function Dog () {}
    let parent = Dog;
    let actual = new Cat();

    assertx.instanceOf(Cat, actual);

    expect(() => assertx.instanceOf(parent, actual))
      .to.throw("expected {} to be an instance of Dog")
      .and.to.deep.include({actual});
  });

  it(".notInstanceOf", function () {
    function Cat () {}
    function Dog () {}
    let parent = Cat;
    let actual = new Cat();

    assertx.notInstanceOf(Dog, actual);

    expect(() => assertx.notInstanceOf(parent, actual))
      .to.throw("expected {} to not be an instance of Cat")
      .and.to.deep.include({actual});
  });

  it(".include", function () {
    let needle = "i";
    let actual = "team";

    assertx.include("ea", actual);

    expect(() => assertx.include(needle, actual))
      .to.throw("expected 'team' to include 'i'")
      .and.to.deep.include({actual});
  });

  it(".notInclude", function () {
    let needle = "ea";
    let actual = "team";

    assertx.notInclude("i", actual);

    expect(() => assertx.notInclude(needle, actual))
      .to.throw("expected 'team' to not include 'ea'")
      .and.to.deep.include({actual});
  });

  it(".match", function () {
    let regexp = /i/;
    let actual = "team";

    assertx.match(/ea/, actual);

    expect(() => assertx.match(regexp, actual))
      .to.throw("expected 'team' to match /i/")
      .and.to.deep.include({actual});
  });

  it(".notMatch", function () {
    let regexp = /ea/;
    let actual = "team";

    assertx.notMatch(/i/, actual);

    expect(() => assertx.notMatch(regexp, actual))
      .to.throw("expected 'team' not to match /ea/")
      .and.to.deep.include({actual});
  });

  it(".property", function () {
    let prop = "dog";
    let actual = {cat: "meow"};

    assertx.property("cat", actual);

    expect(() => assertx.property(prop, actual))
      .to.throw("expected { cat: 'meow' } to have a property 'dog'")
      .and.to.deep.include({actual});
  });

  it(".notProperty", function () {
    let prop = "cat";
    let actual = {cat: "meow"};

    assertx.notProperty("dog", actual);

    expect(() => assertx.notProperty(prop, actual))
      .to.throw("expected { cat: 'meow' } to not have property 'cat'")
      .and.to.deep.include({actual});
  });

  it(".deepProperty", function () {
    let prop = "cat.tail";
    let actual = {cat: {sound: "meow"}};

    assertx.deepProperty("cat.sound", actual);

    expect(() => assertx.deepProperty(prop, actual))
      .to.throw("expected { cat: { sound: 'meow' } } to have a deep property"
              + " 'cat.tail'")
      .and.to.deep.include({actual});
  });

  it(".notDeepProperty", function () {
    let prop = "cat.sound";
    let actual = {cat: {sound: "meow"}};

    assertx.notDeepProperty("cat.tail", actual);

    expect(() => assertx.notDeepProperty(prop, actual))
      .to.throw("expected { cat: { sound: 'meow' } } to not have deep property"
              + " 'cat.sound'")
      .and.to.deep.include({actual});
  });

  it(".propertyVal", function () {
    let prop = "cat";
    let expected = "hiss";
    let actual = {cat: "meow"};

    assertx.propertyVal(prop, "meow", actual);

    expect(() => assertx.propertyVal(prop, expected, actual))
      .to.throw("expected { cat: 'meow' } to have a property 'cat' of 'hiss',"
              + " but got 'meow'")
      .and.to.deep.include({expected, actual: "meow"});
  });

  it(".propertyNotVal", function () {
    let prop = "cat";
    let expected = "meow";
    let actual = {cat: "meow"};

    assertx.propertyNotVal(prop, "hiss", actual);

    expect(() => assertx.propertyNotVal(prop, expected, actual))
      .to.throw("expected { cat: 'meow' } to not have a property 'cat' of"
              + " 'meow'")
      .and.to.deep.include({expected, actual: "meow"});
  });

  it(".deepPropertyVal", function () {
    let prop = "cat.sound";
    let expected = "hiss";
    let actual = {cat: {sound: "meow"}};

    assertx.deepPropertyVal(prop, "meow", actual);

    expect(() => assertx.deepPropertyVal(prop, expected, actual))
      .to.throw("expected { cat: { sound: 'meow' } } to have a deep property"
              + " 'cat.sound' of 'hiss', but got 'meow'")
      .and.to.deep.include({expected, actual: "meow"});
  });

  it(".deepPropertyNotVal", function () {
    let prop = "cat.sound";
    let expected = "meow";
    let actual = {cat: {sound: "meow"}};

    assertx.deepPropertyNotVal(prop, "hiss", actual);

    expect(() => assertx.deepPropertyNotVal(prop, expected, actual))
      .to.throw("expected { cat: { sound: 'meow' } } to not have a deep"
              + " property 'cat.sound' of 'meow'")
      .and.to.deep.include({expected, actual: "meow"});
  });

  it(".lengthOf", function () {
    let expected = 4;
    let actual = "cat";

    assertx.lengthOf(expected, "bird");

    expect(() => assertx.lengthOf(expected, actual))
      .to.throw("expected 'cat' to have a length of 4")
      .and.to.deep.include({expected, actual: 3});
  });

  it(".throws", function () {
    let expectedString = "wrong dog";
    let expectedType = TypeError;
    let actual = () => { throw TypeError("wrong cat") };

    assertx.throws(expectedType, "wrong cat", actual);
    assertx.throw(expectedType, "wrong cat", actual);
    assertx.Throw(expectedType, "wrong cat", actual);

    /* eslint-disable max-len */
    expect(() => assertx.throws(expectedType, expectedString, actual))
      .to.throw(/expected \[Function(: actual)*\] to throw error including 'wrong dog' but got 'wrong cat'/)
      .and.to.deep.include({expected: expectedString, actual: "wrong cat"});
    /* eslint-enable max-len */
  });

  it(".doesNotThrow", function () {
    let expected = TypeError;
    let actual = () => { throw TypeError() };

    assertx.doesNotThrow(expected, () => { throw ReferenceError() });

    /* eslint-disable max-len */
    expect(() => assertx.doesNotThrow(expected, actual))
      .to.throw(/expected \[Function(: actual)*\] to not throw 'TypeError' but 'TypeError' was thrown/)
      .and.to.deep.include({expected: "TypeError", actual: "TypeError"});
    /* eslint-enable max-len */
  });

  it(".operator", function () {
    assertx.operator(42, ">", 41);

    expect(() => assertx.operator(42, ">", 43))
      .to.throw("expected 42 to be > 43")
      .and.to.deep.include({actual: false});
  });

  it(".closeTo", function () {
    let delta = 10;
    let expected = 31;
    let actual = 42;

    assertx.closeTo(expected, 11, actual);

    expect(() => assertx.closeTo(expected, delta, actual))
      .to.throw("expected 42 to be close to 31 +/- 10")
      .and.to.deep.include({actual});
  });

  it(".approximately", function () {
    // Added in Chai v3.4.0
    if (typeof assert.approximately !== "function") this.skip();

    let delta = 10;
    let expected = 31;
    let actual = 42;

    assertx.approximately(expected, 11, actual);

    expect(() => assertx.approximately(expected, delta, actual))
      .to.throw("expected 42 to be close to 31 +/- 10")
      .and.to.deep.include({actual});
  });

  it(".sameMembers", function () {
    let expected = ["cat", "pig"];
    let actual = ["cat", "dog"];

    assertx.sameMembers(expected, ["cat", "pig"]);

    // TODO: Swap expected and actual once chai bug fixed
    expect(() => assertx.sameMembers(expected, actual))
      .to.throw("expected [ 'cat', 'dog' ] to have the same members as"
              + " [ 'cat', 'pig' ]")
      .and.to.deep.include({expected: actual, actual: expected});
  });

  it(".sameDeepMembers", function () {
    // Added in Chai v2.0.0
    if (typeof assert.sameDeepMembers !== "function") this.skip();

    let expected = [{cat: "meow"}, {pig: "oink"}];
    let actual = [{cat: "meow"}, {dog: "woof"}];

    assertx.sameDeepMembers(expected, [{cat: "meow"}, {pig: "oink"}]);

    // TODO: Swap expected and actual once chai bug fixed
    expect(() => assertx.sameDeepMembers(expected, actual))
      .to.throw("expected [ { cat: 'meow' }, { dog: 'woof' } ] to have the same"
              + " members as [ { cat: 'meow' }, { pig: 'oink' } ]")
      .and.to.deep.include({expected: actual, actual: expected});
  });

  it(".includeMembers", function () {
    let expected = ["cat", "pig"];
    let actual = ["cat", "dog"];

    assertx.includeMembers(expected, ["cat", "pig"]);

    // TODO: Swap expected and actual once chai bug fixed
    expect(() => assertx.includeMembers(expected, actual))
      .to.throw("expected [ 'cat', 'dog' ] to be a superset of"
              + " [ 'cat', 'pig' ]")
      .and.to.deep.include({expected: actual, actual: expected});
  });

  it(".includeDeepMembers", function () {
    // Added in Chai v3.5.0
    if (typeof assert.includeDeepMembers !== "function") this.skip();

    let expected = [{cat: "meow"}, {pig: "oink"}];
    let actual = [{cat: "meow"}, {dog: "woof"}];

    assertx.includeDeepMembers(expected, [{cat: "meow"}, {pig: "oink"}]);

    // TODO: Swap expected and actual once chai bug fixed
    expect(() => assertx.includeDeepMembers(expected, actual))
      .to.throw("expected [ { cat: 'meow' }, { dog: 'woof' } ] to be a superset"
              + " of [ { cat: 'meow' }, { pig: 'oink' } ]")
      .and.to.deep.include({expected: actual, actual: expected});
  });

  it(".oneOf", function () {
    // Added in Chai v3.4.0
    if (typeof assert.oneOf !== "function") this.skip();

    let expected = ["dog", "pig"];
    let actual = "cat";

    assertx.oneOf(expected, "dog");

    expect(() => assertx.oneOf(expected, actual))
      .to.throw("expected 'cat' to be one of [ 'dog', 'pig' ]")
      .and.to.deep.include({expected, actual});
  });

  /* NYI
  it(".changes", function () {
    let prop = "cat";
    let expected = {cat: "meow", dog: "grrr"};
    let actual = () => expected.dog = "woof";

    assertx.changes(expected, "dog", actual);

    expect(() => assertx.changes(expected, prop, actual))
      .to.throw("expected .cat to change")
      .and.to.deep.include({actual});
  });
  */

  it(".ifError", function () {
    let actual = new Error("meow");

    assertx.ifError(false);

    // Note: Older versions of Chai throw a message instead of "actual"
    expect(() => assertx.ifError(actual)).to.throw();
  });

  it(".extensible", function () {
    // Added in Chai v3.1.0
    if (typeof assert.extensible !== "function") this.skip();

    let actual = {};

    // eslint-disable-next-line prefer-reflect
    assertx.extensible(actual);

    Reflect.preventExtensions(actual);

    // eslint-disable-next-line prefer-reflect
    expect(() => assertx.extensible(actual))
      .to.throw("expected {} to be extensible")
      .and.to.deep.include({actual});
  });

  it(".notExtensible", function () {
    // Added in Chai v3.1.0
    if (typeof assert.notExtensible !== "function") this.skip();

    let actual = {};
    let obj = {};

    Reflect.preventExtensions(obj);

    assertx.isNotExtensible(obj);

    expect(() => assertx.notExtensible(actual))
      .to.throw("expected {} to not be extensible")
      .and.to.deep.include({actual});
  });

  it(".sealed", function () {
    // Added in Chai v3.1.0
    if (typeof assert.sealed !== "function") this.skip();

    let actual = {};
    let obj = {};

    Object.seal(obj);

    assertx.sealed(obj);

    expect(() => assertx.sealed(actual))
      .to.throw("expected {} to be sealed")
      .and.to.deep.include({actual});
  });

  it(".notSealed", function () {
    // Added in Chai v3.1.0
    if (typeof assert.notSealed !== "function") this.skip();

    let actual = {};
    let obj = {};

    assertx.notSealed(obj);

    Object.seal(actual);

    expect(() => assertx.notSealed(actual))
      .to.throw("expected {} to not be sealed")
      .and.to.deep.include({actual});
  });

  it(".frozen", function () {
    // Added in Chai v3.1.0
    if (typeof assert.frozen !== "function") this.skip();

    let actual = {};
    let obj = {};

    Object.freeze(obj);

    assertx.frozen(obj);

    expect(() => assertx.frozen(actual))
      .to.throw("expected {} to be frozen")
      .and.to.deep.include({actual});
  });

  it(".notFrozen", function () {
    // Added in Chai v3.1.0
    if (typeof assert.notFrozen !== "function") this.skip();

    let actual = {};
    let obj = {};

    assertx.notFrozen(obj);

    Object.freeze(actual);

    expect(() => assertx.notFrozen(actual))
      .to.throw("expected {} to not be frozen")
      .and.to.deep.include({actual});
  });

  it(".isOk", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isOk !== "function") this.skip();

    expect(assertx.isOk).to.equal(assertx.ok);
  });

  it(".isNotOk", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isNotOk !== "function") this.skip();

    expect(assertx.isNotOk).to.equal(assertx.notOk);
  });

  it(".isExtensible", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isExtensible !== "function") this.skip();

    expect(assertx.isExtensible).to.equal(assertx.extensible);
  });

  it(".isNotExtensible", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isNotExtensible !== "function") this.skip();

    expect(assertx.isNotExtensible).to.equal(assertx.notExtensible);
  });

  it(".isSealed", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isSealed !== "function") this.skip();

    expect(assertx.isSealed).to.equal(assertx.sealed);
  });

  it(".isNotSealed", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isNotSealed !== "function") this.skip();

    expect(assertx.isNotSealed).to.equal(assertx.notSealed);
  });

  it(".isFrozen", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isFrozen !== "function") this.skip();

    expect(assertx.isFrozen).to.equal(assertx.frozen);
  });

  it(".isNotFrozen", function () {
    // Added in Chai v3.2.0
    if (typeof assert.isNotFrozen !== "function") this.skip();

    expect(assertx.isNotFrozen).to.equal(assertx.notFrozen);
  });
});
