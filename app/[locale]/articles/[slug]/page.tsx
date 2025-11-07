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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rakanclinic.com';
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

  // Structured data for article
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rakanclinic.com';
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
          <div className="inline-block px-3 py-1 text-[0.65rem] tracking-[1px] uppercase text-[#4a9b7f] font-semibold bg-[#4a9b7f]/10 rounded-full mb-4">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(2rem,5vw,3.5rem)] mb-4 leading-[1.1] font-bold text-gray-900">
            {article.title}
          </h1>

          {/* Quick Answer Box */}
          {article.quickAnswer && (
            <div className="bg-gradient-to-br from-[#4a9b7f]/10 to-[#c9a962]/5 border-l-4 border-[#4a9b7f] rounded-r-lg p-6 mb-6">
              <h2 className="font-['Cormorant_Garamond'] text-[1.5rem] font-semibold text-gray-900 mb-3">
                Quick Answer
              </h2>
              <p className="text-[0.95rem] text-gray-700 leading-[1.7] font-light">
                {article.quickAnswer}
              </p>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-[0.85rem] text-gray-500 mb-6">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-[5%] py-[3rem]">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => {
                // Skip empty strings (used for spacing in JSON)
                if (!paragraph || paragraph.trim() === '') {
                  return null;
                }
                // Check if paragraph is a heading (starts with specific patterns)
                if (paragraph.match(/^[A-Z][^.!?]*[?:]$/) && paragraph.length < 100 && !paragraph.includes('•')) {
                  return (
                    <h2
                      key={index}
                      className="font-['Cormorant_Garamond'] text-[1.8rem] font-semibold text-gray-900 mt-8 mb-4"
                    >
                      {paragraph}
                    </h2>
                  );
                }
                // Check if paragraph is a bullet point
                if (paragraph.startsWith('•')) {
                  return (
                    <p
                      key={index}
                      className="text-[1rem] text-gray-700 leading-[1.8] font-light mb-3 ml-4"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-[1rem] text-gray-700 leading-[1.8] font-light mb-6"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* FAQ Section */}
            {article.faq && article.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="font-['Cormorant_Garamond'] text-[2rem] mb-6 font-semibold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faq.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2 text-[1rem]">
                        {faq.question}
                      </h3>
                      <p className="text-[0.9rem] text-gray-700 leading-[1.6] font-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-br from-[#4a9b7f]/5 to-[#c9a962]/5 rounded-lg p-6 text-center">
                <h3 className="font-['Cormorant_Garamond'] text-[1.8rem] mb-3 font-semibold text-gray-900">
                  {t('cta.title')}
                </h3>
                <p className="text-[0.95rem] text-gray-600 mb-6 font-light">
                  {t('cta.description')}
                </p>
                <Link
                  href={`/${locale}#contact`}
                  className="inline-block px-8 py-3 bg-[#4a9b7f] text-white font-semibold rounded-lg hover:bg-[#3d8269] transition-colors duration-300"
                >
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

