import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
// @ts-ignore
import withStyles from "react-jss";
import styles from "./styles";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK } from "../../actions/actionTypes";
import classNames from 'classnames';
import { tickActiveTimer } from "../../middlewares/timerMiddleware";
import { AppState, Timer, Clock } from "../../common/types";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface ComponentProps {
  startClock: () => void;
  pauseClock: () => void;
  resetClock: () => void;
  tickClock: ()  => void;
  clock: Clock;
  classes?: any;
}

interface ComponentState {
  dimensions?: Dimensions;
}

interface Dimensions {
  width: number;
  height: number;
  right: number;
  borderWidth: number;
}

const mapStateToProps = (state: AppState) => {
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
class ClockComponentNotConnected extends Component<ComponentProps, ComponentState> {
  
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

    const circleDiameter = window.innerHeight * 0.9;
    dimensions = calculateDimensions(circleDiameter, window.innerWidth, 300);

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
        { !activeTimer.break ? (
          <>
            <Typography className={classNames(classes.blindsTitle, hidden)}>Blinds</Typography>
            <Typography className={classNames(classes.blindsValues, hidden)}>{activeTimer.smallBlind}/{activeTimer.bigBlind}</Typography>
          </>
        ) : (
          <Typography className={classNames(classes.blindsTitle, hidden)}>Break</Typography>
        )}
        <Typography className={classes.clock}>
          {this.formatSeconds(clock.totalSeconds)}
        </Typography>
        <Typography className={classes.timer}>
          {this.formatSeconds(activeTimer.secondsLeft)}
        </Typography>
        <Button onClick={this.toggle} variant="contained" size="large" color="primary" className={classNames(classes.startButton, hidden)}>
          { clock.status === "STARTED" ? "PAUSE" : "START" }
        </Button>            
        <Button onClick={resetClock} variant="contained" size="small" className={classNames(classes.resetButton)}>
          RESET
        </Button> 
      </div>
    );
  }
}

export const calculateDimensions = (circleDiameter: number, windowWidth: number, sidebarWidth: number) => {

  // Center the clock within the window
  let right = (windowWidth - circleDiameter) / 2;

  // If the clock overlap the sidebar, there isn't enough space
  // We center the clock within the window width minus sidebar instead
  if (right < sidebarWidth) {
    const clockContainerWidth = windowWidth - sidebarWidth;
    right = (clockContainerWidth - circleDiameter) / 2;
  }

  return {
    width: circleDiameter,
    height: circleDiameter,
    right: right,
    borderWidth: Math.floor(circleDiameter / 30)
  } as Dimensions;
}

export const ClockComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClockComponentNotConnected);
