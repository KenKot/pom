import { Counter } from "./Counter.js";

export class CounterUI {
  constructor(startingSeconds) {
    this.startEl = document.querySelector(".start-button");
    this.stopEl = document.querySelector(".stop-button");
    this.resetEl = document.querySelector(".reset-button");
    this.counterEl = document.querySelector(".counter");
    this.inputEl = document.querySelector(".time-input");
    this.filler = document.querySelector(".filler");

    this.POMODORO_MINS = startingSeconds;
    this.counter = new Counter(this.POMODORO_MINS);
    this.counter.onEnd = this.playBeep.bind(this);
  }

  playBeep() {
    const beep = new Audio("../audio/doorbell.mp3");
    beep.play();
  }

  calculateMinutesAndSeconds(s) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return [mins, secs];
  }

  renderMinsAndSecsCallback(seconds) {
    let [mins, secs] = this.calculateMinutesAndSeconds(seconds);

    let minsString;
    if (mins < 10) {
      minsString = "0" + mins;
    } else {
      minsString = mins.toString();
    }

    let secsString;
    if (secs < 10) {
      secsString = "0" + secs;
    } else {
      secsString = secs.toString();
    }

    this.counterEl.innerText = minsString + ":" + secsString;

    const timePassed = this.POMODORO_MINS - seconds;
    const percentage = (timePassed / this.POMODORO_MINS) * 100;
    this.filler.style.width = percentage + "%";
  }

  init() {
    this.renderMinsAndSecsCallback(this.counter.secondsLeft);
    this.startEl.disabled = false;
    this.stopEl.disabled = true;
    this.resetEl.disabled = true;
    this.filler.style.width = "0%";

    this.startEl.addEventListener("click", () => {
      const val = parseInt(this.inputEl.value);

      if (!isNaN(val) && val > 0) {
        this.POMODORO_MINS = val * 60;
      }

      if (this.counter.secondsLeft <= 0 || !this.counter.interval) {
        this.counter.stopClock();
        this.counter = new Counter(this.POMODORO_MINS);
        this.counter.onEnd = this.playBeep.bind(this);
        this.renderMinsAndSecsCallback(this.POMODORO_MINS);
        this.filler.style.width = "0%";
      }

      this.counter.runClock(this.renderMinsAndSecsCallback.bind(this));
      this.startEl.disabled = true;
      this.stopEl.disabled = false;
      this.resetEl.disabled = false;
    });

    this.stopEl.addEventListener("click", () => {
      this.counter.stopClock();
      this.startEl.disabled = false;
      this.stopEl.disabled = true;
    });

    this.resetEl.addEventListener("click", () => {
      this.counter.stopClock();
      this.counter.secondsLeft = this.POMODORO_MINS;
      this.filler.style.width = "0%";
      this.renderMinsAndSecsCallback(this.counter.secondsLeft);

      this.startEl.disabled = false;
      this.stopEl.disabled = true;
      this.resetEl.disabled = true;
    });
  }
}
