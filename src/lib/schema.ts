import { site, fullAddress } from '../data/site';
import { menu } from '../data/menu';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function restaurantSchema(base: URL, logoUrl: string) {
  const url = new URL('/', base).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}#restaurant`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url,
    logo: logoUrl,
    image: logoUrl,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    servesCuisine: ['Burgers', 'Américaine', 'Steakhouse'],
    priceRange: '€€',
    paymentAccepted: site.payment.join(', '),
    currenciesAccepted: 'EUR',
    hasMenu: new URL('/carte/', base).href,
    award: site.award.title,
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${dayNames[h.day]}`,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: Object.values(site.social).map((s) => s.url),
    potentialAction: site.ordering
      .filter((o) => o.enabled)
      .map((o) => ({
        '@type': 'OrderAction',
        target: { '@type': 'EntryPoint', urlTemplate: o.url },
        name: `Commander sur ${o.label}`,
      })),
    areaServed: { '@type': 'City', name: site.address.city },
    location: fullAddress,
  };
}

export function menuSchema(base: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${new URL('/carte/', base).href}#menu`,
    name: `Carte ${site.menuUpdated} — ${site.name}`,
    inLanguage: 'fr',
    hasMenuSection: menu.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.title,
      hasMenuItem: cat.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.price !== undefined
          ? { offers: { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'EUR' } }
          : {}),
        ...(item.tags?.includes('veggie') ? { suitableForDiet: 'https://schema.org/VegetarianDiet' } : {}),
      })),
    })),
  };
}

export function breadcrumbSchema(base: URL, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...trail].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, base).href,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
