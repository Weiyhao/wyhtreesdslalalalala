import { Html, useTexture } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { useMemo } from 'react';
import type { PhotoAsset } from '../types';

interface Props {
  photo: PhotoAsset;
  position: [number, number, number];
  rotation: [number, number, number];
}

export function PhotoNode({ photo, position, rotation }: Props) {
  const texture = useTexture(photo.path, undefined, (error) => console.warn('Texture load error', error));
  const spring = useSpring({ position, rotation, config: { tension: 70, friction: 18 } });

  const borderMaterial = useMemo(() => (
    <meshStandardMaterial color="#f5f7fa" />
  ), []);

  return (
    <animated.group position={spring.position} rotation={spring.rotation}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1.8, 1.2]} />
        {texture ? <meshBasicMaterial map={texture} toneMapped={false} /> : <meshStandardMaterial color="#cdd7e3" />}
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.9, 1.3]} />
        {borderMaterial}
      </mesh>
      <Html center distanceFactor={10} position={[0, -0.9, 0]} className="text-xs text-white/80">
        {photo.date}
      </Html>
    </animated.group>
  );
}
