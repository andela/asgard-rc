import {
  Meteor
} from "meteor/meteor";
import { Orders } from "/lib/collections";
import { Reviews } from "../../lib/collection";
import {
  check
} from "meteor/check";

  /**
   * Methods
   * @returns {Object} Ratings
   */

Meteor.methods({
  "createReview"(reviewObject) {
    check(reviewObject, Object);
    return Reviews.insert(reviewObject);
  },
  "getAllReviews"(productName) {
    check(productName, String);
    return Reviews.find({
      productName
    }, { sort: { createdAt: -1 } }).fetch();
  },
  "purchasedProducts"(userId) {
    check(userId, String);
    const userOrders = Orders.find({ userId }).fetch();
    const userPurchasedItems = [];
    if (userOrders.length > 0) {
      userOrders.forEach((order) => {
        order.items.forEach((item) => {
          userPurchasedItems.push(item.productId);
        });
      });
    }
    return userPurchasedItems;
  }
});

