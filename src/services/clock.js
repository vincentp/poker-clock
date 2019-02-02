export class Clock {

  totalSeconds = 0;
  hoursLabel = "00";
  minutesLabel = "00";
  secondsLabel = "00";

  status = "PAUSED";

  interval = null;

  mode = "stopwatch"; // stopwatch

  onEvent = function() {}

  constructor() {
  }

  formatValue(val) {
    let str = val + "";
    if (str.length < 2) {
      return "0" + str;
    } else {
      return str;
    }
  }

  updateTime = () => {
    if (this.mode === "timer")
      this.totalSeconds--;
    else if (this.mode === "stopwatch")
      this.totalSeconds++;

    this.secondsLabel = this.formatValue(this.totalSeconds % 60);
    this.minutesLabel = this.formatValue(parseInt(this.totalSeconds / 60));
    this.hoursLabel   = this.formatValue(parseInt(this.totalSeconds / 3600));

    if (this.hasEnded()) {
      this.clearInterval();
      this.status = "ENDED";
      this.onEvent('END');
    } else {
      this.onEvent('TICK');
    }
  }

  hasEnded() {
    if (this.mode === "timer")
      return this.totalSeconds === 0;
    else 
      return false;
  }

  startInterval() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  start() {
    if (!this.hasEnded()) {
      this.onEvent('STARTED');
      this.startInterval();
      this.status = "STARTED";
    }
  }

  clearInterval() {
    if (this.interval) clearInterval(this.interval);
  }

  stop() {
    this.clearInterval();
    this.status = "PAUSED";
    this.onEvent('PAUSED');
  }

  toggle = () => {
    this.status === "STARTED" ? this.stop() : this.start();
  }

  reset() {
    this.totalSeconds = 0;
    this.hoursLabel = "00";
    this.minutesLabel = "00";
    this.secondsLabel = "00";    
  }

}