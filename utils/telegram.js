const request = require("request");

const configs = require("./../config/app")

const send_telegram_msg = (bot_message, chat_id = configs['bot_chat_id']) => {
    send_text =
        "https://api.telegram.org/bot" +
        configs["bot_token"] +
        "/sendMessage?chat_id=" +
        chat_id +
        "&parse_mode=Markdown&text=" +
        bot_message;

    request(send_text, function (error, response, body) {
        if (error != undefined) {
            console.error("error:", error);
        }

        if (response && response.statusCode != 200) {
            console.log("Error - the status code is :", response.statusCode); // Print the response status code if a response was received
        }
    });
};

module.exports = send_telegram_msg;
