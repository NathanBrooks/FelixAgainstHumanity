
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

require('dotenv').config();

const TelegramUserManager = require('./src/apiHandlers/telegram/telegramUserManager');

let UserManager = new TelegramUserManager();

UserManager.sendUserMessage(9999, 1, "hello!");
UserManager.sendUserMessage(9999, 1, "message2!");
UserManager.sendUserMessage(9999, 2, "message3!");
UserManager.sendUserMessage(9999, 4, "message4!");
