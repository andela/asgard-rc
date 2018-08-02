import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";
import { Reaction } from "/server/api";


/**
 * @file Methods for Notifications. Run these methods using `Meteor.call()`.
 *
 *
 * @namespace Methods/Notification
*/
Meteor.methods({
  "shopOwner/getId": function () {
    // TODO validate with multiple show owners
    // switch to using getShopId for role lookup
    const shopId = Reaction.getShopId();
    const shop = Shops.findOne({ _id: shopId });
    const adminEmail = shop.emails[0].address;
    const admin = Meteor.users.find().fetch();
    let adminId;
    admin.forEach((element) => {
      if (element.emails[0].address === adminEmail) {
        adminId = element._id;
      }
    });
    return adminId;
  }
});
