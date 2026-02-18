import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('facilities');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://global.rakanclinic-tokyo.jp';
  const url = `${baseUrl}/${locale}/facilities`;

  const { locales } = await import('@/i18n');
  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc: string) => {
    alternateLanguages[loc] = `${baseUrl}/${loc}/facilities`;
  });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t('metadata.keywords'),
    alternates: { canonical: url, languages: alternateLanguages },
  };
}

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />
      <BackToTopButton />

      {/* Hero Section */}
      <section className="pt-[120px] px-[5%] pb-[4rem] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[800px] mx-auto">
            <div className="inline-block px-3 py-1.5 text-[0.65rem] tracking-[1.5px] uppercase text-[#4a9b7f] font-bold bg-[#4a9b7f]/10 rounded-sm mb-6">
              {t('facilities.badge')}
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] mb-6 leading-[1.1] font-bold text-gray-900">
              {t('facilities.heading')}
            </h1>
            <p className="text-[1.1rem] text-gray-600 leading-[1.75] font-light max-w-[700px] mx-auto">
              {t('facilities.description')}
            </p>
          </div>
        </div>
      </section>

      {/* 1. Introduction Section */}
      <section className="px-[5%] py-[2rem] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center mb-[2rem]">
            <div>
              <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-3">
                <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
                  {t('facilities.introduction.badge')}
                </span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-[1.6rem] md:text-[2rem] text-gray-900 mb-3 font-bold">
                {t('facilities.introduction.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed text-[0.9rem] mb-2">
                {t('facilities.introduction.paragraph1')}
              </p>
              <p className="text-gray-700 leading-relaxed text-[0.9rem]">
                {t('facilities.introduction.paragraph2')}
              </p>
            </div>
            <div className="relative h-[320px] rounded-md overflow-hidden">
              <Image
                src="/images/facilities/lab.webp"
                alt={t('facilities.imageAlts.cpc')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. What is CPC Section */}
      <section className="px-[5%] py-[2rem] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-4">
            <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
              {t('facilities.cpc.badge')}
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[1.6rem] md:text-[2rem] text-gray-900 mb-3 font-bold">
            {t('facilities.cpc.title')}
          </h2>
          <p className="text-gray-700 text-[0.9rem] leading-relaxed mb-4">
            {t('facilities.cpc.description')}
          </p>
          <ul className="space-y-2.5 mb-4">
            {[0, 1, 2].map((index) => (
              <li key={index} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed text-[0.9rem]">
                  {t(`facilities.cpc.features.${index}`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="relative h-[320px] rounded-md overflow-hidden">
            <Image
              src="/images/facilities/working.gif"
              alt={t('facilities.imageAlts.cellCulture')}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* 3. Quality Appeal Section */}
      <section className="px-[5%] py-[2rem] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-4">
            <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
              {t('facilities.quality.badge')}
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[1.6rem] md:text-[2rem] text-gray-900 mb-3 font-bold">
            {t('facilities.quality.title')}
          </h2>
          <p className="text-gray-700 text-[0.9rem] leading-relaxed mb-4">
            {t('facilities.quality.description')}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[250px] rounded-md overflow-hidden">
              <Image
                src="/images/facilities/stemcells.webp"
                alt={t('facilities.imageAlts.stemCells')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-2.5">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-[0.9rem]">
                    {t(`facilities.quality.features.${index}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Equipment Section */}
      <section className="px-[5%] py-[2rem] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-4">
            <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
              {t('facilities.equipment.badge')}
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[1.6rem] md:text-[2rem] text-gray-900 mb-6 font-bold">
            {t('facilities.equipment.title')}
          </h2>

          <div className="space-y-6">
            {/* Safety Cabinet */}
            <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-gray-900 mb-2 font-bold">
                    {t('facilities.equipment.safetyCabinet.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[0.85rem]">
                    {t('facilities.equipment.safetyCabinet.description')}
                  </p>
                </div>
                <div className="relative h-[220px] rounded-md overflow-hidden">
                  <Image
                    src="/images/facilities/biological_safety_cabinet.jpg"
                    alt={t('facilities.imageAlts.safetyCabinet')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* CO2 Incubator */}
            <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="md:order-2 p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-gray-900 mb-2 font-bold">
                    {t('facilities.equipment.co2Incubator.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[0.85rem]">
                    {t('facilities.equipment.co2Incubator.description')}
                  </p>
                </div>
                <div className="md:order-1 relative h-[220px] rounded-md overflow-hidden">
                  <Image
                    src="/images/facilities/co2incubator.webp"
                    alt={t('facilities.imageAlts.co2Incubator')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Inverted Microscope */}
            <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-gray-900 mb-2 font-bold">
                    {t('facilities.equipment.microscope.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[0.85rem]">
                    {t('facilities.equipment.microscope.description')}
                  </p>
                </div>
                <div className="relative h-[220px] rounded-md overflow-hidden">
                  <Image
                    src="/images/facilities/inverted_microscope.jpg"
                    alt={t('facilities.imageAlts.microscope')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Pass Box */}
            <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="md:order-2 p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-gray-900 mb-2 font-bold">
                    {t('facilities.equipment.passBox.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[0.85rem]">
                    {t('facilities.equipment.passBox.description')}
                  </p>
                </div>
                <div className="md:order-1 relative h-[220px] rounded-md overflow-hidden">
                  <Image
                    src="/images/facilities/passbox.jpg"
                    alt={t('facilities.imageAlts.passBox')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Centrifuge */}
            <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="p-6">
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] text-gray-900 mb-2 font-bold">
                    {t('facilities.equipment.centrifuge.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[0.85rem]">
                    {t('facilities.equipment.centrifuge.description')}
                  </p>
                </div>
                <div className="relative h-[220px] rounded-md overflow-hidden">
                  <Image
                    src="/images/facilities/centrifuge.webp"
                    alt={t('facilities.imageAlts.centrifuge')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quality Management & Safety Section */}
      <section className="px-[5%] py-[2rem] bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-4">
            <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
              {t('facilities.management.badge')}
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[1.6rem] md:text-[2rem] text-gray-900 mb-6 font-bold">
            {t('facilities.management.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white rounded-md p-5 border border-gray-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1.5 text-[0.9rem]">
                      {t(`facilities.management.items.${index}.title`)}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {t(`facilities.management.items.${index}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Conclusion Section */}
      <section className="px-[5%] py-[2rem] bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-3 py-1 bg-[#4a9b7f]/10 rounded-sm mb-4">
            <span className="text-[0.65rem] font-semibold text-[#4a9b7f] uppercase tracking-wide">
              {t('facilities.conclusion.badge')}
            </span>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-[0.95rem]">
              {t('facilities.conclusion.paragraph1')}
            </p>
            <p className="text-[0.95rem]">
              {t('facilities.conclusion.paragraph2')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-[4rem] bg-gray-50">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-['Cormorant_Garamond'] text-[2rem] mb-3 text-gray-900 font-bold">
            {t('facilities.cta.title')}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-[0.9rem]">
            {t('facilities.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contact`}
              className="inline-block px-6 py-2.5 bg-[#4a9b7f] text-white font-semibold rounded-md hover:bg-[#3d8269] transition-colors duration-300 text-sm"
            >
              {t('facilities.cta.contact')}
            </Link>
            <a
              href="https://reservation.medical-force.com/c/b04884e74e2542e0a3e0ae50ce50c26b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 border-2 border-[#4a9b7f] text-[#4a9b7f] font-semibold rounded-md hover:bg-[#4a9b7f] hover:text-white transition-colors duration-300 text-sm"
            >
              {t('facilities.cta.book')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
