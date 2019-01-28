import React, { Component } from "react";
import "./App.css";
import { Counter } from "./services/counter";

class App extends Component {
  counter: null;

  constructor(props) {
    super(props);

    this.counter = new Counter();
    this.counter.onEvent = this.onCounterEvent;

    this.state = { counter: this.counter };
  }

  onCounterEvent = e => {
    console.log("e", e);
    this.setState(Object.assign({}, this.state, { counter: this.counter }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Poker Clock</span>
        </header>
        <div className="circled-counter">
          {this.state.counter.hoursLabel}:{this.state.counter.minutesLabel}:
          {this.state.counter.secondsLabel}
        </div>
        <button onClick={this.state.counter.toggle} className="btn btn-light counter-toggle">
          {(this.state.counter.status === "STARTED" ? "STOP" : "START")}
        </button>
      </div>
    );
  }
}

export default App;
