import React, { Component } from "react";
import "./App.sass";
import { Clock } from "./services/clock";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK, TICK_CLOCK } from "./actions/actionTypes";
import { connect } from "react-redux";

interface ComponentProps {
  startClock: () => void;
  pauseClock: () => void;
  resetClock: () => void;
  tickClock: ()  => void;
  clock: any;
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
    return (
      <div className="app">
        <header className="app-header">
          <span>Poker Clock</span>
        </header>
        <div className="circled-clock">
          <div className="labels">
            <span className="timer-label">
              {Clock.formatTotalSeconds(this.props.clock.timer.totalSeconds)}
            </span>
            <span className="clock-label">
              {Clock.formatTotalSeconds(this.props.clock.totalSeconds)}
            </span>
          </div>
        </div>
        <button onClick={this.toggleClock} className="btn btn-light clock-toggle">
          { this.props.clock.status === "STARTED" ? "PAUSE" : "START" }
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
