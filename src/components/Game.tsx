import { useGame } from '../hooks/useGame';
import { Board } from './Board';
import { GameStatus } from './GameStatus';

export function Game() {
  const {
    board,
    currentPlayer,
    selectedPiece,
    validMoves,
    winner,
    handleSquareClick,
    resetGame,
  } = useGame();

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-amber-100">Checkers</h1>
      <GameStatus currentPlayer={currentPlayer} winner={winner} onReset={resetGame} />
      <Board
        board={board}
        selectedPiece={selectedPiece}
        validMoves={validMoves}
        onSquareClick={handleSquareClick}
      />
    </div>
  );
}
