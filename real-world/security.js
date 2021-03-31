const twilio = require("twilio");
const express = require("express");
const PORT = process.env.PORT || "3001";

const app = express();
app.use(express.urlencoded({ extended: false }));

// This endpoint manually collects the data you need to validate a request.
// You get:
//  - the Twilio Auth Token, in this case from the environment
//  - the X-Twilio-Signature header from the request
//  - the URL the request was made to (be careful with this URL when using
//    tunnelling software locally, you need to make sure the protocol and host
//    all match up)
//  - the parameters of the request from the body
// then pass them to `twilio.validateRequest`.
app.all("/messages", (req, res) => {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const signature = req.headers["x-twilio-signature"];
  const url = "{YOUR_APPLICATION_URL}";
  const params = req.body;
  if (twilio.validateRequest(authToken, signature, url, params)) {
    res.contentType("application/xml");
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(
      "Thanks for watching the webinar! Use the promo code LIFTOFF2021APAC1 to get $20 of free credit."
    );
    res.send(twiml.toString());
  } else {
    res.status(401).send("DENIED");
  }
});

// Alternatively, for Express you can use the `twilio.webhook` helper function.
app.all("/messages2", twilio.webhook(), (req, res) => {
  res.contentType("application/xml");
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(
    "Thanks for watching the webinar! Use the promo code {YOU_NEED_TO_WATCH_THE_WEBINAR} to get $20 of free credit."
  );
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Application started at http://localhost:${PORT}`);
});
