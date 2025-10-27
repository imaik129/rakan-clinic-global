// Reusable section components for the homepage
'use client';
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import DoctorsMobile from '../../components/DoctorsMobile';
import DoctorsDesktop from '../../components/DoctorsDesktop';
import ClientSlideshow from '../../components/ClientSlideshow';

export function StemCellSection() {
    const t = useTranslations();

    const treatmentIcons = {
        regeneration: (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        inflammation: (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        recovery: (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        pain: (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    };

    return (
        <section className="px-[5%] py-[4rem] bg-gradient-to-br from-[#f0f9f6] via-white to-[#f5faf8]">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center max-w-[700px] mx-auto mb-[3rem]">
                    <div className="text-[0.68rem] tracking-[2.5px] uppercase text-[#4a9b7f] mb-3 font-semibold">
                        {t('stemCell.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4.5vw,3.8rem)] mb-4 leading-[1.15] font-light">
                        {t('stemCell.heading')}
                    </h2>
                    <p className="text-[0.98rem] text-[#666666] leading-[1.75] font-light mb-3">
                        {t('stemCell.intro')}
                    </p>
                    <p className="text-[0.92rem] text-[#666666] leading-[1.75] font-light">
                        {t('stemCell.description')}
                    </p>
                </div>

                {/* Olympics-Style Circular Layout */}
                <div className="max-w-[1000px] mx-auto">
                    {/* Mobile: 2x2 Grid */}
                    <div className="md:hidden grid grid-cols-2 gap-4">
                        {['regeneration', 'inflammation', 'recovery', 'pain'].map((benefit) => (
                            <div key={benefit} className="flex justify-center">
                                <div className="group relative bg-gradient-to-br from-white via-[#f0f9f6] to-[#e8f5f1] rounded-full p-5 border border-[#4a9b7f]/20 hover:border-[#4a9b7f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-[175px] h-[175px] flex items-center justify-center">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-14 h-14 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-all duration-300">
                                            {treatmentIcons[benefit as keyof typeof treatmentIcons]}
                                        </div>
                                        <h3 className="font-['Cormorant_Garamond'] text-[1rem] mb-1.5 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                                            {t(`stemCell.benefits.items.${benefit}.title`)}
                                        </h3>
                                        <p className="text-[0.75rem] text-gray-600 font-light leading-[1.35]">
                                            {t(`stemCell.benefits.items.${benefit}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: Olympics-Style Staggered Layout */}
                    <div className="hidden md:block relative max-w-[750px] mx-auto min-h-[300px]">
                        {/* Top Row - Left (Knee) */}
                        <div className="absolute top-0 left-[80px]">
                            <div className="group relative bg-gradient-to-br from-white via-[#f0f9f6] to-[#e8f5f1] rounded-full p-6 border border-[#4a9b7f]/20 hover:border-[#4a9b7f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:z-10 w-[200px] h-[200px] flex items-center justify-center">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-all duration-300">
                                        {treatmentIcons.regeneration}
                                    </div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[1.05rem] mb-1 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                                        {t('stemCell.benefits.items.regeneration.title')}
                                    </h3>
                                    <p className="text-[0.72rem] text-gray-600 font-light leading-[1.3]">
                                        {t('stemCell.benefits.items.regeneration.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Top Row - Right (Sports) */}
                        <div className="absolute top-0 right-[80px]">
                            <div className="group relative bg-gradient-to-br from-white via-[#f0f9f6] to-[#e8f5f1] rounded-full p-6 border border-[#4a9b7f]/20 hover:border-[#4a9b7f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:z-10 w-[200px] h-[200px] flex items-center justify-center">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-all duration-300">
                                        {treatmentIcons.inflammation}
                                    </div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[1.05rem] mb-1 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                                        {t('stemCell.benefits.items.inflammation.title')}
                                    </h3>
                                    <p className="text-[0.72rem] text-gray-600 font-light leading-[1.3]">
                                        {t('stemCell.benefits.items.inflammation.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Left (Shoulder) - Offset */}
                        <div className="absolute bottom-0 left-[180px]">
                            <div className="group relative bg-gradient-to-br from-white via-[#f0f9f6] to-[#e8f5f1] rounded-full p-6 border border-[#4a9b7f]/20 hover:border-[#4a9b7f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:z-10 w-[200px] h-[200px] flex items-center justify-center">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-all duration-300">
                                        {treatmentIcons.recovery}
                                    </div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[1.05rem] mb-1 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                                        {t('stemCell.benefits.items.recovery.title')}
                                    </h3>
                                    <p className="text-[0.72rem] text-gray-600 font-light leading-[1.3]">
                                        {t('stemCell.benefits.items.recovery.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Right (Spine) - Offset */}
                        <div className="absolute bottom-0 right-[180px]">
                            <div className="group relative bg-gradient-to-br from-white via-[#f0f9f6] to-[#e8f5f1] rounded-full p-6 border border-[#4a9b7f]/20 hover:border-[#4a9b7f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:z-10 w-[200px] h-[200px] flex items-center justify-center">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 flex items-center justify-center mb-2 text-black group-hover:scale-110 transition-all duration-300">
                                        {treatmentIcons.pain}
                                    </div>
                                    <h3 className="font-['Cormorant_Garamond'] text-[1.05rem] mb-1 font-semibold text-gray-900 group-hover:text-[#4a9b7f] transition-colors duration-300 leading-tight">
                                        {t('stemCell.benefits.items.pain.title')}
                                    </h3>
                                    <p className="text-[0.72rem] text-gray-600 font-light leading-[1.3]">
                                        {t('stemCell.benefits.items.pain.description')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function DoctorCard({ doctor, doctorImage }: { doctor: string; doctorImage: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const t = useTranslations();
    const hasAwards = t.has(`doctors.team.${doctor}.awards`);
    const hasExpertise = t.has(`doctors.team.${doctor}.expertise`);
    const hasPublications = t.has(`doctors.team.${doctor}.publications`);

    return (
        <div className="w-full">
            {/* Doctor Photo - Image on Top with No Rounded Corners */}
            <div className="relative w-full h-[340px] overflow-hidden mb-3 group">
                <Image
                    src={doctorImage}
                    alt={t(`doctors.team.${doctor}.name`)}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
            </div>

            {/* Content Section */}
            <div className="space-y-1.5">
                {/* Name and Title */}
                <div>
                    <h3 className="text-[1.2rem] font-bold text-gray-900 mb-0.5 leading-tight">
                        {t(`doctors.team.${doctor}.name`)}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                        {t(`doctors.team.${doctor}.title`)}
                    </p>
                </div>

                {/* Experience Badge */}
                {t.has(`doctors.team.${doctor}.experience`) && (
                    <div>
                        <p className="text-[0.7rem] font-medium text-gray-700">
                            {t(`doctors.team.${doctor}.experience`)}
                        </p>
                    </div>
                )}

                {/* Specialties */}
                <div>
                    <p className="text-[0.65rem] font-bold text-gray-700 uppercase tracking-wide mb-0.5">
                        Specialties
                    </p>
                    <p className="text-[0.7rem] text-gray-600 leading-snug">
                        {t(`doctors.team.${doctor}.specialties`)}
                    </p>
                </div>

                {/* Credentials */}
                <div>
                    <p className="text-[0.7rem] text-gray-500 leading-snug">
                            {t(`doctors.team.${doctor}.credentials`)}
                        </p>
                </div>

                {/* Expandable Bio */}
                {isExpanded && (
                    <div className="pt-2 border-t border-gray-200">
                        <p className="text-[0.7rem] text-gray-600 leading-relaxed">
                            {t(`doctors.team.${doctor}.bio`)}
                        </p>
                    </div>
                )}

                {/* Learn More Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full mt-2 py-1.5 text-[0.7rem] font-semibold text-[#4a9b7f] border border-[#4a9b7f] rounded-lg hover:bg-[#4a9b7f] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    <svg
                        className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export function DoctorsSection() {
    const t = useTranslations();
    const doctorImages = {
        doctor1: '/images/doctors/shimizu.png',
        doctor2: '/images/doctors/takayanagi.jpg',
        doctor3: '/images/doctors/toubaru.png',
        doctor4: '/images/doctors/sumiya.png'
    };

    const doctors = ['doctor1', 'doctor2', 'doctor3', 'doctor4'];

    // Prepare doctors data for mobile component
    const doctorsData = doctors.map((doctor) => ({
        key: doctor,
        image: doctorImages[doctor as keyof typeof doctorImages],
        name: t(`doctors.team.${doctor}.name`),
        title: t(`doctors.team.${doctor}.title`),
        experience: t.has(`doctors.team.${doctor}.experience`) ? t(`doctors.team.${doctor}.experience`) : undefined,
        specialties: t(`doctors.team.${doctor}.specialties`),
        credentials: t(`doctors.team.${doctor}.credentials`),
        bio: t(`doctors.team.${doctor}.bio`)
    }));

    return (
        <section className="py-[6rem] bg-[#f8f6f3] overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-[5%]">
                <div className="text-center max-w-[800px] mx-auto mb-[4rem]">
                    <div className="text-[0.7rem] tracking-[3px] uppercase text-[#4a9b7f] mb-3 font-semibold">
                        {t('doctors.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.2rem,5vw,4rem)] mb-5 leading-[1.1] font-light">
                        {t('doctors.heading')}
                    </h2>
                    <p className="text-[1rem] text-[#666666] leading-[1.75] font-light">
                        {t('doctors.subheading')}
                    </p>
                </div>
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden px-[5%]">
                <DoctorsMobile doctors={doctorsData} />
            </div>

            {/* Desktop: Intro Box + Scrollable Doctors */}
            <div className="hidden md:block max-w-[1400px] mx-auto px-[5%]">
                <DoctorsDesktop
                    doctors={doctorsData}
                    introTitle={t('doctors.intro.title')}
                    introDescription={t('doctors.intro.description')}
                />
            </div>
        </section>
    );
}

export function WhyTokyoSection() {
    const t = useTranslations();

    const featureKeys = ['expertise', 'location', 'standards', 'research', 'facility', 'support'];

    return (
        <section id="services" className="px-[5%] py-[6rem] bg-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
                    <div className="text-[0.68rem] tracking-[2.5px] uppercase text-[#4a9b7f] mb-3 font-semibold">
                        {t('whyTokyo.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.2rem,5vw,3.8rem)] mb-5 leading-[1.1] font-light">
                        {t('whyTokyo.heading')}
                    </h2>
                    <p className="text-[1.05rem] text-[#666666] leading-[1.8] font-light max-w-[750px] mx-auto">
                        {t('whyTokyo.intro')}
                    </p>
                </div>

                {/* Features Grid - Modern 3 Column Layout */}
                <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                    {featureKeys.map((key) => (
                        <div
                            key={key}
                            className="group bg-[#f8f6f3] hover:bg-white p-8 rounded-md border-2 border-transparent hover:border-[#4a9b7f]/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <h3 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-3 font-medium text-[#1a1a1a]">
                                {t(`whyTokyo.features.${key}.title`)}
                                </h3>
                            <p className="text-[0.92rem] text-[#666666] leading-[1.7] font-light">
                                {t(`whyTokyo.features.${key}.description`)}
                                </p>
                        </div>
                    ))}
                </div>

                {/* Client Experience Slider */}
                <ClientExperienceSection />
                    </div>
        </section>
    );
}

export function ClientExperienceSection() {
    const t = useTranslations();

    return (
        <div className="py-[4rem] bg-white">
            {/* Header */}
            <div className="text-center mb-[3rem] px-[5%]">
                <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,2.8rem)] text-[#1a1a1a] mb-2 font-medium">
                    {t('clientExperience.heading')}
                </h2>
                </div>

            {/* Auto-scrolling Slider - Full Width */}
            <div className="w-full">
                <ClientSlideshow />
            </div>
        </div>
    );
}

export function PricingSection() {
    const t = useTranslations();
    const plans = ['essential', 'premium', 'elite'];

    return (
        <section id="pricing" className="px-[5%] py-[8rem] bg-[#f8f6f3]">
            <div className="max-w-[1600px] mx-auto">
                <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
                    <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
                        {t('pricing.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
                        {t('pricing.heading')}
                    </h2>
                    <p className="text-[1.1rem] text-[#666666] leading-[1.8] font-light">
                        {t('pricing.subheading')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                    {plans.map((plan) => {
                        const isPremium = plan === 'premium';
                        return (
                            <div
                                key={plan}
                                className={`relative ${isPremium
                                    ? 'bg-[#1a1a1a] text-white border-2 border-[#c9a962] scale-105'
                                    : 'bg-white border-2 border-transparent'
                                    } p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]`}
                            >
                                {isPremium && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a962] text-[#1a1a1a] px-6 py-2 text-[0.7rem] tracking-[2px] font-semibold uppercase">
                                        Recommended
                                    </div>
                                )}

                                <h3 className="font-['Cormorant_Garamond'] text-[2rem] mb-4 font-normal">
                                    {t(`pricing.plans.${plan}.name`)}
                                </h3>

                                <div className={`text-[3rem] font-['Cormorant_Garamond'] ${isPremium ? 'text-[#c9a962]' : 'text-[#4a9b7f]'
                                    } mb-2 font-light`}>
                                    {t(`pricing.plans.${plan}.price`)}
                                </div>

                                <p className={`text-[0.85rem] ${isPremium ? 'text-white/60' : 'text-[#666666]'
                                    } mb-8 font-light`}>
                                    {t(`pricing.plans.${plan}.description`)}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {t.raw(`pricing.plans.${plan}.features`).map((feature: string, j: number) => (
                                        <li key={j} className={`flex items-start gap-3 text-[0.9rem] font-light ${isPremium ? 'text-white/90' : 'text-[#666666]'
                                            }`}>
                                            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={isPremium ? '#c9a962' : '#4a9b7f'} strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <p className={`text-[0.75rem] ${isPremium ? 'text-white/50' : 'text-[#666666]'
                                    } italic font-light`}>
                                    {t(`pricing.plans.${plan}.note`)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-[0.9rem] text-[#666666] mt-8 font-light italic">
                    {t('pricing.disclaimer')}
                </p>
            </div>
        </section>
    );
}

export function PatientJourneySection() {
    const t = useTranslations();
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const stepIcons = [
        (
            <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
        ),
        (
            <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
        ),
        (
            <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
        ),
        (
            <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
        ),
        (
            <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    ),
        (
            <svg key="6" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
    ];

    const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];

    const journeySteps = steps.map((stepKey, index) => ({
        number: index + 1,
        title: t(`patientJourney.steps.${stepKey}.title`),
        description: t(`patientJourney.steps.${stepKey}.description`),
        icon: stepIcons[index],
        hasDetails: index === 4, // Only step 5 has details
        details: index === 4 ? [
            { step: 1, title: "Counseling", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, details: ["The doctor will explain the treatment content and plan to you.", "We will confirm the reservation date for pre-operative blood draw and fat collection.", "Full payment will be required on the day of treatment consent."] },
            { step: 2, title: "Blood Draw and Pre-Treatment Examination", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, details: ["Collection of fat cells and blood (60-80 cc)"] },
            { step: 3, title: "Notification of Blood Test Results and Start of Cell Culture", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, details: ["Stem cell culture will begin under strict management in the in-house CPC", "The culture period is approximately 6-8 weeks."] },
            { step: 4, title: "Determination of Stem Cell Injection Date", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, details: ["The injection date will be adjusted based on the information available around day 9 of the culture."] },
            { step: 5, title: "Stem Cell Injection Day", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, details: ["After confirming your condition, the stem cells will be administered via infusion.", "The procedure will take approximately 60 minutes."] },
            { step: 6, title: "Treatment Completion", icon: <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, details: ["After confirming your condition, you will be able to go home."] }
        ] : undefined
    }));

    return (
        <section id="support" className="px-[5%] py-[6rem] bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center max-w-[800px] mx-auto mb-[4rem]">
                    <div className="inline-flex items-center px-4 py-2 bg-[#4a9b7f]/10 rounded-full mb-6">
                        <div className="w-2 h-2 bg-[#4a9b7f] rounded-full mr-3"></div>
                        <span className="text-[0.7rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold">
                            {t('patientJourney.badge')}
                        </span>
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.2rem,5vw,4.2rem)] mb-6 leading-[1.1] font-light text-gray-900">
                        {t('patientJourney.heading')}
                    </h2>
                    <p className="text-[1.1rem] text-gray-600 leading-[1.8] font-light max-w-[600px] mx-auto">
                        {t('patientJourney.subheading')}
                    </p>
                </div>

                {/* Journey Timeline */}
                <div className="relative max-w-[1200px] mx-auto">
                    {/* Central Journey Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2 hidden lg:block"></div>

                    {/* Journey Steps */}
                    <div className="space-y-8">
                        {journeySteps.map((step, index) => (
                            <div key={step.number}>
                                <div className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-8 gap-4`}>
                                    {/* Step Content */}
                                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                                        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                                            {/* Step Header */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-[#4a9b7f] group-hover:text-white transition-all duration-300">
                                                    {step.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-[0.6rem] tracking-[1px] uppercase text-[#4a9b7f] font-bold mb-1">
                                                        Step {step.number}
                                                    </div>
                                                    <h3 className="font-['Cormorant_Garamond'] text-[1.2rem] font-semibold text-gray-900 leading-tight">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Step Description */}
                                            <p className="text-[0.85rem] text-gray-600 leading-[1.5] font-light">
                                                {step.description}
                                            </p>

                                            {/* Treatment Details Button for Step 5 */}
                                            {step.hasDetails && (
                                                <div className="mt-4">
                                                    <button
                                                        onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                                                        className="flex items-center gap-2 text-[#4a9b7f] text-[0.8rem] font-medium hover:text-[#3d8269] transition-colors duration-300"
                                                    >
                                                        <span>
                                                            {expandedStep === step.number ? 'Hide Treatment Details' : 'View Treatment Details'}
                                                        </span>
                                                        <svg
                                                            className={`w-4 h-4 transition-transform duration-300 ${expandedStep === step.number ? 'rotate-180' : ''}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Expandable Treatment Details */}
                                        {step.hasDetails && expandedStep === step.number && (
                                            <div className="mt-4 bg-gradient-to-br from-[#f8f6f3] to-white rounded-xl p-4 border border-[#4a9b7f]/20">
                                                <div className="mb-4">
                                                    <h4 className="font-['Cormorant_Garamond'] text-[1.1rem] font-semibold text-gray-900 mb-2">
                                                        Autologous Adipose-Derived Stem Cell Therapy
                                                    </h4>
                                                    <p className="text-[0.8rem] text-[#666666] font-light">
                                                        A comprehensive 6-step process ensuring the highest quality regenerative treatment
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    {step.details && step.details.map((detail, detailIndex) => (
                                                        <div key={detailIndex} className="flex gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                                            {/* Detail Step Number and Icon */}
                                                            <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-[#4a9b7f] rounded-full flex items-center justify-center text-white font-bold text-xs mb-2">
                                                                    {detail.step}
                                                                </div>
                                                                <div className="w-6 h-6 bg-[#4a9b7f]/10 rounded-lg flex items-center justify-center">
                                                                    {detail.icon}
                                                                </div>
                                                            </div>

                                                            {/* Detail Content */}
                                                            <div className="flex-1">
                                                                <h5 className="font-['Cormorant_Garamond'] text-[0.95rem] font-semibold text-gray-900 mb-2">
                                                                    {detail.title}
                                                                </h5>
                                                                <ul className="space-y-1">
                                                                    {detail.details.map((item, itemIndex) => (
                                                                        <li key={itemIndex} className="flex items-start gap-2 text-[0.75rem] text-[#666666] font-light">
                                                                            <div className="w-1 h-1 bg-[#4a9b7f] rounded-full mt-2 flex-shrink-0"></div>
                                                                            <span>{item}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* CPC Note */}
                                                <div className="mt-4 p-3 bg-[#4a9b7f]/5 rounded-lg border border-[#4a9b7f]/20">
                                                    <div className="flex items-start gap-2">
                                                        <svg className="w-4 h-4 text-[#4a9b7f] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <div>
                                                            <p className="text-[0.75rem] text-[#4a9b7f] font-medium mb-1">
                                                                CPC (Cell Processing Center)
                                                            </p>
                                                            <p className="text-[0.7rem] text-[#666666] font-light">
                                                                All stem cell processing is conducted in our state-of-the-art in-house Cell Processing Center under strict quality control and safety protocols.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Journey Connector */}
                                    <div className="hidden lg:flex flex-col items-center justify-center w-16 relative z-10">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 shadow-md">
                                            <span className="text-gray-700 text-sm font-bold">
                                                {step.number}
                                            </span>
                                        </div>
                                        {index < journeySteps.length - 1 && (
                                            <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                                        )}
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 hidden lg:block"></div>
                                </div>

                                {/* Mobile Down Arrow */}
                                {index < journeySteps.length - 1 && (
                                    <div className="flex justify-center mt-4 mb-4 lg:hidden">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Journey Completion */}
                <div className="mt-12 max-w-[900px] mx-auto">
                    <div className="relative rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/azabudai_hills.png"
                                alt="Azabudai Hills - Tokyo's Premier Medical District"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 900px"
                            />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-black/50" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 text-center text-white">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#4a9b7f] to-[#3d8269] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-['Cormorant_Garamond'] text-[1.8rem] mb-4 font-semibold text-white drop-shadow-lg">
                                {t('patientJourney.journeyComplete')}
                            </h3>
                            <p className="text-[1rem] text-white/90 leading-[1.7] font-light mb-6 max-w-[500px] mx-auto drop-shadow-md">
                                {t('patientJourney.journeyDescription')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href="#contact" className="inline-flex items-center px-6 py-3 bg-[#4a9b7f] text-white rounded-lg text-sm font-semibold tracking-[1px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:-translate-y-1 hover:shadow-lg">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t('patientJourney.ctaStart')}
                                </a>
                                <a href="#pricing" className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg text-sm font-semibold tracking-[1px] uppercase transition-all duration-300 hover:bg-white hover:text-[#4a9b7f]">
                                    {t('patientJourney.ctaPricing')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance Notice */}
                <div className="mt-6 max-w-[700px] mx-auto text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-[#4a9b7f]/10 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-[#4a9b7f] uppercase tracking-wide">Compliance & Ethics</span>
                    </div>
                    <p className="text-[0.8rem] text-gray-600 font-light">
                        {t('patientJourney.compliance')}
                    </p>
                </div>
            </div>
        </section>
    );
}

export function TestimonialsSection() {
    const t = useTranslations();
    return (
        <section className="px-[5%] py-[5rem] bg-white">
            <div className="max-w-[1600px] mx-auto">
                <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
                    <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
                        {t('testimonials.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
                        {t('testimonials.heading')}
                    </h2>
                    <p className="text-[1.1rem] text-[#666666] leading-[1.8] font-light">
                        {t('testimonials.subheading')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                    {['review1', 'review2', 'review3'].map((review) => (
                        <div key={review} className="bg-[#f8f6f3] p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-[#c9a962]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-[1.1rem] text-[#1a1a1a] leading-[1.7] font-light italic mb-6">
                                "{t(`testimonials.reviews.${review}.quote`)}"
                            </p>
                            <div className="border-t border-[#4a9b7f]/20 pt-6">
                                <p className="font-['Cormorant_Garamond'] text-[1.2rem] font-medium mb-1">
                                    {t(`testimonials.reviews.${review}.name`)}
                                </p>
                                <p className="text-[0.85rem] text-[#4a9b7f] mb-2">
                                    {t(`testimonials.reviews.${review}.location`)}
                                </p>
                                <p className="text-[0.85rem] text-[#666666] font-light">
                                    {t(`testimonials.reviews.${review}.treatment`)}
                                </p>
                                <div className="mt-4 p-3 bg-[rgba(74,155,127,0.1)] rounded">
                                    <p className="text-[0.8rem] text-[#4a9b7f] font-medium">
                                        Result: {t(`testimonials.reviews.${review}.result`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FAQSection() {
    const t = useTranslations();

    const faqs = [
        {
            question: t('faq.items.question1'),
            answer: t('faq.items.answer1')
        },
        {
            question: t('faq.items.question2'),
            answer: t('faq.items.answer2')
        },
        {
            question: t('faq.items.question3'),
            answer: t('faq.items.answer3')
        },
        {
            question: t('faq.items.question4'),
            answer: t('faq.items.answer4')
        },
        {
            question: t('faq.items.question5'),
            answer: t('faq.items.answer5')
        },
        {
            question: t('faq.items.question6'),
            answer: t('faq.items.answer6')
        },
        {
            question: t('faq.items.question7'),
            answer: t('faq.items.answer7')
        },
        {
            question: t('faq.items.question8'),
            answer: t('faq.items.answer8')
        }
    ];

    return (
        <section id="faq" className="px-[5%] py-[4rem] bg-[#f8f6f3]">
            <div className="max-w-[1000px] mx-auto">
                <div className="text-center max-w-[700px] mx-auto mb-[3rem]">
                    <div className="text-[0.68rem] tracking-[2.5px] uppercase text-[#4a9b7f] mb-3 font-semibold">
                        {t('faq.badge')}
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4.5vw,3.8rem)] mb-4 leading-[1.15] font-light">
                        {t('faq.heading')}
                    </h2>
                    <p className="text-[0.98rem] text-[#666666] leading-[1.75] font-light">
                        {t('faq.description')}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            >
                <h3 className="text-[1rem] font-semibold text-gray-900 pr-4">
                    {question}
                </h3>
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-[#4a9b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 bg-gray-50/30">
                    <p className="text-[0.92rem] text-gray-700 leading-[1.75] font-light">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

