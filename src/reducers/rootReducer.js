import { combineReducers } from 'redux';
import clock from './clockReducer';

const rootReducer = combineReducers({
  clock
});

export default rootReducer;