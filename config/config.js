const Config = Object.freeze({
  [Sfx.Correct]: "assets/correct.mp3",
  [Sfx.Incorrect]: "assets/incorrect.mp3",
});

function generateMultiplicationDeck(n) {
  let newDeck = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      newDeck.push({
        question: `${i} x ${j}`,
        answer: i * j,
      });
    }
  }
  return shuffle(newDeck);
}
