import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { Board as BoardType, Move, Position } from '../game/types';
import { BOARD_SIZE } from '../game/constants';
import { Square3D } from './Square3D';

type Board3DProps = {
  board: BoardType;
  selectedPiece: Position | null;
  validMoves: Move[];
  onSquareClick: (position: Position) => void;
};

export function Board3D({ board, selectedPiece, validMoves, onSquareClick }: Board3DProps) {
  return (
    <div style={{ width: '80vmin', height: '80vmin' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 10, 8]} fov={50} />
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          minDistance={6}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={0.3}
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-3, 5, -3]} intensity={0.3} />

        {/* Board base */}
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[8, 0.2, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* Squares and pieces */}
        {Array.from({ length: BOARD_SIZE }, (_, row) =>
          Array.from({ length: BOARD_SIZE }, (_, col) => {
            const isDark = (row + col) % 2 !== 0;
            return (
              <Square3D
                key={`${row}-${col}`}
                row={row}
                col={col}
                piece={board[row][col]}
                isDark={isDark}
                isSelected={selectedPiece?.row === row && selectedPiece?.col === col}
                isValidMove={isDark && validMoves.some((m) => m.to.row === row && m.to.col === col)}
                onClick={() => onSquareClick({ row, col })}
              />
            );
          })
        )}
      </Canvas>
    </div>
  );
}
