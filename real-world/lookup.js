require("dotenv").config();
const PORT = process.env.PORT || "3001";
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const twilio = require("twilio");
const { MessagingResponse } = twilio.twiml;

// This endpoint responds to lookup requests using the incoming phone number
app.all("/messages", twilio.webhook(), async (req, res) => {
  const twiml = new MessagingResponse();
  const number = req.body.From;
  const order = await db.getOrderByPhoneNumber(number);

  if (order) {
    twiml.message(
      `Your order containing ${order.orderItem} is currently ${order.orderStatus} and is estimated to arrive on ${order.deliveryDate}`
    );
  } else {
    twiml.message(
      "We could not find your order. Check online at twilioshoes.com"
    );
  }

  res.contentType("application/xml");
  res.send(twiml.toString());
});

// This endpoint responds to lookup requests using the body of the request as
// the order number
app.all("/orderNumber", async (req, res) => {
  const twiml = new MessagingResponse();
  const number = req.body.Body;
  const order = await db.getOrderByOrderNumber(number);

  if (order) {
    twiml.message(
      `Your order containing ${order.orderItem} is currently ${order.orderStatus} and is estimated to arrive on ${order.deliveryDate}`
    );
  } else {
    twiml.message(
      "We could not find an order with that order number, please try again."
    );
  }

  res.contentType("application/xml");
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Application started at http://localhost:${PORT}`);
});
