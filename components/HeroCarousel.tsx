'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const heroImages = {
    en: [
        {
            src: '/images/azabudai_hills.png',
            alt: 'Azabudai Hills - Tokyo\'s Premier Medical District',
            title: 'Tokyo\'s Premier Medical District',
            subtitle: 'Located in Azabudai Hills, Tokyo\'s most prestigious international medical hub'
        },
        {
            src: '/images/injection.png',
            alt: 'Advanced Regenerative Medicine Treatment',
            title: 'A Pain-Free Future with Regenerative Medicine',
            subtitle: 'PRP therapy and shockwave treatment fundamentally improve pain without relying on surgery'
        },
        {
            src: '/images/rakan_entrance.png',
            alt: 'Rakan Clinic Tokyo - Premium Medical Facility',
            title: 'World-Class Medical Excellence',
            subtitle: 'State-of-the-art facility with JOA-certified specialists and 35+ years of experience'
        }
    ],
    ja: [
        {
            src: '/images/azabudai_hills.png',
            alt: 'Azabudai Hills - Tokyo\'s Premier Medical District',
            title: '東京の最高級医療地区',
            subtitle: '麻布台ヒルズに位置する、東京で最も権威ある国際医療ハブ'
        },
        {
            src: '/images/injection.png',
            alt: 'Advanced Regenerative Medicine Treatment',
            title: 'つらい関節の痛みに\n再生医療という選択肢を',
            subtitle: 'PRP療法や衝撃波治療で\n手術に頼らず痛みを根本から改善します'
        },
        {
            src: '/images/rakan_entrance.png',
            alt: 'Rakan Clinic Tokyo - Premium Medical Facility',
            title: '世界クラスの医療技術',
            subtitle: 'JOA認定専門医と35年以上の経験を持つ最先端施設'
        }
    ]
};

export default function HeroCarousel() {
    const [currentImage, setCurrentImage] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const locale = useLocale();
    const images = heroImages[locale as keyof typeof heroImages] || heroImages.en;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="relative w-full h-screen pt-[70px] md:pt-[100px] overflow-hidden">
            {/* Full-width Image Carousel with Rounded Corners and Parallax */}
            <div
                className="relative w-full h-full rounded-tl-[32px] rounded-br-[32px] overflow-hidden"
                style={{
                    transform: `translateY(${scrollY * 0.5}px)`
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="100vw"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white px-[5%] max-w-[1200px] mx-auto">
                    {/* Enhanced Text Container with Better Spacing */}
                    <div className="mb-8">
                        <h1 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-light mb-4 whitespace-pre-line drop-shadow-lg">
                            {images[currentImage].title}
                        </h1>
                        <p className="text-[1.2rem] leading-[1.6] font-light max-w-[700px] mx-auto whitespace-pre-line drop-shadow-md">
                            {images[currentImage].subtitle}
                        </p>
                    </div>

                    {/* Enhanced Button Container */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="bg-[#4a9b7f] text-white px-8 py-4 text-sm font-semibold tracking-[1.5px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:-translate-y-1 hover:shadow-lg rounded-sm"
                        >
                            Get an Estimate
                        </button>
                        <button
                            onClick={() => scrollToSection('stem-cell')}
                            className="border border-white text-white px-8 py-4 text-sm font-medium tracking-[1.5px] uppercase transition-all duration-300 hover:bg-white hover:text-[#4a9b7f] rounded-sm"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
