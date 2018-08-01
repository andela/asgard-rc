import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Wallets = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  balance: {
    type: Number,
    optional: false
  },
  walletId: {
    type: String,
    optional: false
  },
  transaction: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("Wallets", Wallets);
