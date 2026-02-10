import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import ArticlesGrid from '@/components/ArticlesGrid';

// Article slugs - these will be used for routing
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
  'best-stem-cell-clinics-tokyo',
  'stem-cell-therapy-cost-tokyo',
  'medical-tourism-tokyo-stem-cell',
  'stem-cell-therapy-legal-japan',
  'choose-safe-stem-cell-clinic-tokyo',
];

// Map each article slug to a relevant image
const articleImages: Record<string, string> = {
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('articles');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const url = `${baseUrl}/${locale}/articles`;

  // Get all locales for hreflang
  const { locales } = await import('@/i18n');
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${baseUrl}/${loc}/articles`;
  });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t('metadata.keywords'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ja' ? 'ja_JP' :
              locale === 'zh' ? 'zh_CN' :
              locale === 'ar' ? 'ar_SA' :
              locale === 'es' ? 'es_ES' :
              locale === 'fr' ? 'fr_FR' :
              locale === 'de' ? 'de_DE' :
              locale === 'ru' ? 'ru_RU' :
              'en_US',
      url,
      siteName: 'Rakan Clinic Tokyo',
      title: t('metadata.title'),
      description: t('metadata.description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      creator: '@rakanclinicglobal',
      site: '@rakanclinicglobal',
    },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('articles');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';

  // Get all articles data with images
  const articles = articleSlugs.map((slug) => ({
    slug,
    title: t(`articles.${slug}.title`),
    excerpt: t(`articles.${slug}.excerpt`),
    readTime: t(`articles.${slug}.readTime`),
    category: t(`articles.${slug}.category`),
    date: t(`articles.${slug}.date`),
    href: `/${locale}/articles/${slug}`,
    image: articleImages[slug] || '/images/facilities/lab.webp',
  }));

  // CollectionPage structured data for articles listing
  const collectionStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('heading'),
    description: t('description'),
    url: `${baseUrl}/${locale}/articles`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          url: `${baseUrl}${article.href}`,
          datePublished: article.date,
        },
      })),
    },
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${baseUrl}/${locale}/articles`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Structured Data - CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
      />
      {/* Structured Data - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <Header locale={locale} />
      <BackToTopButton />

      {/* Hero Section */}
      <section className="relative px-[5%] pt-[120px] pb-10">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-[0.82rem] text-[#8a9e96]">
              <li>
                <Link
                  href={`/${locale}`}
                  className="transition-colors hover:text-[#4a9b7f]"
                >
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-[#142923] font-medium" aria-current="page">
                Articles
              </li>
            </ol>
          </nav>

          <div className="text-center mb-4">
            <span className="mb-4 inline-block text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#4a9b7f]">
              {t('badge')}
            </span>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.4rem,5vw,3.8rem)] mb-4 leading-[1.08] font-semibold text-[#142923]">
              {t('heading')}
            </h1>
            <p className="mx-auto max-w-[600px] text-[0.95rem] leading-[1.75] text-[#6b7f78]">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-[5%] pb-[4.5rem]">
        <div className="max-w-[1200px] mx-auto">
          <ArticlesGrid
            articles={articles}
            readMoreLabel={t('readMore')}
            allLabel={t('filterAll')}
          />
        </div>
      </section>
    </div>
  );
}
