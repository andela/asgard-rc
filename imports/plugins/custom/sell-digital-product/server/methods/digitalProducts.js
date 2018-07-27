import { Meteor } from "meteor/meteor";
import { DigitalProducts } from "../../lib/collections";
import { check } from "meteor/check";

Meteor.methods({
  "uploadDigitalProduct"(productDetails) {
    check(productDetails, Object);
    if (!productDetails.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: productDetails.productId
      }, {
        $set: {
          productId: productDetails.productId,
          isDigital: productDetails.isDigital
        }
      });
    }
    if (productDetails.uploadSuccess) {
      return DigitalProducts.upsert({
        productId: productDetails.productId
      }, {
        $set: {
          productId: productDetails.productId,
          productTitle: productDetails.productTitle,
          isDigital: productDetails.isDigital,
          productUrl: productDetails.productUrl,
          bytes: productDetails.bytes
        }
      });
    }
  }
});
