import { useReducer, useCallback } from 'react';
import { gameReducer, createInitialGameState } from '../game/reducer';
import type { Position } from '../game/types';

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialGameState);

  const handleSquareClick = useCallback(
    (position: Position) => {
      if (state.winner) return;

      // If a piece is selected, check if this click is a valid move target
      if (state.selectedPiece) {
        const matchingMove = state.validMoves.find(
          (m) => m.to.row === position.row && m.to.col === position.col
        );
        if (matchingMove) {
          dispatch({ type: 'MOVE_PIECE', move: matchingMove });
          return;
        }
      }

      // Try to select a piece at this position
      const piece = state.board[position.row][position.col];
      if (piece && piece.player === state.currentPlayer) {
        dispatch({ type: 'SELECT_PIECE', position });
      }
    },
    [state]
  );

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  return {
    board: state.board,
    currentPlayer: state.currentPlayer,
    selectedPiece: state.selectedPiece,
    validMoves: state.validMoves,
    winner: state.winner,
    status: state.status,
    handleSquareClick,
    resetGame,
  };
}
