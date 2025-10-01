import { getRequestConfig } from 'next-intl/server';

// Supported locales for your medical tourism site
export const locales = ['en', 'ja', 'ar', 'es', 'fr', 'de', 'ru', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    en: 'English',
    ja: '日本語',
    ar: 'العربية',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ru: 'Русский',
    zh: '中文'
};

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that the incoming locale is valid
    if (!locale || !locales.includes(locale as Locale)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});

