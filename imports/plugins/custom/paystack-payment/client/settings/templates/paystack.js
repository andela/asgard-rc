import { Template } from "meteor/templating";
import PaystackSettingsFormContainer from "../containers/PaystackSettingsFormContainer.js";
import "./paystack.html";

Template.paystackSettings.helpers({
  PaystackSettings() {
    return {
      component: PaystackSettingsFormContainer
    };
  }
});
