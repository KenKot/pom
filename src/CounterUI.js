import { Counter } from "./Counter.js";

export class CounterUI {
  constructor() {
    this.startEl = document.querySelector(".start-button");
    this.stopEl = document.querySelector(".stop-button");
    this.resetEl = document.querySelector(".reset-button");
    this.counterEl = document.querySelector(".counter");

    this.POMODORO_MINS = 15 * 60;
    this.counter = new Counter(this.POMODORO_MINS);
  }

  calculateMinutesAndSeconds(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return [mins, secs];
  }

  renderMinsAndSecsCallback(seconds) {
    const [mins, secs] = this.calculateMinutesAndSeconds(seconds);
    const minsString = mins.toString().padStart(2, "0");
    const secsString = secs.toString().padStart(2, "0");
    this.counterEl.innerText = `${minsString}:${secsString}`;
  }

  init() {
    this.renderMinsAndSecsCallback(this.counter.secondsLeft);

    this.startEl.addEventListener("click", () => {
      this.counter.runClock(this.renderMinsAndSecsCallback.bind(this));
    });

    this.stopEl.addEventListener("click", () => {
      this.counter.stopClock();
    });

    this.resetEl.addEventListener("click", () => {
      this.counter.secondsLeft = this.POMODORO_MINS;
      this.renderMinsAndSecsCallback(this.POMODORO_MINS);
    });
  }
}
