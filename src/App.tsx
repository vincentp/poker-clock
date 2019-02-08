import React, { Component } from "react";
import styles from "./App.styles";
// @ts-ignore
import withStyles from "react-jss";
import Clock from "./components/clock/clock";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK, TICK_CLOCK } from "./actions/actionTypes";
import { connect } from "react-redux";
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
    tickClock: ()  => dispatch({ type: TICK_CLOCK }),
  }
};

class App extends Component <ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
    setInterval(this.tick, 1000);
  }

  tick = () => {
    if (this.props.clock.status === "STARTED")
      this.props.tickClock();
  }

  toggleClock = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.clock.status === "STARTED")
      this.props.pauseClock();
    else if (this.props.clock.status === "PAUSED")
      this.props.startClock();
  };

  render() {
    const { classes, clock } = this.props;

    return (
      <div className={classes.app}>
        <header className={classes.header}>
          <span>Poker Clock</span>
        </header>
        <Clock />
        <button onClick={this.toggleClock} className={classNames("btn", "btn-light", classes.clockToggle)}>
          { clock.status === "STARTED" ? "PAUSE" : "START" }
        </button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));