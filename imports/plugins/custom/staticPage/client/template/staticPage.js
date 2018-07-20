import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";

Template.staticPage.helpers({
  staticPage() {
    const current = Router.current();
    const pageAddress = current.params.pageAddress;
    const subscription = Meteor.subscribe("StaticPages");
    if (subscription.ready()) {
      const page = StaticPages.find({ pageAddress }).fetch();
      const { pageContent, pageName } = page[0];
      return { title: pageName, content: pageContent };
    }
  }
});
