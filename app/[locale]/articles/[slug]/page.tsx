import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import { type Locale } from '@/i18n';

// Article slugs - must match the ones in the listing page
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

export async function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  if (!articleSlugs.includes(slug)) {
    return {};
  }

  const t = await getTranslations('articles');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const url = `${baseUrl}/${locale}/articles/${slug}`;

  const title = t(`articles.${slug}.title`);
  const description = t(`articles.${slug}.excerpt`);
  const keywords = t(`articles.${slug}.keywords`);
  const date = t(`articles.${slug}.date`);

  // Get all locales for hreflang
  const { locales } = await import('@/i18n');
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${baseUrl}/${loc}/articles/${slug}`;
  });

  return {
    title: `${title} | ${t('metadata.title')}`,
    description,
    keywords,
    authors: [{ name: 'Rakan Clinic Tokyo' }],
    creator: 'Rakan Clinic Tokyo',
    publisher: 'Rakan Clinic Tokyo',
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
      type: 'article',
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
      title,
      description,
      publishedTime: date,
      modifiedTime: date,
      authors: ['Rakan Clinic Tokyo'],
      section: t(`articles.${slug}.category`),
      tags: keywords.split(', '),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@rakanclinicglobal',
      site: '@rakanclinicglobal',
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!articleSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations('articles');

  const article = {
    slug,
    title: t(`articles.${slug}.title`),
    category: t(`articles.${slug}.category`),
    date: t(`articles.${slug}.date`),
    readTime: t(`articles.${slug}.readTime`),
    quickAnswer: t.has(`articles.${slug}.quickAnswer`) ? t(`articles.${slug}.quickAnswer`) : null,
    content: t.raw(`articles.${slug}.content`) as string[],
    faq: t.has(`articles.${slug}.faq`) ? (t.raw(`articles.${slug}.faq`) as Array<{ question: string; answer: string }>) : null,
  };

  type ArticleBlock =
    | { type: 'heading'; content: string }
    | { type: 'paragraph'; content: string }
    | { type: 'list'; content: string[] };

  const contentBlocks: ArticleBlock[] = [];
  let listBuffer: string[] | null = null;

  article.content.forEach((entry) => {
    const trimmed = entry.trim();
    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith('•')) {
      if (!listBuffer) {
        listBuffer = [];
      }
      listBuffer.push(trimmed.replace(/^•\s*/, '').trim());
      return;
    }

    if (listBuffer) {
      contentBlocks.push({ type: 'list', content: listBuffer });
      listBuffer = null;
    }

    const looksLikeHeading =
      trimmed.length < 110 &&
      !trimmed.includes('.') &&
      !trimmed.includes('!') &&
      !trimmed.includes('—');

    if (looksLikeHeading) {
      contentBlocks.push({ type: 'heading', content: trimmed });
    } else {
      contentBlocks.push({ type: 'paragraph', content: trimmed });
    }
  });

  if (listBuffer) {
    contentBlocks.push({ type: 'list', content: listBuffer });
  }

  // Structured data for article
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const articleUrl = `${baseUrl}/${locale}/articles/${slug}`;
  
  // Article structured data
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: t(`articles.${slug}.excerpt`),
    image: `${baseUrl}/images/rakan_entrance.png`,
    author: {
      '@type': 'Organization',
      name: 'Rakan Clinic Tokyo',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rakan Clinic Tokyo',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/rakan_entrance.png`,
        width: 1200,
        height: 630,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category,
    keywords: t(`articles.${slug}.keywords`),
    inLanguage: locale,
    wordCount: article.content.join(' ').split(' ').length,
  };

  // FAQ structured data
  const faqStructuredData = article.faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // MedicalProcedure structured data
  const medicalProcedureStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Autologous Adipose-Derived Stem Cell Therapy',
    description: t(`articles.${slug}.excerpt`),
    procedureType: 'Stem Cell Therapy',
    bodyLocation: 'Various (joints, tissues)',
    preparation: 'Fat collection, stem cell processing in CPC',
    followup: 'Follow-up care and monitoring',
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Regenerative Medicine',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      {/* Structured Data - Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {/* Structured Data - FAQ */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      {/* Structured Data - MedicalProcedure */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureStructuredData) }}
      />

      <Header locale={locale} />
      <BackToTopButton />

      {/* Article Header */}
      <section className="pt-[120px] pb-8 px-[5%] bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[900px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
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
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="hover:text-[#4a9b7f] transition-colors duration-300"
                >
                  Articles
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#4a9b7f]/12 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[1.2px] text-[#2f5c4d]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4a9b7f]"></span>
            {article.category}
          </div>

          {/* Title */}
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.1rem,4.8vw,3.9rem)] leading-[1.05] font-semibold text-[#142923] mt-3 mb-4">
            {article.title}
          </h1>

          {/* Quick Answer Box */}
          {article.quickAnswer && (
            <div className="mb-7 rounded-2xl border border-[#4a9b7f]/20 bg-[#f5faf7] p-6 shadow-sm">
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.3rem,3vw,1.7rem)] font-semibold text-[#1f3d33] mb-2 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4a9b7f]/15 text-[#4a9b7f] text-sm">✓</span>
                Quick Answer
              </h2>
              <p className="text-[1rem] leading-relaxed text-gray-700">
                {article.quickAnswer}
              </p>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-[0.9rem] text-[#4d5f59] mb-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#edf3f0] px-3 py-1">
              <svg className="h-4 w-4 text-[#4a9b7f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.date}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#edf3f0] px-3 py-1">
              <svg className="h-4 w-4 text-[#4a9b7f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-[5%] py-[3.5rem] bg-gradient-to-b from-white via-[#f6f9f7] to-white">
        <div className="max-w-[960px] mx-auto">
          <div className="rounded-[22px] border border-[#e3ebe8] bg-white/90 p-8 md:p-12 shadow-lg">
            <div className="space-y-6">
              {contentBlocks.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={`heading-${index}`}
                      className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold text-[#1f3d33] pt-4"
                    >
                      {block.content}
                    </h2>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul
                      key={`list-${index}`}
                      className="space-y-2 rounded-xl border border-[#dce8e2] bg-[#f7faf9] px-6 py-5 text-[1rem] text-[#244238] list-disc"
                    >
                      {(block.content as string[]).map((item, itemIndex) => (
                        <li key={itemIndex} className="leading-[1.75]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={`paragraph-${index}`}
                    className="text-[1.05rem] leading-[1.85] text-[#425750] font-light"
                  >
                    {block.content as string}
                  </p>
                );
              })}
            </div>

            {/* FAQ Section */}
            {article.faq && article.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#d9e4df]">
                <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3.2vw,2.1rem)] mb-6 font-semibold text-[#1f3d33]">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faq.map((faq, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#e4ede9] bg-white p-5 shadow-sm"
                    >
                      <h3 className="font-semibold text-[#1f3d33] mb-2 text-[1.05rem]">
                        {faq.question}
                      </h3>
                      <p className="text-[0.95rem] text-gray-700 leading-[1.7] font-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-[#d9e4df]">
              <div className="bg-gradient-to-br from-[#4a9b7f]/10 via-white to-[#c9a962]/10 rounded-2xl p-8 text-center shadow-sm">
                <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3vw,2rem)] mb-3 font-semibold text-gray-900">
                  {t('cta.title')}
                </h3>
                <p className="text-[0.95rem] text-gray-600 mb-6 font-light max-w-2xl mx-auto">
                  {t('cta.description')}
                </p>
                <Link
                  href={`/${locale}#contact`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#4a9b7f] px-8 py-3 text-white font-semibold transition-all duration-300 hover:bg-[#3d8269] shadow-md hover:shadow-lg"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                  Schedule a consultation for stem cell therapy in Tokyo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

