'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const carouselData = [
    {
        src: '/images/azabudai_hills.png',
        translationKey: 'location'
    },
    {
        src: '/images/injection.png',
        translationKey: 'painFree'
    },
    {
        src: '/images/rakan_entrance.png',
        translationKey: 'excellence'
    }
];

export default function HeroCarousel() {
    const t = useTranslations();
    const [currentImage, setCurrentImage] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const images = carouselData.map(item => ({
        src: item.src,
        alt: t(`heroCarousel.${item.translationKey}.alt`),
        title: t(`heroCarousel.${item.translationKey}.title`),
        subtitle: t(`heroCarousel.${item.translationKey}.subtitle`)
    }));

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
                            {t('heroCarousel.cta.estimate')}
                        </button>
                        <button
                            onClick={() => scrollToSection('stem-cell')}
                            className="border border-white text-white px-8 py-4 text-sm font-medium tracking-[1.5px] uppercase transition-all duration-300 hover:bg-white hover:text-[#4a9b7f] rounded-sm"
                        >
                            {t('heroCarousel.cta.learnMore')}
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
