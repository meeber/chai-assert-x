let {createFnWrapper} = require("./utils");

let swapFirstTwo = fn => (e, a, ...r) => fn(a, e, ...r);

function override (key, assert) {
  switch (key) {
    case "fail": return swapFirstTwo(assert[key]);
    case "operator": return assert[key];
  }

  return;
}

function chaiAssertX (_chai, utils) {
  let assert = _chai.assert;

  _chai.assertx = {};

  Reflect.ownKeys(assert)
  .filter(key => utils.type(assert[key]) === "function")
  .forEach(key =>
    _chai.assertx[key] = override(key, assert) || createFnWrapper(assert[key])
  );
}

module.exports = chaiAssertX;
