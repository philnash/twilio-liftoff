<h1 align="center">🚀 Twilio Liftoff: Fundamentals 🚀</h1>

This directory has all the example code from the Twilio Liftoff Fundamentals webinar.

You can use the TwiML in `01-messaging-twiml.xml` and `02-voice-twiml.xml` in a TwiML Bin in your Twilio console.

To run the server or the script to make calls, you will need [Node.js](https://nodejs.org/en/) installed. In this directory, run:

```bash
npm install
```

Either add your credentials and Twilio number to the code or set the environment variables `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_NUMBER`. Then run the server with:

```bash
npm start
```

You can run the `04-make-calls.js` script with:

```bash
node 04-make-calls.js
```