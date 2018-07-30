import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { DigitalProducts } from "../../../lib/collections";

const productDetails = {
  productId: "jbs2r3448dkhh89820khd",
  productTitle: "Test product",
  isDigital: true,
  productUrl: "https://test.com/test.jpg",
  bytes: "10298476289",
  uploadSuccess: false
};

describe("Digital products", () => {
  it("Should insert new digital product", () => {
    Meteor.call("uploadDigitalProduct", productDetails, (err, payload) => {
      expect(payload).to.have.property("numberAffected");
      expect(payload.numberAffected).equal(1);
    });
  });
  it("Should udpate digital product", () => {
    productDetails.uploadSuccess = true;
    Meteor.call("uploadDigitalProduct", productDetails, (err, payload) => {
      expect(payload).to.have.property("numberAffected");
      expect(payload).to.have.property("insertedId");
      expect(payload.numberAffected).equal(1);
    });
  });
  it("Should not find product", () => {
    Meteor.call("fetchDigitalProduct", productDetails.productId, (err, payload) => {
      expect(payload).equal("");
    });
  });
  it("Should find find digital product", () => {
    const product = DigitalProducts.findOne({
      isDigital: true
    });

    Meteor.call("fetchDigitalProduct", product.productId, (err, payload) => {
      expect(payload.productUrl).equal(product.productUrl);
      expect(payload.fileSize).expect(product.fileSize);
    });
  });
});
