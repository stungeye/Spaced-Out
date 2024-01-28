let gui;
let slider;
let value = 0;
let isMobile;
let currentOrientation;

function setup() {
  createCanvas(windowWidth, windowHeight);
  isMobile = deviceOrientation !== undefined;
  currentOrientation = deviceOrientation;

  gui = createGui();
  slider = new Slider(
    0,
    height - 160,
    width,
    40,
    width * 0.03,
    0,
    9,
    32,
    (value) => {
      console.log(`Submit: ${value}`);
    },
    (v) => {
      value = v;
    }
  );
}


function draw() {
  background(250);
  slider.draw();
  textSize(100);
  textAlign(CENTER, CENTER);
  text(value, width / 2, height / 2);

  if (isMobile && currentOrientation !== deviceOrientation) {
    currentOrientation = deviceOrientation;
    windowResized();
  }
}

function touchMoved() {
  // do some stuff
  return false;
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  slider.updateDimension(0,  windowHeight - 160, windowWidth, 40, windowWidth * 0.03);
}
