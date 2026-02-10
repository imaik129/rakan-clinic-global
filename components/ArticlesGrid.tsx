'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  href: string;
  image: string;
}

interface ArticlesGridProps {
  articles: ArticleData[];
  readMoreLabel: string;
  allLabel: string;
}

export default function ArticlesGrid({ articles, readMoreLabel, allLabel }: ArticlesGridProps) {
  const categoriesWithCounts = useMemo(() => {
    const countMap = new Map<string, number>();
    articles.forEach((a) => countMap.set(a.category, (countMap.get(a.category) || 0) + 1));
    const entries: [string, number][] = [[allLabel, articles.length]];
    countMap.forEach((count, cat) => entries.push([cat, count]));
    return entries;
  }, [articles, allLabel]);

  const [activeCategory, setActiveCategory] = useState(allLabel);

  const filtered = useMemo(
    () =>
      activeCategory === allLabel
        ? articles
        : articles.filter((a) => a.category === activeCategory),
    [articles, activeCategory, allLabel],
  );

  const [featured, ...rest] = filtered;

  if (!featured) return null;

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="mb-12 flex flex-wrap justify-center gap-2.5">
        {categoriesWithCounts.map(([cat, count]) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`group/pill relative rounded-full px-5 py-2.5 text-[0.78rem] font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[#142923] text-white shadow-lg shadow-[#142923]/20'
                : 'bg-white text-[#4a5e55] ring-1 ring-[#e1ece6] hover:ring-[#4a9b7f]/50 hover:text-[#2f5c4d]'
            }`}
          >
            {cat}
            <span
              className={`ml-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[0.65rem] font-semibold leading-none transition-colors duration-300 ${
                activeCategory === cat
                  ? 'bg-white/20 text-white/90'
                  : 'bg-[#eef4f1] text-[#4a9b7f]'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Hero Article */}
      <Link
        href={featured.href}
        className="group relative mb-12 block overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#4a9b7f]/10"
      >
        {/* Full-bleed image */}
        <div className="relative h-[320px] md:h-[420px]">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14]/85 via-[#0a1a14]/30 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4a9b7f] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[1.2px] text-white">
                {featured.category}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[0.72rem] font-medium text-white/80 backdrop-blur-sm">
                {featured.date}
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold leading-[1.15] text-white mb-3 max-w-[700px]">
              {featured.title}
            </h2>
            <p className="mb-5 line-clamp-2 max-w-[600px] text-[0.92rem] leading-[1.7] text-white/75">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[0.78rem] text-white/60">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {featured.readTime}
              </span>
              <span className="inline-flex items-center gap-2 text-[0.78rem] font-medium text-[#7fd4b5] transition-all duration-300 group-hover:gap-3">
                {readMoreLabel}
                <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Article Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4a9b7f]/8"
          >
            {/* Card Image */}
            <div className="relative h-[200px] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-600 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.8px] text-[#2f5c4d] shadow-sm backdrop-blur-sm">
                {article.category}
              </span>
            </div>
            {/* Card Body */}
            <div className="flex flex-1 flex-col p-5 pt-4">
              <span className="mb-2.5 text-[0.72rem] font-medium text-[#8a9e96]">
                {article.date}
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-[1.3rem] font-semibold leading-[1.25] text-[#142923] mb-2.5 transition-colors duration-300 group-hover:text-[#4a9b7f]">
                {article.title}
              </h2>
              <p className="mb-auto line-clamp-2 text-[0.85rem] leading-[1.65] text-[#5e6e68]">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-[#f0f4f2] pt-4 text-[0.78rem]">
                <span className="inline-flex items-center gap-1.5 text-[#8a9e96]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M12 6v6l4 2" />
                  </svg>
                  {article.readTime}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#4a9b7f] transition-all duration-300 group-hover:gap-2.5">
                  {readMoreLabel}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
