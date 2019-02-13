import { combineReducers } from "redux";
import clock from "./clockReducer";
import { RESET_STATE } from "../actions/actionTypes";
import { ReduxAction, AppState } from "../common/types";

const appReducer = combineReducers({
  clock
});

const rootReducer = (state: AppState, action: ReduxAction) => {
  let resetState = false;
  if (action.type === "RESET_STATE") resetState = true;

  return appReducer(resetState ? undefined : state, action);
};

export default rootReducer;
