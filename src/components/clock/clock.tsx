import React, { Component } from "react";
import ReactDOM from 'react-dom';
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
  classes?: any;
}

interface ComponentState {
  clock: any;
  dimensions?: Dimensions;
}

interface Dimensions {
  width: number;
  height: number;
  right: number;
  borderWidth: number;
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

@withStyles(styles)
class ClockComponent extends Component<ComponentProps, ComponentState> {
  
  tickInterval: number;

  constructor(props: ComponentProps) {
    super(props);
    this.tickInterval = window.setInterval(this.tick, 1000);
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

  updateDimensions() {
    let dimensions = null;

    const container = document.getElementById('clockColumn');

    if (container) {
      const circleDiameter = window.innerHeight * 0.9;
      dimensions = calculateDimensions(circleDiameter, window.innerWidth, 300, container.offsetWidth);
    }

    this.setState(Object.assign({}, this.state, { 
      dimensions: dimensions
    }));
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { classes, clock, resetClock } = this.props;

    const activeTimer: Timer = clock.timers[clock.activeTimer];

    const hidden = activeTimer.secondsLeft === 0 ? classes.hidden : {};

    return (
      <div className={classes.circle} style={this.state.dimensions}>
        <div className={classes.actions}>
          <button onClick={this.toggle} className={classNames("ui", "button", "massive", "primary", hidden)}>
            { clock.status === "STARTED" ? "PAUSE" : "START" }
          </button>            
          <div className={classNames("ui", "hidden", "divider")}></div>
          <button onClick={resetClock} className={classNames("ui", "button", "mini")}>
            RESET
          </button> 
        </div>
        <div className={classes.content}>
          { !activeTimer.break ? (
            <>
              <span className={classNames(classes.blindsTitle, hidden)}>Blinds</span>
              <span className={classNames(classes.blindsValues, hidden)}>{activeTimer.smallBlind}/{activeTimer.bigBlind}</span>
            </>
          ) : (
            <span className={classNames(classes.blindsTitle, hidden)}>Break</span>
          )}
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

export const calculateDimensions = (circleDiameter: number, windowWidth: number, sidebarWidth: number, clockContainerWidth: number) => {

  // Center the clock within the window
  let right = (windowWidth - circleDiameter) / 2;

  // If the clock overlap the sidebar, there isn't enough space
  // We center the clock within its container instead
  if (right < sidebarWidth)
    right = (clockContainerWidth - circleDiameter) / 2;

  return {
    width: circleDiameter,
    height: circleDiameter,
    right: right,
    borderWidth: Math.floor(circleDiameter / 30)
  } as Dimensions;
}

export const Clock = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockComponent);