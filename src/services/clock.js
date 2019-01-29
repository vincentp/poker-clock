export class Clock {

  totalSeconds = 0;
  hoursLabel = "00";
  minutesLabel = "00";
  secondsLabel = "00";

  status = "PAUSED";

  interval = null;

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
    this.totalSeconds++;

    this.secondsLabel = this.formatValue(this.totalSeconds % 60);
    this.minutesLabel = this.formatValue(parseInt(this.totalSeconds / 60));
    this.hoursLabel   = this.formatValue(parseInt(this.totalSeconds / 3600));

    this.onEvent('TICK');
  }

  startInterval() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  start() {
    this.onEvent('STARTED');
    this.startInterval();
    this.status = "STARTED";
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
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