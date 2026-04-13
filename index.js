const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- CONFIGURATION ---
const token = 'TON_TOKEN_TELEGRAM_ICI';
const genAI = new GoogleGenerativeAI("TA_CLE_API_GEMINI_ICI");
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