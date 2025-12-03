import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Group } from 'three';
import { forwardRef, useRef } from 'react';
import { TreeSystem } from './TreeSystem';
import { TextEffect } from './TextEffect';
import { TechEffects } from './TechEffects';
import { CrystalOrnaments } from './CrystalOrnaments';

export const Experience = forwardRef<Group>(function Experience(_, ref) {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={ref ?? groupRef}>
      <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
      <color attach="background" args={[0x04050a]} />
      <hemisphereLight intensity={0.6} groundColor={'#0a0a12'} />
      <directionalLight position={[4, 8, 4]} intensity={1.2} castShadow />
      <Stars radius={80} depth={40} count={5000} factor={4} saturation={0} fade speed={1} />
      <CrystalOrnaments />
      <TreeSystem />
      <TextEffect />
      <TechEffects />
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} mipmapBlur />
        <Vignette darkness={0.7} offset={0.2} />
      </EffectComposer>
      <OrbitControls enableRotate enableZoom enablePan={false} />
    </group>
  );
});
