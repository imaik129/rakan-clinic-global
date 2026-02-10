import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import { type Locale } from '@/i18n';

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
];

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

  // Get all articles data
  const articles = articleSlugs.map((slug) => ({
    slug,
    title: t(`articles.${slug}.title`),
    excerpt: t(`articles.${slug}.excerpt`),
    readTime: t(`articles.${slug}.readTime`),
    category: t(`articles.${slug}.category`),
    date: t(`articles.${slug}.date`),
    url: `${baseUrl}/${locale}/articles/${slug}`,
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
          url: article.url,
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
      <section className="relative overflow-hidden px-[5%] pt-[120px] pb-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#f4faf6] to-white" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[240px] bg-gradient-to-b from-[#4a9b7f]/12 to-transparent" />
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[0.9rem] text-gray-600">
              <li>
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[#2f5c4d] shadow-sm ring-1 ring-[#4a9b7f]/20 hover:text-[#4a9b7f]"
                >
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-[#1f3d33] font-semibold" aria-current="page">
                Articles
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4a9b7f]/12 px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[1.8px] text-[#2f5c4d] mb-4">
              <span className="inline-block h-2 w-2 rounded-full bg-[#4a9b7f]" />
              {t('badge')}
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.3rem,5vw,4rem)] mb-4 leading-[1.08] font-semibold text-[#142923]">
              {t('heading')}
            </h1>
            <p className="mx-auto max-w-[760px] text-[1.05rem] leading-[1.75] text-[#425750]">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-[5%] pb-[4.5rem]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="group relative overflow-hidden rounded-[22px] border border-[#e1ece6] bg-white/85 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#4a9b7f] via-[#3d8269] to-[#c9a962] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex items-center justify-between text-[0.75rem] text-[#4a5e55]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#4a9b7f]/12 px-3 py-1 font-semibold uppercase tracking-[1px] text-[#2f5c4d]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#4a9b7f]" />
                    {article.category}
                  </span>
                  <span className="rounded-full bg-[#eef4f1] px-3 py-1 text-[0.72rem] font-medium">
                    {article.date}
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight text-[#1e342c] mb-3 transition-colors duration-300 group-hover:text-[#4a9b7f]">
                  {article.title}
                </h2>
                <p className="mb-5 line-clamp-3 text-[0.95rem] leading-[1.7] text-[#4a4f4d]">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-5 text-[0.8rem] text-[#436054]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#edf4f1] px-3 py-1">
                    <svg className="h-4 w-4 text-[#4a9b7f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2 font-medium text-[#4a9b7f] group-hover:gap-3">
                    {t('readMore')}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

