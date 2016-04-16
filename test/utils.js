let chai = require("chai");
let {getFnArgs, swapArgs} = require("../src/utils");

let expect = chai.expect;

describe(".getFnArgs", function () {
  it("should return names of fn args in an array", function () {
    function pets (cat, dog, hamster) {}

    expect(getFnArgs(pets)).to.deep.equal(["cat", "dog", "hamster"]);
  });

  it("should remove whitespace", function () {
    function pets ( cat ,    dog ,   hamster  ) {}

    expect(getFnArgs(pets)).to.deep.equal(["cat", "dog", "hamster"]);
  });

  it("should remove comments", function () {
    function pets (/*cat*/ cat, dog, /*hamster*/ hamster) {}
    
    expect(getFnArgs(pets)).to.deep.equal(["cat", "dog", "hamster"]);
  });
});

describe(".swapArgs", function () {
  it("if has less than 2 args, should return same args",
  function () {
    function pets (cat) {}

    expect(swapArgs(getFnArgs(pets))).to.deep.equal(["cat"]);
  });

  it("if has 2 args and last is 'msg', should return same args",
  function () {
    function pets (cat, msg) {}

    expect(swapArgs(getFnArgs(pets))).to.deep.equal(["cat", "msg"]);
  });

  it("if has 2 args and last isn't 'msg', should return swapped args",
  function () {
    function pets (cat, dog) {}

    expect(swapArgs(getFnArgs(pets))).to.deep.equal(["dog", "cat"]);
  });

  it("if has more than 2 args and last is 'msg', should swap first arg to"
  + "second-to-last", function () {
    function pets (cat, dog, msg) {}

    expect(swapArgs(getFnArgs(pets))).to.deep.equal(["dog", "cat", "msg"]);
  });

  it("if has more than 2 args and last isn't 'msg', should swap first arg to"
  + "last", function () {
    function pets (cat, dog, hamster) {}

    expect(swapArgs(getFnArgs(pets))).to.deep.equal(["dog", "hamster", "cat"]);
  });

  it("should not modify original array", function () {
    function pets (cat, dog, msg) {}

    let args = getFnArgs(pets);
    let swappedArgs = swapArgs(args);

    expect(args).to.deep.equal(["cat", "dog", "msg"]);
    expect(swappedArgs).to.deep.equal(["dog", "cat", "msg"]);
  });
});
