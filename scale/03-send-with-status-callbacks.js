require("dotenv").config();

const twilio = require("twilio");
const PQueue = require("p-queue").default;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const queue = new PQueue({ concurrency: 2 });

const numbers = [process.env.MY_PHONE_NUMBER];

queue.on("idle", () => {
  console.log("all messages sent");
});

// This time we add URL for status callback webhooks. Make sure you also run
// the web server in 03-status-callbacks.js so you can receive the webhooks.
numbers.forEach((number) => {
  queue.add(() => {
    return client.messages
      .create({
        to: number,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: "Wild, unprecedented sales now on. Come spend your money!",
        statusCallback: `${process.env.NGROK_URL}/status-callback`,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));
  });
});
