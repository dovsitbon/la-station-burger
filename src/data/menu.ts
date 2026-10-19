/**
 * Carte du restaurant — transcrite depuis la carte officielle 2025
 * (PDF « STATION-30x30-2025 » publié sur linktr.ee/LaStationBurger).
 *
 * Prix sur place / à emporter. Les prix des plateformes de livraison sont différents.
 * `confirm: true` = information à faire valider par le restaurant (lecture incertaine
 * sur la carte ou nom de produit non imprimé).
 */

export type MenuItem = {
  name: string;
  description?: string;
  /** Prix seul, en euros. */
  price?: number;
  /** Prix en menu (frites + boisson classique), en euros. */
  menuPrice?: number;
  tags?: ('signature' | 'spicy' | 'veggie' | 'fish' | 'chicken' | 'new')[];
  confirm?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  intro?: string;
  /** Explication de la colonne « menu » quand elle existe. */
  menuNote?: string;
  image?: string;
  items: MenuItem[];
  footnote?: string;
};

const MENU_NOTE = 'Menu : avec frites fraîches maison et une boisson classique (33 cl).';

export const menu: MenuCategory[] = [
  {
    id: 'signature',
    title: 'Le burger primé',
    intro: 'Vainqueur Île-de-France de la Coupe de France du Burger 2025.',
    menuNote: MENU_NOTE,
    image: 'signature-burger',
    items: [
      {
        name: 'Le Tissot de la Varenne',
        description:
          "Pain brioché façon carrot cake, steak du boucher 130 g, bœuf effiloché ultra-fondant, pickles de carotte au cumin, kumquat confit au miel, cheddar noir maturé, sauce crémeuse issue de son jus de cuisson, pomme paille.",
        price: 13.9,
        menuPrice: 17.9,
        tags: ['signature'],
      },
    ],
  },
  {
    id: 'burgers',
    title: 'Les burgers',
    intro: 'Frites fraîches, pain frais, steak frais.',
    menuNote: MENU_NOTE,
    image: 'burger-grill',
    items: [
      {
        name: "L’Original",
        description: 'Steak du boucher 100 g, cheddar, salade, tomate, cornichons, ketchup, moutarde américaine.',
        price: 8.9,
        menuPrice: 12.9,
      },
      {
        name: 'Chicken',
        description: 'Filet de poulet mariné, cheddar, salade, tomate, oignons confits, sauce curry.',
        price: 8.9,
        menuPrice: 12.9,
        tags: ['chicken'],
      },
      {
        name: 'Queens',
        description: 'Steak du boucher 130 g, double cheddar, salade, tomate, oignons confits, sauce maison.',
        price: 9.5,
        menuPrice: 13.5,
      },
      {
        name: 'Little Italy',
        description: 'Steak du boucher 130 g, burrata, tomates séchées, green sauce, salade.',
        price: 11.9,
        menuPrice: 15.9,
      },
      {
        name: 'Honey Goat',
        description: 'Steak du boucher 130 g, cheddar, fromage de chèvre, miel, noix, salade, tomate, oignons confits.',
        price: 9.9,
        menuPrice: 13.9,
      },
      {
        name: 'Blue Cheese',
        description: 'Steak du boucher 130 g, blue cheese, salade, tomate, oignons confits, sauce maison.',
        price: 9.9,
        menuPrice: 13.9,
      },
      {
        name: 'Le Montagnard',
        description:
          'Steak du boucher 130 g, bacon, salade, tomate, oignons confits, fromage à raclette, galette de pomme de terre, sauce maison.',
        price: 11.9,
        menuPrice: 15.9,
      },
      {
        name: 'Chicken Crispy',
        description: 'Filet de poulet pané, cheddar, salade, tomate, jalapeños, oignons confits, sauce spicy maison.',
        price: 9.9,
        menuPrice: 13.9,
        tags: ['spicy', 'chicken'],
      },
      {
        name: 'Santa Cruz',
        description: 'Steak du boucher 130 g, cheddar, jalapeños, salade, tomate, oignons confits, sauce spicy maison.',
        price: 9.9,
        menuPrice: 13.9,
        tags: ['spicy'],
      },
    ],
  },
  {
    id: 'gourmands',
    title: 'Les gourmands',
    menuNote: MENU_NOTE,
    image: 'hero-burger',
    items: [
      {
        name: 'La Station',
        description:
          'Steak du boucher 130 g, cheddar, bacon, œuf, salade, tomate, oignons confits, cornichons, sauce maison.',
        price: 10.9,
        menuPrice: 14.9,
      },
      {
        name: 'Brooklyn',
        description: 'Steak du boucher 130 g, cheddar, bacon, salade, tomate, oignons confits, sauce BBQ miel.',
        price: 9.9,
        menuPrice: 13.9,
      },
      {
        name: "King’s",
        description: '2 steaks du boucher 100 g, double cheddar, bacon, salade, tomate, oignons confits, sauce maison.',
        price: 11.9,
        menuPrice: 15.9,
      },
      {
        name: 'Green',
        description:
          'Mozzarella panée, aubergines grillées, salade, tomate, cornichons, oignons confits, sauce maison et green sauce.',
        price: 9.9,
        menuPrice: 13.9,
        tags: ['veggie'],
        confirm: 'Nom du burger non lisible sur la carte 2025 (« Green Burger » sur PagesJaunes).',
      },
      {
        name: 'Fish',
        description: 'Filet de cabillaud pané, cheddar, salade, tomate, sauce blanche maison aux herbes.',
        price: 8.9,
        menuPrice: 12.9,
        tags: ['fish'],
        confirm: 'Nom du burger non lisible sur la carte 2025.',
      },
    ],
  },
  {
    id: 'steakhouse',
    title: 'Steakhouse',
    intro: "Le goût d’une viande passe avant tout par sa cuisson : à vous de choisir la vôtre.",
    image: 'steak',
    items: [
      { name: 'Entrecôte', price: 17.9 },
      { name: 'Filet de poulet', description: 'Marinade maison.', price: 13.9, tags: ['chicken'] },
      {
        name: 'Pièce du boucher',
        description: 'Choisie en fonction des arrivages de viande.',
        price: 18.9,
        confirm: 'Prix peu lisible sur la carte (18,90 €).',
      },
      {
        name: 'Fish & chips',
        description:
          "Filet de cabillaud pané à l’anglaise, frites croustillantes maison, salade verte, tomate, concombre, oignons frits, quartier de citron et sauce tartare.",
        price: 13.9,
        tags: ['fish'],
      },
    ],
    footnote:
      'Accompagnement au choix : frites fraîches maison, légumes du moment ou salade. Sauce au choix : poivre, roquefort ou échalote.',
  },
  {
    id: 'hot-dogs',
    title: 'Les hot-dogs',
    menuNote: MENU_NOTE,
    image: 'hotdog',
    items: [
      {
        name: 'Chicago',
        description: 'Pain hot-dog brioché, saucisse de volaille, sauce barbecue miel, oignons frits.',
        price: 5.4,
        menuPrice: 9.3,
      },
      {
        name: 'New Yorkais',
        description: 'Pain hot-dog brioché, saucisse de volaille, moutarde américaine, ketchup, oignons frits.',
        price: 5.4,
        menuPrice: 9.3,
      },
      {
        name: 'Miami',
        description: 'Pain hot-dog brioché, saucisse de volaille, tomates séchées, oignons frits, avocat, green sauce.',
        price: 6.9,
        menuPrice: 10.9,
      },
      {
        name: 'Coney Island',
        description:
          'Pain hot-dog brioché, saucisse de volaille, cheddar, chili con carne, oignons frits, moutarde américaine.',
        price: 6.9,
        menuPrice: 10.9,
        tags: ['spicy'],
      },
    ],
  },
  {
    id: 'bagels',
    title: 'Les bagels',
    menuNote: MENU_NOTE,
    image: 'bagel',
    items: [
      {
        name: 'Rome',
        description: 'Pain bagel, cream cheese, burrata, oignons frits, salade, tomate, concombre.',
        price: 5.6,
        menuPrice: 9.6,
        tags: ['veggie'],
      },
      {
        name: 'Oslo',
        description: 'Pain bagel, cream cheese, saumon fumé, salade, tomate, concombre, oignons confits, citron.',
        price: 6.9,
        menuPrice: 10.9,
        tags: ['fish'],
      },
      {
        name: 'Dublin',
        description: 'Pain bagel, thon, mayonnaise, avocat, tomate, oignons frits, concombre.',
        price: 6.9,
        menuPrice: 10.9,
        tags: ['fish'],
      },
      {
        name: 'Buffalo',
        description: 'Pain bagel, bœuf fumé, bacon, salade, tomate, oignons confits, sauce barbecue.',
        price: 6.9,
        menuPrice: 10.9,
      },
    ],
  },
  {
    id: 'starters-frites',
    title: 'Starters & frites',
    image: 'fries',
    items: [
      { name: 'Crispy tenders', description: '4 pièces.', price: 5.9, tags: ['chicken'] },
      { name: 'Mozzarella panée', description: '4 pièces.', price: 5.5, tags: ['veggie'] },
      {
        name: 'Frites fraîches maison',
        description:
          'Pommes de terre de la région, double cuisson. Suppléments gourmands : cheddar, bacon, cheddar-bacon ou chili con carne.',
        price: 3.9,
        confirm: 'Prix des suppléments illisibles sur la carte : non affichés.',
      },
    ],
  },
  {
    id: 'salades',
    title: 'Les salades',
    items: [
      {
        name: 'Nordique',
        description: 'Salade, tomate, concombre, avocat, saumon fumé, oignons frits, sauce salade, quartier de citron.',
        price: 10.5,
        tags: ['fish'],
      },
      {
        name: 'Latina',
        description: 'Salade, tomate, concombre, poulet mariné, oignons confits, jalapeños, sauce salade.',
        price: 10.5,
        tags: ['spicy', 'chicken'],
      },
      {
        name: 'Roma',
        description: 'Salade, tomate, concombre, burrata, aubergines grillées, oignons frits, sauce salade.',
        price: 10.5,
        tags: ['veggie'],
      },
    ],
  },
  {
    id: 'menus',
    title: 'Menus midi & enfant',
    items: [
      {
        name: 'Menu midi burger',
        description: "L’Original ou le Chicken, une portion de frites et une boisson soft. Du lundi au vendredi, le midi.",
        price: 9.9,
        confirm: 'Prix et créneau horaire peu lisibles sur la carte (9,90 €).',
      },
      {
        name: 'Menu midi hot-dog',
        description: 'Le New York ou le Chicago, une portion de frites et une boisson soft. Du lundi au vendredi, le midi.',
        price: 7.9,
        confirm: 'Prix et créneau horaire peu lisibles sur la carte (7,90 €).',
      },
      {
        name: 'Menu enfant',
        description: '1 cheeseburger ou 5 nuggets, une portion de frites et un Capri-Sun ou une bouteille d’eau.',
        price: 7.5,
      },
    ],
  },
  {
    id: 'desserts',
    title: 'Les desserts',
    intro: 'Nos desserts sont réalisés par notre pâtissière professionnelle.',
    image: 'cheesecake',
    items: [
      {
        name: 'Original cheesecake',
        description: 'Au choix : fruits rouges et coulis de fruits rouges, caramel et spéculoos, ou Oreo.',
        price: 4.9,
      },
      { name: "L’onctueux tiramisu", description: 'Nutella, ou caramel et spéculoos.', price: 3.9 },
      { name: 'Le tendre moelleux', description: 'Au chocolat.', price: 3.9 },
      { name: 'Le gourmand brownie', description: 'Au chocolat et aux noix.', price: 3.9 },
      { name: 'Le craquant cookie', description: 'Kinder Bueno, M&M’s ou pistache.', price: 2.9 },
    ],
    footnote: 'Demandez les desserts du moment.',
  },
  {
    id: 'smoothies-milkshakes',
    title: 'Smoothies & milkshakes',
    image: 'milkshake',
    items: [
      { name: 'Smoothie Exotic', description: 'Mangue, ananas, orange.', price: 5.5 },
      { name: 'Smoothie Passion coco', description: 'Fruit de la passion, banane, lait de coco, jus de pomme.', price: 5.5 },
      { name: 'Smoothie Détox', description: 'Fraise, ananas, gingembre, jus de pomme.', price: 5.5 },
      { name: 'Milkshake chocolaté', description: 'Nutella, Oreo ou Kinder Bueno.', price: 5.5 },
      { name: 'Milkshake fruité', description: 'Fraise, banane ou mangue.', price: 5.5 },
    ],
  },
  {
    id: 'boissons',
    title: 'Les boissons',
    items: [
      {
        name: 'Boisson 33 cl',
        description: 'Coca-Cola, Coca-Cola zéro, Coca-Cola cherry, Ice tea, Oasis, Schweppes agrumes, Perrier, 7up.',
        price: 1.9,
      },
      {
        name: 'Boisson premium',
        description: 'Ginger beer, limonade, Breizh Cola, thé glacé — selon disponibilité. +2 € en menu.',
        price: 3.5,
      },
      { name: 'Eau 50 cl', price: 1.5 },
      { name: 'Expresso', price: 1.9 },
      { name: 'Café americano', price: 3.3 },
      { name: 'Cappuccino', price: 3.5 },
      { name: 'Latte macchiato', price: 3.9 },
      { name: 'Chocolat viennois', price: 3.9 },
      { name: 'Thé', price: 3.5 },
    ],
  },
];

export const formatPrice = (n: number) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

export const signature = menu[0].items[0];

/** Sélection mise en avant sur l’accueil. */
export const highlights = ['La Station', 'Le Montagnard', 'Little Italy', 'Honey Goat'];

export const tagLabels: Record<NonNullable<MenuItem['tags']>[number], string> = {
  signature: 'Primé',
  spicy: 'Épicé',
  veggie: 'Végétarien',
  fish: 'Poisson',
  chicken: 'Poulet',
  new: 'Nouveau',
};
