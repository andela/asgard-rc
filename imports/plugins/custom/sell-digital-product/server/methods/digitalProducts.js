import { Meteor } from "meteor/meteor";
import { Orders } from "/lib/collections";
import { Accounts } from "/lib/collections";
import { SSR } from "meteor/meteorhacks:ssr";
import { Logger, Reaction } from "/server/api";
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
  },
  "mailDigitalProducts"(cartId) {
    check(cartId, String);

    const currentOrder = Orders.findOne({
      cartId: cartId
    });

    const orderItems = currentOrder.items;
    const user = Accounts.findOne(Meteor.userId());
    const email = user.emails[0].address;

    orderItems.forEach((item) => {
      const product = DigitalProducts.findOne({
        productId: item.productId,
        isDigital: true
      });

      if (product !== undefined) {
        Logger.info("MAILING DIGITAL PRODUCT");
        const template = "orders/digitalProduct";
        SSR.compileTemplate(template, Reaction.Email.getTemplate(template));
        Reaction.Email.send({
          to: email,
          from: `${"Asgard-rc"} <${"development@asgard-rc.com"}>`,
          subject: `Download ${item.title}`,
          html: SSR.render(template, {
            name: user.name,
            productTitle: item.title,
            fileUrl: product.productUrl,
            fileSize: product.bytes / 1000000
          })
        });
      }
    });
  },
  "fetchDigitalProduct"(productId) {
    check(productId, String);

    const product = DigitalProducts.findOne({
      productId: productId,
      isDigital: true
    });

    if (product !== undefined) {
      return product;
    }
    return "";
  }
});
