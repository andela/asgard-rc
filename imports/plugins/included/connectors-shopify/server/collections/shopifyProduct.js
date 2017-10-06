import SimpleSchema from "simpl-schema";
import { Products } from "/lib/collections";

export const ShopifyProduct = new SimpleSchema({
  shopifyId: {
    type: Number,
    optional: true,
    decimal: false
  }
});

Products.attachSchema(ShopifyProduct, { selector: { type: "simple" } });
Products.attachSchema(ShopifyProduct, { selector: { type: "variant" } });
