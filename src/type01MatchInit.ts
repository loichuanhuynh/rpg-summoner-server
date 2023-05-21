import { createPlayer } from "./functions";
import { GameState, OpCode} from "./interfaces";

export const type01MatchInit = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  params: { [key: string]: string } ): { state: GameState; tickRate: number; label: string } => {
  logger.warn("type01MatchInit");
  return {
    state: {
      players: [],
      sumturn: 1,
      currentTurn: 0,//Math.floor(Math.random() * 2),
    },
    tickRate: 1,
    label: "TYPE_01_OPEN",
  };
};

export const type01MatchJoinAttempt = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  presence: nkruntime.Presence,
): {
  state: GameState | nkruntime.MatchState;
  accept: boolean;
  rejectMessage?: string | undefined;
} => {
  logger.warn("type01MatchJoinAttempt");
  return {
    state,
    accept: true,
  };
};

export const type01MatchJoin = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: GameState | nkruntime.MatchState } => {
  logger.warn("type01MatchJoin");
  presences.forEach(presence => {
    state.players.push(createPlayer(presence.userId));
    if (state.players.length.toString() == "2") {
      dispatcher.broadcastMessage(OpCode.INIT, JSON.stringify(state));
    }
  });
  return {
    state,
  };
};
export const type01MatchLeave = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: GameState | nkruntime.MatchState } => {
  logger.warn("type01MatchLeave");
  return {
    state,
  };
};

export const type01MatchLoop = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  messages: nkruntime.MatchMessage[]
): { state: GameState | nkruntime.MatchState } => {
  // logger.warn("type01MatchLoop");
  let tempState: GameState | nkruntime.MatchState;
  messages.map((message) => {
    tempState = JSON.parse((nk.binaryToString(message.data)));
    if (tempState != null) {
      if (state.players[state.turn].userId == message.sender.userId) {
        if (message.opCode == OpCode.MOVE) {
          if (state.players[state.turn].turn[0] != 0) {
            state.players[state.turn].turn[0] = 0;
            state.turn = Math.abs(state.turn - 1);
            dispatcher.broadcastMessage(OpCode.MOVE, JSON.stringify(state));
          }
        }
          
      }
    }
  });
  return {
    state,
  };
};

export const type01MatchTerminate = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  graceSeconds: number
): { state: GameState | nkruntime.MatchState } => {
  logger.warn("type01MatchTerminate");
  return {
    state
  };
};

export const type01MatchSignal = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  dispatcher: nkruntime.MatchDispatcher,
  tick: number,
  state: GameState | nkruntime.MatchState,
  data: string
): { state: GameState | nkruntime.MatchState, data?: string } | null => {
  return {
    state,
    data
  };
};