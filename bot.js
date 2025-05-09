require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Keywords and their responses (case-insensitive)
const keywords = [
  { keyword: /hello|hi/i, reply: "Hello there!" },
  { keyword: /السلام عليكم/i, reply: "وعليكم السلام ورحمة الله وبركاته" },
  { keyword: /bye|goodbye/i, reply: "See you soon!" },
  { keyword: /how/i, reply: "fine!" },
];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";
  const fromUser = msg.from;

  // Ignore messages from bots (including itself)
  if (fromUser.is_bot) return;

  // Check for keyword matches
  for (let k of keywords) {
    if (k.keyword.test(text)) {
      bot.sendMessage(chatId, k.reply, {
        reply_to_message_id: msg.message_id, // reply directly to the user's message
      });
      break;
    }
  }
});
