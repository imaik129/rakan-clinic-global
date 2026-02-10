import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

// Article data with accurate publication dates (from en.json)
const articles = [
  { slug: 'what-is-stem-cell-therapy', date: '2024-01-15' },
  { slug: 'does-stem-cell-therapy-work', date: '2024-01-20' },
  { slug: 'stem-cell-therapy-for-joint-pain', date: '2024-01-25' },
  { slug: 'stem-cell-therapy-vs-surgery', date: '2024-02-01' },
  { slug: 'stem-cell-therapy-recovery-time', date: '2024-02-05' },
  { slug: 'stem-cell-therapy-cost', date: '2024-02-10' },
  { slug: 'stem-cell-therapy-japan-safety', date: '2024-02-18' },
  { slug: 'stem-cell-therapy-results-timeline', date: '2024-02-19' },
  { slug: 'anti-aging-stem-cell-therapy-tokyo', date: '2024-02-20' },
  { slug: 'cpc-cell-processing-center-japan', date: '2024-02-21' },
  { slug: 'azabudai-hills-stem-table', date: '2024-02-21' },
  { slug: 'knee-osteoarthritis-stem-cells-tokyo', date: '2024-02-22' },
  { slug: 'adipose-vs-bone-marrow-stem-cells', date: '2024-02-22' },
  { slug: 'conditions-stem-cell-therapy', date: '2024-02-23' },
  { slug: 'stem-cell-therapy-exclusions', date: '2024-02-23' },
  { slug: 'culture-supernatant-explained', date: '2024-02-24' },
  { slug: 'best-stem-cell-clinics-tokyo', date: '2025-02-10' },
  { slug: 'stem-cell-therapy-cost-tokyo', date: '2025-02-10' },
  { slug: 'medical-tourism-tokyo-stem-cell', date: '2025-02-10' },
  { slug: 'stem-cell-therapy-legal-japan', date: '2025-02-10' },
  { slug: 'choose-safe-stem-cell-clinic-tokyo', date: '2025-02-10' },
];

// Main pages with SEO-tuned priorities and update frequencies
const mainPages = [
  {
    path: '',
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    lastModified: '2025-02-10',
  },
  {
    path: '/treatments',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    lastModified: '2025-02-10',
  },
  {
    path: '/facilities',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: '2025-02-10',
  },
  {
    path: '/articles',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: '2025-02-10',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ── Main pages (per locale) ────────────────────────────────────────
  mainPages.forEach(({ path, changeFrequency, priority, lastModified }) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(lastModified),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
            ),
            'x-default': `${baseUrl}/en${path}`,
          },
        },
      });
    });
  });

  // ── Individual article pages (per locale) ──────────────────────────
  articles.forEach(({ slug, date }) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/articles/${slug}`,
        lastModified: new Date(date),
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((loc) => [loc, `${baseUrl}/${loc}/articles/${slug}`])
            ),
            'x-default': `${baseUrl}/en/articles/${slug}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
