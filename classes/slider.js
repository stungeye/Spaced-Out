// Uses p5.touchgui library to create a slider and a submit button.
// The slider has a hidden "correct value" and a range of acceptable values.
// A callback can be attached to the submit button which will be provided with the selected slider value.
class Slider {
  constructor(
    x,
    y,
    w,
    h,
    padding,
    min,
    max,
    fontSize,
    changeCallback,
    submitCallback
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.padding = padding;
    this.min = min;
    this.max = max;
    this.textSize = fontSize;
    this.submitCallback = submitCallback;
    this.changeCallback = changeCallback;

    textSize(this.textSize);
    this.leftTextSize = textWidth(`${this.min}`);
    this.rightTextSize = textWidth(`${this.max}`);

    this.slider = createSlider(
      "Slider",
      x + this.leftTextSize + this.padding * 2,
      y,
      w - (this.rightTextSize + this.leftTextSize + this.padding * 4),
      h,
      min,
      max
    );
    this.slider.isInteger = true;
    this.slider.val = min;
    this.current = min;
    this.slider.onChange = () => {
      if (this.slider.val != this.current) {
        this.current = this.slider.val;
        if (changeCallback) {
          this.changeCallback(this.slider.val);
        }
      }
    };

    this.button = createButton(
      "Submit",
      x + this.padding,
      y + h + 20,
      w - this.padding * 2,
      h * 2
    );
    this.button.onPress = () => {
      if (this.submitCallback) {
        this.submitCallback(this.slider.val);
      }
    };
  }

  updateDimension(x, y, w, h, padding) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.padding = padding;

    this.slider.x = x + this.leftTextSize + this.padding * 2;
    this.slider.y = y;
    this.slider.w =
      w - (this.rightTextSize + this.leftTextSize + this.padding * 4);
    this.slider.h = h;

    this.button.x = x + this.padding;
    this.button.y = y + h + 20;
    this.button.w = w - this.padding * 2;
    this.button.h = h * 2;
  }

  draw() {
    textSize(this.textSize);
    textAlign(LEFT, CENTER);
    text(this.min, this.x + this.padding, this.y + this.h / 2);
    text(
      this.max,
      this.x +
        this.leftTextSize +
        this.padding * 3 +
        (this.w - (this.rightTextSize + this.leftTextSize + this.padding * 4)), // slider width
      this.y + this.h / 2
    );
    this.slider.draw();
    this.button.draw();
  }
}
