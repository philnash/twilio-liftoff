require("dotenv").config();

const twilio = require("twilio");
const PQueue = require("p-queue").default;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const queue = new PQueue({ concurrency: 2 });

// If you want to play with how concurrency changes the behaviour of the queue
// then uncomment the below and change the queue's concurrency, the number of
// jobs you create in the loop and the length of time the jobs take (the number
// of milliseconds you pass to the sleep function).
//
// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };
//
// for (let i = 0; i < 10; i++) {
//   queue.add(async () => {
//     await sleep(2000);
//     console.log(i);
//   });
// }

const numbers = [process.env.MY_PHONE_NUMBER];

// You can listen to events on the queue. The idle event fires when the queue
// has completed all the jobs it has been given.
queue.on("idle", () => {
  console.log("all messages sent");
});

// For each number in our array, we add a function to the queue that will call
// the API client. This code is not a lot different from the original loop, but
// we can control the concurrent number of requests at any one time.
numbers.forEach((number) => {
  queue.add(() => {
    return client.messages
      .create({
        to: number,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: "Wild, unprecedented sales now on. Come spend your money!",
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));
  });
});
