const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

// In this endpoint we receive status callback requests and log the results.
// You could do more with this, including storing when a message was delivered,
// or reacting to any delivery errors.
app.post("/status-callback", (req, res) => {
  const { MessageStatus, MessageSid } = req.body;
  console.log(`${MessageSid}: ${MessageStatus}`);
  res.contentType("application/xml");
  res.send("<Response/>");
});

const port = process.env.PORT || "3000";
app.listen(port, () =>
  console.log("Application has started on http://localhost:3000")
);
