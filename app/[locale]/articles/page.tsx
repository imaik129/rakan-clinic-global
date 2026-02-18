import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import ArticlesGrid from '@/components/ArticlesGrid';
import { articleSlugs, getArticleImage } from '@/lib/articles';

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
      images: [
        {
          url: `${baseUrl}/images/facilities/lab.webp`,
          width: 1200,
          height: 630,
          alt: t('metadata.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: [`${baseUrl}/images/facilities/lab.webp`],
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
    image: getArticleImage(slug),
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

  // Breadcrumb structured data (localized for SEO)
  const breadcrumbHome = t('breadcrumbHome');
  const breadcrumbArticles = t('breadcrumbArticles');
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: breadcrumbHome,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: breadcrumbArticles,
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
                  {t('breadcrumbHome')}
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-[#142923] font-medium" aria-current="page">
                {t('breadcrumbArticles')}
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
