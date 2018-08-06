/*eslint-disable */
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import * as Collections from "/lib/collections";

Meteor.methods({
  allOrders: (dateRange) => {
    check(dateRange, Object);

    return Collections.Orders.find({
      createdAt: {
        $gte: new Date(dateRange.from),
        $lte: new Date(dateRange.to)
      }
    }).fetch();
  },
  todaysOrders: () => {
    
    return Collections.Orders.find({
      createdAt: new Date()
    }).fetch();
  }
});