let {createFnWrapper, getNewActualIndex, getArgOrder} = global.utils;

describe(".createFnWrapper", function () {
  it("if has less than 2 args, should return same fn ref", function () {
    function pets (cat) { return [cat] }

    expect(createFnWrapper(pets)).to.equal(pets);
  });

  it("if has 2 args and last is 'msg', should return same fn ref", function () {
    function pets (cat, msg) { return [cat, msg] }

    expect(createFnWrapper(pets)).to.equal(pets);
  });

  it("if has 2 args and last isn't 'msg', should return a fn wrapper that"
  + " expects 'actual' to be the second arg", function () {
    function pets (cat, dog) { return [cat, dog] }

    let wrapper = createFnWrapper(pets);

    expect(wrapper("woof", "meow")).to.deep.equal(["meow", "woof"]);
  });

  it("if has more than 2 args and last is 'msg', should return a fn wrapper"
  + " that expects 'actual' to be the second-to-last arg", function () {
    function pets (cat, dog, msg) { return [cat, dog, msg] }

    let wrapper = createFnWrapper(pets);

    expect(wrapper("woof", "meow", "y")).to.deep.equal(["meow", "woof", "y"]);
  });

  it("if has more than 2 args and last isn't 'msg', should return a fn wrapper"
  + " that expects 'actual' to be the last arg", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    let wrp = createFnWrapper(pets);

    expect(wrp("woof", "oink", "meow")).to.deep.equal(["meow", "woof", "oink"]);
  });

  it("if fn is named 'fail', should return a fn wrapper that expects 'actual'"
  + " to be the second arg", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    let wrp = createFnWrapper(pets, "fail");

    expect(wrp("woof", "meow", "oink")).to.deep.equal(["meow", "woof", "oink"]);
  });

  it("if fn is named 'operator', should return same fn ref", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(createFnWrapper(pets, "operator")).to.equal(pets);
  });
});

describe(".getArgOrder", function () {
  it("should return names of fn args in an array", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(getArgOrder(pets)).to.deep.equal(["cat", "dog", "pig"]);
  });

  it("should remove whitespace", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(getArgOrder(pets)).to.deep.equal(["cat", "dog", "pig"]);
  });

  it("should remove comments", function () {
    /* eslint-disable no-inline-comments */
    function pets (/* cat*/ cat, dog, /* pig*/ pig) { return [cat, dog, pig] }
    /* eslint-enable no-inline-comments */

    expect(getArgOrder(pets)).to.deep.equal(["cat", "dog", "pig"]);
  });
});

describe(".getNewActualIndex", function () {
  it("if has less than 2 args, should return 0", function () {
    function pets (cat) { return [cat] }

    expect(getNewActualIndex(pets)).to.equal(0);
  });

  it("if has 2 args and last is 'msg', should return 0",
  function () {
    function pets (cat, msg) { return [cat, msg] }

    expect(getNewActualIndex(pets)).to.equal(0);
  });

  it("if has 2 args and last isn't 'msg', should return 1",
  function () {
    function pets (cat, dog) { return [cat, dog] }

    expect(getNewActualIndex(pets)).to.equal(1);
  });

  it("if has more than 2 args and last is 'msg', should return 2 less than the"
  + " number of args", function () {
    function pets (cat, dog, msg) { return [cat, dog, msg] }

    expect(getNewActualIndex(pets)).to.equal(1);
  });

  it("if has more than 2 args and last isn't 'msg', should return 1 less than"
  + " the number of args", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(getNewActualIndex(pets)).to.equal(2);
  });

  it("if fn is named 'fail', should return 1", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(getNewActualIndex(pets, "fail")).to.equal(1);
  });

  it("if fn is named 'operator', should return 0", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(getNewActualIndex(pets, "operator")).to.equal(0);
  });
});
