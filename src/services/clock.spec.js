import { Clock } from './clock'

test('it should have default values', () => {
  let clock = new Clock();
  
  expect(clock.totalSeconds).toBe(0);
  expect(clock.hoursLabel).toBe("00");
  expect(clock.minutesLabel).toBe("00");
  expect(clock.secondsLabel).toBe("00");
});

test('it should trigger events when we start/pause the clock', () => {
  let clock = new Clock();
  clock.onEvent = jest.fn();
  clock.start();  
  expect(clock.onEvent).toHaveBeenCalledWith('STARTED');  
  clock.stop();  
  expect(clock.onEvent).toHaveBeenCalledWith('PAUSED');  
});

test('it should reset to default values', () => {
  let clock = new Clock();
  clock.totalSeconds = 10;
  clock.reset();  
  expect(clock.totalSeconds).toBe(0);
});