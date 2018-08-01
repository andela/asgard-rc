import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Template } from "meteor/templating";
import "./walletlayout.html";
import "./../style/style.css";
import "./paystackFundWallet";
import { paystackFundWallet } from "./paystackFundWallet";
import { parse } from "querystring";

class WalletDashboard extends Component {
  constructor() {
    super();
    this.recordTransaction = this.recordTransaction.bind(this);
  }
  state = {
    worth: "",
    walletId: "",
    user: Meteor.user(),
    startingBalance: Number(0.00),
    showHistory: false,
    historyToggleBtn: "Show transaction history",
    id: "",
    transactionHistory: [],
    disable: false
  };
  componentDidMount() {
    this.getWalletDetails();
    this.getTransactionHistory();
  }

  getWalletDetails = () => {
    Meteor.call("wallet/get", Meteor.user()._id, (err, payload) => {
      this.setState({
        startingBalance: payload.balance,
        walletId: payload.walletId,
        id: payload._id
      });
    });
  }

  getTransactionHistory = () => {
    const userId = Meteor.user()._id;
    Meteor.call("transaction/get", userId, (err, payload) => {
      if (!err) {
        this.setState({ transactionHistory: payload });
      }
    });
  }

  makeHistoryVisible = () => {
    if (this.state.showHistory) {
      this.setState({
        showHistory: false,
        historyToggleBtn: "Show transaction history"
      });
    } else {
      this.setState({
        showHistory: true,
        historyToggleBtn: "Hide transaction history"
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  recordTransaction = (userId, worth, walletId, startingBalance, closingBalance, transactionType) => {
    Meteor.call(
      "transaction/create",
      userId,
      worth,
      walletId,
      startingBalance,
      closingBalance,
      transactionType,
      (err) => {
        if (!err) {
          this.getTransactionHistory();
        }
      });
  }
  fundMyWallet = (e) => {
    e.preventDefault();
    const { worth } = this.state;
    const amount = Number(worth);
    if (amount === "" || amount !== parseInt(amount, 10)) {
      Alerts.toast("Please add a valid amount", "error");
    } else if (worth < 100) {
      Alerts.toast("Amount must not be less than 100 Naira", "error");
    } else {
      this.setState({
        disable: true
      });
      const closingBalance = Number(this.state.worth) + this.state.startingBalance;
      const balance = Math.floor(closingBalance.toFixed(2));
      // console.log('balance', balance);
      paystackFundWallet(Number(worth * 100))
        .then(() => {
          Meteor.call("wallet/updateAmount", this.state.id, balance);
          const transactionType = "Fund Wallet";
          const userId = Meteor.user()._id;
          const { startingBalance } = this.state;
          const walletId = this.state.walletId;
          this.recordTransaction(
            userId,
            parseInt(this.state.worth, 10),
            walletId,
            startingBalance,
            closingBalance,
            transactionType
          );
          this.setState({
            startingBalance: balance,
            worth: ""
          });
          Alerts.toast("Wallet Funded", "success");
          this.setState({
            disable: false
          });
        });
    }
  }
  // (userId, worth, walletId, startingBalance, closingBalance,  transactionType)
  render() {
    const dateFormat = (arg) => {
      const dateString = new Date(arg).toUTCString().split(" ").slice(1, 4).join();
      return dateString;
    };

    const displayTransaction = this.state.transactionHistory.map(eachTransaction =>
      <tbody key={eachTransaction._id}>
        <tr>
          <th scope="row" />
          <td>{dateFormat(eachTransaction.createdAt)}</td>
          <td>{eachTransaction.transactionType}</td>
          <td>₦{eachTransaction.startingBalance}</td>
          <td>₦{eachTransaction.worth}</td>
          <td>₦{eachTransaction.closingBalance}</td>
        </tr>
      </tbody>
    );

    const historyBlock =
      <div className="transaction-history">
        <div className="">
          <div className="bs-example" data-example-id="panel-without-body-with-table">
            <div className="panel panel-default" style={{ background: "#E3E3E3" }}>
              <div className="panel-heading"><h2>Transaction History</h2></div>
              <div className="scrollbar2 scrollbar-primary">
                <table className="table">
                  <thead>
                    <tr>
                      <th />
                      <th>Date</th>
                      <th>Transaction Type</th>
                      <th>Starting balance</th>
                      <th>Worth</th>
                      <th>Closing balance</th>
                    </tr>
                  </thead>
                  {displayTransaction}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>;
    const historySection = this.state.showHistory ? historyBlock : null;
    return (
      <div className="">
        <div className="bottom-gap wallet-layout">
          <h1 className="blue-text"> Wallet </h1>
          <div className="left">
            <div className="jumbotron">
              <form onSubmit={this.fundMyWallet} className="left-gap">
                <h3>Fund Wallet</h3>
                <lable>Amount in Naira</lable>
                <div className="form-group size">
                  <input type="number"
                    className="form-control"
                    placeholder="Amount"
                    name="worth"
                    value={this.state.worth}
                    onChange={this.onChange}
                    style={{ width: "60%" }}
                  />
                </div>
                <h6>Wallet is funded with Paystack.</h6>
                <button
                  type="submit"
                  className="but"
                  id="payBtn"
                  disabled={this.state.disable}
                >
                  Fund now
                </button>
              </form>
              <div className="left-gap">
                <h2>Current Balance: ₦{this.state.startingBalance}</h2>
              </div>
              <div className="left-gap top-gap">
                <button
                  onClick={this.makeHistoryVisible}
                  id="toggleHistory"
                >
                  {this.state.historyToggleBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
        {historySection}
      </div>
    );
  }
}

export default WalletDashboard;

Template.walletDashboard.helpers({
  walletDashboard() {
    return {
      component: WalletDashboard
    };
  }
});
