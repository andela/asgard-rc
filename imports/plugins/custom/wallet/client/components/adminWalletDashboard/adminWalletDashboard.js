
import React, { Component } from "react";
import { Template } from "meteor/templating";
import "./adminWalletDashboard.html";
import "../../style/style.css";

class AdminWalletDashboard extends Component {
  render() {
    return (
      <div>
        <h5>Wallet Enabled </h5>
      </div>
    );
  }
}


export default AdminWalletDashboard;

Template.adminWalletDashboard.helpers({
  adminWalletDashboard() {
    return {
      component: AdminWalletDashboard
    };
  }
});
