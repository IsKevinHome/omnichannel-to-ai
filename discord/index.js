require("dotenv").config();
// Discord
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
//OpenAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
    try {
        if (message.author.bot) return;

        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message.content,
            max_tokens: 100,
            temperature: 0,
        });
        message.reply(`${gptResponse.data.choices[0].text}`);
        // console.log(message.content);
        // message.reply(`You said: ${message.content}`);
    } catch (err) {
        console.log(err);
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT bot is online and in discord");
