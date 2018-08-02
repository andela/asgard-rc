import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import PropTypes from "prop-types";
import CompletedOrder from "../../../checkout/client/components/completedOrder";

/**
 * @summary React component to display an array of completed orders
 * @class OrdersList
 * @extends {Component}
 * @property {Array} allOrdersInfo - array of orders
 * @property {Function} handeleDisplayMedia - function to display order image
 */
class OrdersList extends Component {
  static propTypes = {
    allOrdersInfo: PropTypes.array,
    handleDisplayMedia: PropTypes.func,
    isProfilePage: PropTypes.bool
  }

  sendNotificationToAdmin = (adminId, orderId) => {
    const type = "applyForCancel";
    const prefix = Reaction.getShopPrefix();
    const url = `${prefix}/dashboard/orders`;
    const sms = false;
    // Sending notification to admin
    return Meteor.call("notification/send", adminId, type, url, sms, orderId, (err, response) => {
      if (err) {
        return err;
      }
      if (response) {
        Alerts.toast("Cancel Order request sent", "success", {
          placement: "productDetail",
          autoHide: 10000
        });
      }
    });
  };

  cancelOrder(order) {
    Meteor.call("shopOwner/getId", (err, response) => {
      if (err) {
        return err;
      }
      const adminId = response;
      const orderId = order._id;
      this.sendNotificationToAdmin(adminId, orderId);
      Meteor.call("workflow/pushOrderWorkflow", "coreOrderWorkflow", "refundRequested", order, (error) => {
        if (error) {
          return error;
        }
      });
    });
  }

  render() {
    const { allOrdersInfo, handleDisplayMedia } = this.props;

    if (allOrdersInfo) {
      return (
        <div>
          {allOrdersInfo.map((order) => {
            const orderKey = order.orderId;
            return (
              <CompletedOrder
                key={orderKey}
                shops={order.shops}
                order={order.order}
                orderId={order.orderId}
                orderSummary={order.orderSummary}
                paymentMethods={order.paymentMethods}
                productImages={order.productImages}
                handleDisplayMedia={handleDisplayMedia}
                isProfilePage={this.props.isProfilePage}
                cancelOrder={this.cancelOrder.bind(this)}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className="alert alert-info">
        <span data-i18n="cartCompleted.noOrdersFound">No orders found.</span>
      </div>
    );
  }
}

export default OrdersList;
