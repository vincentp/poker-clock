import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { mount } from "./enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { START_CLOCK } from "./actions/actionTypes";

describe("App Component", () => {
  const initialState = { clock: { status: 'PAUSED', timer: {} } };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should have a button to start the clock", () => {
    expect(wrapper.find("button.clock-toggle").text()).toEqual("START");
  });

  it("should send an action to the store on start", () => {
    wrapper.find("button.clock-toggle").simulate("click");
    expect(store.getActions()).toEqual([{ type: START_CLOCK }]);    
  });
});
