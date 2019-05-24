/*
 * Copyright 2018 Nathan Tyler Brooks
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

console.log('initializing telegraf');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
bot.launch();

bot.use((ctx, next) => {
  console.log(ctx.message);
  next();
});

class KeyboardButton {
  constructor(text) {
    this.text = text;
  }
}

class ReplyKeyboadMarkup {
  constructor(keyboardItems) {
    this.keyboard = [];
    this.one_time_keyboard = true;
    for(var key in keyboardItems) {
      this.keyboard.push([new KeyboardButton(keyboardItems[key])]);
    }
  }
}

function sendKeyboard(chatID, message, keys) {
  return bot.telegram.sendMessage(chatID, message,
    { reply_markup: JSON.stringify(new ReplyKeyboadMarkup(keys)) } );
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
  sendKeyboard : sendKeyboard,
  sendMessage : bot.telegram.sendMessage,
  registerCommand: registerCommand
};
