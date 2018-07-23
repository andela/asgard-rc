import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

describe("Paystack payment", function () {
  let sandbox;
  // const { verify } = Paystack;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it(" 'paystack/getShopKeys' to not be undefined", function () {
    const shopKeys = Meteor.call("paystack/getShopKeys");
    expect(shopKeys).to.not.be.undefined;
  });

  it("'paystack/getShopKeys' should contain 'public' ", function () {
    const shopKeys = Meteor.call("paystack/getShopKeys");
    expect(shopKeys).to.have.property("public");
  });
  it("'paystack/getShopKeys' should contain 'private' ", function () {
    const shopKeys = Meteor.call("paystack/getShopKeys");
    expect(shopKeys).to.have.property("secret");
  });
});
