'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ClientSlideshow() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollAmount, setScrollAmount] = useState(0);
    const animationRef = useRef<number | null>(null);

    const clientImages = [
        '/images/client/S__142327935.jpg',
        '/images/client/S__142327942.jpg',
        '/images/client/S__142327944.jpg',
        '/images/client/S__142327966_0.jpg',
        '/images/client/S__142328019_0.jpg',
        '/images/client/S__142328028.jpg',
        '/images/client/S__143450251.jpg',
    ];

    // Triple the images for seamless loop
    const allImages = [...clientImages, ...clientImages, ...clientImages];

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const scrollSpeed = 1.2; // pixels per frame (increased from 0.5)

        const scroll = () => {
            setScrollAmount(prev => {
                const newAmount = prev + scrollSpeed;
                const singleSetWidth = clientImages.length * (280 + 24); // width + gap
                
                if (newAmount >= singleSetWidth) {
                    scrollElement.style.transform = 'translateX(0)';
                    return 0;
                }
                
                scrollElement.style.transform = `translateX(-${newAmount}px)`;
                return newAmount;
            });

            animationRef.current = requestAnimationFrame(scroll);
        };

        animationRef.current = requestAnimationFrame(scroll);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [clientImages.length]);

    return (
        <div className="relative">
            {/* Container with scrolling */}
            <div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
                <div ref={scrollRef} className="flex gap-6 will-change-transform">
                    {allImages.map((image, index) => (
                        <div 
                            key={`${image}-${index}`}
                            className="flex-shrink-0 w-[280px] h-[350px] overflow-hidden rounded-md shadow-lg group"
                        >
                            <Image
                                src={image}
                                alt={`Client experience ${(index % clientImages.length) + 1}`}
                                width={280}
                                height={350}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Fixed gradient fades that don't scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
}
