import type { Player } from './types';

export const BOARD_SIZE = 8;

export const KING_ROW: Record<Player, number> = {
  red: 7,
  black: 0,
};

export const FORWARD_DIRECTION: Record<Player, number> = {
  red: 1,
  black: -1,
};
