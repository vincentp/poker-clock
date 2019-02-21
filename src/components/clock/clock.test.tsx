import React from "react";
import ReactDOM from "react-dom";
import { ClockComponent, calculateDimensions } from "./clock";
import { mount, shallow } from "../../setupTests";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { START_CLOCK } from "../../actions/actionTypes";

// @ts-ignore
import { JssProvider } from "react-jss";

describe("App Component", () => {
  const initialState = { 
    clock: { 
      totalSeconds: 10,
      status: "PAUSED",
      activeTimer: 0,
      timers: [{ secondsLeft: 70, minutes: 2 }] 
    } 
  };

  const mockStore = configureStore();
  let store: any;
  let wrapper: any;

  beforeEach(() => {

    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <JssProvider generateClassName={(rule: any, sheet?: any): string => rule.key}>
          <ClockComponent />
        </JssProvider>
      </Provider>
    );
  });

  it("should have a button to start the clock", () => {
    expect(wrapper.find("button.startButton").text()).toEqual("START");
  });

  it("should send an action to the store on start", () => {
    wrapper.find("button.startButton").simulate("click");
    expect(store.getActions()).toEqual([{ type: START_CLOCK }]);
  });

  it("should have a clock at 00:00:10 (10 seconds elapsed)", () => {
    expect(wrapper.find("p.clock").text()).toEqual("00:00:10");
  });

  it("should have a default timer at 00:01:10 (70 seconds left)", () => {
    expect(wrapper.find("p.timer").text()).toEqual("00:01:10");
  });

  describe("clock size with a sidebar of 300px", () => {

    it("should center the clock based on the window's width if there is enough space for the sidebar", () => {
      const dimensions = calculateDimensions(500, 1200, 300);
      expect(dimensions.right).toEqual(350);
    });    

    it("should center the clock based on the window's width minus sidebar if there isn't enough space for the sidebar", () => {
      let dimensions = calculateDimensions(500, 1000, 300);
      expect(dimensions.right).toEqual(100);

      dimensions = calculateDimensions(500, 800, 300);
      expect(dimensions.right).toEqual(0);
    });    

  });

});
