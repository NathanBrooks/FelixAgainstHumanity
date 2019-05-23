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

class Deck {
  constructor() {
    this.active = [];
    this.discard = [];
  }

  get numCardsTotal() {
    return this.active.length + this.discard.length;
  }

  get numCardsActive() {
    return this.active.length;
  }

  get numCardsDiscarded() {
    return this.discard.length;
  }

  addCards(newCards) {
    this.active = this.active.concat(newCards);
  }

  drawCard() {
    let card = this.active.pop();
    this.discard.push(card);
    return card;
  }

  shuffleDeck() {
    for(let i = this.active.length - 1; i > 0; i--) {
      let shuffleIndex = Math.floor(Math.random() * (i +1));
      let cardTransition = this.active[i];
      this.active[i] = this.active[shuffleIndex];
      this.active[shuffleIndex] = cardTransition;
    }
  }

  refillDeck() {
    this.active = this.active.concat(this.discard);
    this.discard = [];
  }
}

module.exports = Deck;