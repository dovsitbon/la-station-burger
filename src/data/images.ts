/**
 * Banque d’images du site.
 *
 * IMPORTANT : les photos marquées `placeholder: true` sont des photos d’illustration
 * libres de droits (licence Unsplash) — elles NE montrent PAS les plats de La Station.
 * Le site affiche la mention « Photo d’illustration » sur chacune d’elles.
 * Pour les remplacer : déposer la photo du restaurant dans src/assets/photos/
 * sous le même nom de fichier, puis passer `placeholder` à false.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

type Photo = { src: ImageMetadata; alt: string; placeholder: boolean; credit?: string };

const meta: Record<string, { alt: string; placeholder: boolean; credit?: string }> = {
  'hero-burger': { alt: 'Double cheeseburger au cheddar fondant sur fond sombre', placeholder: true, credit: 'Unsplash' },
  'signature-burger': { alt: 'Burger généreux garni de viande effilochée et de fromage', placeholder: true, credit: 'Unsplash' },
  'burger-classic': { alt: 'Burger classique avec salade, tomate et cheddar', placeholder: true, credit: 'Unsplash' },
  'burger-grill': { alt: 'Burger double steak servi sur une assiette noire', placeholder: true, credit: 'Unsplash' },
  'burger-knife': { alt: 'Burger maintenu par un couteau planté au centre', placeholder: true, credit: 'Unsplash' },
  fries: { alt: 'Frites dorées servies dans un panier métallique', placeholder: true, credit: 'Unsplash' },
  hotdog: { alt: 'Hot-dog garni dans un pain brioché', placeholder: true, credit: 'Unsplash' },
  steak: { alt: 'Pièce de bœuf grillée tranchée avec pommes de terre', placeholder: true, credit: 'Unsplash' },
  milkshake: { alt: 'Milkshake chocolat garni de chantilly et de biscuits', placeholder: true, credit: 'Unsplash' },
  cheesecake: { alt: 'Part de cheesecake aux fruits rouges', placeholder: true, credit: 'Unsplash' },
  bagel: { alt: 'Bagels garnis de cream cheese', placeholder: true, credit: 'Unsplash' },
  'grill-fire': { alt: 'Steak saisi sur une grille au-dessus des flammes', placeholder: true, credit: 'Unsplash' },
};

export const photos: Record<string, Photo> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => {
    const key = path.split('/').pop()!.replace(/\.\w+$/, '');
    const m = meta[key] ?? { alt: '', placeholder: true };
    return [key, { src: mod.default, ...m }];
  }),
);

export function photo(key: string): Photo {
  const p = photos[key];
  if (!p) throw new Error(`Photo introuvable : ${key}`);
  return p;
}

/** Ordre de la galerie. */
export const gallery = [
  'hero-burger',
  'grill-fire',
  'signature-burger',
  'fries',
  'burger-knife',
  'steak',
  'burger-grill',
  'milkshake',
  'hotdog',
  'cheesecake',
  'burger-classic',
  'bagel',
];
