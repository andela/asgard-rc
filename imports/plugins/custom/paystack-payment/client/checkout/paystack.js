/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";
import { AutoForm } from "meteor/aldeed:autoform";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Cart, Packages } from "/lib/collections";
import { Paystack } from "../../lib/api";
import { PaystackPayment } from "../../lib/collections/schemas";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}

Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit: function (formDetails) {
    Meteor.call("paystack/getShopKeys", (err, keys) => {
      if (err) {
        throw new Meteor.call.Error("Failed to load keys");
      }

      const paymentPackages = Packages.findOne({
        name: "paystack",
        shopId: Reaction.getShopId()
      });
      submitting = true;
      const cart = Cart.findOne();
      // convert to kobo as paystack only processes kobo
      const amount = Math.round(cart.cartTotal()) * 100;
      const template = this.template;
      const key = keys.public;
      const { testMode } = keys;
      const paymentDetails = {
        key,
        name: formDetails.payerName,
        email: formDetails.payerEmail,
        reference: Random.id(),
        amount,
        callback(response) {
          submitting = false;
          const secret = keys.secret;
          const reference = response.reference;
          if (reference && !testMode) {
            Paystack.verify(reference, secret, (error, res) => {
              if (error) {
                handlePaystackSubmitError(error);
                uiEnd(template, "Resubmit payment");
              }
              if (res) {
                const transaction = res.data;
                submitting = false;
                const paymentMethod = {
                  processor: "Paystack",
                  storedCard: transaction.authorization.card_type,
                  paymentPackageId: paymentPackages._id,
                  paymentSettingsKey: paymentPackages.registry[0].settingsKey,
                  method: "credit",
                  transactionId: transaction.reference,
                  currency: transaction.currency,
                  amount: transaction.amount / 100, // convert back to naira
                  status: transaction.status,
                  mode: "authorize",
                  createdAt: new Date(),
                  transactions: []
                };
                Alerts.toast("Transaction successful");
                paymentMethod.transactions.push(transaction.authorization);
                Meteor.call("cart/submitPayment", paymentMethod);
              }
            });
            return;
          }
          if (reference && testMode) {
            const paymentMethod = {
              processor: "Paystack",
              storedCard: "Paystack test card",
              paymentPackageId: paymentPackages._id,
              paymentSettingsKey: paymentPackages.registry[0].settingsKey,
              transactionId: reference,
              method: "credit",
              status: "passed",
              mode: "authorize",
              currency: "NGN",
              amount,
              createdAt: new Date(),
              transactions: []
            };
            Alerts.toast("Transaction successful");
            Meteor.call("cart/submitPayment", paymentMethod);
          }
        },
        onClose() {
          uiEnd(template, "Complete payment");
        }
      };
      try {
        PaystackPop.setup(paymentDetails).openIframe();
        submitting = false;
      } catch (error) {
        handlePaystackSubmitError(template, error);
        uiEnd(template, "Complete payment");
      }
    });
    return false;
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
