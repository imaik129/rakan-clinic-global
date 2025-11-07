import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

// Article slugs - must match the ones in articles pages
const articleSlugs = [
  'what-is-stem-cell-therapy',
  'does-stem-cell-therapy-work',
  'stem-cell-therapy-for-joint-pain',
  'stem-cell-therapy-vs-surgery',
  'stem-cell-therapy-recovery-time',
  'stem-cell-therapy-cost',
  'stem-cell-therapy-japan-safety',
  'stem-cell-therapy-results-timeline',
  'anti-aging-stem-cell-therapy-tokyo',
  'cpc-cell-processing-center-japan',
  'azabudai-hills-stem-table',
  'knee-osteoarthritis-stem-cells-tokyo',
  'adipose-vs-bone-marrow-stem-cells',
  'conditions-stem-cell-therapy',
  'stem-cell-therapy-exclusions',
  'culture-supernatant-explained',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';

  // Generate sitemap entries for all locales
  const routes = ['', '/treatments', '/facilities', '/articles'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Add main routes
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route === '/articles' ? 'weekly' : 'weekly',
        priority: route === '' ? 1.0 : route === '/articles' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    });

    // Add individual article pages
    articleSlugs.forEach((slug) => {
      const url = `${baseUrl}/${locale}/articles/${slug}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}/articles/${slug}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}

