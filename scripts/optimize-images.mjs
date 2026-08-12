#!/usr/bin/env node
/**
 * optimize:images
 * ---------------------------------------------------------------------------
 * Converts every raster original in src/assets/originals to WebP in
 * src/assets/optimized, at a set of widths suitable for srcset.
 *
 *   npm run optimize:images
 *   npm run optimize:images -- --widths 640,1280,1920 --quality 78
 *
 * Originals are never modified. Existing outputs are skipped unless the source
 * is newer, so re-running is cheap.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'src', 'assets', 'originals');
const OUTPUT_DIR = path.join(ROOT, 'src', 'assets', 'optimized');

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif']);

function parseArgs(argv) {
  const args = { widths: [640, 1024, 1536, 1920], quality: 76 };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--widths' && argv[i + 1]) {
      args.widths = argv[i + 1]
        .split(',')
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value) && value > 0)
        .sort((a, b) => a - b);
      i += 1;
    }
    if (argv[i] === '--quality' && argv[i + 1]) {
      args.quality = Math.min(100, Math.max(1, Number(argv[i + 1])));
      i += 1;
    }
  }
  return args;
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(full)));
    else if (SUPPORTED.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function isStale(source, target) {
  if (!existsSync(target)) return true;
  const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
  return sourceStat.mtimeMs > targetStat.mtimeMs;
}

async function main() {
  const { widths, quality } = parseArgs(process.argv.slice(2));

  if (!existsSync(SOURCE_DIR)) {
    await mkdir(SOURCE_DIR, { recursive: true });
    console.log(`Created ${path.relative(ROOT, SOURCE_DIR)} — drop original images in there and re-run.`);
    return;
  }

  const files = await collectFiles(SOURCE_DIR);
  if (files.length === 0) {
    console.log(`No images found in ${path.relative(ROOT, SOURCE_DIR)}. Nothing to do.`);
    return;
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  let written = 0;
  let skipped = 0;

  for (const file of files) {
    const relative = path.relative(SOURCE_DIR, file);
    const baseName = path.basename(relative, path.extname(relative));
    const outDir = path.join(OUTPUT_DIR, path.dirname(relative));
    await mkdir(outDir, { recursive: true });

    const metadata = await sharp(file).metadata();

    for (const width of widths) {
      // Never upscale past the original.
      if (metadata.width && width > metadata.width) continue;

      const target = path.join(outDir, `${baseName}-${width}.webp`);
      if (!(await isStale(file, target))) {
        skipped += 1;
        continue;
      }

      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(target);

      written += 1;
      console.log(`→ ${path.relative(ROOT, target)}`);
    }
  }

  console.log(`\nDone. ${written} written, ${skipped} up to date, from ${files.length} originals.`);
  console.log(`Widths: ${widths.join(', ')} · quality ${quality}`);
}

main().catch((error) => {
  console.error('optimize:images failed —', error.message);
  process.exitCode = 1;
});
