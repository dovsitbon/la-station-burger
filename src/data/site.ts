/**
 * Configuration centrale du site — coordonnées, horaires, liens, réglages.
 * Toutes les informations publiques du restaurant se modifient ici.
 * Chaque donnée est accompagnée de sa source (voir docs/SOURCES.md).
 */

export const site = {
  /**
   * Mode « proposition commerciale » :
   * - affiche un bandeau indiquant que le site n’est pas encore validé par le restaurant ;
   * - empêche l’indexation (meta robots noindex + robots.txt Disallow).
   * À passer à `false` une fois le site validé par le gérant et le domaine branché.
   */
  proposalMode: true,

  /** URL publique canonique (sans slash final). Surchargée par la variable SITE_URL au build. */
  url: 'https://la-station-burger.vercel.app',

  name: 'La Station Burger',
  shortName: 'La Station',
  tagline: 'Burger gourmet · Steak house',
  description:
    "Burgers gourmets, steakhouse, hot-dogs et bagels à Deuil-la-Barre (95). Steak frais, pain frais, frites fraîches maison. Vainqueur Île-de-France de la Coupe de France du Burger 2025.",

  address: {
    street: '41 rue de la Gare',
    postalCode: '95170',
    city: 'Deuil-la-Barre',
    region: "Île-de-France",
    department: "Val-d’Oise",
    country: 'FR',
  },

  phone: {
    display: '01 34 05 34 75',
    e164: '+33134053475',
  },

  /** Adresse publiée sur la page Facebook officielle et la fiche Uber Eats. */
  email: 'sarl.amiburger@gmail.com',

  /**
   * Horaires d’ouverture (bio Instagram officielle, octobre 2026 ;
   * confirmés par la carte 2025 et Le Bonbon pour la semaine).
   * day: 0 = dimanche … 6 = samedi. Format 24 h « HH:MM ».
   */
  hours: [
    { day: 1, label: 'Lundi', open: '11:00', close: '22:30' },
    { day: 2, label: 'Mardi', open: '11:00', close: '22:30' },
    { day: 3, label: 'Mercredi', open: '11:00', close: '22:30' },
    { day: 4, label: 'Jeudi', open: '11:00', close: '22:30' },
    { day: 5, label: 'Vendredi', open: '11:00', close: '22:30' },
    { day: 6, label: 'Samedi', open: '11:00', close: '22:30' },
    { day: 0, label: 'Dimanche', open: '18:00', close: '22:30' },
  ],

  /** Moyens de paiement (mention imprimée sur la carte 2025). */
  payment: ['Carte bancaire', 'Titres-restaurant'],
  paymentNote: 'Les chèques ne sont pas acceptés.',

  /** Mention « حلال » (halal) de la bio Instagram officielle. */
  halalMention: true,

  access: {
    train:
      'Gare de Deuil–Montmagny (Transilien ligne H, depuis Paris-Gare du Nord), dans la rue de la Gare.',
  },

  social: {
    instagram: { label: 'Instagram', handle: '@lastationburger', url: 'https://www.instagram.com/lastationburger/' },
    facebook: { label: 'Facebook', handle: 'La Station Burger', url: 'https://www.facebook.com/profile.php?id=100064163288844' },
    linktree: { label: 'Linktree', handle: 'LaStationBurger', url: 'https://linktr.ee/LaStationBurger' },
  },

  /** Plateformes de commande officielles (liens publiés sur le Linktree du restaurant). */
  ordering: [
    {
      id: 'ubereats',
      label: 'Uber Eats',
      url: 'https://www.ubereats.com/fr/store/la-station/g2-u4jKHRC2ZrgbXlZ1WOA',
      note: 'Livraison',
      enabled: true,
    },
    {
      id: 'deliveroo',
      label: 'Deliveroo',
      url: 'https://deliveroo.fr/fr/menu/Paris/groslay-deuil-la-barre/la-station-manoukian',
      note: 'Livraison',
      enabled: true,
    },
    {
      /** Fiche TheFork existante ; réservation en ligne à confirmer avec le restaurant avant activation. */
      id: 'thefork',
      label: 'TheFork',
      url: 'https://www.thefork.fr/restaurant/la-station-burger-r710591',
      note: 'Réservation en ligne',
      enabled: false,
    },
  ],

  /** Carte officielle 2025 publiée sur le Linktree (PDF). */
  menuPdfUrl: 'https://ugc.production.linktr.ee/f3838efc-283e-4236-8ca6-d3c2a6239aa9_STATION-30x30-20255.pdf',
  menuUpdated: '2025',

  award: {
    title: 'Vainqueur Île-de-France — Coupe de France du Burger 2025',
    short: 'Vainqueur IDF · Coupe de France du Burger 2025',
    organiser: 'Socopa',
    burger: 'Le Tissot de la Varenne',
    detail:
      "Finale régionale Île-de-France remportée avec « Le Tissot de la Varenne » ; 5e place lors de la finale nationale du 2 avril 2025 à Paris (Snack Show). Thème de l’édition : le burger bistronomique.",
  },

  /** Informations légales (fiche commerçant Uber Eats). À vérifier avec le gérant. */
  legal: {
    company: 'SARL AMIBURGER',
    siret: '884 458 076 00020',
    registeredAddress: '16 avenue du Commandant Manoukian, 95170 Deuil-la-Barre',
    publicationDirector: 'À compléter',
    host: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com',
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}`;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.name}, ${fullAddress}`,
)}&output=embed`;

export const telHref = `tel:${site.phone.e164}`;

export const activeOrdering = site.ordering.filter((o) => o.enabled);

/** Regroupe les jours aux horaires identiques : « Lun – Sam · 11h – 22h30 ». */
export function groupedHours() {
  const fmt = (t: string) => t.replace(':00', 'h').replace(':', 'h');
  const groups: { days: string; time: string }[] = [];
  let i = 0;
  const h = site.hours;
  while (i < h.length) {
    let j = i;
    while (j + 1 < h.length && h[j + 1].open === h[i].open && h[j + 1].close === h[i].close) j++;
    const days = i === j ? h[i].label : `${h[i].label.slice(0, 3)}. – ${h[j].label.slice(0, 3)}.`;
    groups.push({ days, time: `${fmt(h[i].open)} – ${fmt(h[i].close)}` });
    i = j + 1;
  }
  return groups;
}
