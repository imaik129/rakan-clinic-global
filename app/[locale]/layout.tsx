import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { 
    title: string; 
    description: string;
    keywords?: string;
    ogImage?: string;
  };

  // Base URL - Update this with your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const url = `${baseUrl}/${locale}`;
  const ogImage = metadata.ogImage || `${baseUrl}/images/rakan_entrance.png`;

  // Get all locales for hreflang
  const { locales } = await import('@/i18n');
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = `${baseUrl}/${loc}`;
  });

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords || 'regenerative medicine, stem cell therapy, orthopedic treatment, PRP therapy, Tokyo, Azabudai Hills, medical tourism, joint pain, sports injury',
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
      type: 'website',
      locale: locale === 'ja' ? 'ja_JP' : 
              locale === 'zh' ? 'zh_CN' : 
              locale === 'ar' ? 'ar_SA' : 
              locale === 'es' ? 'es_ES' :
              locale === 'fr' ? 'fr_FR' :
              locale === 'de' ? 'de_DE' :
              locale === 'ru' ? 'ru_RU' :
              'en_US',
      url: url,
      siteName: 'Rakan Clinic Tokyo',
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [ogImage],
      creator: '@rakanclinicglobal',
      site: '@rakanclinicglobal',
    },
    verification: {
      google: 'R3Lj0camYGW0eoGxDdLC_Ld1FX-nKc77fSCpXivhisw',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4a9b7f" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="preload"
          href="/images/rakan_entrance.png"
          as="image"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${montserrat.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
