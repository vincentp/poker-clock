import initialState from "./initialState";
import { START_CLOCK, PAUSE_CLOCK, RESET_CLOCK, TICK_CLOCK } from "../actions/actionTypes";

export default function clock(state = initialState.clock, action) {

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
      newState.timer.totalSeconds--;
      return newState;
    case RESET_CLOCK:
      return Object.assign({}, state, {
        totalSeconds: 0,
        status: "PAUSED",
        timer: {
          totalSeconds: 10
        }
      });
    default:
      return state;
  }
}
