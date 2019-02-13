import React from "react";
import ReactDOM from "react-dom";
import Timers from "./timers";
import { mount, shallow } from "../../setupTests";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'

// @ts-ignore
import { JssProvider } from "react-jss";

describe("App Component", () => {
  const initialState = { 
    clock: { 
      totalSeconds: 10,
      status: "PAUSED",
      activeTimer: 0,
      timers: [{ 
        secondsLeft: 70, 
        minutes: 2,
        smallBlind: 10,
        bigBlind: 20
      }] 
    } 
  };

  const mockStore = configureStore();
  let store: any;
  let wrapper: any;

  beforeEach(() => {

    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <Router>
          <JssProvider generateClassName={(rule: any, sheet?: any): string => rule.key}>
            <Timers />
          </JssProvider>
        </Router>
      </Provider>
    );
  });

  it("should have a button to save timers settings", () => {
    expect(wrapper.find("button.primary").text()).toEqual("Save");
  });

});
