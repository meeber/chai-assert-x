import "source-map-support/register";
import chai from "chai";
import chaiAssertX from "../..";
import * as utils from "../../utils";

chai.use(chaiAssertX);

global.assertx = chai.assertx;
global.expect = chai.expect;

global.utils = utils;
