# Checkers

A two-player, turn-based American checkers game with a 3D board, built with React, TypeScript, React Three Fiber, and Tailwind CSS.

## How to Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To build for production:

```bash
npm run build
```

## How to Play

Click a piece to select it (it glows yellow). Valid move destinations appear as translucent yellow markers on the board. Click a marker to move. Drag to rotate the camera around the board and scroll to zoom.

Red moves first. Players alternate turns.

## Rules (American / English Checkers)

- **Board**: 8x8 board. Pieces move only on dark squares.
- **Movement**: Regular pieces move one square diagonally forward. Kings move one square diagonally in any direction.
- **Jumping**: If a piece can jump over an adjacent opponent piece to an empty square beyond, it captures that piece. The captured piece is removed from the board.
- **Mandatory jumps**: If a jump is available, you must take it. If multiple pieces can jump, you choose which one.
- **Multi-jump chains**: After a jump, if the same piece can jump again from its new position, it must continue jumping. The turn does not end until no more jumps are available.
- **King promotion**: A piece that reaches the opposite end of the board becomes a king. A newly promoted king's turn ends immediately — it does not continue jumping even if a jump would be available.
- **Winning**: You win when your opponent has no pieces left or no legal moves.

## Project Structure

```
src/
  game/              # Domain layer — pure TypeScript, no React dependencies
    types.ts         # Type definitions (Player, Piece, Board, Move, GameState)
    constants.ts     # Board size, king rows, forward directions
    board.ts         # Board initialization and cloning
    moves.ts         # Move generation, jump detection, mandatory jump enforcement
    rules.ts         # Move execution, king promotion, win detection
    reducer.ts       # Game state machine (useReducer-compatible)
  hooks/
    useGame.ts       # React hook bridging domain logic to UI via useReducer
  components/
    Game.tsx          # Top-level container
    Board3D.tsx       # 3D scene: Canvas, camera, lights, board base, square iteration
    Square3D.tsx      # 3D square mesh with click handling and valid-move markers
    Piece3D.tsx       # 3D cylinder piece with king crown and selection glow
    GameStatus.tsx    # Turn display, winner announcement, new game button
```

All game logic lives in `src/game/` as pure functions with no framework dependencies. The 3D scene in `src/components/` uses React Three Fiber for rendering. The `useGame` hook connects the two via `useReducer`.
