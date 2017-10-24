import SimpleSchema from "simpl-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Sms  = new SimpleSchema({
  apiKey: {
    type: String,
    optional: true
  },
  apiToken: {
    type: String,
    optional: true
  },
  shopId: {
    type: String,
    optional: true
  },
  smsPhone: {
    type: String,
    optional: true
  },
  smsProvider: {
    type: String,
    optional: true
  }
});

registerSchema("Sms", Sms);
