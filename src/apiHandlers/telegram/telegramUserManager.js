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

const TelegramUser = require('./telegramUser');
const Mutex = require('async-mutex').Mutex;

class TelegramUserManager {
    constructor() {
        this.userMap = new Map();
        this.userMutexMap = new Map();
    }

    grabUserMutex(userID) {
        let userMutex = this.userMutexMap.get(userID);

        if(!userMutex) {
            userMutex = new Mutex();
            this.userMutexMap.set(userID, userMutex);
        }

        return userMutex;
    }

    grabUser(userID) {
        return new Promise((accept, reject) => {
            let user = this.userMap.get(userID);
            if(!user) {
                user = new TelegramUser(userID);
                user.initialize().then(() => {
                    this.userMap.set(userID, user);
                    return accept(user);
                }).catch((err) => {
                    reject(err);
                });
            } else {
                return accept(user);
            }
        });
    }

    sendUserMessage(fromID, userID, message) {
        return new Promise((accept, reject) => {
            this.grabUserMutex().acquire().then((release) => {
                this.grabUser(userID).then((user) => {
                    user.addSimpleMessage(fromID, message);
                    return release();
                }).catch((err) => {
                    reject(err);
                    return release();
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}

module.exports = TelegramUserManager;
