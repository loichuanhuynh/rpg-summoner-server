import { Player } from './interfaces';

export const createPlayer = (userId: string): Player => {
  const player: Player = { userId: userId, monster: [] };
  return player;
};