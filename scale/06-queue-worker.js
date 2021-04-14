require("dotenv").config();
const { Worker } = require("bullmq");
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// This worker receives the data needed to send an SMS message and dispatches
// the message via the API.
const worker = new Worker("messages", async (job) => {
  await client.messages
    .create(job.data)
    .then((message) => console.log(message.sid))
    .catch((err) => console.error(err));
});
