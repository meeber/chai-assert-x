import chai from "chai";
import chaiAssertX from "../../src/chai-assert-x";
import * as utils from "../../src/utils";

chai.use(chaiAssertX);

global.assertx = chai.assertx;
global.expect = chai.expect;

Object.assign(global, utils);
