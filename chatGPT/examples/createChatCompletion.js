const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        temperature: 0.7,
        messages: [
            { role: "system", content: "You are a helpful mentor." },
            { role: "user", content: "What's beautiful?" },
        ],
    });
    console.log(completion.data.choices[0].message);
})();
