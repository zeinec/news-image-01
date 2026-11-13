// Copies the included news front page byte for byte into the competition output directory.
// The source image is stored beside this program as entry.png.
import { access, copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destinationPath = join(outputDir, 'entry.png');

try {
  await access(sourcePath);
} catch {
  throw new Error(`Source image does not exist: ${sourcePath}`);
}

await mkdir(outputDir, { recursive: true });
await copyFile(sourcePath, destinationPath);
const { size } = await stat(destinationPath);
console.log(`Wrote ${destinationPath} (${size} bytes)`);
