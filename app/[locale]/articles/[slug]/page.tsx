import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import { articleSlugs, getArticleImage } from '@/lib/articles';

export async function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!articleSlugs.includes(slug as typeof articleSlugs[number])) {
    return {};
  }

  const t = await getTranslations('articles');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const url = `${baseUrl}/${locale}/articles/${slug}`;
  const ogImage = getArticleImage(slug, baseUrl);

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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

  if (!articleSlugs.includes(slug as typeof articleSlugs[number])) {
    notFound();
  }

  const t = await getTranslations('articles');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const articleUrl = `${baseUrl}/${locale}/articles/${slug}`;
  const articleImage = getArticleImage(slug);
  const articleImageAbsolute = getArticleImage(slug, baseUrl);

  const article = {
    slug,
    title: t(`articles.${slug}.title`),
    excerpt: t(`articles.${slug}.excerpt`),
    category: t(`articles.${slug}.category`),
    date: t(`articles.${slug}.date`),
    readTime: t(`articles.${slug}.readTime`),
    keywords: t(`articles.${slug}.keywords`),
    quickAnswer: t.has(`articles.${slug}.quickAnswer`) ? t(`articles.${slug}.quickAnswer`) : null,
    content: t.raw(`articles.${slug}.content`) as string[],
    faq: t.has(`articles.${slug}.faq`) ? (t.raw(`articles.${slug}.faq`) as Array<{ question: string; answer: string }>) : null,
  };

  // Build related articles (same category first, then others, exclude current)
  const relatedSlugs = articleSlugs
    .filter((s) => s !== slug)
    .map((s) => ({
      slug: s,
      title: t(`articles.${s}.title`),
      category: t(`articles.${s}.category`),
      excerpt: t(`articles.${s}.excerpt`),
      readTime: t(`articles.${s}.readTime`),
      image: getArticleImage(s),
    }))
    .sort((a, b) => {
      // Same category articles first
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return 0;
    })
    .slice(0, 3);

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

  // ── Structured Data ──────────────────────────────────────────────────

  // Article schema with per-article image
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: articleImageAbsolute,
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
    keywords: article.keywords,
    inLanguage: locale,
    wordCount: article.content.join(' ').split(' ').length,
    // Speakable for voice search / AEO
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="quick-answer"]', '[data-speakable="excerpt"]'],
    },
  };

  // FAQ schema
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

  // MedicalWebPage schema (better than MedicalProcedure for articles about medical topics)
  const medicalWebPageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: article.title,
    description: article.excerpt,
    url: articleUrl,
    lastReviewed: article.date,
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    specialty: {
      '@type': 'MedicalSpecialty',
      name: 'Regenerative Medicine',
    },
  };

  // Breadcrumb schema (localized for SEO)
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageStructuredData) }}
      />

      <Header locale={locale} />
      <BackToTopButton />

      {/* Hero Image */}
      <div className="relative h-[280px] md:h-[380px] mt-[72px]">
        <Image
          src={articleImage}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f3] via-[#0a1a14]/20 to-[#0a1a14]/40" />
      </div>

      {/* Article Header */}
      <section className="relative -mt-24 px-[5%] pb-8">
        <div className="max-w-[900px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[0.82rem] text-white/70">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-white transition-colors duration-300"
                >
                  {t('breadcrumbHome')}
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
                  className="hover:text-white transition-colors duration-300"
                >
                  {t('breadcrumbArticles')}
                </Link>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4a9b7f] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[1.2px] text-white mb-4">
            {article.category}
          </span>

          {/* Title — speakable for AEO */}
          <h1
            data-speakable="title"
            className="font-['Cormorant_Garamond'] text-[clamp(2.1rem,4.8vw,3.9rem)] leading-[1.05] font-semibold text-[#142923] mb-4"
          >
            {article.title}
          </h1>

          {/* Excerpt — speakable for AEO / featured snippet */}
          <p
            data-speakable="excerpt"
            className="text-[1rem] leading-[1.75] text-[#4a5e55] mb-5 max-w-[750px]"
          >
            {article.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-[0.82rem] text-[#6b7f78]">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#4a9b7f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <time dateTime={article.date}>{article.date}</time>
            </span>
            <span className="text-[#d5e3dc]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[#4a9b7f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Answer Box — speakable for AEO / featured snippet */}
      {article.quickAnswer && (
        <section className="px-[5%] pb-6">
          <div className="max-w-[900px] mx-auto">
            <div
              data-speakable="quick-answer"
              className="rounded-2xl border border-[#4a9b7f]/20 bg-[#f5faf7] p-6 shadow-sm"
            >
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.3rem,3vw,1.7rem)] font-semibold text-[#1f3d33] mb-2 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4a9b7f]/15 text-[#4a9b7f] text-sm">&#10003;</span>
                {t('quickAnswerLabel')}
              </h2>
              <p className="text-[1rem] leading-relaxed text-gray-700">
                {article.quickAnswer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="px-[5%] py-[3rem]">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-6">
            {contentBlocks.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2
                    key={`heading-${index}`}
                    className="font-['Cormorant_Garamond'] text-[clamp(1.5rem,3vw,2.1rem)] font-semibold text-[#1f3d33] pt-6 first:pt-0"
                  >
                    {block.content}
                  </h2>
                );
              }

              if (block.type === 'list') {
                return (
                  <ul
                    key={`list-${index}`}
                    className="space-y-2 rounded-xl border border-[#e1ece6] bg-[#f7faf9] px-7 py-5 text-[1rem] text-[#244238] list-disc ml-1"
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
                  className="text-[1.05rem] leading-[1.85] text-[#425750]"
                >
                  {block.content as string}
                </p>
              );
            })}
          </div>

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[#e1ece6]">
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3.2vw,2.1rem)] mb-6 font-semibold text-[#1f3d33]">
                {t('faqHeading')}
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
                    <p className="text-[0.95rem] text-gray-700 leading-[1.7]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-14 pt-10 border-t border-[#e1ece6]">
            <div className="bg-gradient-to-br from-[#4a9b7f]/10 via-white to-[#c9a962]/10 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3vw,2rem)] mb-3 font-semibold text-gray-900">
                {t('cta.title')}
              </h3>
              <p className="text-[0.95rem] text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 rounded-full bg-[#4a9b7f] px-8 py-3 text-white font-semibold transition-all duration-300 hover:bg-[#3d8269] shadow-md hover:shadow-lg"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
                {t('cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles — Internal Linking */}
      <section className="px-[5%] pb-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-[#142923] mb-8 text-center">
            {t('relatedArticlesHeading')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSlugs.map((related) => (
              <Link
                key={related.slug}
                href={`/${locale}/articles/${related.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4a9b7f]/8"
              >
                <div className="relative h-[160px] overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.8px] text-[#2f5c4d] backdrop-blur-sm">
                    {related.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.15rem] font-semibold leading-[1.25] text-[#142923] mb-2 transition-colors duration-300 group-hover:text-[#4a9b7f]">
                    {related.title}
                  </h3>
                  <p className="line-clamp-2 text-[0.82rem] leading-[1.6] text-[#5e6e68] mb-auto">
                    {related.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-[#4a9b7f]">
                    {t('readMore')}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/articles`}
              className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-[#4a9b7f] transition-colors hover:text-[#3d8269]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('backToArticles')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
