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

const gameModel = require('../models/gameModel');

var gameController = {
  findGameByChatID: (chatID) => {
    return gameModel.findOne({chat_id : chatID})
      .exec();
  },

  createGame: (chatID, adminObjectID) => {
    return new Promise((resolve, reject) => {
      findGameByChatID(chatID).then((gameObject) => {
        if(!gameObject) {
          var newGame = new gameModel();

          newGame.chat_id = chatID;
          newGame.admin = adminObjectID;
          newGame.player_list.push(adminObjectID);
          newGame.game_active = false;

          newGame.save()
            .then(() => {
              return resolve();
            }).catch((err) => {
              return reject(err);
            });
        } else {
          reject(`Game already exists!`);
        }
      });
    });
  },

  deleteGame: (chatID, userObjectID) => {
    return gameModel.findOne({chat_id : chatID, admin : userObjectID })
      .remove()
      .exec();
  },

  addUserToGame: (chatId, userObjectID) => {
    return new Promise((resolve, reject) => {
      findGameByChatID(chatID).then((gameObject) => {
        if(!gameObject) {
          return reject(`Game does not exist!`);
        }

        gameObject.player_list.push(userObjectID);

        gameObject.save()
          .then(() => {
            return resolve();
          }).catch((err) => {
            return reject(err);
          });
      });
    });
  },

  setAdmin: (chatID, userObjectID, newAdminID) => {
    return new Promise((resolve, reject) => {
      findGameByChatID(chatID).then((gameObject) => {
        if(!gameObject) {
          return reject(`Game does not exist!`);
        }
        if(gameObject.admin == userObjectID) {
          gameObject.admin = newAdminID;
        } else {
          return reject(`Only the admin can change the games admin!`);
        }


        gameObject.save()
          .then(() => {
            return resolve();
          }).catch((err) => {
            return reject(err);
          });
      });
    });
  }
}

module.exports = gameController;
