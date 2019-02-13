import { TICK_CLOCK, NEXT_TIMER } from "../actions/actionTypes";
import { Timer } from "../common/types";

export const tickActiveTimer = () => {
  return (dispatch: any, getState: any) => {
    const activeTimer = getState().clock.timers[getState().clock.activeTimer];
    const nextTimer = getState().clock.timers[getState().clock.activeTimer + 1];

    if (activeTimer.secondsLeft === 0 && nextTimer === undefined) {
      // Do nothing, the last timer ended
    } else {
      dispatch({ type: TICK_CLOCK });
      if (activeTimer.secondsLeft === 0 && nextTimer !== undefined) dispatch({ type: NEXT_TIMER });
    }
  };
};
