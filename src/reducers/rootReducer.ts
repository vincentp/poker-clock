import { combineReducers } from "redux";
import clock from "./clockReducer";
import { RESET_STATE } from "../actions/actionTypes";

const appReducer = combineReducers({
  clock
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
