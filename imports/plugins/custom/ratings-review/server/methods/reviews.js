import {
  Meteor
} from "meteor/meteor";
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
  }
});

