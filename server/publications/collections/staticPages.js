import { StaticPages } from "/lib/collections";
import { Meteor } from "meteor/meteor";

/**
 * Static Pages
 */
Meteor.publish("StaticPages", function () {
  return StaticPages.find({});
});
