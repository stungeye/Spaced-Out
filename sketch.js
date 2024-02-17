let gui;
let value = 0;
let isMobile;
let currentOrientation;
let numPad;
let preloadedSounds;

function preload() {
  // Loop through the Sfx enum and preload the sounds.
  preloadedSounds = Object.keys(Sfx).reduce((acc, key) => {
    const sound = loadSound(Config[Sfx[key]]);
    return { ...acc, [Sfx[key]]: sound };
  }, {});
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  isMobile = deviceOrientation !== undefined;
  currentOrientation = deviceOrientation;

  gui = createGui();
  numPad = new NumPad(
    0,
    windowHeight / 2,
    windowWidth,
    windowHeight / 2,
    (valueHash) => {
      if (valueHash.hasValue) {
        value = valueHash.value;
      } else {
        value = "?";
      }
    },
    (value) => {
      console.log(value);
    }
  );
}

function draw() {
  background(250);
  textSize(100);
  textAlign(CENTER, CENTER);
  text(value, width / 2, height / 4);

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
  numPad.updateDimensions(0, windowHeight / 2, windowWidth, windowHeight / 2);
  // slider.updateDimension(0,  windowHeight - 160, windowWidth, 40, windowWidth * 0.03);
}
