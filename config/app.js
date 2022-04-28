require("dotenv").config();

module.exports = {
    //Enable this to receive message
    //everytime when this program run
    debug: process.env.APP_DEBUG,

    //Run crawler with headless
    is_headless: {
        headless: true,
    },

    // telegram bot_token
    bot_token: process.env.BOT_TOKEN,

    // telegram chat_id
    bot_chat_id: process.env.BOT_CHAT_ID,
};