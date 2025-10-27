'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// International country codes with flags and names
const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸', name: 'United States/Canada' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
    { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
    { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece' },
    { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Hungary' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romania' },
    { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
    { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden' },
    { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway' },
    { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
    { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
    { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
    { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal' },
    { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland' },
    { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland' },
    { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Lithuania' },
    { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Latvia' },
    { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonia' },
    { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Croatia' },
    { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenia' },
    { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic' },
    { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakia' },
    { code: '+852', country: 'HK', flag: '🇭🇰', name: 'Hong Kong' },
    { code: '+886', country: 'TW', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' }
];

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    message: string;
}

export default function ContactForm() {
    const t = useTranslations();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCountrySelect = (country: typeof countryCodes[0]) => {
        setSelectedCountry(country);
        setFormData(prev => ({
            ...prev,
            countryCode: country.code
        }));
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    phone: `${formData.countryCode} ${formData.phone}`,
                    submittedAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    countryCode: '+1',
                    phone: '',
                    message: ''
                });
                setSelectedCountry(countryCodes[0]);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-white p-10 shadow-lg text-center">
                <div className="w-16 h-16 bg-[#4a9b7f] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-4 font-semibold text-gray-900">
                    {t('contact.form.thankYou')}
                </h3>
                <p className="text-[0.95rem] text-gray-600 leading-[1.6] font-light mb-6">
                    {t('contact.form.thankYouMessage')}
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-[#4a9b7f] text-white text-sm font-semibold tracking-[1px] uppercase transition-all duration-300 hover:bg-[#3d8269] hover:-translate-y-1 hover:shadow-lg rounded"
                >
                    {t('contact.form.submitAnother')}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-10 shadow-lg">
            <h3 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-8 font-normal">
                {t('contact.form.title')}
            </h3>

            <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                            {t('contact.form.firstName.label')}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                            placeholder={t('contact.form.firstName.placeholder')}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                            {t('contact.form.lastName.label')}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                            placeholder={t('contact.form.lastName.placeholder')}
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                            {t('contact.form.email.label')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                            placeholder={t('contact.form.email.placeholder')}
                        />
                    </div>
                    <div>
                        <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                            {t('contact.form.phone.label')}
                        </label>
                        <div className="flex">
                            {/* Country Code Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-4 border border-black/10 border-r-0 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                                >
                                    <span className="text-lg">{selectedCountry.flag}</span>
                                    <span className="text-[0.9rem]">{selectedCountry.code}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 z-50 w-80 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-b-lg shadow-lg">
                                        {countryCodes.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                onClick={() => handleCountrySelect(country)}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="text-lg">{country.flag}</span>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{country.code}</div>
                                                    <div className="text-xs text-gray-500">{country.name}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Phone Number Input */}
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="flex-1 p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                                placeholder={t('contact.form.phone.placeholderNumber')}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                        {t('contact.form.message.label')}
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light resize-none transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                        placeholder={t('contact.form.message.placeholder')}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-[1.2rem] bg-[#1a1a1a] text-white text-[0.85rem] font-medium tracking-[2px] uppercase transition-all duration-300 hover:bg-[#4a9b7f] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,155,127,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
            </div>
        </form>
    );
}
