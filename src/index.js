import {createFnWrapper} from "./utils";

function chaiAssertX (_chai, utils) {
  let assert = _chai.assert;

  _chai.assertx = {};

  Reflect
    .ownKeys(assert)
    .filter(key => utils.type(assert[key]) === "function")
    .forEach(key => _chai.assertx[key] = createFnWrapper(assert[key], key));
}

export default chaiAssertX;
