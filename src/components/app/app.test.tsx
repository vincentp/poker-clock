import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { mount } from "../../enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { START_CLOCK } from "../../actions/actionTypes";

// @ts-ignore
import { JssProvider } from 'react-jss'

describe("App Component", () => {
  const initialState = { clock: { status: 'PAUSED', timer: {} } };
  const mockStore = configureStore();
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <JssProvider generateClassName={(rule: any, sheet?: any): string => rule.key}>
          <App />
        </JssProvider>
      </Provider>
    );
  });

  it("should have a button to start the clock", () => {

    expect(wrapper.find('button.clockToggle').text()).toEqual("START");
  });

  it("should send an action to the store on start", () => {
    wrapper.find("button.clockToggle").simulate("click");
    expect(store.getActions()).toEqual([{ type: START_CLOCK }]);    
  });
});
