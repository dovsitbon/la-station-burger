// Cohérence des données éditables (carte, horaires) — protège contre les erreurs de saisie.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { menu, highlights } from '../src/data/menu.ts';
import { site, groupedHours } from '../src/data/site.ts';

test('chaque catégorie a un identifiant unique et des produits', () => {
  const ids = menu.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const c of menu) assert.ok(c.items.length > 0, c.id);
});

test('les prix sont positifs et le menu coûte plus cher que le produit seul', () => {
  for (const item of menu.flatMap((c) => c.items)) {
    if (item.price !== undefined) assert.ok(item.price > 0 && item.price < 100, item.name);
    if (item.menuPrice !== undefined) assert.ok(item.menuPrice > (item.price ?? 0), item.name);
  }
});

test("les produits mis en avant sur l'accueil existent dans la carte", () => {
  const names = new Set(menu.flatMap((c) => c.items.map((i) => i.name)));
  for (const h of highlights) assert.ok(names.has(h), h);
});

test('les horaires couvrent les 7 jours avec une ouverture avant la fermeture', () => {
  assert.deepEqual([...site.hours.map((h) => h.day)].sort(), [0, 1, 2, 3, 4, 5, 6]);
  for (const h of site.hours) assert.ok(h.open < h.close, h.label);
  assert.deepEqual(groupedHours(), [
    { days: 'Lun. – Sam.', time: '11h – 22h30' },
    { days: 'Dimanche', time: '18h – 22h30' },
  ]);
});
