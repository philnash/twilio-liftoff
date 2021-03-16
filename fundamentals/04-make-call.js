const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const twilioNumber = process.env.TWILIO_NUMBER;

twilio.messages.list({ to: twilioNumber }).then((messages) => {
  Array.from(new Set(messages.map((message) => message.From))).forEach(
    (number) => {
      twilio.calls
        .create({
          from: twilioNumber,
          to: number,
          url: "https://SUBDOMAIN.ngrok.io/voice",
        })
        .then((call) => {
          console.log(`Created call ${call.sid}`);
        });
    }
  );
});
