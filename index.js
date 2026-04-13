const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- CONFIGURATION ---
const token = '8715429873:AAFggIf1Y8S0e9fxA5Wo2uDf8ZbM0kV1vTw';
const genAI = new GoogleGenerativeAI("AIzaSyDpvlQjc9VJPOlp-rR8-cZtFVTImapS6oY");
// ---------------------

const bot = new TelegramBot(token, { polling: true });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        // Le bot "réfléchit" ici
        const result = await model.generateContent(text);
        const response = await result.response;
        const aiReply = response.text();

        // Le bot envoie la réponse de l'IA
        bot.sendMessage(chatId, aiReply);
    } catch (error) {
        bot.sendMessage(chatId, "Oups, mon cerveau a grillé... Réessaie !");
        console.error(error);
    }
});

console.log("Le bot IA est prêt !");