import chai from "chai";
import chaiAssertX from "../../dst/legacy/chai-assert-x";

chai.use(chaiAssertX);

global.assertx = chai.assertx;
global.expect = chai.expect;
