import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const files = ['sitemap.xml', 'robots.txt'];
const srcDir = resolve('client/public');
const outDir = resolve('dist/public');
mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const src = resolve(srcDir, file);
  const dest = resolve(outDir, file);
  if (!existsSync(src)) throw new Error(`Arquivo obrigatório ausente: ${src}`);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`SEO file copied: ${file}`);
}
