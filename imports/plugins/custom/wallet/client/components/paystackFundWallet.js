import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Accounts } from "/lib/collections";

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function paystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}
export const paystackFundWallet = (amount) => {
  return new Promise((resolve, reject) => {
    const user = Meteor.user();
    Meteor.call("paystack/getShopKeys", (error, paystackPublicKey) => {
      if (error) {
        throw new Meteor.Error("Failed to load paystack keys");
      }
      if (paystackPublicKey) {
        const publicKey = paystackPublicKey.public;
        Meteor.subscribe("Packages", Reaction.getShopId());
        const email = Accounts.findOne({ userId: user._id }).emails[0].address;
        const payload = {
          key: publicKey,
          amount,
          email,
          reference: Random.id(),
          callback: (response) => {
            resolve(response);
          },
          onClose() {
            Alerts.toast("Transaction cancelled", "error");
          }
        };
        try {
          PaystackPop.setup(payload).openIframe();
        } catch (err) {
          reject(paystackSubmitError(err));
        }
      }
    });
  });
};
