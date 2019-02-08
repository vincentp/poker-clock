import React, { Component } from "react";
import { connect } from "react-redux";
// @ts-ignore
import withStyles from "react-jss";
import styles from "./styles";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK, TICK_CLOCK } from "../../actions/actionTypes";
import classNames from 'classnames';

interface ComponentProps {
  startClock: () => void;
  pauseClock: () => void;
  resetClock: () => void;
  tickClock: ()  => void;
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
  return {
    startClock: () => dispatch({ type: START_CLOCK }),
    pauseClock: () => dispatch({ type: PAUSE_CLOCK }),
    resetClock: () => dispatch({ type: RESET_CLOCK }),
    tickClock: ()  => dispatch({ type: TICK_CLOCK })
  };
};

class Clock extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    setInterval(this.tick, 1000);
  }

  tick = () => {
    if (this.props.clock.status === "STARTED")
      this.props.tickClock();
  }

  toggle = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.clock.status === "STARTED")
      this.props.pauseClock();
    else if (this.props.clock.status === "PAUSED")
      this.props.startClock();
  };

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

    let styles = {
      width: window.innerHeight * 0.9,
      height: window.innerHeight * 0.9,
      borderWidth: Math.floor(window.innerHeight * 0.9 / 30)
    };

    return (
      <div className={classes.circle} style={styles}>
        <div className={classes.content}>
          <span className={classes.timer}>
            {this.formatTotalSeconds(clock.timer.totalSeconds)}
          </span>
          <span className={classes.clock}>
            {this.formatTotalSeconds(clock.totalSeconds)}
          </span>
          <button onClick={this.toggle} className={classNames("btn", "btn-light", classes.toggle)}>
            { clock.status === "STARTED" ? "PAUSE" : "START" }
          </button>            
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Clock));