// Run this as it's own file and not index.js
const http = require("http");
const express = require("express");
const session = require("express-session");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
const port = 3000;

app.use(
    session({
        secret: "llama",
        resave: false,
        saveUninitialized: true,
        cookie: {},
    })
);

app.get("/", (req, res) => {
    res.send("hello world");
});
app.post("/sms", (req, res) => {
    const smsCount = req.session.counter || 0;

    let message = "Hello, thanks for the new message.";

    if (smsCount > 0) {
        message = "Hello, thanks for message number " + (smsCount + 1);
    }

    req.session.counter = smsCount + 1;

    const twiml = new MessagingResponse();
    twiml.message(message);

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
