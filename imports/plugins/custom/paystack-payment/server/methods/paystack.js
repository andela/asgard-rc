/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Reaction } from "/server/api";

// reaction modules
import { Logger } from "/server/api"; // Reaction
import { PaystackApi } from "./paystackapi";
import { Packages } from "/lib/collections";
// const paystackBaseUrl = "api.paystack.co";

function luhnValid(x) {
  return [...x].reverse().reduce((sum, c, i) => {
    let d = parseInt(c, 10);
    if (i % 2 !== 0) { d *= 2; }
    if (d > 9) { d -= 9; }
    return sum + d;
  }, 0) % 10 === 0;
}
const ValidCardNumber = Match.Where(function (x) {
  return /^[0-9]{13,16}$/.test(x) && luhnValid(x);
});
const ValidExpireMonth = Match.Where(function (x) {
  return /^[0-9]{1,2}$/.test(x);
});
const ValidExpireYear = Match.Where(function (x) {
  return /^[0-9]{4}$/.test(x);
});
const ValidCVV = Match.Where(function (x) {
  return /^[0-9]{3,4}$/.test(x);
});
Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} transactionType authorize or capture
   * @param  {Object} cardData card Details
   * @param  {Object} paymentData The details of the Payment Needed
   * @return {Object} results normalized
   */
  "paystackSubmit": function (transactionType, cardData, paymentData) {
    check(transactionType, String);
    check(cardData, {
      name: String,
      number: ValidCardNumber,
      expireMonth: ValidExpireMonth,
      expireYear: ValidExpireYear,
      cvv2: ValidCVV,
      type: String
    });
    check(paymentData, {
      total: String,
      currency: String
    });
    const total = parseFloat(paymentData.total);
    let result;
    try {
      const transaction = PaystackApi.methods.authorize.call({
        transactionType: transactionType,
        cardData: cardData,
        paymentData: paymentData
      });
      result = {
        saved: true,
        status: "created",
        currency: paymentData.currency,
        amount: total,
        riskLevel: normalizeRiskLevel(transaction),
        transactionId: transaction.id,
        response: {
          amount: total,
          transactionId: transaction.id,
          currency: paymentData.currency
        }
      };
    } catch (error) {
      Logger.warn(error);
      result = {
        saved: false,
        error: error
      };
    }
    return result;
  },
  /**
   * Capture a Charge
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "paystack/payment/capture": function (paymentData) {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    const authorizationId = paymentData.transactionId;
    const amount = paymentData.amount;
    const response = PaystackApi.methods.capture.call({
      authorizationId: authorizationId,
      amount: amount
    });
    const result = {
      saved: true,
      response: response
    };
    return result;
  },
  /**
   * Create a refund
   * @param  {Object} paymentMethod object
   * @param  {Number} amount The amount to be refunded
   * @return {Object} result
   */
  "paystack/refund/create": function (paymentMethod, amount) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    check(amount, Number);
    const { transactionId } = paymentMethod;
    const response = PaystackApi.methods.refund.call({
      transactionId: transactionId,
      amount: amount
    });
    const results = {
      saved: true,
      response: response
    };
    return results;
  },
  /**
   * List refunds
   * @param  {Object} paymentMethod Object containing the pertinant data
   * @return {Object} result
   */
  "paystack/refund/list": function (paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    const { transactionId } = paymentMethod;
    const response = PaystackApi.methods.refunds.call({
      transactionId: transactionId
    });
    const result = [];
    for (const refund of response.refunds) {
      result.push(refund);
    }
    // The results retured from the GenericAPI just so happen to look like exactly what the dashboard
    // wants. The return package should ba an array of objects that look like this
    // {
    //   type: "refund",
    //   amount: Number,
    //   created: Number: Epoch Time,
    //   currency: String,
    //   raw: Object
    // }
    const emptyResult = [];
    return emptyResult;
  },
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
  }
  // /**
  //   * Create a refund
  //    * @param  {Object} paymentMethod Object holding order payment details
  //    * @param  {Number} amount The amount to be refunded
  //    * @return {Object} result
  // */
  // "paystack/refund/create": (paymentMethod, amount) => {
  //   const paystackRefundUrl = `https://${paystackBaseUrl}/refund`;
  //   const { transactionId } = paymentMethod;
  //   const settings = Packages.findOne({
  //     name: "paystack",
  //     shopId: Reaction.getShopId()
  //   }).settings;
  //   const secretKey = settings.paystack.secretKey;
  //   const headers = new Headers({
  //     "Authorization": `Bearer ${secretKey}`,
  //     "Content-Type": "application/json"
  //   });
  //   fetch(paystackRefundUrl, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify({
  //       transaction: transactionId,
  //       amount
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       if (response.status) {
  //         return response.data;
  //       }
  //       return null;
  //     });
  // },
  // /**
  //   * List refunds
  //   * @param  {Object} paymentMethod Object holding order payment details
  //   * @return {Object} result
  // */
  // "paystack/refund/list": (paymentMethod) => {
  //   const { transactionId } = paymentMethod;
  //   const paystackRefundUrl = (transactionId ? `https://${paystackBaseUrl}/refund?reference=${transactionId}`
  //     : `https://${paystackBaseUrl}/refund`);
  //   const settings = Packages.findOne({
  //     name: "paystack",
  //     shopId: Reaction.getShopId()
  //   }).settings;
  //   const secretKey = settings.paystack.secretKey;
  //   fetch(paystackRefundUrl, {
  //     headers: new Headers({
  //       "Authorization": `Bearer ${secretKey}`,
  //       "Content-Type": "application/json"
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       if (response.status) {
  //         return response.data;
  //       }
  //       return [];
  //     });
  // }
});

/**
 * @method normalizeRiskLevel
 * @private
 * @summary Normalizes the risk level response of a transaction to the values defined in paymentMethod schema
 * @param  {object} transaction - The transaction that we need to normalize
 * @return {string} normalized status string - either elevated, high, or normal
 */
function normalizeRiskLevel(transaction) {
  // the values to be checked against will depend on the return codes/values from the payment API
  if (transaction.riskStatus === "low_risk_level") {
    return "elevated";
  }
  if (transaction.riskStatus === "highest_risk_level") {
    return "high";
  }
  // default to normal if no other flagged
  return "normal";
}
