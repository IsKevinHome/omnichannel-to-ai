const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const session = require("express-session");

require("dotenv").config();

const app = express();
const port = 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "juniper",
    })
);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    // If the 'conversation' key doesn't exist in this session, create one.
    req.session.conversation = req.session.conversation || [{ role: "system", content: "You are a helpful assistant." }];

    // if (!req.session.conversation) {
    //     req.session.conversation = [{ role: "system", content: "You are a helpful assistant." }];
    // }

    // Add the new message to the conversation array in the session
    req.session.conversation.push({ role: "user", content: message });

    //GPT
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        temperature: 0.9,
        messages: req.session.conversation,
    });
    //GPT

    const chatResponse = completion.data.choices[0].message;
    req.session.conversation.push(chatResponse);

    console.log(req.session.conversation);
    res.send(chatResponse);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
