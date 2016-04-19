var assertChaiX = require("..");
var chai = require("chai");
var semver = require("semver");

var expect = chai.expect;

describe("app.js", function () {
  it("should export assertChaiX of the appropriate release", function () {
    if (semver.gte(process.version, "v6.0.0-rc.0"))
      expect(assertChaiX).to.equal(require("../dist"));
    else
      expect(assertChaiX).to.equal(require("../legacy"));
  });
});
