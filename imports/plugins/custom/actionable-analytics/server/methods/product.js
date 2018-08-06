/*eslint-disable */
import {
  Meteor
} from "meteor/meteor";
import {
  check
} from "meteor/check";
import * as Collections from "/lib/collections";

Meteor.methods({
  "productOrderTime" (productId) {
    let sortedProduct;
    check(productId, String);
    const allOrders = Collections.Orders.find({}).fetch();
    const allItems = []
    const items = allOrders.filter((order) => {
      order.items.map((item) => {
        if (item.productId === productId) {
          allItems.push({
            createdAt: order.createdAt,
            productId: item.productId
          });
        }
        sortedProduct = allItems.sort((firstSale, lastsale) => firstSale > lastsale)
      })
    });

    return sortedProduct;
  },

  "getProductNameAndId" () {
    const allProducts = Collections.Products.find({
      type: "simple"
    }, { fields: { title: 1, _id: 1 } }).fetch();
    return allProducts
  },

  "productQuantity" (productId) {
    check(productId, String);
    let products = [];
    const allProducts = Collections.Products.find({
      type: "variant"
    }).fetch();

    const productQuantity = allProducts.map((product) => {
       if(product.ancestors.includes(productId)) {
           products.push(product.inventoryQuantity);
        }
    })

    return products.reduce((a,b) => a + b);
  },

  "productRemaining" (productId) {
    check(productId, String);
    let allOrders;
    
    Meteor.call("productOrderTime", productId, (error, response) => {
      allOrders = response.length;
    })
    let productQuantity = Meteor.call("productQuantity", productId);
    return productQuantity - allOrders
  },

  "productPurchased" (productId) {
    check(productId, String);
    const purchases = [];
    const allOrders = Collections.Orders.find({}).fetch();
    const purchasedProduct = allOrders.filter((order) => {
      order.items.map((item) => {
        if(item.productId === productId && order.workflow.status === 'new') {
          purchases.push(item.productId);
        }
      })
    });
    return purchases.length
  },

  "unifyAll" (productId) {
    check(productId, String);
    let orders = Meteor.call("productOrderTime", productId)
    let quantity = Meteor.call("productQuantity", productId)
    let productLeft = Meteor.call("productRemaining", productId)
    let purchases = Meteor.call("productPurchased", productId)
   
    return {
      orders,
      quantity,
      productLeft,
      purchases
    };
  },

"productAnalytics" () {
  const result = [];
  const allProductDetails = Meteor.call("getProductNameAndId");
  allProductDetails.map((product) => {
    const productAnalytics = Meteor.call("unifyAll", product._id);
    productAnalytics.productName = product.title;
    result.push(productAnalytics);
  })
  return result;
}

})
