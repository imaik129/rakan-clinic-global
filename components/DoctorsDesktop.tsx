'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface Doctor {
    key: string;
    image: string;
    name: string;
    title: string;
    experience?: string;
    specialties: string;
    credentials: string;
    bio: string;
}

interface DoctorsDesktopProps {
    doctors: Doctor[];
    introTitle: string;
    introDescription: string;
}

export default function DoctorsDesktop({ doctors, introTitle, introDescription }: DoctorsDesktopProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = 306; // 300px width + 6px gap

        if (direction === 'left') {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                ref={scrollContainerRef}
            >
                {/* Intro Box */}
                <div className="flex-shrink-0 w-[300px] snap-center">
                    <div className="relative w-full h-[340px] bg-[#4a9b7f] flex items-center justify-center mb-3">
                        <div className="text-white text-center px-6">
                            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-3">{introTitle}</h3>
                            <p className="text-sm opacity-90">{introDescription}</p>
                        </div>
                    </div>
                    <div className="h-[200px]"></div> {/* Spacer for content */}
                </div>

                {doctors.map((doctor) => (
                    <div key={doctor.key} className="flex-shrink-0 w-[300px] snap-center">
                        {/* Image */}
                        <div className="relative w-full h-[340px] overflow-hidden mb-3 group">
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                                sizes="300px"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-1.5">
                            <div>
                                <h3 className="text-[1.2rem] font-bold text-gray-900 mb-0.5 leading-tight">
                                    {doctor.name}
                                </h3>
                                <p className="text-xs text-gray-600 font-medium">
                                    {doctor.title}
                                </p>
                            </div>

                            {doctor.experience && (
                                <div>
                                    <p className="text-[0.7rem] font-medium text-gray-700">
                                        {doctor.experience}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-[0.65rem] font-bold text-gray-700 uppercase tracking-wide mb-0.5">
                                    Specialties
                                </p>
                                <p className="text-[0.7rem] text-gray-600 leading-snug">
                                    {doctor.specialties}
                                </p>
                            </div>

                            <div>
                                <p className="text-[0.7rem] text-gray-500 leading-snug">
                                    {doctor.credentials}
                                </p>
                            </div>

                            {/* Expandable Bio */}
                            {expandedDoctor === doctor.key && doctor.bio && (
                                <div className="pt-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {doctor.bio}
                                    </p>
                                </div>
                            )}

                            {/* Learn More Button */}
                            <button
                                onClick={() => setExpandedDoctor(expandedDoctor === doctor.key ? null : doctor.key)}
                                className="mt-3 w-full py-2 text-xs font-medium text-[#4a9b7f] hover:text-[#3d8b70] transition-colors border border-[#4a9b7f]/30 hover:border-[#4a9b7f] rounded-md"
                            >
                                {expandedDoctor === doctor.key ? 'Show Less' : 'Learn More'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow Indicator */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Scroll right"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
