import React, { Component } from "react";
import "./App.sass";
import { Clock } from "./services/clock";

class App extends Component {
  clock: null;
  stopwatch: null;

  constructor(props) {
    super(props);

    this.clock = new Clock();
    this.clock.onEvent = this.onStopwatchEvent;

    this.stopwatch = new Clock();
    this.stopwatch.totalSeconds = 10;
    this.stopwatch.mode = "timer";
    this.stopwatch.onEvent = this.onClockEvent;

    this.state = { 
      clock: this.clock,
      stopwatch: this.stopwatch
    };
  }

  onStopwatchEvent = e => {
    this.setState(Object.assign({}, this.state, { stopwatch: this.stopwatch }));
  };

  onClockEvent = e => {
    this.setState(Object.assign({}, this.state, { clock: this.clock }));
  };

  toggleClock = e => {
    this.clock.toggle();
    this.stopwatch.toggle();
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <span>Poker Clock</span>
        </header>
        <div className="circled-clock">
          <div className="labels">
            <span className="stopwatch-label">
              {this.state.stopwatch.hoursLabel}:{this.state.stopwatch.minutesLabel}:{this.state.stopwatch.secondsLabel}
            </span>
            <span className="clock-label">
              {this.state.clock.hoursLabel}:{this.state.clock.minutesLabel}:{this.state.clock.secondsLabel}
            </span>
          </div>
        </div>
        <button onClick={this.toggleClock} className="btn btn-light clock-toggle">
          {(this.state.clock.status === "STARTED" ? "PAUSE" : "START")}
        </button>
      </div>
    );
  }
}

export default App;
