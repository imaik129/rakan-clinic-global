'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const router = useRouter();
    const pathname = usePathname();

    const changeLocale = (newLocale: Locale) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className="relative group">
            <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[0.68rem] font-medium tracking-[0.5px] text-[#1a1a1a] hover:text-[#4a9b7f] transition-all duration-300 uppercase"
                aria-label="Change language"
            >
                <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                </svg>
                <span className="hidden lg:inline text-[0.65rem]">{localeNames[currentLocale]}</span>
                <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown - Sleek */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-[rgba(74,155,127,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-sm overflow-hidden">
                <div className="py-1">
                    {locales.map((locale) => (
                        <button
                            key={locale}
                            onClick={() => changeLocale(locale)}
                            className={`w-full text-left px-4 py-2.5 text-[0.75rem] transition-all duration-150 font-light tracking-[0.3px] ${locale === currentLocale
                                    ? 'bg-[#4a9b7f] text-white font-medium'
                                    : 'text-[#1a1a1a] hover:bg-[#f8f6f3]'
                                }`}
                        >
                            {localeNames[locale]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
