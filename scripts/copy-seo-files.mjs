import { copyFileSync, mkdirSync, existsSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const srcDir = resolve('client/public');
const outDir = resolve('dist/public');
mkdirSync(outDir, { recursive: true });

for (const file of ['sitemap.xml', 'robots.txt', 'seo-pages.css']) {
  const src = resolve(srcDir, file);
  const dest = resolve(outDir, file);
  if (!existsSync(src)) throw new Error(`Arquivo obrigatório ausente: ${src}`);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`SEO file copied: ${file}`);
}

for (const dir of ['rastreamento-veicular-belo-horizonte','rastreamento-de-frotas','rastreamento-de-motos','rastreamento-nautico']) {
  const src = resolve(srcDir, dir);
  const dest = resolve(outDir, dir);
  if (!existsSync(resolve(src, 'index.html'))) throw new Error(`Página SEO ausente: ${src}/index.html`);
  cpSync(src, dest, { recursive: true, force: true });
  console.log(`SEO page copied: ${dir}`);
}
