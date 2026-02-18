// Shared article data used by listing page, individual article pages, and sitemap

export const articleSlugs = [
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
  'best-stem-cell-clinics-tokyo',
  'stem-cell-therapy-cost-tokyo',
  'medical-tourism-tokyo-stem-cell',
  'stem-cell-therapy-legal-japan',
  'choose-safe-stem-cell-clinic-tokyo',
] as const;

export type ArticleSlug = (typeof articleSlugs)[number];

// Map each article slug to a relevant image path (relative to /public)
export const articleImages: Record<string, string> = {
  'what-is-stem-cell-therapy': '/images/facilities/stemcells.webp',
  'does-stem-cell-therapy-work': '/images/facilities/inverted_microscope.jpg',
  'stem-cell-therapy-for-joint-pain': '/images/reuseable/4.png',
  'stem-cell-therapy-vs-surgery': '/images/injection.png',
  'stem-cell-therapy-recovery-time': '/images/reuseable/2.png',
  'stem-cell-therapy-cost': '/images/azabudai_hills.png',
  'stem-cell-therapy-japan-safety': '/images/facilities/biological_safety_cabinet.jpg',
  'stem-cell-therapy-results-timeline': '/images/facilities/working.gif',
  'anti-aging-stem-cell-therapy-tokyo': '/images/reuseable/1.png',
  'cpc-cell-processing-center-japan': '/images/facilities/lab.webp',
  'azabudai-hills-stem-table': '/images/rakan_entrance.png',
  'knee-osteoarthritis-stem-cells-tokyo': '/images/reuseable/3.png',
  'adipose-vs-bone-marrow-stem-cells': '/images/facilities/stemcells.webp',
  'conditions-stem-cell-therapy': '/images/reuseable/5.png',
  'stem-cell-therapy-exclusions': '/images/facilities/co2incubator.webp',
  'culture-supernatant-explained': '/images/facilities/centrifuge.webp',
  'best-stem-cell-clinics-tokyo': '/images/azabudai_hills.png',
  'stem-cell-therapy-cost-tokyo': '/images/facilities/passbox.jpg',
  'medical-tourism-tokyo-stem-cell': '/images/azabudai_hills.png',
  'stem-cell-therapy-legal-japan': '/images/rakan_entrance.png',
  'choose-safe-stem-cell-clinic-tokyo': '/images/facilities/lab.webp',
};

// Fallback image for articles without a mapped image
export const defaultArticleImage = '/images/facilities/lab.webp';

// Get the image path for an article slug (returns absolute URL when baseUrl provided)
export function getArticleImage(slug: string, baseUrl?: string): string {
  const path = articleImages[slug] || defaultArticleImage;
  return baseUrl ? `${baseUrl}${path}` : path;
}
