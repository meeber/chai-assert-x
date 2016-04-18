import chai from "chai";
import chaiAssertX from "../../chai-assert-x";
import * as utils from "../../utils";

chai.use(chaiAssertX);

global.assertx = chai.assertx;
global.expect = chai.expect;

global.utils = utils;
