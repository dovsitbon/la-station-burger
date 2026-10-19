// Génère favicons, logo public et image Open Graph à partir du logo officiel.
// Usage : node scripts/generate-assets.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const logo = 'src/assets/brand/logo-la-station.png';
const out = 'public/';

await sharp(logo).resize(512, 512).png().toFile(out + 'logo-la-station.png');
await sharp(logo).resize(180, 180).flatten({ background: '#0f0d0b' }).png().toFile(out + 'apple-touch-icon.png');
await sharp(logo).resize(32, 32).png().toFile(out + 'favicon-32.png');
await sharp(logo).resize(192, 192).png().toFile(out + 'icon-192.png');
await sharp(logo).resize(512, 512).png().toFile(out + 'icon-512.png');

writeFileSync(
  out + 'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="#0f0d0b" stroke="#cf8a50" stroke-width="2"/><text x="32" y="43" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#f3eadb">S</text></svg>`,
);

const W = 1200, H = 630;
const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f0d0b"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#cf8a50" stroke-opacity=".5"/>
  <text x="600" y="455" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="6" fill="#cf8a50">BURGER GOURMET · STEAK HOUSE</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#f3eadb">41 rue de la Gare · Deuil-la-Barre</text>
  <text x="600" y="565" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#bdb09d">Vainqueur Île-de-France · Coupe de France du Burger 2025</text>
</svg>`);
const logoBuf = await sharp(logo).resize(340, 340).png().toBuffer();
await sharp(text)
  .composite([{ input: logoBuf, top: 50, left: 430 }])
  .jpeg({ quality: 85 })
  .toFile(out + 'og-image.jpg');

console.log('assets ok');
