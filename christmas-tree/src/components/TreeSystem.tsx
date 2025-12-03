import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PhotoNode } from './PhotoNode';
import { useStore } from '../stores/useStore';
import { buildLayout } from '../utils/layoutUtils';

export function TreeSystem() {
  const { manifest, viewMode } = useStore();

  const layout = useMemo(() => buildLayout(manifest.photos, viewMode), [manifest.photos, viewMode]);

  useFrame((state) => {
    state.scene.rotation.y += viewMode === 'TREE' ? 0.0005 : 0.0015;
  });

  return (
    <group name="tree-system">
      {layout.map((item) => {
        const photo = manifest.photos.find((p) => p.id === item.id);
        if (!photo) return null;
        return <PhotoNode key={item.id} photo={photo} position={item.position} rotation={item.rotation} />;
      })}
    </group>
  );
}
