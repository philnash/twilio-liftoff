require("dotenv").config();

const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const numbers = [process.env.MY_PHONE_NUMBER];

// In this example, we create bindings on the fly. You could also create
// bindings with the Notify API and then create a notification for all your
// bindings.
const bindings = numbers.map((number) =>
  JSON.stringify({ binding_type: "sms", address: number })
);

// Get our Notify service
const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

// We no longer need to loop through our numbers, we provide them as bindings to
// Notify and the Notify service will handle sending the messages with the
// Messaging Service.
service.notifications
  .create({
    toBinding: bindings,
    body: "Wild, unprecedented sales now on. Come spend your money!",
    sms: { status_callback: `${process.env.NGROK_URL}/status-callback` },
  })
  .then((notification) => console.log(notification.sid))
  .catch((err) => console.error(err));
