// Contrôle SEO statique du dossier dist/ (après `npm run build`) : node scripts/seo-check.mjs
import { readFileSync, existsSync, globSync } from 'node:fs';
import { sep } from 'node:path';

const norm = (p) => p.split(sep).join('/');
const pages = globSync('dist/**/*.html').map(norm);
const routes = new Set(pages.map((p) => '/' + p.replace(/^dist\//, '').replace(/index\.html$/, '').replace(/\.html$/, '')));
let problems = 0;
const warn = (p, m) => {
  problems++;
  console.log(`  ! ${p}: ${m}`);
};

for (const p of pages) {
  const h = readFileSync(p, 'utf8');
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((i) => !/\balt[\s=>]/.test(i)).length;
  const noDim = imgs.filter((i) => !/\bwidth=/.test(i) && !i.includes('data-lightbox-img')).length;
  const types = [];
  for (const [, j] of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      types.push(JSON.parse(j)['@type']);
    } catch {
      warn(p, 'JSON-LD invalide');
    }
  }
  console.log(`${p}\n  title(${title.length}): ${title}\n  desc(${desc.length}) h1=${h1} img=${imgs.length} ld=[${types}]`);
  if (!title || title.length > 70) warn(p, 'titre absent ou > 70 caractères');
  if (desc.length < 70 || desc.length > 170) warn(p, `description de ${desc.length} caractères`);
  if (h1 !== 1) warn(p, `${h1} H1`);
  if (!canon) warn(p, 'canonical absent');
  if (noAlt) warn(p, `${noAlt} image(s) sans alt`);
  if (noDim) warn(p, `${noDim} image(s) sans dimensions`);
  for (const [, href] of h.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith('/api/')) continue;
    if (/\.[a-z0-9]+$/.test(href)) {
      if (!existsSync('dist' + decodeURI(href))) warn(p, `ressource manquante ${href}`);
    } else if (!routes.has(href) && !routes.has(href + '/')) {
      warn(p, `lien interne cassé ${href}`);
    }
  }
}
console.log(problems ? `\n${problems} problème(s)` : '\nAucun problème détecté.');
process.exitCode = problems ? 1 : 0;
