import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallets } from "../../lib/collections";

Meteor.methods({
  /**
   * @description this function creates a new wallet
   *
   * @param {string} userId -id of wallet owner
   * @param {number} balance - present balance of wallet
   * @param {string} walletId - id of wallet
   *
   * @returns {obj} wallet instance
   */
  "wallet/create"(userId, balance, walletId) {
    check(userId, String);
    check(balance, Number);
    check(walletId, String);

    const wallets = Wallets.insert({
      userId,
      balance,
      walletId,
      createdAt: new Date()
    });
    return wallets;
  },

  /**
   * @description finds the wallet of a specified user
   *
   * @param {string} userId -id of wallet owner
   *
   * @returns {obj} wallet information
   */
  "wallet/get"(userId) {
    check(userId, String);
    const walletDetails = Wallets.find({
      userId
    }).fetch();
    return walletDetails[0];
  },

  /**
   * @description this function updates a wallet balance
   *
   * @param {string} id -id of wallet
   * @param {number} balance - new balance
   *
   * @returns {bool} status of operation
   */
  "wallet/updateAmount"(id, balance) {
    check(id, String);
    check(balance, Number);
    Wallets.update({ _id: id }, { $set: { balance: balance } });
    return true;
  },
  /**
   * @description finds the owner of a specified wallet
   * @param {string} walletId
   *
   * @returns {obj} user information
   */
  "wallet/findUser"(walletId) {
    check(walletId, String);
    const user = Wallets.find({ walletId }).fetch();
    return user[0];
  }
});
