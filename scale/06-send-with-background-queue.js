require("dotenv").config();

// Here we use a BullMQ message queue to store jobs and a worker to process them
const { Queue, QueueEvents } = require("bullmq");
const queue = new Queue("messages");
const queueEvents = new QueueEvents("messages");

// The queue emits events.
queue.on("waiting", (job) => {
  console.log("processing " + job.id);
});

// You can also listen to events on the whole queue, this will close the script
// down once all the jobs have been dispatched.
queueEvents.on("drained", () => {
  console.log("Done!");
  process.exit();
});

const numbers = [process.env.MY_PHONE_NUMBER];

// For each number in our array, we create a job in the queue with all the
// information needed to send the message.
numbers.forEach(async (number) => {
  await queue.add("message", {
    to: number,
    from: process.env.TWILIO_MESSAGING_SERVICE_SID,
    body: "Wild, unprecedented sales now on. Come spend your money!",
    statusCallback: `${process.env.NGROK_URL}/status-callback`,
  });
});
