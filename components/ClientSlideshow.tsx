'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ClientSlideshow() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const clientImages = [
        '/images/client/S__142327935.jpg',
        '/images/client/S__142327942.jpg',
        '/images/client/S__142327944.jpg',
        '/images/client/S__142327966_0.jpg',
        '/images/client/S__142328019_0.jpg',
        '/images/client/S__142328028.jpg',
    ];

    // Triple the images for seamless loop
    const allImages = [...clientImages, ...clientImages, ...clientImages];

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        let scrollAmount = 0;
        const scrollSpeed = 0.5; // pixels per frame

        const scroll = () => {
            scrollAmount += scrollSpeed;
            scrollElement.style.transform = `translateX(-${scrollAmount}px)`;

            // Reset position when we've scrolled one complete set
            const singleSetWidth = clientImages.length * (280 + 24); // width + gap
            if (scrollAmount >= singleSetWidth) {
                scrollAmount = 0;
                scrollElement.style.transform = 'translateX(0)';
            }

            requestAnimationFrame(scroll);
        };

        scroll();
    }, [clientImages.length]);

    return (
        <div className="relative overflow-hidden">
            <div ref={scrollRef} className="flex gap-6 will-change-transform">
                {allImages.map((image, index) => (
                    <div 
                        key={`${image}-${index}`}
                        className="flex-shrink-0 w-[280px] h-[350px] overflow-hidden rounded-md shadow-md group"
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
    );
}
