export interface Clock {
  totalSeconds: number;
  status: string;
  activeTimer: number;
  timers: Timer[];
}

export interface Timer {
  secondsLeft: number;
  minutes: number;
  break: boolean;
  smallBlind: number;
  bigBlind: number;
}

export interface AppState {
  clock: Clock
}

export interface ReduxAction {
  type: string;
  timers?: Timer[]
}
