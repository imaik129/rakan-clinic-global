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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rakanclinic.com';
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rakanclinic.com';

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
      <section className="pt-[120px] pb-12 px-[5%] bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[0.85rem] text-gray-600">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-[#4a9b7f] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Articles
              </li>
            </ol>
          </nav>
          
          <div className="text-center">
            <div className="inline-block px-4 py-2 text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold bg-[#4a9b7f]/10 rounded-full mb-4">
              {t('badge')}
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(2rem,5vw,3.5rem)] mb-4 leading-[1.1] font-bold text-gray-900">
              {t('heading')}
            </h1>
            <p className="text-[1rem] text-gray-600 max-w-[700px] mx-auto leading-[1.7] font-light">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-[5%] py-[4rem]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-[0.65rem] tracking-[1px] uppercase text-[#4a9b7f] font-semibold bg-[#4a9b7f]/10 rounded-full mb-3">
                    {article.category}
                  </div>

                  {/* Title */}
                  <h2 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-3 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[0.9rem] text-gray-600 leading-[1.6] font-light mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-[0.75rem] text-gray-500 pt-4 border-t border-gray-100">
                    <span>{article.readTime}</span>
                    <span className="flex items-center gap-1 text-[#4a9b7f] font-medium group-hover:gap-2 transition-all duration-300">
                      {t('readMore')}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

