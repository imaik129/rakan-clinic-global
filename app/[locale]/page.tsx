import Link from "next/link";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import ContactForm from '@/components/ContactForm';
import BackToTopButton from '@/components/BackToTopButton';
import TreatmentGoalsMobile from '@/components/TreatmentGoalsMobile';
import { type Locale } from '@/i18n';
import {
  StemCellSection,
  DoctorsSection,
  WhyTokyoSection,
  ClientExperienceSection,
  PatientJourneySection,
  FAQSection
} from './page-sections';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-[#f8f6f3] scroll-smooth">
      {/* Header Component */}
      <Header locale={locale} />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* 1. Hero Carousel - Full Width with Rounded Corners */}
      <HeroCarousel />

      {/* 2. Treatment Goals / Who We Help */}
      <section className="px-[5%] md:py-[5rem] py-[3.5rem] bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-[4rem] md:mb-[4rem] mb-[2.5rem]">
            <span className="inline-block px-4 py-2 text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold bg-[#4a9b7f]/10 rounded-full mb-3 md:mb-4">
              {t('treatmentGoals.badge')}
              </span>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.6rem,4vw,3.2rem)] mb-3 md:mb-4 leading-[1.15] font-bold text-gray-900">
              {t('treatmentGoals.heading')}
            </h2>
          </div>

          {/* Olympics-Style Circular Layout */}
          <div className="max-w-[1200px] mx-auto px-0 md:px-0">
            {/* Mobile: Horizontal Scroll with Nav Buttons */}
            <div className="md:hidden">
              <TreatmentGoalsMobile
                goals={[
                  {
                    key: 'longevity',
                    image: '/images/reuseable/1.png',
                    category: t('treatmentGoals.goals.longevity.category'),
                    title: t('treatmentGoals.goals.longevity.title'),
                    description: t('treatmentGoals.goals.longevity.description')
                  },
                  {
                    key: 'performance',
                    image: '/images/reuseable/2.png',
                    category: t('treatmentGoals.goals.performance.category'),
                    title: t('treatmentGoals.goals.performance.title'),
                    description: t('treatmentGoals.goals.performance.description')
                  },
                  {
                    key: 'disease',
                    image: '/images/reuseable/3.png',
                    category: t('treatmentGoals.goals.disease.category'),
                    title: t('treatmentGoals.goals.disease.title'),
                    description: t('treatmentGoals.goals.disease.description')
                  },
                  {
                    key: 'recovery',
                    image: '/images/reuseable/4.png',
                    category: t('treatmentGoals.goals.recovery.category'),
                    title: t('treatmentGoals.goals.recovery.title'),
                    description: t('treatmentGoals.goals.recovery.description')
                  }
                ]}
              />
            </div>

            {/* Desktop: 4 in a Row */}
            <div className="hidden md:grid grid-cols-4 gap-4 max-w-[1200px] mx-auto">
              {[
                { key: 'longevity', image: '/images/reuseable/1.png' },
                { key: 'performance', image: '/images/reuseable/2.png' },
                { key: 'disease', image: '/images/reuseable/3.png' },
                { key: 'recovery', image: '/images/reuseable/4.png' }
              ].map((goal) => (
                <div key={goal.key}>
                  {/* Image Section - Rounded corners with shadow */}
                  <div className="relative w-full h-[280px] overflow-hidden rounded-md shadow-lg mb-3">
                  <Image
                    src={goal.image}
                    alt=""
                    fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 25vw, 300px"
                  />
                </div>
                  {/* Content Section */}
                  <div className="space-y-1">
                    <p className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-wider">
                      {t(`treatmentGoals.goals.${goal.key}.category`)}
                    </p>
                    <h3 className="font-['Cormorant_Garamond'] text-[1.2rem] font-bold text-gray-900">
                      {t(`treatmentGoals.goals.${goal.key}.title`)}
                  </h3>
                    <p className="text-[0.85rem] text-gray-600 font-light leading-[1.5]">
                      {t(`treatmentGoals.goals.${goal.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
              </div>
          </div>
        </div>
      </section>


      {/* 4. Meet Our Doctors */}
      <div id="doctors">
        <DoctorsSection />
      </div>

      {/* 5. About Section - Redesigned */}
      <section id="about" className="px-[5%] py-[5rem] bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[800px] mx-auto mb-[4rem]">
            <div className="inline-block px-4 py-2 text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold bg-[#4a9b7f]/10 rounded-full mb-4">
              {t('about.badge')}
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.4rem)] mb-4 leading-[1.15] font-bold text-gray-900">
              {t('about.heading')}
            </h2>
            <p className="text-[1rem] text-gray-600 leading-[1.75] font-light">
              {t('about.description')}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-[4rem]">
            {/* Left: Image */}
            <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/images/rakan_entrance.png"
                  alt="Rakan Clinic Tokyo - Azabudai Hills Entrance"
                  fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right: Facility Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#4a9b7f] uppercase tracking-wider mb-3">
                  {t('about.facility.title')}
                </p>
                <h3 className="font-['Cormorant_Garamond'] text-[2rem] font-light text-gray-900 mb-4">
                  {t('about.facility.clinicName')}
                </h3>
              </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('about.facility.features.0')}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('about.facility.features.1')}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('about.facility.features.2')}
                  </p>
            </div>
          </div>

              {/* Trusted By */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="inline-flex items-center gap-2 text-xs text-gray-600 font-medium">
                <svg className="w-4 h-4 text-[#c9a962]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                  {t('about.trustedBy.title')}
                </div>
              </div>

              {/* Learn More Button */}
              <Link
                href={`/${locale}/facilities`}
                className="inline-block mt-6 px-6 py-3 bg-[#4a9b7f] text-white font-semibold rounded-lg hover:bg-[#3d8269] transition-colors duration-300"
              >
                {t('about.facility.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Rakan Clinic Tokyo */}
      <WhyTokyoSection />

      {/* 7. Pricing Section */}
      <section id="pricing" className="px-[5%] py-[6rem] bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[800px] mx-auto mb-[4rem]">
            <div className="inline-flex items-center px-4 py-2 bg-[#4a9b7f]/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#4a9b7f] rounded-full mr-3"></div>
              <span className="text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold">
                {t('pricing.badge')}
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4.5vw,3.8rem)] mb-6 leading-[1.1] font-bold text-gray-900">
              {t('pricing.heading')}
            </h2>
            <p className="text-[1.1rem] text-gray-600 leading-[1.8] font-light max-w-[600px] mx-auto">
              {t('pricing.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {/* Single Session */}
            <div className="bg-white rounded-md p-8 border border-gray-200 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">{t('pricing.packages.single.name')}</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  {t('pricing.packages.single.price')}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('pricing.packages.single.description')}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(t.raw('pricing.packages.single.features') as string[]).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                        {feature}
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3 Sessions Per Year */}
            <div className="bg-white rounded-md p-8 border-2 border-[#4a9b7f] hover:border-[#3d8269] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4a9b7f] text-white px-6 py-2 rounded-full text-xs font-bold tracking-wide">
                {t('pricing.packages.three.featured')}
              </div>
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">{t('pricing.packages.three.name')}</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  {t('pricing.packages.three.price')}
                </div>
                <div className="text-sm text-gray-500">{t('pricing.packages.three.pricePerSession')}</div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('pricing.packages.three.description')}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(t.raw('pricing.packages.three.features') as string[]).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                        {feature}
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 6 Sessions Over 2 Years */}
            <div className="bg-white rounded-md p-8 border border-gray-200 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">{t('pricing.packages.six.name')}</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  {t('pricing.packages.six.price')}
                </div>
                <div className="text-sm text-gray-500">{t('pricing.packages.six.pricePerSession')}</div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('pricing.packages.six.description')}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {(t.raw('pricing.packages.six.features') as string[]).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                        {feature}
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Disclaimer */}
          <div className="mt-12 max-w-[800px] mx-auto text-center">
            <p className="text-sm text-gray-500 italic">
              {t('pricing.includes')}
            </p>
          </div>

          {/* Additional Services Notice */}
          <div className="mt-8 max-w-[800px] mx-auto text-center p-6 bg-[#f8f6f3] rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 font-light">
              {t('pricing.additionalServices')}
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <a href="#contact">
              <button className="bg-[#4a9b7f] text-white px-8 py-4 text-sm font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:-translate-y-1 hover:shadow-lg">
                {t('pricing.cta')}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Patient Journey */}
      <PatientJourneySection />

      {/* 8. Client Testimonials */}
      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Contact Section */}
      <section id="contact" className="px-[5%] py-[5rem] bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
              {t('contact.badge')}
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.2rem,5vw,4.2rem)] mb-6 leading-[1.1] font-bold">
              {t('contact.heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-[4rem] max-w-[1200px] mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-6 font-light leading-tight">
                  {t('contact.infoTitle')}
                </h3>
              </div>

              {[
                { label: t('contactSection.phone'), value: '+81-3-6277-6112', note: null },
                { label: t('contactSection.email'), value: 'rakanclinictokyo@gmail.com', note: t('contactSection.emailNote') },
                { label: t('contactSection.location'), value: t('contactInfo.address'), note: null },
                { label: t('contactSection.access'), value: t('contactInfo.access'), note: null }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-[0.75rem] uppercase tracking-[2px] text-[#4a9b7f] mb-2 font-medium">
                    {item.label}
                  </div>
                  <div className="text-[1.1rem] text-[#1a1a1a] font-light whitespace-pre-line">
                    {item.value}
                  </div>
                  {item.note && (
                    <div className="text-[0.75rem] text-gray-500 italic mt-1">
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 10. Safety & Compliance Notice */}
      <section className="px-[5%] py-[4rem] bg-[#1a1a1a] text-white">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="font-['Cormorant_Garamond'] text-[2rem] mb-8 font-light text-center">
            {t('safetyNotice.heading')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {['evidence', 'certification', 'sterility', 'consent', 'followup'].map((point) => (
              <div key={point} className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-[#4a9b7f] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[0.9rem] font-light text-white/80">
                  {t(`safetyNotice.points.${point}`)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-[0.85rem] font-light italic text-white/70">
              {t('safetyNotice.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#1a1a1a] text-white/60 px-[5%] py-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto text-center">
          <div className="font-['Cormorant_Garamond'] text-[1.5rem] text-white mb-2">
            {t('footer.brand.name')}
          </div>
          <p className="text-[0.75rem] text-white/40 mb-6 uppercase tracking-[2px]">
            {t('footer.brand.tagline')}
          </p>
          <p className="text-[0.85rem] font-light">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}


