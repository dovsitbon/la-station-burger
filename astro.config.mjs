// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL canonique : variable SITE_URL (ex. https://www.lastationburger.fr) ou URL Vercel par défaut.
const site = process.env.SITE_URL || 'https://la-station-burger.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !/\/(404|mentions-legales)\//.test(page) })],
  image: { responsiveStyles: true },
});
