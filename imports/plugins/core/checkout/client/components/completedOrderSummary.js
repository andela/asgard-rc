import React from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import ShopOrderSummary from "./shopOrderSummary";


/**
 * @summary Display the summary/total information for an order
 * @param {Object} props - React PropTypes
 * @property {Array} shops - An array of summary information broken down by shop
 * @property {Object} orderSummary - An object representing the "bottom line" summary for the order
 * @property {boolean} isProfilePage - Checks if current page is Profile Page
 * @return {Node} React node containing the order summary broken down by shop
 */
const CompletedOrderSummary = ({ shops, order, orderSummary, isProfilePage, cancelOrder }) => {
  let cancelOrderButton = (isProfilePage && order.workflow.status === "new") ? <button onClick={() => {
    window.$order = order;
    Alerts.alert(
      {
        title: "Are you sure you want to cancel this order?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes"
      },
      confirmed => {
        if (confirmed) {
          cancelOrder(order);
        }
        return false;
      }
    );
  }} style={{ marginTop: "25px" }} className="btn btn-danger pull-right">Cancel Order</button> : null;
  if (order.workflow.status === "coreOrderWorkflow/refundRequested" || order.workflow.status === "coreOrderWorkflow/canceled") {
    cancelOrderButton = <button style={{ marginTop: "25px" }} className="btn btn-danger pull-right" disabled>Canceled Order</button>;
  }
  return (
    <div>
      <div className="order-details-content-title">
        <p><Components.Translation defaultValue="Order Summary" i18nKey={"cartCompleted.orderSummary"} /></p>
      </div>
      <div className="order-details-info-box">
        {shops.map((shop) => {
          const shopKey = Object.keys(shop);
          return <ShopOrderSummary shopSummary={shop[shopKey]} key={shopKey} isProfilePage={isProfilePage} />;
        })}
        <hr />
        {orderSummary.discounts > 0 &&
        <div className="order-summary-line">
          <div className="order-summary-discount-title">
            <Components.Translation defaultValue="Discount Total" i18nKey={"cartCompleted.discountTotal"}/>
          </div>
          <div className="order-summary-discount-value">
            <Components.Currency amount={orderSummary.discounts}/>
          </div>
        </div>
        }
        <div className="order-summary-line">
          <div className="order-summary-total-title">
            <Components.Translation defaultValue="Order Total" i18nKey={"cartCompleted.orderTotal"}/>
          </div>
          <div className="order-summary-total-value">
            <Components.Currency amount={orderSummary.total}/>
          </div>
        </div>
        {cancelOrderButton}
      </div>
    </div>
  );
};

CompletedOrderSummary.propTypes = {
  cancelOrder: PropTypes.func,
  isProfilePage: PropTypes.bool,
  order: PropTypes.object,
  orderSummary: PropTypes.object,
  shops: PropTypes.array
};

registerComponent("CompletedOrderSummary", CompletedOrderSummary);

export default CompletedOrderSummary;
