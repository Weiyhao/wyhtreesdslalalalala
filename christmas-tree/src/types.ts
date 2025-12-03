export type ViewMode = 'CHAOS' | 'TREE';

export interface PhotoAsset {
  id: string;
  date: string;
  fileName: string;
  path: string;
  type?: string;
}

export interface MusicAsset {
  fileName: string;
  path: string;
}

export interface InteractionState {
  viewMode: ViewMode;
  focusedId?: string;
  isRotating: boolean;
  cursor3D?: [number, number, number];
}

export interface AssetManifest {
  photos: PhotoAsset[];
  music: MusicAsset[];
  generatedAt?: string;
}
