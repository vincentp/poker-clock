import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import Timers from "./components/timers/timers";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <CssBaseline />
        <Route exact path="/" component={App} />
        <Route path="/timers" component={Timers} />
      </>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
