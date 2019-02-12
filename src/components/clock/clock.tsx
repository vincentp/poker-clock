import React, { Component } from "react";
import { connect } from "react-redux";
// @ts-ignore
import withStyles from "react-jss";
import styles from "./styles";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK } from "../../actions/actionTypes";
import classNames from 'classnames';
import { tickActiveTimer } from "../../middlewares/timerMiddleware";
import { Timer } from "../../common/types";

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
  dimensions: any;
}

const mapStateToProps = (state: ComponentState) => {
  return { clock: state.clock };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    startClock: () => dispatch({ type: START_CLOCK }),
    pauseClock: () => dispatch({ type: PAUSE_CLOCK }),
    resetClock: () => dispatch({ type: RESET_CLOCK }),
    tickClock:  () => dispatch(tickActiveTimer())
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

  formatSeconds(seconds: number) {
    let secondsLabel = this.formatValue(seconds % 60);
    let minutesLabel = this.formatValue(Math.floor(seconds / 60));
    let hoursLabel = this.formatValue(Math.floor(seconds / 3600));

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

  calculateDimensions () {
    const circleDiamter = window.innerHeight * 0.9;

    return {
      width: circleDiamter,
      height: circleDiamter,
      marginLeft: circleDiamter / 2 * -1,
      borderWidth: Math.floor(circleDiamter / 30)
    };
  }

  updateDimensions() {
    this.setState(Object.assign({}, this.state, { 
      dimensions: this.calculateDimensions()
    }));
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { classes, clock, resetClock } = this.props;

    const activeTimer: Timer = clock.timers[clock.activeTimer];

    return (
      <div className={classes.circle} style={this.state.dimensions}>
        <div className={classes.actions}>
          <button onClick={this.toggle} className={classNames("ui", "button", "massive", "primary", classes.toggle)}>
            { clock.status === "STARTED" ? "PAUSE" : "START" }
          </button>            
          <div className={classNames("ui", "hidden", "divider")}></div>
          <button onClick={resetClock} className={classNames("ui", "button", "mini")}>
            RESET
          </button> 
        </div>
        <div className={classes.content}>
          <span className={classes.blindsTitle}>Blinds</span>
          <span className={classes.blindsValues}>{activeTimer.smallBlind}/{activeTimer.bigBlind}</span>
          <span className={classes.clock}>
            {this.formatSeconds(clock.totalSeconds)}
          </span>
          <span className={classes.timer}>
            {this.formatSeconds(activeTimer.secondsLeft)}
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