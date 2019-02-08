import React, { Component } from "react";
import { connect } from "react-redux";
// @ts-ignore
import withStyles from "react-jss";
import styles from "./styles";

interface ComponentProps {
  clock: any;
  classes: any;
}

interface ComponentState {
  clock: any;
}

const mapStateToProps = (state: ComponentState) => {
  return { clock: state.clock };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

class Clock extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
  }

  formatTotalSeconds(totalSeconds: number) {
    let secondsLabel = this.formatValue(totalSeconds % 60);
    let minutesLabel = this.formatValue(Math.floor(totalSeconds / 60));
    let hoursLabel = this.formatValue(Math.floor(totalSeconds / 3600));

    return hoursLabel + ":" + minutesLabel + ":" + secondsLabel;
  }

  formatValue(val: number) {
    let str = val + "";
    if (str.length < 2) {
      return "0" + str;
    } else {
      return str;
    }
  }

  render() {
    const { classes, clock } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.labels}>
          <span className={classes.timer}>
            {this.formatTotalSeconds(clock.timer.totalSeconds)}
          </span>
          <span className={classes.clock}>
            {this.formatTotalSeconds(clock.totalSeconds)}
          </span>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Clock));