class SoundManager {
  constructor(preloadedSounds) {
    this.sounds = preloadedSounds;
  }

  play(sound, rate = 1) {
    this.sounds[sound].rate(rate);
    this.sounds[sound].play();
  }

  loop(sound, rate = 1) {
    if (!this.sounds[sound].isPlaying()) {
      this.sounds[sound].loop(0, rate);
    }
  }

  stop(sound) {
    this.sounds[sound].stop();
  }
}
