export type Player = 'red' | 'black';

export type Position = {
  row: number;
  col: number;
};

export type Piece = {
  player: Player;
  isKing: boolean;
};

export type Square = Piece | null;

export type Board = Square[][];

export type Move = {
  from: Position;
  to: Position;
  captured?: Position;
};

export type GameState = {
  board: Board;
  currentPlayer: Player;
  selectedPiece: Position | null;
  validMoves: Move[];
  mustContinueJump: Position | null;
  winner: Player | null;
  status: 'playing' | 'won';
};

export type GameAction =
  | { type: 'SELECT_PIECE'; position: Position }
  | { type: 'MOVE_PIECE'; move: Move }
  | { type: 'RESET_GAME' };
