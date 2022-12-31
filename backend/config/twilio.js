// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC3ff6f4f62998cd1caa23e57633335125";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({ body: "Hello from Twilio", from: "+12057976836", to: "+972528511672" })
  .then(message => console.log(message.sid));