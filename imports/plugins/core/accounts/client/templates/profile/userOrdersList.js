import moment from "moment";
import { Template } from "meteor/templating";
import { Orders, Shops } from "/lib/collections";
import { Reaction } from "/client/api";
import CompletedOrder from "/imports/plugins/core/checkout/client/components/completedOrder";

/**
 * userOrdersList helpers
 *
 */
Template.userOrdersList.helpers({
  orderStatus() {
    if (this.workflow.status === "coreOrderCompleted") {
      return true;
    }
  },
  orders(data) {
    if (data.hash.data) {
      return data.hash.data;
    }
    const orders = Orders.find({}, {
      sort: {
        createdAt: -1
      },
      limit: 25
    });
    return orders;
  },
  orderAge() {
    return moment(this.createdAt).fromNow();
  },
  shipmentTracking() {
    const shippingObject = this.shipping.find((shipping) => {
      return shipping.shopId === Reaction.getShopId();
    });
    return shippingObject.shipmentMethod.tracking;
  },
  shopName() {
    const shop = Shops.findOne(this.shopId);
    return shop !== null ? shop.name : void 0;
  },
  completedOrder() {
    return { component: CompletedOrder };
  },
  orderSummary() {
    const instance = Template.instance();
    // const order = instance.state.get("order");
    console.log("instance:order: ", instance);
    // const orderSummary = {
    //   quantityTotal: order.getCount(),
    //   subtotal: order.getSubTotal(),
    //   shippingTotal: order.getShippingTotal(),
    //   tax: order.getTaxTotal(),
    //   discounts: order.getDiscounts(),
    //   total: order.getTotal(),
    //   shipping: order.shipping
    // };
    // console.log("orderSummary: ", orderSummary);
    return {
      quantityTotal: 10,
      subtotal: 10,
      shippingTotal: 10,
      tax: 0,
      discounts: 0,
      total: 20,
      shipping: 10
    };
  },
  handleDisplayMedia() {
    const instance = Template.instance();
    // const order = instance.state.get("order");
    // const variantId = item.variants._id;
    // const productId = item.productId;

    // const variantImage = Collections.Media.findOne({
    //   "metadata.variantId": variantId,
    //   "metadata.productId": productId
    // });

    // if (variantImage) {
    //   return variantImage;
    // }

    // const defaultImage = Collections.findOne({
    //   "metadata.productId": productId,
    //   "metadata.priority": 0
    // });

    // if (defaultImage) {
    //   return defaultImage;
    // }
    console.log("order:items: ", instance);
    return false;
  }
});
