import React from "react";
import ReactDOM from "react-dom";
//import Clock from "./clock";
import { mount } from "../setupTests";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { TICK_CLOCK, NEXT_TIMER } from "../actions/actionTypes";
import thunk from "redux-thunk";
import { tickActiveTimer } from "./timerMiddleware"

describe("Timer middleware Component", () => {
  const oneTimerState = { 
    clock: {
      activeTimer: 0,
      timers: [{ secondsLeft: 60, minutes: 1 }] 
    } 
  };

  const multipleTimersState = { 
    clock: {
      activeTimer: 1,
      timers: [
        { secondsLeft: 60 },
        { secondsLeft: 60 },
        { secondsLeft: 60 }
      ] 
    } 
  };

  const mockStore = configureStore([thunk]);
  let store: any;

  it("should tick the clock", () => {
    store = mockStore(oneTimerState);
    store.dispatch(tickActiveTimer());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: TICK_CLOCK });
  });

  it("should not go to the next timer if the current one has seconds left", () => {
    store = mockStore(oneTimerState);
    store.dispatch(tickActiveTimer());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: TICK_CLOCK });
    expect(actions[1]).toEqual(undefined);    
  });

  it("should not go to the next timer if it's the last one", () => {
    let state = {...multipleTimersState};
    state.clock.activeTimer = 2;
    state.clock.timers[0].secondsLeft = 0;
    state.clock.timers[1].secondsLeft = 0;
    state.clock.timers[2].secondsLeft = 1;
    store = mockStore(state);
    const actions = store.getActions();
    store.dispatch(tickActiveTimer());
    expect(actions[0]).toEqual({ type: TICK_CLOCK });
    expect(actions[1]).toEqual(undefined);
  });

  it("should go to the next timer if there if it's not the last one", () => {
    let state = {...multipleTimersState};
    state.clock.activeTimer = 1;
    state.clock.timers[0].secondsLeft = 0;
    state.clock.timers[1].secondsLeft = 0;
    state.clock.timers[2].secondsLeft = 60;
    store = mockStore(state);
    const actions = store.getActions();
    store.dispatch(tickActiveTimer());
    expect(actions[0]).toEqual({ type: TICK_CLOCK });
    expect(actions[1]).toEqual({ type: NEXT_TIMER });    
  });

});
