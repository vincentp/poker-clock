import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { mount } from "../../enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

// @ts-ignore
import { JssProvider } from 'react-jss'

describe("App Component", () => {
  const initialState = { clock: { timer: {} } };
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

  it("should have an app wrapper", () => {
    expect(wrapper.find('.app').exists()).toEqual(true);
  });

});
