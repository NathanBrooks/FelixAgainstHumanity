const Deck = require('./deck');

test('create an empty deck', () => {
  let testDeck = new Deck();
  expect(testDeck.numCardsTotal).toBe(0);
});

test('add a card to a deck', () => {
  let testDeck = new Deck();
  testDeck.addCards([1,2,3,4,5]);
  expect(testDeck.numCardsTotal).toBe(5);
  expect(testDeck.numCardsActive).toBe(5);
  expect(testDeck.numCardsDiscarded).toBe(0);
  expect(testDeck.active).toEqual([1,2,3,4,5]);
});

test('draw a card and discard it', () => {
  let testDeck = new Deck();
  testDeck.addCards([1,2,3,4,5]);
  expect(testDeck.drawCard()).toBe(5);
  expect(testDeck.numCardsActive).toBe(4);
  expect(testDeck.numCardsDiscarded).toBe(1);
});

test('shuffle a deck', () => {
  let testDeck = new Deck();
  testDeck.addCards([1,2,3,4,5]);
  testDeck.shuffleDeck();
  expect(testDeck.numCardsActive).toBe(5);
  expect(testDeck.numCardsDiscarded).toBe(0);
  expect(testDeck.active).not.toEqual([1,2,3,4,5]);
});