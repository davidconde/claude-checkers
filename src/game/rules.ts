import type { Board, Move, Player, Position } from './types';
import { KING_ROW } from './constants';
import { cloneBoard } from './board';
import { getAllMovesForPlayer } from './moves';

export function executeMove(board: Board, move: Move): Board {
  const newBoard = cloneBoard(board);
  const piece = newBoard[move.from.row][move.from.col];

  newBoard[move.to.row][move.to.col] = piece;
  newBoard[move.from.row][move.from.col] = null;

  if (move.captured) {
    newBoard[move.captured.row][move.captured.col] = null;
  }

  return newBoard;
}

export function shouldPromoteToKing(player: Player, position: Position): boolean {
  return position.row === KING_ROW[player];
}

export function promoteIfEligible(board: Board, position: Position): { board: Board; promoted: boolean } {
  const piece = board[position.row][position.col];
  if (!piece || piece.isKing) return { board, promoted: false };

  if (shouldPromoteToKing(piece.player, position)) {
    const newBoard = cloneBoard(board);
    newBoard[position.row][position.col] = { ...piece, isKing: true };
    return { board: newBoard, promoted: true };
  }

  return { board, promoted: false };
}

export function checkWinner(board: Board, nextPlayer: Player): Player | null {
  const movesAvailable = getAllMovesForPlayer(board, nextPlayer);
  if (movesAvailable.length === 0) {
    return nextPlayer === 'red' ? 'black' : 'red';
  }
  return null;
}

export function getNextPlayer(player: Player): Player {
  return player === 'red' ? 'black' : 'red';
}
