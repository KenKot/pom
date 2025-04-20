export class Counter {
  constructor(seconds) {
    this.seconds = seconds;
    this.interval = null;
    this.onEnd = null;
  }

  get secondsLeft() {
    return this.seconds;
  }

  set secondsLeft(s) {
    this.seconds = s;
  }

  runClock(renderMinsAndSecsCallback) {
    if (this.seconds <= 0) return;

    this.interval = setInterval(() => {
      renderMinsAndSecsCallback(this.seconds);
      this.seconds--;

      if (this.seconds < 0) {
        clearInterval(this.interval);
        if (this.onEnd) this.onEnd();
      }
    }, 1000);
  }

  stopClock() {
    clearInterval(this.interval);
  }
}
