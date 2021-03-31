const got = require("got");

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const twilioNumber = context.TWILIO_NUMBER;
  const status = "dispatched";

  // Fetch orders from the API
  const orders = await got(
    context.DOMAIN_NAME.startsWith("localhost")
      ? "http://localhost:3000/shoes"
      : `https://${context.DOMAIN_NAME}/shoes`,
    {
      searchParams: { status },
      responseType: "json",
    }
  );

  await Promise.all(
    orders.body.map((order) => {
      return client.messages.create({
        from: twilioNumber,
        to: order.phoneNumber,
        body: `Your order ${order.orderNumber} for ${order.orderItem} has been dispatched. Look out for it being delivered today!`,
      });
    })
  );

  callback(null, "Sent");
};
