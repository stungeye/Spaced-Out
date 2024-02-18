const Config = Object.freeze({
  [Sfx.Correct]: "assets/correct2.wav",
  [Sfx.Incorrect]: "assets/incorrect2.wav",
  [Sfx.Delete]: "assets/minimize_006.ogg",
  [Sfx.Click]: "assets/pop_drip.wav",
});

// incorrect2.wav and correct2.wav are from:
// https://www.tonedock.com/samplepacks/8djxfdl

// pop_drip.wav is from:
// https://rcptones.com/dev_tones/

// minimize_006.ogg and click_002.ogg are from:
// https://www.kenney.nl/assets/interface-sounds

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
