<h1 align="center">🚀 Twilio Liftoff: Scale 🚀</h1>

This directory has all the example code from the Twilio Liftoff Scale webinar.

## Running the examples:

To run the server or the script to make calls, you will need [Node.js](https://nodejs.org/en/) installed. In this directory, run:

```bash
npm install
```

Copy the `.env.example` to `.env` and fill in each of the variables with details from your Twilio account.

Follow these instructions to run each example:

### 1. Sending multiple messages

The first example is the naiive implementation of a loop to send messages to multiple numbers. Make sure you have set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` and `MY_PHONE_NUMBER` in `.env`.

Run the example with:

```bash
node 01-send-multiple.js
```

If you were to use this to send more than 100 messages you would start receiving 429 errors. To overcome this, let's look at an in memory queue.

### 2. Using a queue to control concurrency

In this example we use [p-queue](https://www.npmjs.com/package/p-queue) to control the concurrency. If you want to play with the concurrency rate without sending messages, try uncommenting the code that replaces API requests with a 2 second sleep.

Run this example with:

```bash
node 02-send-with-queue.js
```

### 3. Using a status callback to record when a message was delivered

In the third example we expand upon our example in which we want to record when a message is delivered. Rather than make more API requests to poll for the status of messages, we set up to receive [status callback webhooks](https://www.twilio.com/docs/usage/webhooks/sms-webhooks#type-2-status-callbacks).

In order to receive webhooks when developing locally, you will need a tunnel. [I recommend using ngrok](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html), you can [download and install it from ngrok.com](https://ngrok.com/). Then open a new tunnel by running the following command in the terminal:

```bash
ngrok http 3000
```

In the program output you will see the ngrok URL that now tunnels through to your machine. Grab that URL and enter it into `.env` as the `NGROK_URL`.

To receive the webhooks, we will need a server. The file `03-status-callbacks.js` implements an Express server that receives webhooks at the `/status-callback` path. Run this server by entering the following command in the terminal:

```bash
node 03-status-callbacks.js
```

With ngrok and the server in place, we can now send messages and see the status updates that are sent to our application. Run the example with:

```bash
node 03-send-with-status-callbacks.js
```

You should receive the message on your phone, but also see webhook events as the message is "sent" and then "delivered".

Keep the status callback server and ngrok running as you will get status callback events for the following examples too.

### 4. Using a Messaging Service to send messages

Rather than relying on a single number to send messages, a [Messaging Service](https://www.twilio.com/console/sms/services) can control a pool of numbers and spread the messages out among them. Messaging services have a number of other features that make them really useful.

Go to the [Twilio Console and create a new Messaging Service](https://www.twilio.com/console/sms/services) for yourself. Add your Twilio phone number to the Messaging Service's Sender Pool. Copy the Messaging Service SID and enter it in the `.env` file.

Now run the example with:

```bash
node 04-send-with-messaging-service.js
```

### 5. Using Twilio Notify to bulk send messages

If you have one message you want to send to many phone numbers, [Twilio Notify](https://www.twilio.com/notify) can do that with one API request. Notify also handles sending push notifications, but for this example we will focus on SMS.

Open the [Twilio console to the Notify settings](https://www.twilio.com/console/notify/getting-started) and create a new Notify service. In the config, set the Messaging Service to the service you created for example 4 above and save.

Grab the Notify Service Sid and enter it in the `.env` file. Now you can send messages with Notify by running:

```bash
node 05-send-with-notify.js
```

### 6. Using a background queue

If you are making many API requests and you don't want to risk an in memory queue, you can use a background queue instead. This will require storage so that jobs can be stored and retrieved. In this example we use [BullMQ](https://github.com/taskforcesh/bullmq) as the queue. BullMQ stores jobs in [Redis](https://redis.io/). To run this next example you will need Redis installed. [Follow these instructions to install and run Redis](https://redis.io/topics/quickstart).

Once Redis is installed and running you can start your worker. The worker will wait for jobs to be added to the queue.

```bash
node 06-queue-worker.js
```

Once the worker is running, you can add jobs to the queue by running:

```bash
node 06-send-with-background-queue.js
```
