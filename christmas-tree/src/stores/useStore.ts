import { create } from 'zustand';
import manifest from '../assets-manifest.json';
import type { AssetManifest, ViewMode } from '../types';

interface StoreState {
  manifest: AssetManifest;
  viewMode: ViewMode;
  focusedId?: string;
  isRotating: boolean;
  activeMusicIndex: number;
  setViewMode: (mode: ViewMode) => void;
  toggleMode: () => void;
  setFocusedId: (id?: string) => void;
  setRotating: (state: boolean) => void;
  nextTrack: () => void;
}

const DEFAULT_STATE: Pick<StoreState, 'viewMode' | 'isRotating' | 'activeMusicIndex'> = {
  viewMode: 'TREE',
  isRotating: false,
  activeMusicIndex: 0,
};

export const useStore = create<StoreState>((set, get) => ({
  manifest,
  ...DEFAULT_STATE,
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleMode: () => set({ viewMode: get().viewMode === 'TREE' ? 'CHAOS' : 'TREE' }),
  setFocusedId: (id) => set({ focusedId: id }),
  setRotating: (state) => set({ isRotating: state }),
  nextTrack: () => {
    const total = get().manifest.music.length;
    if (!total) return;
    const next = (get().activeMusicIndex + 1) % total;
    set({ activeMusicIndex: next });
  },
}));
