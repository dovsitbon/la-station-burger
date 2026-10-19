import type { APIRoute } from 'astro';
import { site, fullAddress, groupedHours, activeOrdering } from '../data/site';
import { menu, formatPrice } from '../data/menu';

/** Résumé texte du restaurant et de sa carte pour les assistants IA (format llms.txt). */
export const GET: APIRoute = ({ site: astroSite }) => {
  const base = astroSite ?? new URL(site.url);
  const u = (p: string) => new URL(p, base).href;

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `- Adresse : ${fullAddress}`,
    `- Téléphone : ${site.phone.display}`,
    `- Horaires : ${groupedHours().map((g) => `${g.days} ${g.time}`).join(' ; ')}`,
    `- Distinction : ${site.award.title} avec le burger « ${site.award.burger} »`,
    `- Commande en livraison : ${activeOrdering.map((o) => `${o.label} (${o.url})`).join(', ')}`,
    `- Paiement : ${site.payment.join(', ')}. ${site.paymentNote}`,
    `- Accès : ${site.access.train}`,
    '',
    '## Pages',
    `- [Carte et prix](${u('/carte/')})`,
    `- [Le Tissot de la Varenne, burger primé](${u('/tissot-de-la-varenne/')})`,
    `- [Horaires, adresse et accès](${u('/infos-pratiques/')})`,
    `- [Commander](${u('/commander/')})`,
    `- [Contact](${u('/contact/')})`,
    '',
    `## Carte ${site.menuUpdated} (prix sur place / à emporter)`,
    '',
  ];

  for (const cat of menu) {
    lines.push(`### ${cat.title}`);
    if (cat.menuNote) lines.push(cat.menuNote);
    for (const i of cat.items) {
      const price = [
        i.price !== undefined ? formatPrice(i.price) : '',
        i.menuPrice !== undefined ? `menu ${formatPrice(i.menuPrice)}` : '',
      ]
        .filter(Boolean)
        .join(' / ');
      lines.push(`- ${i.name} — ${price}${i.description ? ` — ${i.description}` : ''}`);
    }
    if (cat.footnote) lines.push(cat.footnote);
    lines.push('');
  }

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
