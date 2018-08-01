import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Transaction = new SimpleSchema({
  userId: {
    type: String,
    optional: false
  },
  startingBalance: {
    type: Number,
    optional: false,
    decimal: true
  },
  worth: {
    type: Number,
    optional: false,
    decimal: true
  },
  closingBalance: {
    type: Number,
    optional: false,
    decimal: true
  },
  walletId: {
    type: String,
    optional: false
  },
  transactionType: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("Transaction", Transaction);
