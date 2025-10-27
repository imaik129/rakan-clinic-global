'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface TreatmentGoal {
    key: string;
    image: string;
    category: string;
    title: string;
    description: string;
}

interface TreatmentGoalsMobileProps {
    goals: TreatmentGoal[];
}

export default function TreatmentGoalsMobile({
    goals
}: TreatmentGoalsMobileProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = scrollContainerRef.current.offsetWidth * 0.89; // 85vw + gap

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
                    {goals.map((goal) => (
                        <div key={goal.key} className="flex-shrink-0 w-[75vw] max-w-[340px] snap-center">
                            {/* Image Section - Rounded corners with shadow */}
                            <div className="relative w-full h-[380px] overflow-hidden rounded-2xl shadow-lg mb-4">
                                <Image
                                    src={goal.image}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 340px) 75vw, 340px"
                                />
                            </div>
                            {/* Content Section - No background card */}
                            <div className="space-y-1.5">
                                <p className="text-[0.75rem] text-gray-500 font-medium uppercase tracking-wider">
                                    {goal.category}
                                </p>
                                <h3 className="font-['Cormorant_Garamond'] text-[1.4rem] font-bold text-gray-900">
                                    {goal.title}
                                </h3>
                                <p className="text-[0.9rem] text-gray-600 font-light leading-[1.6]">
                                    {goal.description}
                                </p>
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
