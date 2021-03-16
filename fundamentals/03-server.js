const twilio = require("twilio");

const express = require("express");
const PORT = process.env.PORT || "3000";

const app = express();
app.use(express.urlencoded({ extended: false }));

// Basic "Hello, World!" route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// .all means we can make GET and POST requests to this endpoint
app.all("/messages", (req, res) => {
  res.contentType("application/xml");
  res.send(`
    <Response>
      <Message>Thanks for watching the webinar! Use the promo code {YOU_NEED_TO_WATCH_THE_WEBINAR} to get $20 of free credit.</Message>
    </Response>
  `);
});

app.all("/dynamic-messages", (req, res) => {
  res.contentType("application/xml");
  const twiml = new twilio.twiml.MessagingResponse();
  const name = req.body.Body;
  twiml.message(`Hi ${name}, thanks for coming to the webinar!`);
  res.send(twiml.toString());
});

app.all("/voice", (req, res) => {
  res.contentType("application/xml");
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Thanks for coming to the webinar!");
  twiml.play("https://phil.twil.io/assets/song.mp3");
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Application started at http://localhost:${PORT}`);
});
