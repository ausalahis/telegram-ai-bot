const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');

// --- CONFIGURATION ---
// REMPLACE BIEN LA CLÉ CI-DESSOUS PAR UNE TOUTE NOUVELLE
const token = '8715429873:AAFggIf1Y8S0e9fxA5Wo2uDf8ZbM0kV1vTw';
const genAI = new GoogleGenerativeAI("AIzaSyB5fpfNWZOxRPnGJU4hr82hn3LbJwGoWNU"); 
// ---------------------

// 1. Démarrer Express pour Render (Le "Leurre")
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000, () => {
    console.log("Serveur Express lancé sur le port " + (process.env.PORT || 3000));
});

// 2. Configuration Gemini
const bot = new TelegramBot(token, { polling: true });
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 3. Logique du Bot
bot.on('message', async (msg) => {
    if (!msg.text) return; // Ignore si ce n'est pas du texte (photo, sticker...)
    
    const chatId = msg.chat.id;
    const text = msg.text;

    try {
        const result = await model.generateContent(text);
        const response = await result.response;
        const aiReply = response.text();

        bot.sendMessage(chatId, aiReply);
    } catch (error) {
        console.error("ERREUR GEMINI :", error);
        bot.sendMessage(chatId, "Oups, mon cerveau a grillé... (Vérifie ta clé API)");
    }
});

console.log("Le bot IA est prêt !");