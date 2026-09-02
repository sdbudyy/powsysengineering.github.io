// One-off: downscale and re-encode the legacy site photos into tidy source
// assets. Astro then generates AVIF/WebP + srcset from these at build time.
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = '.src-images'; // originals archived here, not published
const OUT = 'src/assets/images';
await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (file === 'logo.png') continue;
  const name = file
    .replace(/\.(jpg|jpeg|png)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const out = path.join(OUT, `${name}.jpg`);
  const info = await sharp(path.join(SRC, file))
    .resize({ width: 1800, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`${name}.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
}
