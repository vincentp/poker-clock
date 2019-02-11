import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage'

export default function configureStore() {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}