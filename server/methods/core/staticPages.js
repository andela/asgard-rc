import * as Collections from "/lib/collections";
import * as Schemas from "../../../lib/collections/schemas";
import { StaticPages } from "../../../lib/collections";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  insertPage: function (pageName, pageAddress, pageContent, createdAt) {
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(createdAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      createdAt
    };

    check(page, Schemas.StaticPages);
    const createPage = Collections.StaticPages.insert(page);
    return createPage;
  },
  updatePage: function (_id, pageName, pageAddress, pageContent, createdAt, updatedAt) {
    check(_id, String);
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(createdAt, Date);
    check(updatedAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      createdAt,
      updatedAt
    };

    check(page, Schemas.StaticPages);
    const modifyPage = Collections.StaticPages.update(_id, { $set: page });
    return modifyPage;
  },

  // deletePage: function
  deletePage(_id) {
    check(_id, String);
    const removePage = StaticPages.remove(_id);
    return removePage;
  },

  // get details: function
  getPage(_id) {
    check(_id, String);
    const foundPage = Collections.StaticPages.findOne(_id);
    return foundPage;
  }
});
