export enum OpCode {
  SYNC = 0,
  INIT = 1,
  MOVE = 2,
  USESKILL = 3,
  FILL = 4,
  WIN = 5,
  LOSE = 6,
}

export interface Player {
  userId: string,
  monster: string[],
}

export interface Move {
  0: number[],
  1: number[],
}

export interface GameState extends nkruntime.MatchState {
  players: Player[],
  sumturn: number,
  currentTurn: number,
}
