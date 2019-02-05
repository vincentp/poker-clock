export class Clock {

  static formatTotalSeconds(totalSeconds: number) {
    let secondsLabel = this.formatValue(totalSeconds % 60);
    let minutesLabel = this.formatValue(Math.floor(totalSeconds / 60));
    let hoursLabel   = this.formatValue(Math.floor(totalSeconds / 3600));

    return hoursLabel + ":" + minutesLabel + ":" + secondsLabel;
  }

  static formatValue(val: number) {
    let str = val + "";
    if (str.length < 2) {
      return "0" + str;
    } else {
      return str;
    }
  }

}