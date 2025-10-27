'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ClientImage {
    src: string;
    handle?: string;
    link?: string;
}

export default function ClientSlideshow() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollAmount, setScrollAmount] = useState(0);
    const animationRef = useRef<number | null>(null);

    const clientImages: ClientImage[] = [
        { src: '/images/client/S__142327935.jpg', handle: '@randalltime', link: 'https://www.instagram.com/randalltime?igsh=YjZpZ2VkZDhlbzBx' },
        { src: '/images/client/S__142327942.jpg', handle: '@shingo_katayama45', link: 'https://www.instagram.com/shingo_katayama45?igsh=b2FreHdoMmMxNGVt' },
        { src: '/images/client/S__142327944.jpg' },
        { src: '/images/client/S__142327966_0.jpg' },
        { src: '/images/client/S__142328019_0.jpg', handle: '@k1takeru', link: 'https://www.instagram.com/k1takeru?igsh=MTVjOTZ5dngzc2ZhNA==' },
        { src: '/images/client/S__142328028.jpg', handle: '@hashimoto_rina_', link: 'https://www.instagram.com/hashimoto_rina_?igsh=aWVmejY2b2p3cm45' },
        { src: '/images/client/S__143450251.jpg', handle: '@mitchellsaron', link: 'https://www.instagram.com/mitchellsaron?igsh=NXRxcmQ4dHEzeHBh' },
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
                            key={`${image.src}-${index}`}
                            className="flex-shrink-0 w-[280px] h-[350px] overflow-hidden rounded-md shadow-lg group relative"
                        >
                            <Image
                                src={image.src}
                                alt={`Client experience ${(index % clientImages.length) + 1}`}
                                width={280}
                                height={350}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Instagram Handle Overlay */}
                            {image.handle && image.link && (
                                <a
                                    href={image.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-3 left-0 right-0 text-white text-xs text-center hover:text-white/90 transition-colors duration-200 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {image.handle}
                                </a>
                            )}
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
