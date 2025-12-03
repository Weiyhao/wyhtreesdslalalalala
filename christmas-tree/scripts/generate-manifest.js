import { promises as fs } from 'fs';
import path from 'path';

const PHOTOS_DIR = path.resolve('public/photos');
const MUSIC_DIR = path.resolve('public/music');
const OUTPUT = path.resolve('src/assets-manifest.json');

const PHOTO_REGEX = /(\d{4})_(\d{2})_([A-Za-z0-9-]+)\.(jpg|jpeg|png)$/i;

async function readDirSafe(dir) {
  try {
    const entries = await fs.readdir(dir);
    return entries;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function parsePhotoFilename(fileName) {
  const match = PHOTO_REGEX.exec(fileName);
  if (!match) return null;
  const [_, year, month, id, ext] = match;
  const date = `${year}-${month}`;
  return {
    id,
    date,
    fileName,
    path: `/photos/${fileName}`,
    type: ext.toLowerCase(),
  };
}

async function buildPhotos() {
  const files = await readDirSafe(PHOTOS_DIR);
  const parsed = files
    .map(parsePhotoFilename)
    .filter(Boolean)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
  return parsed;
}

async function buildMusic() {
  const files = await readDirSafe(MUSIC_DIR);
  return files
    .filter((file) => /\.(mp3|mp4|wav|m4a)$/i.test(file))
    .map((file) => ({
      fileName: file,
      path: `/music/${file}`,
    }));
}

async function ensureOutputDir() {
  const dir = path.dirname(OUTPUT);
  await fs.mkdir(dir, { recursive: true });
}

async function writeManifest(manifest) {
  await ensureOutputDir();
  const json = JSON.stringify(manifest, null, 2);
  await fs.writeFile(OUTPUT, json, 'utf-8');
  console.log(`Manifest written to ${OUTPUT}`);
}

async function main() {
  const [photos, music] = await Promise.all([buildPhotos(), buildMusic()]);
  await writeManifest({ photos, music, generatedAt: new Date().toISOString() });
}

main().catch((error) => {
  console.error('Failed to generate manifest:', error);
  process.exit(1);
});
