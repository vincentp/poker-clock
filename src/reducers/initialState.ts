export const timers = [
  { minutes: 2, secondsLeft: 120, break: false, smallBlind: 5, bigBlind: 10 },
  { minutes: 2, secondsLeft: 120, break: false, smallBlind: 10, bigBlind: 20 },
  { minutes: 1, secondsLeft: 60, break: true },
  { minutes: 2, secondsLeft: 120, break: false, smallBlind: 20, bigBlind: 40 },
  { minutes: 2, secondsLeft: 120, break: false, smallBlind: 30, bigBlind: 60 }
];

export const initialState = {
  clock: {
    totalSeconds: 0,
    status: "PAUSED",
    activeTimer: 0,
    timers: [...timers]
  }
};
