const organizeData = (allOrders) => {
  const organizedOrder = [];
  // get the information of each order.
  allOrders.forEach((order) => {
    const eachOrder = {};
    const orderDate = order.createdAt;
    const dateString = orderDate.toISOString().split("T")[0];
    const goods = [];
    eachOrder.date = dateString;
    eachOrder.email = order.email;
    // get the information of each items of the order.
    order.items.forEach((item) => {
      const eachItem = {};
      eachItem.name = item.title;
      eachItem.quatity = item.quantity;
      goods.push(eachItem);
    });
    eachOrder.totalCost = order.billing[0].invoice.subtotal;
    eachOrder.goods = goods;
    organizedOrder.push(eachOrder);
  });
  return organizedOrder;
};

export default organizeData;
