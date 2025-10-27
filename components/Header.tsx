'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { type Locale } from '@/i18n';

interface HeaderProps {
    locale: string;
}

export default function Header({ locale }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed top-0 w-full bg-white z-50 border-b border-[rgba(74,155,127,0.08)] shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <nav className="max-w-[1600px] mx-auto px-[3%] md:px-[5%] py-2 md:py-3">
                {/* Top Row - Brand and Contact */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                    {/* Logo and Brand */}
                    <Link href="#" className="flex items-center gap-2 md:gap-3 group">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                            <Image
                                src="/logo_nobg.png"
                                alt="Rakan Clinic"
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                sizes="40px"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-['Cormorant_Garamond'] text-[0.9rem] md:text-[1.1rem] font-semibold text-[#1a1a1a] tracking-[0.3px] transition-colors group-hover:text-[#4a9b7f]">
                                RAKAN CLINIC TOKYO
                            </h1>
                            <div className="text-[0.55rem] md:text-[0.6rem] text-[#4a9b7f] font-medium tracking-[1px] uppercase opacity-70">
                                AZABUDAI
                            </div>
                        </div>
                    </Link>

                                        {/* Right Side - Language Toggle + Mobile Menu + Desktop CTA */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Language Switcher */}
                        <LanguageSwitcher currentLocale={locale as Locale} />

                        {/* Mobile Hamburger Menu */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex flex-col items-center justify-center w-7 h-7 space-y-1"
                        >
                            <div className={`w-4.5 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.25' : ''}`}></div>
                            <div className={`w-4.5 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                            <div className={`w-4.5 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.25' : ''}`}></div>
                        </button>

                        {/* Desktop CTA */}
                        <a 
                            href="https://reservation.medical-force.com/c/b04884e74e2542e0a3e0ae50ce50c26b" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden md:block"
                        >
                            <button className="bg-[#4a9b7f] text-white px-6 py-2 text-[0.7rem] font-semibold tracking-[1px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:shadow-lg rounded">
                                {t('header.bookOnline')}
                            </button>
                        </a>
                    </div>
                </div>

                {/* Bottom Row - Desktop Navigation Only */}
                <div className="hidden md:flex items-center justify-center">
                    <nav className="flex items-center gap-8">
                        <a href="#" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.home')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#stem-cell" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.treatments')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.symptoms')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#doctors" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.doctors')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#about" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.about')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#pricing" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.pricing')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#faq" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.faq')}
                        </a>
                        <div className="w-[1px] h-4 bg-[#4a9b7f]/20" />
                        <a href="#contact" className="text-[#1a1a1a] text-[0.8rem] font-medium hover:text-[#4a9b7f] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                            {t('header.contact')}
                        </a>
                    </nav>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200" onClick={toggleMobileMenu}>
                        <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
                            <div className="p-6">
                                {/* Close Button */}
                                <div className="flex justify-end mb-8">
                                    <button
                                        onClick={toggleMobileMenu}
                                        className="w-8 h-8 flex items-center justify-center"
                                    >
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Mobile Navigation Links */}
                                <nav className="space-y-6">
                                    <a
                                        href="#"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.home')}
                                    </a>
                                    <a
                                        href="#stem-cell"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.treatments')}
                                    </a>
                                    <a
                                        href="#"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.symptoms')}
                                    </a>
                                    <a
                                        href="#doctors"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.doctors')}
                                    </a>
                                    <a
                                        href="#about"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.about')}
                                    </a>
                                    <a
                                        href="#pricing"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.pricing')}
                                    </a>
                                    <a
                                        href="#faq"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.faq')}
                                    </a>
                                    <a
                                        href="#contact"
                                        className="block text-[#1a1a1a] text-lg font-medium hover:text-[#4a9b7f] transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        {t('header.contact')}
                                    </a>
                                </nav>

                                {/* Mobile CTA Button */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <a
                                        href="https://reservation.medical-force.com/c/b04884e74e2542e0a3e0ae50ce50c26b"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={toggleMobileMenu}
                                    >
                                        <button className="w-full bg-[#4a9b7f] text-white px-6 py-3 text-sm font-semibold tracking-[1px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:shadow-lg rounded">
                                            {t('header.bookOnline')}
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
