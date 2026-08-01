import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';

const targets = [
  './public/images/products',
  './public/images/gallery', // ajusta según tu estructura real
];

const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeDir(dir) {
  if (!existsSync(dir)) {
    console.log(`⚠ Carpeta no encontrada, se omite: ${dir}`);
    return;
  }

  const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of files) {
    const inputPath = join(dir, file);
    const outputPath = join(dir, `${basename(file, extname(file))}.webp`);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`✓ ${file} → ${basename(outputPath)}`);
  }
}

for (const dir of targets) {
  await optimizeDir(dir);
}

console.log('\nListo. Ahora actualiza las referencias .jpg/.png por .webp en tu código.');