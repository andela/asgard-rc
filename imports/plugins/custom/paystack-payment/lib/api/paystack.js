import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";

const paystackBaseUrl = "api.paystack.co";
export const Paystack = {
  verify(referenceNumber, secretKey, callback) {
    const paystackVerificationUrl = `https://${paystackBaseUrl}/transaction/verify/${referenceNumber}`;
    const headers = new Headers({
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    });
    fetch(paystackVerificationUrl, {
      headers
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          callback(null, response);
        } else {
          callback(response, null);
        }
      });
  },
  accountOptions() {
    const settings = Packages.findOne({
      name: "paystack"
    }).settings;
    if (!settings.apiKey && !settings.secretkey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return {
      public: settings.apiKey,
      secret: settings.secretkey
    };
  },
  authorize(cardInfo, paymentInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
