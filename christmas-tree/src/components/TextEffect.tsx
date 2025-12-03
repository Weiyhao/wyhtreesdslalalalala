import { Text3D } from '@react-three/drei';
import { useMemo } from 'react';
import { Color } from 'three';

export function TextEffect() {
  const color = useMemo(() => new Color('#ffffff'), []);

  return (
    <group position={[0, 5, 0]}>
      <Text3D
        position={[-4.5, 0, 0]}
        font="https://assets.codepen.io/2017324/noto-sans-sc.json"
        size={0.8}
        height={0.1}
        curveSegments={8}
      >
        温雅涵的回忆圣诞树
        <meshStandardMaterial color={color} />
      </Text3D>
    </group>
  );
}
