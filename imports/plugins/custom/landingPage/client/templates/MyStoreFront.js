import { Template } from "meteor/templating";
// import { Components } from "@reactioncommerce/reaction-components";
import LandingPage from "../components/MyStoreFront";

Template.landingPage.helpers({
  landingPage() {
    return {
      component: LandingPage
    };
  }
});
