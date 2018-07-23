import { Template } from "meteor/templating";
import LandingPage from "../components/MyStoreFront";

Template.landingPage.helpers({
  landingPage() {
    return {
      component: LandingPage
    };
  }
});
