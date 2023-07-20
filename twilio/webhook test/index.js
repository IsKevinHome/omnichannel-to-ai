const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // You can change the port number if needed

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Route to handle the incoming webhook
app.post("/webhook", (req, res) => {
    // Process the webhook payload here
    console.log("Webhook received:", req.body);

    // Respond to the webhook sender with a success status (optional)
    res.status(200).send("Webhook received successfully");
});

// Start the server
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

// use ngrok if you need a public URL
