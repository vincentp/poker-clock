import React, { Component } from "react";
import "./App.css";
import { Clock } from "./services/clock";

class App extends Component {
  clock: null;

  constructor(props) {
    super(props);

    this.clock = new Clock();
    this.clock.onEvent = this.onClockEvent;

    this.state = { clock: this.clock };
  }

  onClockEvent = e => {
    this.setState(Object.assign({}, this.state, { clock: this.clock }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Poker Clock</span>
        </header>
        <div className="circled-clock">
          {this.state.clock.hoursLabel}:{this.state.clock.minutesLabel}:
          {this.state.clock.secondsLabel}
        </div>
        <button onClick={this.state.clock.toggle} className="btn btn-light clock-toggle">
          {(this.state.clock.status === "STARTED" ? "PAUSE" : "START")}
        </button>
      </div>
    );
  }
}

export default App;
