import { TICK_CLOCK, NEXT_TIMER, PAUSE_CLOCK } from "../actions/actionTypes";
import { Timer } from "../common/types";

export const tickActiveTimer = () => {
  return (dispatch: any, getState: any) => {
    if (getState().clock.status === "STARTED") {
      const activeTimer = getState().clock.timers[getState().clock.activeTimer];
      const nextTimer = getState().clock.timers[getState().clock.activeTimer + 1];

      if (activeTimer.secondsLeft === 0 && nextTimer === undefined) {
        // The last timer ended, we pause the game
        dispatch({ type: PAUSE_CLOCK });
      } else {
        dispatch({ type: TICK_CLOCK });
        if (activeTimer.secondsLeft === 0 && nextTimer !== undefined) dispatch({ type: NEXT_TIMER });
      }
    }
  };
};
