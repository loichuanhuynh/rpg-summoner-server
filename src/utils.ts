export const matchmakerMatched = (
  context: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  matches: nkruntime.MatchmakerResult[]
): string => {
  logger.error("Ban da call");
  logger.error(JSON.stringify(matches));

  try {
    const matchId = nk.matchCreate("TYPE_01");
    return matchId;
  } catch (error) {
    logger.error(JSON.stringify(error));
    throw error;
  };
};
