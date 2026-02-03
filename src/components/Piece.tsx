import type { Player } from '../game/types';

type PieceProps = {
  player: Player;
  isKing: boolean;
};

export function Piece({ player, isKing }: PieceProps) {
  const colorClasses =
    player === 'red'
      ? 'bg-red-600 border-red-800 shadow-red-900/50'
      : 'bg-gray-700 border-gray-900 shadow-gray-900/50';

  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 shadow-lg flex items-center justify-center ${colorClasses}`}
    >
      {isKing && (
        <span className="text-yellow-300 font-bold text-sm sm:text-base select-none">
          K
        </span>
      )}
    </div>
  );
}
