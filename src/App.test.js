import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from './enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should have a button to start the clock', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('button.clock-toggle').text()).toEqual("START");
});

it('should have a button to pause the clock once started', () => {
  const wrapper = mount(<App />);
  wrapper.find('button.clock-toggle').simulate('click');
  expect(wrapper.find('button.clock-toggle').text()).toEqual("PAUSE");
});
