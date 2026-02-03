import type { GameState, GameAction } from './types';
import { createInitialBoard } from './board';
import { getMovesForPiece, getJumps } from './moves';
import { executeMove, promoteIfEligible, checkWinner, getNextPlayer } from './rules';

export function createInitialGameState(): GameState {
  return {
    board: createInitialBoard(),
    currentPlayer: 'red',
    selectedPiece: null,
    validMoves: [],
    mustContinueJump: null,
    winner: null,
    status: 'playing',
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_PIECE': {
      if (state.status === 'won') return state;

      const { position } = action;
      const piece = state.board[position.row][position.col];

      if (!piece || piece.player !== state.currentPlayer) return state;

      if (state.mustContinueJump) {
        if (position.row !== state.mustContinueJump.row || position.col !== state.mustContinueJump.col) {
          return state;
        }
      }

      const mustJump = !!state.mustContinueJump;
      const moves = getMovesForPiece(state.board, position, mustJump);

      if (moves.length === 0) return state;

      return {
        ...state,
        selectedPiece: position,
        validMoves: moves,
      };
    }

    case 'MOVE_PIECE': {
      if (state.status === 'won') return state;

      const { move } = action;
      let newBoard = executeMove(state.board, move);
      const isJump = !!move.captured;

      const { board: boardAfterPromotion, promoted } = promoteIfEligible(newBoard, move.to);
      newBoard = boardAfterPromotion;

      // After a jump, check for multi-jump continuation
      if (isJump && !promoted) {
        const additionalJumps = getJumps(newBoard, move.to);
        if (additionalJumps.length > 0) {
          return {
            ...state,
            board: newBoard,
            selectedPiece: move.to,
            validMoves: additionalJumps,
            mustContinueJump: move.to,
          };
        }
      }

      // Turn is over — switch players
      const nextPlayer = getNextPlayer(state.currentPlayer);
      const winner = checkWinner(newBoard, nextPlayer);

      return {
        board: newBoard,
        currentPlayer: nextPlayer,
        selectedPiece: null,
        validMoves: [],
        mustContinueJump: null,
        winner,
        status: winner ? 'won' : 'playing',
      };
    }

    case 'RESET_GAME':
      return createInitialGameState();

    default:
      return state;
  }
}
