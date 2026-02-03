import type { Piece as PieceType, Position } from '../game/types';
import { Piece } from './Piece';

type SquareProps = {
  position: Position;
  piece: PieceType | null;
  isDark: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
};

export function Square({ piece, isDark, isSelected, isValidMove, onClick }: SquareProps) {
  const bgColor = isDark ? 'bg-emerald-800' : 'bg-amber-100';
  const selectedRing = isSelected ? 'ring-4 ring-yellow-400 ring-inset' : '';
  const cursor = isDark ? 'cursor-pointer' : 'cursor-default';

  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative ${bgColor} ${selectedRing} ${cursor}`}
      onClick={isDark ? onClick : undefined}
    >
      {piece && <Piece player={piece.player} isKing={piece.isKing} />}
      {isValidMove && !piece && (
        <div className="w-5 h-5 rounded-full bg-yellow-400/60" />
      )}
      {isValidMove && piece && (
        <div className="absolute inset-0 ring-4 ring-yellow-400/60 ring-inset" />
      )}
    </div>
  );
}
