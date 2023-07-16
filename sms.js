const accountSid = "AC4ff0df1574f7138662e8367c2cbd2e08";
const authToken = "1289615efaef36f85ffa741b49dc45a3";
const client = require("twilio")(accountSid, authToken);

client.messages
    .create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        from: "+18668089810",
        to: "+13102277697",
    })
    .then((message) => console.log(message));
