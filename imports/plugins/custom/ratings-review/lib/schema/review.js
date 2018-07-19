import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Reviews = new SimpleSchema({
  rating: {
    type: String,
    optional: true
  },
  comments: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  productName: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    }
  }
});

registerSchema("Reviews",  Reviews);
