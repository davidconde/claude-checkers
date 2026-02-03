import type { Board } from './types';
import { BOARD_SIZE } from './constants';

export function createInitialBoard(): Board {
  const board: Board = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    const boardRow: (typeof board)[number] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      const isDarkSquare = (row + col) % 2 !== 0;

      if (isDarkSquare && row < 3) {
        boardRow.push({ player: 'red', isKing: false });
      } else if (isDarkSquare && row > 4) {
        boardRow.push({ player: 'black', isKing: false });
      } else {
        boardRow.push(null);
      }
    }
    board.push(boardRow);
  }

  return board;
}

export function cloneBoard(board: Board): Board {
  return board.map(row => row.map(square => (square ? { ...square } : null)));
}
