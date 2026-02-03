import type { Player } from '../game/types';

type GameStatusProps = {
  currentPlayer: Player;
  winner: Player | null;
  onReset: () => void;
};

function PlayerIndicator({ player }: { player: Player }) {
  const color = player === 'red' ? 'bg-red-600' : 'bg-gray-700';
  const label = player === 'red' ? 'Red' : 'Black';
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-4 h-4 rounded-full ${color} inline-block`} />
      {label}
    </span>
  );
}

export function GameStatus({ currentPlayer, winner, onReset }: GameStatusProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-lg">
      {winner ? (
        <div className="text-2xl font-bold">
          <PlayerIndicator player={winner} /> wins!
        </div>
      ) : (
        <div className="font-medium">
          <PlayerIndicator player={currentPlayer} />{"'s turn"}
        </div>
      )}
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white rounded-lg font-medium transition-colors cursor-pointer"
      >
        New Game
      </button>
    </div>
  );
}
