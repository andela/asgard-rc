import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";

/**
 * @summary Shows the individual line items for a completed order
 * @param {Object} props - React PropTypes
 * @property {Object} item - An object representing each item on the order
 * @property {Function} handleDisplayMedia - a function for displaying the proper product image
 * @return {Node} React node containing each line item on an order
 */
const CompletedOrderItem = ({ item, handleDisplayMedia, productKind }) => {
  let image;
  if (handleDisplayMedia(item)) {
    image = handleDisplayMedia(item).url();
  } else {
    image = "/resources/placeholder.gif";
  }
  return (
    <div className="row order-details-line">
      <div className="order-details-media"><img src={image} /></div>
      <div className="order-details-title">
        {item.product.title}
        <p>{item.variants.title}</p>
        { productKind.productUrl &&
        <small style={{ fontSize: "11px" }} >
          <a href={productKind.productUrl}>
            <i className="fa fa-download" aria-hidden="true" />&nbsp;
              Download
          </a>
        </small>
        }
      </div>
      <div className="order-details-quantity"><span>{item.quantity}</span></div>
      <div className="order-details-price"><Components.Currency amount={item.variants.price} /></div>
    </div>
  );
};
/* eslint-disable*/
class CompletedOrderItemProductKind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDigital: false,
      productUrl: ""
    };
  }
  componentDidMount() {
    const { productId } = this.props.item;
    this.isDigitalProduct(productId);
  }
  isDigitalProduct = (productId) => {
    Meteor.call("fetchDigitalProduct", productId, (error, result) => {
      if (result.isDigital === true) {
        this.setState({
          isDigital: true,
          productUrl: result.productUrl
        });
      }
    });
  }
  render() {
    return (
      <CompletedOrderItem
        item={this.props.item} key={this.props.item._id}
        handleDisplayMedia={this.props.handleDisplayMedia}
        productKind={this.state}
      />
    );
  }
}

CompletedOrderItem.propTypes = {
  handleDisplayMedia: PropTypes.func,
  item: PropTypes.object,
  productKind: PropTypes.object
};

CompletedOrderItemProductKind.PropTypes = CompletedOrderItem.PropTypes;

registerComponent("CompletedOrderItem", CompletedOrderItemProductKind);

export default CompletedOrderItemProductKind;
