export const timers = [
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 50, bigBlind: 100 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 100, bigBlind: 200 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 150, bigBlind: 300 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 200, bigBlind: 400 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 250, bigBlind: 500 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 300, bigBlind: 600 },
  { minutes: 10, secondsLeft: 600,  break: true },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 400, bigBlind: 800 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 500, bigBlind: 1000 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 600, bigBlind: 1200 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 800, bigBlind: 1600 },
  { minutes: 10, secondsLeft: 600,  break: true },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 1000, bigBlind: 2000 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 1200, bigBlind: 2400 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 1400, bigBlind: 2800 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 1600, bigBlind: 3200 },
  { minutes: 10, secondsLeft: 600,  break: true },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 2000, bigBlind: 4000 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 2400, bigBlind: 4800 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 3000, bigBlind: 6000 },
  { minutes: 20, secondsLeft: 1200, break: false, smallBlind: 4000, bigBlind: 8000 }
];

export const initialState = {
  clock: {
    totalSeconds: 0,
    status: "PAUSED",
    activeTimer: 0,
    timers: [...timers]
  }
};
