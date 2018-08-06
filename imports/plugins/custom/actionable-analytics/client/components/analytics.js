import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { Template } from "meteor/templating";
import organizeData from "../helpers/organizeData";
import OrderAnalytics from "./orderAnalytics";
import ProductAnalytics from "./ProductAnalytics";
import "./analytics.html";
import "./../style/style.css";

class Analytics extends Component {
  state = {
    orderData: [],
    totalOrder: 0,
    totalPurchase: 0,
    fromDate: "2018-06-20",
    toDate: "2018-09-30",
    allProducts: [],
    currentAnalytic: "product"
  };

  componentDidMount() {
    const dateRange = {};
    dateRange.to = new Date(this.state.toDate);
    dateRange.from = new Date(this.state.fromDate);
    this.getOrderAnalytics(dateRange);
    Meteor.call("productAnalytics", (error, response) => {
      this.setState({
        allProducts: response
      });
    });
  }

  componentDidUpdate() {
    const dateRange = {};
    dateRange.to = new Date(this.state.toDate);
    dateRange.from = new Date(this.state.fromDate);
    this.getOrderAnalytics(dateRange);
  }
  getOrderAnalytics = (dateRange) => {
    Meteor.call("allOrders", dateRange, (err, loadedOrders) => {
      if (err) {
        return err;
      }
      if (loadedOrders) {
        const organizedData = organizeData(loadedOrders);
        this.setState({
          orderData: organizedData
        });
      }
    });
  }

  handleDateChange = (event) => {
    const { name } = event.target;
    const newDate = event.target.value;
    this.setState({
      [name]: newDate
    });
  }

  displayProductAnalytics = () => {
    this.setState({
      currentAnalytic: "product"
    });
  }

  displayOrderAnalytics = () => {
    this.setState({
      currentAnalytic: "order"
    });
  }
  render() {
    const dateRange = {};
    dateRange.toDate = this.state.toDate;
    dateRange.fromDate = this.state.fromDate;
    return (
      <div className="container">
        <button className="select-button" onClick={this.displayProductAnalytics}> Show Product Analytics </button>
        <button className="select-button" onClick={this.displayOrderAnalytics}> Show Order Analytics </button>
        <ProductAnalytics
          allProducts={this.state.allProducts}
          currentAnalytic ={this.state.currentAnalytic}
        />
        <OrderAnalytics
          allOrder={this.state.orderData}
          range={dateRange}
          handleDateChange={this.handleDateChange}
          currentAnalytic ={this.state.currentAnalytic}
        />
      </div>
    );
  }
}

export default Analytics;

Template.analytics.helpers({
  Analytics() {
    return {
      component: Analytics
    };
  }
});


