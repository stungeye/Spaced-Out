let gui;
let value = "?";
let isMobile;
let currentOrientation;
let numPad;
let preloadedSounds;
let flashCardDeck;
let sessionDeck;
let soundManager;
const localStoreKey = "spaced-out-deck";

function preload() {
  // Loop through the Sfx enum and preload the sounds into an object.
  preloadedSounds = Object.keys(Sfx).reduce((acc, key) => {
    const sound = loadSound(Config[Sfx[key]]);
    sound.setVolume(0.5); // Prevent clipping on mobile? Maybe?
    return { ...acc, [Sfx[key]]: sound };
  }, {});
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  isMobile = deviceOrientation !== undefined;
  currentOrientation = deviceOrientation;

  soundManager = new SoundManager(preloadedSounds);

  let storedDeck =
    localStorage.getItem(localStoreKey) ?? generateMultiplicationDeck(8);

  let params = getURLParams();

  if (params.clear) {
    localStorage.removeItem(localStoreKey);
    storedDeck = generateMultiplicationDeck(8);
  }

  flashCardDeck = new FlashCardDeck(storedDeck, soundManager, (json) => {
    localStorage.setItem(localStoreKey, json);
  });

  gui = createGui();
  numPad = new NumPad(
    0,
    windowHeight / 2,
    windowWidth,
    windowHeight / 2,
    soundManager,
    (valueHash) => {
      if (valueHash.hasValue) {
        value = valueHash.value;
      } else {
        value = "?";
      }
    },
    (valueHash) => {
      if (valueHash.hasValue) {
        flashCardDeck.updateCard(sessionDeck[0].question, valueHash.value);
      }
    }
  );
}

function draw() {
  sessionDeck = flashCardDeck.getSessionCards();

  background(250);

  flashCardDeck.drawDebugInfo(0, 30, width, height);
  textAlign(CENTER, CENTER);
  textSize(50);
  if (sessionDeck.length === 0) {
    text("No cards left!", width / 2, height / 8);
  } else {
    text(sessionDeck[0].question, width / 2, height / 8);
  }
  textSize(100);
  text(value, width / 2, height / 3);

  numPad.draw();

  if (isMobile && currentOrientation !== deviceOrientation) {
    currentOrientation = deviceOrientation;
    windowResized();
  }
}

// Prevent touch issues with mobile.
function touchMoved() {
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (numPad) {
    numPad.updateDimensions(0, windowHeight / 2, windowWidth, windowHeight / 2);
  }
  // slider.updateDimension(0,  windowHeight - 160, windowWidth, 40, windowWidth * 0.03);
}
