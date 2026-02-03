import type { Board as BoardType, Move, Position } from '../game/types';
import { BOARD_SIZE } from '../game/constants';
import { Square } from './Square';

type BoardProps = {
  board: BoardType;
  selectedPiece: Position | null;
  validMoves: Move[];
  onSquareClick: (position: Position) => void;
};

export function Board({ board, selectedPiece, validMoves, onSquareClick }: BoardProps) {
  const isSelected = (row: number, col: number) =>
    selectedPiece?.row === row && selectedPiece?.col === col;

  const isValidMoveTarget = (row: number, col: number) =>
    validMoves.some((m) => m.to.row === row && m.to.col === col);

  return (
    <div className="grid grid-cols-8 border-4 border-amber-900 shadow-2xl">
      {Array.from({ length: BOARD_SIZE }, (_, row) =>
        Array.from({ length: BOARD_SIZE }, (_, col) => {
          const isDark = (row + col) % 2 !== 0;
          return (
            <Square
              key={`${row}-${col}`}
              position={{ row, col }}
              piece={board[row][col]}
              isDark={isDark}
              isSelected={isSelected(row, col)}
              isValidMove={isDark && isValidMoveTarget(row, col)}
              onClick={() => onSquareClick({ row, col })}
            />
          );
        })
      )}
    </div>
  );
}
