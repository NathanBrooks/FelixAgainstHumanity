/*
 * Copyright 2019 Nathan Tyler Brooks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Telegraf = require('telegraf');
const TelegramMessageRequest = require('./structures/telegramMessageRequest');
const ReplyMarkupKeyboard = require('./structures/replyMarkupKeyboard');

console.log('initializing telegraf...');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);                         // get the api key to initialize bot
bot.launch();                                                                   // start the bot

bot.use((context, next) => {                                                        // debug middleware
    //console.log(context.message);
    next();
});

function sendSimpleMessage(messageRequest) {
    if(messageRequest == null) return;

    return bot.telegram.sendMessage(messageRequest.toID,
        messageRequest.message);
}

function sendKeyboardMessage(messageRequest) {
    if(messageRequst == null) return;

    return bot.telegram.sendMessage(messageRequest.toID,
        messageRequest.message,
        { reply_markup:
            JSON.stringify(new ReplyMarkupKeyboard(messageRequest.payload))
        }
    );
}

class TelegramAPIHandler {
    checkForPrivateChat(userID) {
        return new Promise((resolve, reject) => {
            bot.telegram.sendMessage(userID, `Check for user existence...`)     // see if we can send them a message...
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject('Could not message user: ' + err.toString());        // we could not get to the user's privat messages, they need to message us first.
                });
        });
    }

    sendTelegramMessageRequest(messageRequest) {
        if(messageRequest == null) return;

        switch(messageRequest.type) {
            case TelegramMessageRequest.requestTypes.SimpleMessage:
            case TelegramMessageRequest.requestTypes.GenericMessage:
                sendSimpleMessage(messageRequest);
                break;
            case TelegramMessageRequest.requestTypes.KeyboardMessage:
                sendKeyboardMessage(messageRequest);
                break;
            default:
                console.log('Unsupported message type: ' + messageRequest);
        }
    }
}

/* debug and test commands */

bot.command('keyboard', (ctx) => {
  sendKeyboard(ctx.message.chat.id,
    `have a keyboard`, [`thanks`, `aww you shouldn't have`,
      `why would you do this to me`]);
});

bot.command('test', (context) => {
  context.reply(`Attempting to communicate with user...`);

  context.telegram.sendMessage(context.message.from.id, `test`).then(() => {
    context.reply(`success!!!`);
  }).catch((err) => {
    context.reply(err.toString());
  });
});

module.exports = {
  bot : bot,
  TelegramAPIHandler : new TelegramAPIHandler()
};
