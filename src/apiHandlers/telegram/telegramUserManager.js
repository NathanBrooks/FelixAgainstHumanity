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
const TelegramAPI = require('./telegramAPI');
const Mutex = require('async-mutex').Mutex;

class TelegramUserManager {
    constructor() {
        this.userMap = new Map();                                               // map to store TelegramUser objects in
        this.userMutexMap = new Map();                                          // map to store mutexes to prevent concurrent edits to a single TelegramUser object    }
    }

    grabUserMutex(userID) {
        let userMutex = this.userMutexMap.get(userID);                          // see if mutex for this user exists

        if(!userMutex) {
            userMutex = new Mutex();                                            // create new mutex
            this.userMutexMap.set(userID, userMutex);                           // add mutex to map
        }

        return userMutex;                                                       // return the mutex we found/created
    }

    grabUser(userID) {
        return new Promise((resolve, reject) => {
            let user = this.userMap.get(userID);                                // see if the user already is in the map
            if(!user) {
                user = new TelegramUser(userID);                                // make new user object to store
                user.initialize().then(() => {                                  // make sure the user exists
                    this.userMap.set(userID, user);                             // add the user to the map
                    return resolve(user);
                }).catch((err) => {
                    reject(err);                                                // this will most likely hold a message if they don't have a private chat open
                });
            } else {
                return resolve(user);                                            // we found the user, return it
            }
        });
    }

    acquireUser(userID) {
        return new Promise((resolve, reject) => {
            this.grabUserMutex(userID).acquire().then((release) => {            // grab the mutex
                this.grabUser(userID).then((user) => {                          // grab the user
                    return resolve({release : release, user: user});            // pass both release mechanism and user to calling func
                }).catch((err) => {
                    reject(err);
                    return release();                                           // if grabbing user fails, make sure to release the mutex
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    sendUserMessage(fromID, userID, message) {
        return new Promise((resolve, reject) => {
            this.acquireUser(userID).then((data) => {
                data.user.addSimpleMessage(fromID, message);                    // add to message queue for user
                resolve();
                return data.release();
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    sendUserKeyboard(fromID, userID, message, payload, callback) {
        return new Promise((resolve, reject) => {
            this.acquireUser(userID).then((data) => {
                data.user.addKeyboardMessage(fromID, message,
                    payload, callback);                                         // add to message queue for user
                resolve();
                return data.release();
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}

module.exports = TelegramUserManager;
