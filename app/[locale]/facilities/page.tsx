import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function FacilitiesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-[5%] py-[6rem] bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[800px] mx-auto mb-[4rem]">
            <div className="inline-block px-4 py-2 text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold bg-[#4a9b7f]/10 rounded-full mb-4">
              {t('facilities.badge')}
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4.5rem)] mb-4 leading-[1.15] font-light text-gray-900">
              {t('facilities.heading')}
            </h1>
            <p className="text-[1.1rem] text-gray-600 leading-[1.75] font-light max-w-[600px] mx-auto">
              {t('facilities.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Facility Image */}
      <section className="px-[5%] py-[3rem] bg-white">
        <div className="max-w-[1200px] mx-auto mb-[4rem]">
          <div className="relative h-[500px] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/rakan_entrance.png"
              alt={t('facilities.mainImage.alt')}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
              <div className="text-white p-8 max-w-[700px]">
                <h2 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-4 font-light leading-tight">
                  {t('facilities.mainImage.title')}
                </h2>
                <p className="text-[1rem] leading-relaxed opacity-90">
                  {t('facilities.mainImage.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="px-[5%] py-[4rem] bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-[3rem]">
            {/* Sterile Processing Labs */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-[300px] bg-gradient-to-br from-[#4a9b7f]/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-[#4a9b7f] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <h3 className="font-['Cormorant_Garamond'] text-[2rem] text-gray-900 mb-3">
                    {t('facilities.features.sterile.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('facilities.features.sterile.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Private Consultation Rooms */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-[300px] bg-gradient-to-br from-[#c9a962]/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-16 h-16 text-[#c9a962] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="font-['Cormorant_Garamond'] text-[2rem] text-gray-900 mb-3">
                    {t('facilities.features.private.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('facilities.features.private.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Location */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[350px] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <div className="text-center text-white p-8 max-w-[800px]">
                <svg className="w-16 h-16 text-[#c9a962] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-4">
                  {t('facilities.features.location.title')}
                </h3>
                <p className="text-[1.1rem] leading-relaxed opacity-90">
                  {t('facilities.features.location.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-[5rem] bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-4 text-gray-900">
            {t('facilities.cta.title')}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('facilities.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contact`}
              className="inline-block px-8 py-3 bg-[#4a9b7f] text-white font-semibold rounded-lg hover:bg-[#3d8269] transition-colors duration-300"
            >
              {t('facilities.cta.contact')}
            </Link>
            <a
              href="https://reservation.medical-force.com/c/b04884e74e2542e0a3e0ae50ce50c26b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-[#4a9b7f] text-[#4a9b7f] font-semibold rounded-lg hover:bg-[#4a9b7f] hover:text-white transition-colors duration-300"
            >
              {t('facilities.cta.book')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
