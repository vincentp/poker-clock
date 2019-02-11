export const timers = [
  { minutes: 2, secondsLeft: 120, break: false },
  { minutes: 2, secondsLeft: 120, break: false },
  { minutes: 1, secondsLeft: 60, break: true },
  { minutes: 2, secondsLeft: 120, break: false },
  { minutes: 2, secondsLeft: 120, break: false }
];

export const initialState = {

  clock: {
    totalSeconds: 0,
    status: "PAUSED",
    activeTimer: 0,
    timers: [...timers]
  }
  
};