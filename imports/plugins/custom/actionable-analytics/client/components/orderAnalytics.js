/*eslint-disable */
import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

const AllOrders = (props) => {
  const { allOrder, range, handleDateChange, currentAnalytic } = props;
  let grandTotal = 0
  const tableBody = (allOrder.length === 0) ? 
  <h4 className="blue-text">  No orders were made within this period of time</h4> :
  allOrder.map(eachOrder => {
    const goodsList = eachOrder.goods.map((good) => {
      return (
        <tr>
          <td> {good.quatity} </td>
          <td>{good.name} </td>
        </tr>
      );
    });
    const eachOrderCost = Number(eachOrder.totalCost);
    grandTotal += Number(eachOrderCost.toFixed(2));
    return (
      <tbody key={eachOrder._id}>
        <tr>
          <th scope="row" />
          <td>{eachOrder.date}</td>
          <td>
          <table className="table">
              <thead className="grey-back">
                <tr>
                  <td > <span className="inner-head">Qty</span></td>
                  <td><span className="inner-head">Item</span></td>
                </tr>
              </thead>
              <tbody className="grey-back">
                {goodsList}
              </tbody>
            </table>
          </td>
          <td >{eachOrder.email}</td>
          <td>₦{eachOrder.totalCost}</td>
        </tr>
      </tbody>
    );
  });
  return (
    <div className="top-gap" style={{ display: currentAnalytic === "order" ? "block" : "none" }}>
    <h3 className="blue-text bottom-gap"> Order Analytics </h3>
      <form className="fitering-form bottom-gap">
        <label className="blue-text right-gap"> Showing All Orders from </label>
        <input
          className="right-gap"
          type="date"
          value={range.fromDate}
          name="fromDate"
          onChange={handleDateChange}
        />
        <label className="blue-text right-gap"> Till</label>
        <input
          className="right-gap"
          type="date"
          value={range.toDate}
          name="toDate"
          onChange={handleDateChange}
        />
      </form>
      <table className="table table-bordered grey-back">
        <thead>
          <tr>
            <th />
            <th>Date</th>
            <th>Products</th>
            <th>Customer Email</th>
            <th>Total Worth (₦)</th>
          </tr>
        </thead>
        {tableBody}
      </table>
      <div>
        <h3 className="blue-text"> Grand Total ₦{Number(grandTotal.toFixed(2))} </h3>
      </div>
    </div>
  );
};

registerComponent("AllOrders", AllOrders);

export default AllOrders;