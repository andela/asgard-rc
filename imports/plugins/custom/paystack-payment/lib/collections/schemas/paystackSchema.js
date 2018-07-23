import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/*
 * @description: creates schema for paystack configuration
 * @return(void) void
 */

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.paystack.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.paystack.apiKey": {
      type: String,
      label: "Api public key",
      optional: true
    },
    "settings.paystack.secretkey": {
      type: String,
      label: "Api secret key",
      optional: true
    },
    "settings.paystack.testMode": {
      type: Boolean,
      label: "Api test mode",
      optional: true
    }
  }
]);

registerSchema("PaystackPackageConfig", PaystackPackageConfig);

/*
 * @description: creates schema for paystack payment details
 * @return(void) void
 */
export const PaystackPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name",
    optional: true
  },
  payerEmail: {
    type: String,
    label: "Cardholder email",
    optional: true
  }
});

registerSchema("PaystackPayment", PaystackPayment);
