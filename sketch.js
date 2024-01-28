let gui;
let value = 0;
let isMobile;
let currentOrientation;
let numPad;

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
  // slider.updateDimension(0,  windowHeight - 160, windowWidth, 40, windowWidth * 0.03);
}
