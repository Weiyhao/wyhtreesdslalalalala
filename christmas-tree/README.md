# Christmas Memories Tree

An immersive React Three Fiber experience that arranges your photo memories into a magical Christmas tree or chaotic snowstorm, with gesture controls powered by MediaPipe and sparkling post-processing effects.

## Prerequisites
- Node.js 18+ (recommended to match Vite 5 requirements)
- npm (ships with Node)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your assets:
   - Place photos in `public/photos/` using the `YYYY_MM_ID.jpg` naming pattern.
   - Place audio tracks in `public/music/` (mp3/mp4).
3. Generate the runtime asset manifest (required before dev/build so the app can find your media):
   ```bash
   npm run scan
   ```

## Local Development
Run the Vite dev server with hot reload:
```bash
npm run dev
```
The terminal will show a local URL (typically `http://localhost:5173`).

## Production Build
Create an optimized static bundle in `dist/`:
```bash
npm run build
```
For a local preview of the production build:
```bash
npm run preview
```

## Deploying
The app is a static site—deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, S3 + CDN, etc.). Ensure you run `npm run scan` **before** `npm run build` so `src/assets-manifest.json` is up to date with your `public/photos` and `public/music` content.
