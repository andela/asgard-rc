// /* eslint camelcase: 0 */

import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { Reaction } from "/server/api";

const paystackBaseUrl = "api.paystack.co";
Meteor.methods({
  "paystack/getShopKeys": () => {
    const settings = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    }).settings;
    return {
      public: settings.paystack.apiKey,
      secret: settings.paystack.secretkey,
      testMode: settings.paystack.testMode
    };
  },
  /**
    * Create a refund
     * @param  {Object} paymentMethod Object holding order payment details
     * @param  {Number} amount The amount to be refunded
     * @return {Object} result
  */
  "paystack/refund/create": (paymentMethod, amount) => {
    const paystackRefundUrl = `https://${paystackBaseUrl}/refund`;
    const { transactionId } = paymentMethod;
    const settings = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    }).settings;
    const secretKey = settings.paystack.secretKey;
    const headers = new Headers({
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    });
    fetch(paystackRefundUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        transaction: transactionId,
        amount
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          return response.data;
        }
        return null;
      });
  },
  /**
    * List refunds
    * @param  {Object} paymentMethod Object holding order payment details
    * @return {Object} result
  */
  "paystack/refund/list": (paymentMethod) => {
    const { transactionId } = paymentMethod;
    const paystackRefundUrl = (transactionId ? `https://${paystackBaseUrl}/refund?reference=${transactionId}`
      : `https://${paystackBaseUrl}/refund`);
    const settings = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    }).settings;
    const secretKey = settings.paystack.secretKey;
    fetch(paystackRefundUrl, {
      headers: new Headers({
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          return response.data;
        }
        return [];
      });
  }
});
