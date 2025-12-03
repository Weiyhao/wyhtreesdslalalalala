import { Points, PointMaterial } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export function CrystalOrnaments() {
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i += 3) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <Points positions={positions} frustumCulled={false}>
      <PointMaterial color="#b6f0ff" size={0.05} depthWrite={false} transparent blending={THREE.AdditiveBlending} />
    </Points>
  );
}
