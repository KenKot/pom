export class Counter {
  constructor(seconds) {
    this.seconds = seconds;
    this.interval;
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

      if (this.seconds === 0) {
        clearInterval(this.interval);
      }

      this.seconds--;
    }, 1000);
  }

  stopClock() {
    clearInterval(this.interval);
  }
}
