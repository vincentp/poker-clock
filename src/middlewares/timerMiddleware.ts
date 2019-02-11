import { TICK_CLOCK, NEXT_TIMER } from "../actions/actionTypes";
import { Timer } from "../common/types";

export const tickActiveTimer = () => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: TICK_CLOCK });
    if (getState().clock.timers[getState().clock.activeTimer].secondsLeft === 0)
      dispatch({ type: NEXT_TIMER });
  };
};

