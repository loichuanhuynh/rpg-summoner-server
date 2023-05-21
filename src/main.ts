import { type01MatchInit, type01MatchJoin, type01MatchJoinAttempt, type01MatchLeave, type01MatchLoop, type01MatchSignal, type01MatchTerminate } from './type01MatchInit';
import { matchmakerMatched } from './utils';

const InitModule: nkruntime.InitModule  = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  initializer: nkruntime.Initializer
) => {
  logger.info('Init JS Module');

  initializer.registerMatch('TYPE_01', {
    matchInit: type01MatchInit,
    matchJoinAttempt: type01MatchJoinAttempt,
    matchJoin: type01MatchJoin,
    matchLeave: type01MatchLeave,
    matchLoop: type01MatchLoop,
    matchTerminate: type01MatchTerminate,
    matchSignal: type01MatchSignal,
  });

  initializer.registerMatchmakerMatched(matchmakerMatched);
};

// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
