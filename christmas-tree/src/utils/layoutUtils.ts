import type { PhotoAsset, ViewMode } from '../types';

export interface LayoutPoint {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

const TAU = Math.PI * 2;

export function fibonacciOnCone(index: number, total: number, height = 12, radius = 4): [number, number, number] {
  const ratio = (index + 0.5) / total;
  const y = -height / 2 + ratio * height;
  const angle = ratio * TAU * total * 0.5;
  const r = radius * (1 - ratio * 0.9);
  const x = Math.cos(angle) * r;
  const z = Math.sin(angle) * r;
  return [x, y, z];
}

export function randomPoint(radius = 12): [number, number, number] {
  const u = Math.random();
  const v = Math.random();
  const theta = u * TAU;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(Math.random());
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  return [x, y, z];
}

export function randomRotation(): [number, number, number] {
  return [Math.random() * TAU, Math.random() * TAU, Math.random() * TAU];
}

export function buildLayout(photos: PhotoAsset[], mode: ViewMode): LayoutPoint[] {
  if (mode === 'TREE') {
    return photos.map((photo, index) => ({
      id: photo.id,
      position: fibonacciOnCone(index, photos.length),
      rotation: [0, 0, 0],
    }));
  }

  return photos.map((photo) => ({
    id: photo.id,
    position: randomPoint(),
    rotation: randomRotation(),
  }));
}
