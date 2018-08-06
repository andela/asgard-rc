import React from "react";
import PropTypes from "prop-types";
import "../stylesheet/productAnalytics.css";
import moment from "moment";
import "./analytics.html";


const ProductAnalytics = (props) => {
  const { currentAnalytic, allProducts } = props;
  return (
    <div className="top-gap" style={{ display: currentAnalytic === "product" ? "block" : "none" }}>
      <h3 className="blue-text bottom-gap"> Product Analytics </h3>
      <div className="tab-pane fade in active" id="tab1primary">
        <div className="table-responsive table-bordered movie-table">
          <table className="table movie-table table-striped">
            <thead>
              <tr className="movie-table-head">
                <th>Name</th>
                <th>No. of Orders</th>
                <th>Quantity</th>
                <th>Product Remaining</th>
                <th>First sale</th>
                <th>Last sale</th>
                <th>No. of Purchases</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.length > 0 && allProducts.map((product) =>
                <tr key={product.productName} className="dark-row">
                  <td>{product.productName}</td>
                  <td className="text-center">{product.orders.length} </td>
                  <td className="text-center">{product.quantity}</td>
                  <td className="text-center">{product.productLeft}</td>
                  <td>{product.orders.length > 0 ? moment(product.orders[0].createdAt).format("Do-MM-YYYY") : "No orders"}</td>
                  <td>{product.orders.length > 0 ? moment(product.orders[product.orders.length - 1].createdAt).format("Do-MM-YYYY") : "No orders"}</td>
                  <td className="text-center">{product.purchases}</td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


ProductAnalytics.propTypes = {
  allProducts: PropTypes.array,
  currentAnalytic: PropTypes.string
};
export default ProductAnalytics;

