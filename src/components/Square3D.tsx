import type { ThreeEvent } from '@react-three/fiber';
import type { Piece as PieceType } from '../game/types';
import { Piece3D } from './Piece3D';

type Square3DProps = {
  row: number;
  col: number;
  piece: PieceType | null;
  isDark: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
};

export function Square3D({ row, col, piece, isDark, isSelected, isValidMove, onClick }: Square3DProps) {
  const x = col - 3.5;
  const z = row - 3.5;
  const squareColor = isDark ? '#065f46' : '#fef3c7';

  const handleClick = isDark
    ? (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }
    : undefined;

  const handlePointerOver = isDark
    ? (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }
    : undefined;

  const handlePointerOut = isDark
    ? () => {
        document.body.style.cursor = 'default';
      }
    : undefined;

  return (
    <group
      position={[x, 0, z]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Square surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color={squareColor} />
      </mesh>

      {/* Piece */}
      {piece && (
        <Piece3D
          player={piece.player}
          isKing={piece.isKing}
          isSelected={isSelected}
          position={[0, 0.15, 0]}
        />
      )}

      {/* Valid move marker — empty square */}
      {isValidMove && !piece && (
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#facc15" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Valid move marker — capture target */}
      {isValidMove && piece && (
        <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.04, 8, 32]} />
          <meshStandardMaterial color="#facc15" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}
