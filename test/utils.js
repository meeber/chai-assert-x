let chai = require("chai");
let {createFnWrapper, getArgOrder, swapArgs} = require("../src/utils");

let expect = chai.expect;

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
  + " swaps args", function () {
    function pets (cat, dog) { return [cat, dog] }

    let wrapper = createFnWrapper(pets);

    expect(wrapper("woof", "meow")).to.deep.equal(["meow", "woof"]);
  });

  it("if has more than 2 args and last is 'msg', should return a fn wrapper"
  + " that swaps first arg to second-to-last", function () {
    function pets (cat, dog, msg) { return [cat, dog, msg] }

    let wrapper = createFnWrapper(pets);

    expect(wrapper("woof", "meow", "y")).to.deep.equal(["meow", "woof", "y"]);
  });

  it("if has more than 2 args and last isn't 'msg', should return a fn wrapper"
  + " that swaps first arg to last", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    let wrp = createFnWrapper(pets);

    expect(wrp("woof", "oink", "meow")).to.deep.equal(["meow", "woof", "oink"]);
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

describe(".swapArgs", function () {
  it("if has less than 2 args, should return same args ref unaltered",
  function () {
    function pets (cat) { return [cat] }

    let oldArgs = getArgOrder(pets);
    let newArgs = swapArgs(oldArgs);

    expect(newArgs).to.deep.equal(["cat"]);
    expect(newArgs).to.equal(oldArgs);
  });

  it("if has 2 args and last is 'msg', should return same args ref unaltered",
  function () {
    function pets (cat, msg) { return [cat, msg] }

    let oldArgs = getArgOrder(pets);
    let newArgs = swapArgs(oldArgs);

    expect(newArgs).to.deep.equal(["cat", "msg"]);
    expect(newArgs).to.equal(oldArgs);
  });

  it("if has 2 args and last isn't 'msg', should return swapped args",
  function () {
    function pets (cat, dog) { return [cat, dog] }

    expect(swapArgs(getArgOrder(pets))).to.deep.equal(["dog", "cat"]);
  });

  it("if has more than 2 args and last is 'msg', should swap first arg to"
  + " second-to-last", function () {
    function pets (cat, dog, msg) { return [cat, dog, msg] }

    expect(swapArgs(getArgOrder(pets))).to.deep.equal(["dog", "cat", "msg"]);
  });

  it("if has more than 2 args and last isn't 'msg', should swap first arg to"
  + " last", function () {
    function pets (cat, dog, pig) { return [cat, dog, pig] }

    expect(swapArgs(getArgOrder(pets))).to.deep.equal(["dog", "pig", "cat"]);
  });

  it("should not modify original array", function () {
    function pets (cat, dog, msg) { return [cat, dog, msg] }

    let args = getArgOrder(pets);
    let swappedArgs = swapArgs(args);

    expect(args).to.deep.equal(["cat", "dog", "msg"]);
    expect(swappedArgs).to.deep.equal(["dog", "cat", "msg"]);
  });
});
