import { initialState } from "./initialState";
import {
  START_CLOCK,
  PAUSE_CLOCK,
  RESET_CLOCK,
  TICK_CLOCK,
  UPDATE_TIMERS,
  NEXT_TIMER
} from "../actions/actionTypes";

export default function clock(state = initialState.clock, action: any) {
  let newState;

  switch (action.type) {
    case START_CLOCK:
      newState = Object.assign({}, state);
      newState.status = "STARTED";
      return newState;
    case PAUSE_CLOCK:
      newState = Object.assign({}, state);
      newState.status = "PAUSED";
      return newState;
    case TICK_CLOCK:
      newState = Object.assign({}, state);
      newState.totalSeconds++;
      newState.timers[state.activeTimer].secondsLeft--;
      return newState;
    case RESET_CLOCK:
      return Object.assign({}, state, {
        totalSeconds: 0,
        status: "PAUSED",
        activeTimer: 0,
        timers: state.timers.map(timer => {
          timer.secondsLeft = timer.minutes * 60;
          return timer;
        })
      });
    case UPDATE_TIMERS:
      return Object.assign({}, state, {
        timers: action.timers
      });
    case NEXT_TIMER:
      return Object.assign({}, state, {
        activeTimer: state.activeTimer + 1
      });
    default:
      return state;
  }
}
