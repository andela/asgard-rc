import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Random } from "meteor/random";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import "./walletCheckout.html";
import "../../style/style.css";
import { Cart, Shops, Packages } from "/lib/collections";

class WalletCheckout extends Component {
    state = {
      balance: 0,
      walletId: "",
      price: Number(Cart.findOne().getTotal()),
      id: ""
    }

    componentDidMount() {
      this.getWalletDetails();
    }

    getWalletDetails = () => {
      Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
        this.setState({
          balance: payload.balance,
          walletId: payload.walletId,
          id: payload._id
        });
      });
    }

    pay = (e) => {
      e.preventDefault();
      const amount = this.state.price;
      if (amount > this.state.balance) {
        Alerts.toast("Insufficient fund. Fund Your Wallet and try again", "error");
      } else {
        this.processPayment();
      }
    }

    processPayment = () => {
      const currentCart = Cart.findOne({
        userId: Meteor.userId()
      });
      window.cartId =  currentCart._id;
      const currency = Shops.findOne().currency;
      const packageData = Packages.findOne({
        name: "wallet",
        shopId: Reaction.getShopId()
      });
      Alerts.alert({
        title: `₦${this.state.price} will be deducted from your wallet`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm"
      }, (remove) => {
        if (remove) {
          const checkOut = {
            processor: "Wallet",
            method: "credit",
            paymentPackageId: packageData._id,
            paymentSettingsKey: packageData.registry[0].settingsKey,
            transactionId: Random.id(),
            currency,
            amount: this.state.price,
            status: "success" || "passed",
            mode: "authorize",
            createdAt: new Date(),
            transactions: []
          };
          Meteor.call("cart/submitPayment", checkOut);
          const transactionType = "Purchase";
          const userId = Meteor.user()._id;
          const walletId = this.state.walletId;
          const worth = Number(this.state.price);
          const startingBalance = this.state.balance;
          const closingBalance = startingBalance - worth;
          Meteor.call(
            "transaction/create",
            userId,
            worth,
            walletId,
            startingBalance,
            closingBalance,
            transactionType,
          );
          Alerts.toast("Payment Succesful", "success");
          this.updateWallet();
        }
      });
    }

    updateWallet = () => {
      const newBalanace =  Number(this.state.balance) - this.state.price;
      Meteor.call("wallet/updateAmount", this.state.id, Math.floor(newBalanace.toFixed(2)), (err, payload) => {
        if (payload === true) {
          this.setState({ balance: newBalanace });
        } else {
          Alerts.toast("Somthing went wrong", "error");
        }
      });
    }

    render() {
      return (
        <div>
          <h1 className="wallet-top"> Or </h1>
          <h3 className= "wallet-section">Wallet Checkout</h3>
          <h3 className= "wallet-body"> Your Balance is <span className="green-text">₦{this.state.balance}</span> </h3>
          <button className="btn-lg wallet-pay"
            type="button"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.pay}
          >
          Pay from Wallet
          </button>
        </div>
      );
    }
}


export default WalletCheckout;

Template.walletCheckout.helpers({
  walletCheckout() {
    return {
      component: WalletCheckout
    };
  }
});

