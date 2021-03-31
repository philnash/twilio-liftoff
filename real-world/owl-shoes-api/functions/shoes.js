const db = [
  {
    phoneNumber: process.env.MY_PHONE_NUMBER,
    orderStatus: "Out For Delivery",
    deliveryDate: "5th September at 2pm",
    orderItem: "Twilio Red Sneakers",
    orderNumber: 123456,
    status: "dispatched",
  },
  {
    phoneNumber: process.env.MY_PHONE_NUMBER,
    orderStatus: "Will be Dispatched Shortly",
    deliveryDate: "1st January at 2pm",
    orderItem: "Twilio Black Hoodie",
    orderNumber: 654321,
    status: "preparing",
  },
];

function getOrderByPhoneNumber(number) {
  const order = db.find((order) => order.phoneNumber === number);
  return order;
}

function getOrderByOrderNumber(number) {
  const order = db.find((order) => order.orderNumber == number);
  return order;
}

function getOrdersByStatus(status) {
  return db.filter((order) => order.status !== status);
}

exports.handler = function (context, event, callback) {
  const { phoneNumber, orderNumber, status } = event;
  let response;
  if (phoneNumber) {
    response = getOrderByPhoneNumber(phoneNumber);
  } else if (orderNumber) {
    response = getOrderByOrderNumber(orderNumber);
  } else if (status) {
    response = getOrdersByStatus(status);
  } else {
    response = null;
  }
  if (!response) {
    response = {};
  }
  callback(null, response);
};
