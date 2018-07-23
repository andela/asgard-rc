/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Paystack",
  name: "paystack",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    paystack: {
      enabled: false,
      testMode: true,
      support: [
        "Authorize",
        "Capture",
        "Refund"
      ]
    }
  },
  registry: [
    // Settings panel
    {
      label: "Paystack Payment", // this key (minus spaces) is used for translations
      route: "/dashboard/paystack",
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "paystackSettings",
      icon: "fa fa-credit-card-alt"
    },

    // Payment form for checkout
    {
      template: "paystackPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt",
      priority: 3
    }
  ]
});
