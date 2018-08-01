import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Transaction } from "../../lib/collections";

Meteor.methods({
  /**
   * @description creates a transaction instances
   * @param {string} userId -user performing the transaction
   * @param {number} worth - worth of transaction
   * @param {number} startingBalance - balance before transaction
   * @param {number} closingBalance - balance after transaction
   * @param {string} walletId - id of wallet from which deductions would be made
   * @param {string} transactionType - the type of transaction
   *
   * @returns {obj} transaction instance
   */
  "transaction/create"(userId, worth, walletId, startingBalance, closingBalance,  transactionType) {
    check(userId, String);
    check(worth, Number);
    check(startingBalance, Number);
    check(closingBalance, Number);
    check(walletId, String);
    check(transactionType, String);

    const transaction = Transaction.insert({
      userId,
      worth,
      walletId,
      startingBalance,
      closingBalance,
      transactionType,
      createdAt: new Date()
    });
    return transaction;
  },
  /**
   * @description finds all the transactions of a user
   *
   * @param {string} userId - user's id
   *
   * @returns {array} array of tansactions
   */
  "transaction/get"(userId) {
    check(userId, String);
    const transaction = Transaction.find({
      userId
    }).fetch();
    return transaction;
  }
});

