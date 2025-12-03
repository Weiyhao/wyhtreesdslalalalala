import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { Experience } from './Experience';
import { GestureInput } from './GestureInput';
import { useStore } from '../stores/useStore';
import manifest from '../assets-manifest.json';
import '../index.css';

export function App() {
  const { viewMode, toggleMode, manifest: stateManifest } = useStore();

  const hasMusic = stateManifest.music.length > 0;
  const photoCount = stateManifest.photos.length;

  const info = useMemo(
    () => ({
      photos: photoCount,
      music: stateManifest.music.length,
    }),
    [photoCount, stateManifest.music.length],
  );

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 14], fov: 50 }}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col gap-4 p-6 pointer-events-none">
        <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/60">
          <span>Christmas Memories Tree</span>
          <span className="text-white/40">·</span>
          <span>{viewMode}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/70">
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Photos: {info.photos}</span>
          <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Music: {info.music}</span>
        </div>
        <div className="pointer-events-auto flex gap-2">
          <button className="button" onClick={toggleMode}>Toggle CHAOS / TREE</button>
          <a className="button" href="/photos" target="_blank" rel="noreferrer">
            Open photos folder
          </a>
          <a className="button" href="/music" target="_blank" rel="noreferrer">
            Open music folder
          </a>
        </div>
        {!hasMusic && (
          <p className="text-white/50 text-sm">
            Add mp3/mp4 files into <code>public/music</code> and run <code>npm run scan</code> to include them.
          </p>
        )}
        {photoCount === 0 && (
          <p className="text-white/50 text-sm">
            Drop photos in <code>public/photos</code> with filenames like <code>2021_12_family.jpg</code> then run
            <code> npm run scan</code>.
          </p>
        )}
      </div>
      <GestureInput manifest={manifest} />
    </div>
  );
}
