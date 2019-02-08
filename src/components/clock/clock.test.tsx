import React from "react";
import ReactDOM from "react-dom";
import Clock from "./clock";
import { mount } from "../../enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { START_CLOCK } from "../../actions/actionTypes";

// @ts-ignore
import { JssProvider } from 'react-jss'

describe("App Component", () => {
  const initialState = { clock: { totalSeconds: 0, timer: { totalSeconds: 70 } } };
  const mockStore = configureStore();
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <JssProvider generateClassName={(rule: any, sheet?: any): string => rule.key}>
          <Clock />
        </JssProvider>
      </Provider>
    );
  });

  it("should have a default clock at 00:00:00", () => {
    expect(wrapper.find(".clock").text()).toEqual("00:00:00");
  });

  it("should have a default timer at 00:01:10 (70 seconds set)", () => {
    expect(wrapper.find(".timer").text()).toEqual("00:01:10");
  });

});