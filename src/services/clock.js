export class Clock {

  static formatTotalSeconds(totalSeconds) {
    let secondsLabel = this.formatValue(totalSeconds % 60);
    let minutesLabel = this.formatValue(parseInt(totalSeconds / 60));
    let hoursLabel   = this.formatValue(parseInt(totalSeconds / 3600));

    return hoursLabel + ":" + minutesLabel + ":" + secondsLabel;
  }

  static formatValue(val) {
    let str = val + "";
    if (str.length < 2) {
      return "0" + str;
    } else {
      return str;
    }
  }

}