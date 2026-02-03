import type { Player } from '../game/types';

type Piece3DProps = {
  player: Player;
  isKing: boolean;
  isSelected: boolean;
  position: [number, number, number];
};

export function Piece3D({ player, isKing, isSelected, position }: Piece3DProps) {
  const color = player === 'red' ? '#dc2626' : '#374151';
  const emissive = isSelected ? '#facc15' : '#000000';
  const emissiveIntensity = isSelected ? 0.6 : 0;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {isKing && (
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      )}
    </group>
  );
}
