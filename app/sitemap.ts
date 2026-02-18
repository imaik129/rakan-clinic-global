import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { articleSlugs } from '@/lib/articles';

// Article publication dates (from en.json)
const articleDates: Record<string, string> = {
  'what-is-stem-cell-therapy': '2024-01-15',
  'does-stem-cell-therapy-work': '2024-01-20',
  'stem-cell-therapy-for-joint-pain': '2024-01-25',
  'stem-cell-therapy-vs-surgery': '2024-02-01',
  'stem-cell-therapy-recovery-time': '2024-02-05',
  'stem-cell-therapy-cost': '2024-02-10',
  'stem-cell-therapy-japan-safety': '2024-02-18',
  'stem-cell-therapy-results-timeline': '2024-02-19',
  'anti-aging-stem-cell-therapy-tokyo': '2024-02-20',
  'cpc-cell-processing-center-japan': '2024-02-21',
  'azabudai-hills-stem-table': '2024-02-21',
  'knee-osteoarthritis-stem-cells-tokyo': '2024-02-22',
  'adipose-vs-bone-marrow-stem-cells': '2024-02-22',
  'conditions-stem-cell-therapy': '2024-02-23',
  'stem-cell-therapy-exclusions': '2024-02-23',
  'culture-supernatant-explained': '2024-02-24',
  'best-stem-cell-clinics-tokyo': '2025-02-10',
  'stem-cell-therapy-cost-tokyo': '2025-02-10',
  'medical-tourism-tokyo-stem-cell': '2025-02-10',
  'stem-cell-therapy-legal-japan': '2025-02-10',
  'choose-safe-stem-cell-clinic-tokyo': '2025-02-10',
};

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
  articleSlugs.forEach((slug) => {
    const date = articleDates[slug] || '2024-01-15';
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
