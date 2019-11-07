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

const playerModel = require('../models/playerModel');

function findPlayerByPlayerID(playerID) {
  return playerModel.findOne({player_id : playerID})
    .exec();
}

function createPlayer(playerID) {
  return new Promise((resolve, reject) => {
    findPlayerByPlayerID(playerID).then((playerObject) => {
      if(!playerObject) {
        var newPlayer = new playerModel();

        newPlayer.player_id = playerID;

        newPlayer.save()
          .then(() => {
            return resolve();
          }).catch((err) => {
            return reject(err);
          });
      } else {
        return reject(`You already exist!`);
      }
    });
  });
}

function deletePlayer(playerID) {
  return playerModel.findOne({player_id : playerID})
    .remove()
    .exec();
}

module.exports = {
  createPlayer : createPlayer
}