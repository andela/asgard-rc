import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";

const productDetails = {
  productId: "jbs2r3448dkhh89820khd",
  productTitle: "Test product",
  isDigital: true,
  productUrl: "https://test.com/test.jpg",
  bytes: "10298476289",
  uploadSuccess: false
};

describe("Upsert product", () => {
  it("Insert new digital product", () => {
    Meteor.call("uploadDigitalProduct", productDetails, (err, payload) => {
      expect(payload).to.have.property("numberAffected");
      expect(payload.numberAffected).equal(1);
    });
  });
  it("udpate digital product", () => {
    productDetails.uploadSuccess = true;
    Meteor.call("uploadDigitalProduct", productDetails, (err, payload) => {
      expect(payload).to.have.property("numberAffected");
      expect(payload).to.have.property("insertedId");
      expect(payload.numberAffected).equal(1);
    });
  });
});
