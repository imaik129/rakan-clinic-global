import Link from "next/link";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import HeroCarousel from '@/components/HeroCarousel';
import ContactForm from '@/components/ContactForm';
import { type Locale } from '@/i18n';
import {
  StemCellSection,
  DoctorsSection,
  WhyTokyoSection,
  PatientJourneySection,
  TestimonialsSection,
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

      {/* 1. Hero Carousel - Full Width with Rounded Corners */}
      <HeroCarousel />

      {/* 2. Treatment Goals / Who We Help */}
      <section className="px-[5%] py-[5rem] bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-[3rem]">
            <div className="inline-flex items-center px-4 py-2 bg-[#4a9b7f]/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#4a9b7f] rounded-full mr-3"></div>
              <span className="text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold">
                Treatment Goals
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3.5rem)] mb-4 leading-[1.1] font-light text-gray-900">
              Regenerative Medicine Tailored to Your Life Goals
            </h2>
            <p className="text-[1rem] text-gray-600 leading-[1.6] font-light">
              From athletic performance to healthy aging, our advanced regenerative treatments are designed to help you achieve your specific health and wellness objectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Longevity & Vitality",
                image: "/images/reuseable/1.png",
                description: "Reverse cellular aging with advanced stem cell therapies. Boost energy, enhance metabolism, and maintain youthful vitality through cutting-edge regenerative medicine.",
                benefits: [
                  "Cellular regeneration boost",
                  "Metabolic optimization",
                  "Energy & vitality increase",
                  "Anti-aging support"
                ]
              },
              {
                title: "Enhanced Performance",
                image: "/images/reuseable/2.png",
                description: "Maximize athletic potential with PRP and stem cell treatments. Accelerate recovery, build resilience, and achieve peak performance naturally.",
                benefits: [
                  "Faster muscle recovery",
                  "Joint flexibility boost",
                  "Inflammation reduction",
                  "Endurance enhancement"
                ]
              },
              {
                title: "Chronic Disease Management",
                image: "/images/reuseable/3.png",
                description: "Combat chronic conditions with evidence-based regenerative protocols. Slow disease progression and restore quality of life through advanced cellular therapy.",
                benefits: [
                  "Chronic inflammation relief",
                  "Joint function improvement",
                  "Disease progression slowdown",
                  "Daily mobility restoration"
                ]
              },
              {
                title: "Pain & Injury Recovery",
                image: "/images/reuseable/4.png",
                description: "Accelerate healing from sports injuries and trauma. Natural pain relief and tissue repair through targeted PRP and stem cell injections.",
                benefits: [
                  "Rapid tissue repair",
                  "Natural pain relief",
                  "Scar tissue minimization",
                  "Full function restoration"
                ]
              }
            ].map((goal, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image Background - Top 25% */}
                <div className="absolute top-0 left-0 right-0 h-[25%] overflow-hidden">
                  <Image
                    src={goal.image}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content - Bottom 75% */}
                <div className="relative z-10 pt-[25%] p-5">
                  {/* Title */}
                  <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] mb-2 font-semibold text-gray-900 leading-tight">
                    {goal.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-[0.9rem] leading-[1.5] font-light mb-4">
                    {goal.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-2">
                    {goal.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#4a9b7f] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-[0.8rem] font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What is Stem Cell Therapy */}
      <div id="stem-cell">
        <StemCellSection />
      </div>


      {/* 4. Meet Our Doctors */}
      <div id="doctors">
        <DoctorsSection />
      </div>

      {/* 5. About Section - Consolidated */}
      <section id="about" className="px-[5%] py-[5rem] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto mb-[3rem]">
            <div className="text-[0.68rem] tracking-[2.5px] uppercase text-[#4a9b7f] mb-3 font-semibold">
              About Us
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4.5vw,3.8rem)] mb-4 leading-[1.15] font-light">
              {t('about.heading')}
            </h2>
            <p className="text-[0.98rem] text-[#666666] leading-[1.75] font-light">
              Advanced orthopedic and regenerative care in Azabudai Hills, central Tokyo.
            </p>
          </div>

          {/* Clinic Entrance Full-Width Showcase - TOP */}
          <div className="max-w-[1200px] mx-auto mb-[3.5rem]">
            <div className="relative h-[420px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-tl-[32px] rounded-br-[32px] group">
              <div className="absolute inset-0 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                  src="/images/rakan_entrance.png"
                  alt="Rakan Clinic Tokyo - Azabudai Hills Entrance"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/50 to-transparent flex items-center rounded-tl-[32px] rounded-br-[32px]">
                <div className="text-white px-[8%] max-w-[700px]">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c9a962]/20 backdrop-blur-sm border border-[#c9a962]/30 rounded-full mb-4">
                    <svg className="w-3.5 h-3.5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-[0.65rem] text-[#c9a962] font-semibold tracking-[2px] uppercase">
                      Our Facility
                    </p>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-[2.3rem] mb-4 font-light leading-tight">
                    Rakan Clinic Tokyo Azabudai
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#c9a962] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-[0.92rem] font-light leading-[1.75] text-white/90">
                        State-of-the-art regenerative medicine facility with sterile processing labs
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#c9a962] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-[0.92rem] font-light leading-[1.75] text-white/90">
                        Private consultation rooms ensuring complete discretion for VIP patients
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#c9a962] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-[0.92rem] font-light leading-[1.75] text-white/90">
                        Premium location in Tokyo's most prestigious international district
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Bottom Content */}
          <div className="max-w-[1000px] mx-auto">
            {/* Stats - Compact Inline */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-[2.5rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light leading-none mb-1">
                  35+
                </div>
                <div className="text-[0.75rem] font-semibold text-[#1a1a1a] uppercase tracking-[1px]">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-[2.5rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light leading-none mb-1">
                  100%
                </div>
                <div className="text-[0.75rem] font-semibold text-[#1a1a1a] uppercase tracking-[1px]">
                  Japanese Standards
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-center max-w-[800px] mx-auto mb-6">
              <p className="text-[0.9rem] text-[#666666] leading-[1.8] font-light">
                Trusted by global executives, Olympic athletes, and political leaders worldwide. Our 35+ years of JOA-certified expertise has made us the premier destination for regenerative medicine, serving elite clientele who demand the highest standards of care and discretion.
              </p>
            </div>

            {/* Trusted By - Elite Clientele */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#c9a962]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-[0.8rem] text-[#666666] font-medium">
                  Trusted by Olympic Athletes, Global Executives, and Political Leaders
                </p>
              </div>
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
                Treatment Packages
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.2rem,5vw,4.2rem)] mb-6 leading-[1.1] font-light text-gray-900">
              Transparent Pricing for Regenerative Medicine
            </h2>
            <p className="text-[1.1rem] text-gray-600 leading-[1.8] font-light max-w-[600px] mx-auto">
              Choose the treatment package that best fits your needs. All packages include comprehensive care and follow-up support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {/* Single Session */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">SINGLE SESSION</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  $25,000~
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Adipose tissue collection and cell cultivation are performed each time. No cryopreservation. No blood test monitoring.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      One-time treatment
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Fresh cell cultivation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Immediate treatment
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3 Sessions Per Year */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#4a9b7f] hover:border-[#3d8269] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4a9b7f] text-white px-6 py-2 rounded-full text-xs font-bold tracking-wide">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">3 SESSIONS PER YEAR</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  $60,500~
                </div>
                <div className="text-sm text-gray-500">$20,167~ per session</div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cells collected and frozen at first session. Used for 3 treatments in 1 year. Includes storage fee and blood test at each visit.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      3 treatments over 1 year
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Cell cryopreservation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Blood test monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Storage fees included
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6 Sessions Over 2 Years */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#4a9b7f]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-[#c9a962] text-white rounded-lg mb-4">
                  <span className="text-sm font-bold tracking-wide">6 SESSIONS OVER 2 YEARS</span>
                </div>
                <div className="text-[3rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light mb-2">
                  $115,000~
                </div>
                <div className="text-sm text-gray-500">$19,167~ per session</div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Cells collected and frozen at first session. Used for up to 6 treatments over 2 years. Includes storage fee and blood test at each visit.
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      6 treatments over 2 years
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Long-term cell storage
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Comprehensive monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4a9b7f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Best value option
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Disclaimer */}
          <div className="mt-12 max-w-[800px] mx-auto text-center">
            <p className="text-sm text-gray-500 italic">
              *Includes consultation, treatment coordination, and comprehensive patient care services
            </p>
          </div>

          {/* Additional Services Notice */}
          <div className="mt-8 max-w-[800px] mx-auto text-center p-6 bg-[#f8f6f3] rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 font-light">
              <strong className="text-[#4a9b7f]">Additional Services:</strong> An additional fee applies for producing exosomes from your own cells. Please contact us for details.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <a href="#contact">
              <button className="bg-[#4a9b7f] text-white px-8 py-4 text-sm font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:-translate-y-1 hover:shadow-lg">
                Get Personalized Quote
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* 8. Patient Journey */}
      <PatientJourneySection />

      {/* 8. Client Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Contact Section */}
      <section id="contact" className="px-[5%] py-[5rem] bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
              Get in Touch
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
              {t('contact.heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-[4rem] max-w-[1200px] mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-6 font-light leading-tight">
                  Contact<br />Information
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


