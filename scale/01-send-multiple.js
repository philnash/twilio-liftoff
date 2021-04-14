require("dotenv").config();

const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// OK, sure, this says we'll send multiple messages, but really we'll use an
// array with one entry to simulate it.
const numbers = [process.env.MY_PHONE_NUMBER];

// For each number in our array, we use the API client to send a message.
numbers.forEach((number) => {
  client.messages
    .create({
      to: number,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: "Wild, unprecedented sales now on. Come spend your money!",
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.error(err));
});
