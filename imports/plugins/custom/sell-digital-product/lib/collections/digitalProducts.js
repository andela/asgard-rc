import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";


export const DigitalProductSchema = new SimpleSchema({
  productId: {
    type: String,
    optional: false
  },
  isDigital: {
    type: Boolean,
    optional: false,
    defaultValue: true
  },
  productTitle: {
    type: String,
    optional: true
  },
  fileUrl: {
    type: String,
    optional: true,
    defaultValue: "0"
  }
});

registerSchema("DigitalProductSchema", DigitalProductSchema);
