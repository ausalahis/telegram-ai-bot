const TelegramBot = require('node-telegram-bot-api');

// --- STOP! PASTE YOUR TOKEN FROM BOTFATHER BELOW ---
const token = '8715429873:AAFggIf1Y8S0e9fxA5Wo2uDf8ZbM0kV1vTw'; 
// ---------------------------------------------------

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    bot.sendMessage(chatId, 'Hello! I am your new bot. You sent: ' + text);
});

console.log("Bot is running! Go to Telegram and message it.");