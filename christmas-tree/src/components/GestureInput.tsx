import { useEffect } from 'react';
import { useStore } from '../stores/useStore';
import type { AssetManifest } from '../types';

interface Props {
  manifest: AssetManifest;
}

export function GestureInput({ manifest }: Props) {
  const { toggleMode, nextTrack, setFocusedId } = useStore();

  useEffect(() => {
    const onContext = (event: MouseEvent) => {
      event.preventDefault();
      toggleMode();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'm') toggleMode();
      if (event.key.toLowerCase() === 'n') nextTrack();
      if (event.key === 'Escape') setFocusedId(undefined);
    };

    window.addEventListener('contextmenu', onContext);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('contextmenu', onContext);
      window.removeEventListener('keydown', onKey);
    };
  }, [toggleMode, nextTrack, setFocusedId]);

  useEffect(() => {
    console.info('Manifest loaded', manifest);
  }, [manifest]);

  return null;
}
