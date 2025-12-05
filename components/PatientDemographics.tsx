import { useTranslations } from 'next-intl';

export default function PatientDemographics() {
    const t = useTranslations('demographics');

    const demographics = [
        { id: 'usa', percent: '19%', flag: '🇺🇸', color: 'bg-[#4a9b7f]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-2' },
        { id: 'australia', percent: '8.6%', flag: '🇦🇺', color: 'bg-[#4a9b7f]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-2' },
        { id: 'kazakhstan', percent: '6.9%', flag: '🇰🇿', color: 'bg-[#67b6aa]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-1' },
        { id: 'russia', percent: '6.9%', flag: '🇷🇺', color: 'bg-[#67b6aa]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-1' },
        { id: 'philippines', percent: '5.2%', flag: '🇵🇭', color: 'bg-[#84c4ba]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-1' },
        { id: 'indonesia', percent: '5.2%', flag: '🇮🇩', color: 'bg-[#84c4ba]', textColor: 'text-white', colSpan: 'col-span-2 md:col-span-1' },
        { id: 'singapore', percent: '3.4%', flag: '🇸🇬', color: 'bg-[#e3f5f2]', textColor: 'text-[#4a9b7f]', colSpan: 'col-span-2 md:col-span-1' },
        { id: 'hongkong', percent: '3.4%', flag: '🇭🇰', color: 'bg-[#e3f5f2]', textColor: 'text-[#4a9b7f]', colSpan: 'col-span-2 md:col-span-1' },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-[640px] mx-auto px-4">
                <h2 className="text-center font-['Cormorant_Garamond'] text-[1.8rem] md:text-[2rem] text-[#1a1a1a] mb-8 tracking-wide uppercase leading-tight font-light">
                    {t('title')}
                </h2>

                <div className="grid grid-cols-4 gap-2">
                    {demographics.map((item) => (
                        <div
                            key={item.id}
                            className={`${item.colSpan} ${item.color} ${item.textColor} rounded-xl p-4 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-sm cursor-default group relative overflow-hidden`}
                        >
                            {/* Glossy effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="text-3xl mb-1 drop-shadow-sm filter grayscale-[0.1] group-hover:scale-110 transition-transform duration-300">{item.flag}</div>
                            <div className="text-xs md:text-sm font-medium tracking-widest text-center uppercase font-['Montserrat'] opacity-90">
                                {t(`countries.${item.id}`)}
                            </div>
                            <div className="text-lg md:text-2xl font-semibold font-['Cormorant_Garamond'] tracking-tight">
                                {item.percent}
                            </div>
                        </div>
                    ))}
                    
                    {/* Others Section - Refined */}
                    <div className="col-span-4 mt-1 bg-[#f8f6f3] border border-[#e3f5f2] rounded-xl p-3 flex flex-col items-center justify-center text-[#666666] transition-all duration-300 hover:shadow-md hover:border-[#d0e8e3]">
                        <div className="text-xs font-medium tracking-[0.15em] uppercase text-[#888888] mb-1 font-['Montserrat']">{t('countries.others')}</div>
                        <div className="text-xl font-semibold font-['Cormorant_Garamond'] text-[#a0a0a0]">41.4%</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
