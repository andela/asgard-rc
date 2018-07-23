import { Session } from "meteor/session";

Session.set("INDEX_OPTIONS", {
  template: "landingPage",
  layoutHeader: "NavBar",
  layoutFooter: "landingFooter"
});
