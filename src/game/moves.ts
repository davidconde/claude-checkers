import type { Board, Move, Player, Position } from './types';
import { BOARD_SIZE, FORWARD_DIRECTION } from './constants';

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function getMoveDirections(player: Player, isKing: boolean): number[] {
  if (isKing) return [1, -1];
  return [FORWARD_DIRECTION[player]];
}

export function getJumps(board: Board, position: Position): Move[] {
  const piece = board[position.row][position.col];
  if (!piece) return [];

  const jumps: Move[] = [];
  const rowDirs = getMoveDirections(piece.player, piece.isKing);
  const colDirs = [-1, 1];

  for (const rowDir of rowDirs) {
    for (const colDir of colDirs) {
      const midRow = position.row + rowDir;
      const midCol = position.col + colDir;
      const landRow = position.row + rowDir * 2;
      const landCol = position.col + colDir * 2;

      if (!isInBounds(landRow, landCol)) continue;

      const midPiece = board[midRow][midCol];
      const landSquare = board[landRow][landCol];

      if (midPiece && midPiece.player !== piece.player && landSquare === null) {
        jumps.push({
          from: position,
          to: { row: landRow, col: landCol },
          captured: { row: midRow, col: midCol },
        });
      }
    }
  }

  return jumps;
}

export function getSimpleMoves(board: Board, position: Position): Move[] {
  const piece = board[position.row][position.col];
  if (!piece) return [];

  const moves: Move[] = [];
  const rowDirs = getMoveDirections(piece.player, piece.isKing);
  const colDirs = [-1, 1];

  for (const rowDir of rowDirs) {
    for (const colDir of colDirs) {
      const newRow = position.row + rowDir;
      const newCol = position.col + colDir;

      if (!isInBounds(newRow, newCol)) continue;

      if (board[newRow][newCol] === null) {
        moves.push({
          from: position,
          to: { row: newRow, col: newCol },
        });
      }
    }
  }

  return moves;
}

export function getAllJumpsForPlayer(board: Board, player: Player): Move[] {
  const jumps: Move[] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && piece.player === player) {
        jumps.push(...getJumps(board, { row, col }));
      }
    }
  }

  return jumps;
}

export function getAllMovesForPlayer(board: Board, player: Player): Move[] {
  const jumps = getAllJumpsForPlayer(board, player);
  if (jumps.length > 0) return jumps;

  const moves: Move[] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col];
      if (piece && piece.player === player) {
        moves.push(...getSimpleMoves(board, { row, col }));
      }
    }
  }

  return moves;
}

export function getMovesForPiece(board: Board, position: Position, mustJump: boolean): Move[] {
  if (mustJump) return getJumps(board, position);

  const allPlayerJumps = getAllJumpsForPlayer(board, board[position.row][position.col]!.player);
  if (allPlayerJumps.length > 0) {
    return getJumps(board, position);
  }

  return getSimpleMoves(board, position);
}
