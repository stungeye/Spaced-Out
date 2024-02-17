// Uses p5.touchgui library to create an on screen numeric keypad with a clear and submit button.
// Callback can be attached to the submit button and any value change. Callbacks are provided with the current value.
class NumPad {
  constructor(x, y, w, h, changeCallback, submitCallback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.submitCallback = submitCallback;
    this.changeCallback = changeCallback;
    this.value = "";
    this.buttons = this.createButtons(3, 4);
  }

  updateDimensions(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.buttons = this.createButtons(3, 4);
  }

  draw() {
    // Draw the keypad background
    push();
    fill(255);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);

    // Draw the buttons
    this.buttons.forEach((button) => {
      button.draw();
    });
    pop();
  }

  // Creates the buttons for the keypad.
  // Each button is a number, the clear button, or the submit button.
  createButtons(cols, rows, layout = "ascending") {
    // Padding between buttons and on all sides.
    let buttonPadding = min(this.w * 0.03, this.h * 0.03);
    let buttonWidth = (this.w - buttonPadding * (cols + 1)) / cols;
    let buttonHeight = (this.h - buttonPadding * (rows + 1)) / rows;

    let buttonX = this.x + buttonPadding;
    let buttonY = this.y + buttonPadding;

    let buttonFontSize = buttonHeight * 0.5;

    let labels;
    if (layout === "classic") {
      labels = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "❎", "✅"];
    } else {
      labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "❎", "0", "✅"];
    }

    let buttons = [];
    for (let i = 1; i <= labels.length; i++) {
      buttons.push(
        createButton(labels[i - 1], buttonX, buttonY, buttonWidth, buttonHeight)
      );

      buttonX += buttonWidth + buttonPadding;
      if (i % cols == 0) {
        buttonX = this.x + buttonPadding;
        buttonY += buttonHeight + buttonPadding;
      }
    }

    // Add styles and callbacks to the button.
    for (const button of buttons) {
      // Is this a numberic button?
      if (!isNaN(parseInt(button.label))) {
        button.setStyle({
          textSize: buttonFontSize,
        });

        button.onPress = () => {
          this.buttonCallback(button.label);
        };
      } else {
        // This is the clear or submit button.
        button.setStyle({
          textSize: buttonFontSize * 0.9,
        });

        if (button.label === "✅" && this.submitCallback) {
          button.onPress = () => {
            this.submitCallback(this.numbericValue());
          };
        } else if (button.label === "❎") {
          button.onPress = () => {
            this.value = "";
            if (this.changeCallback) {
              this.changeCallback(this.numbericValue());
            }
          };
        }
      }
    }

    return buttons;
  }

  // Callback to add each button's value to the this.value string.
  buttonCallback(value) {
    this.value += value;

    if (this.changeCallback) {
      this.changeCallback(this.numbericValue());
    }
  }

  // Returns the current value in a maybe-hash format.
  numbericValue() {
    let value = parseInt(this.value);

    if (!isNaN(value)) {
      return { hasValue: true, value: value };
    }

    return { hasValue: false };
  }
}
