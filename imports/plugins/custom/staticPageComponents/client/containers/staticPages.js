import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import * as Collections from "/lib/collections";
import StaticPages from "../components/staticPages";

const handlers = {};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("StaticPages");
  let pages = [];
  if (subscription.ready()) {
    pages = Collections.StaticPages.find({}).fetch();
  }
  onData(null, { pages });
};

registerComponent("StaticPages", StaticPages, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(StaticPages);
