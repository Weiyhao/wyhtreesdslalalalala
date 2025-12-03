import { DepthOfField, Noise } from '@react-three/postprocessing';

export function TechEffects() {
  return (
    <>
      <DepthOfField focusDistance={0.025} focalLength={0.02} bokehScale={2.5} height={480} />
      <Noise opacity={0.05} />
    </>
  );
}
