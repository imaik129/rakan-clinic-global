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

interface DoctorsMobileProps {
    doctors: Doctor[];
}

export default function DoctorsMobile({ doctors }: DoctorsMobileProps) {
    const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = scrollContainerRef.current.offsetWidth * 0.89;

        if (direction === 'left') {
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <div
                className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                ref={scrollContainerRef}
            >
                <div className="flex gap-4 px-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.key} className="flex-shrink-0 w-[75vw] max-w-[340px] snap-center">
                            {/* Image Section */}
                            <div className="relative w-full h-[400px] overflow-hidden rounded-md mb-4 group">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                                    sizes="(max-width: 340px) 75vw, 340px"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="space-y-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-xs text-gray-600 font-medium">
                                        {doctor.title}
                                    </p>
                                </div>

                                {doctor.experience && (
                                    <div>
                                        <p className="text-xs font-medium text-gray-700">
                                            {doctor.experience}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                                        Specialties
                                    </p>
                                    <p className="text-xs text-gray-600 leading-snug">
                                        {doctor.specialties}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 leading-snug">
                                        {doctor.credentials}
                                    </p>
                                </div>

                                {/* Expandable Bio */}
                                {expandedDoctor === doctor.key && (
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            {doctor.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Learn More Button */}
                                <button
                                    onClick={() => setExpandedDoctor(expandedDoctor === doctor.key ? null : doctor.key)}
                                    className="w-full mt-3 py-2 text-xs font-semibold text-[#4a9b7f] border border-[#4a9b7f] rounded-lg hover:bg-[#4a9b7f] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>{expandedDoctor === doctor.key ? 'Show Less' : 'Learn More'}</span>
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedDoctor === doctor.key ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Scroll left"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => handleScroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10"
                aria-label="Scroll right"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
