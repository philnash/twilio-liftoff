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

// In this case we use a Twilio Messaging Service instead of a single number
// from which to send the messages.
numbers.forEach((number) => {
  queue.add(() => {
    return client.messages
      .create({
        to: number,
        from: process.env.TWILIO_MESSAGING_SERVICE_SID,
        body: "Wild, unprecedented sales now on. Come spend your money!",
        statusCallback: `${process.env.NGROK_URL}/status-callback`,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));
  });
});
