import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import BackToTopButton from '@/components/BackToTopButton';
import { type Locale } from '@/i18n';

export default async function TreatmentsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations();

    return (
        <div className="min-h-screen bg-[#f8f6f3]">
            <Header locale={locale} />
            <BackToTopButton />

            {/* Hero Section */}
            <section className="pt-[120px] pb-10 px-[5%] bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-[1400px] mx-auto text-center">
                    <div className="inline-flex items-center px-3 py-1.5 bg-[#4a9b7f]/10 rounded-full mb-4">
                        <span className="text-[0.65rem] tracking-[2px] uppercase text-[#4a9b7f] font-bold">
                            {t('treatmentsPage.badge')}
                        </span>
                    </div>
                    <h1 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,4vw,2.8rem)] mb-3 leading-[1.1] font-light text-gray-900">
                        {t('treatmentsPage.heading')}
                    </h1>
                    <p className="text-[0.95rem] text-gray-600 max-w-[700px] mx-auto leading-[1.6]">
                        {t('treatmentsPage.description')}
                    </p>
                </div>
            </section>

            {/* Stem Cell Therapy Section */}
            <section className="px-[5%] py-[4rem] bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.stemCell.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.treatment')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.stemCellSingle.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥3,750,000~</td>
                                    <td className="p-4 text-right text-gray-700">$25,000~</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.stemCellSingle.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.stemCellThree.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥9,075,000~</td>
                                    <td className="p-4 text-right text-gray-700">$60,500~</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.stemCellThree.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.stemCellSix.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥17,250,000~</td>
                                    <td className="p-4 text-right text-gray-700">$115,000~</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.stemCellSix.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <p className="text-xs text-gray-600 italic">
                            *Includes consultation, treatment coordination, and comprehensive patient care services
                        </p>
                    </div>
                </div>
            </section>

            {/* PRP Section */}
            <section className="px-[5%] py-[4rem] bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.prp.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.treatment')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.superRichPRP.name')}</td>
                                    <td className="p-4 text-right text-gray-700">From ¥295,500</td>
                                    <td className="p-4 text-right text-gray-700">$1,970</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.superRichPRP.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Exosome Section */}
            <section className="px-[5%] py-[4rem] bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.exosome.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.treatment')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.exosome.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥82,500 per vial</td>
                                    <td className="p-4 text-right text-gray-700">$550</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.exosome.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* NMN Section */}
            <section className="px-[5%] py-[4rem] bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.nmn.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.treatment')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nmn150.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥41,250</td>
                                    <td className="p-4 text-right text-gray-700">$275</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nmn150.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nmn300.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥75,000</td>
                                    <td className="p-4 text-right text-gray-700">$500</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nmn300.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nmn450.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥110,000</td>
                                    <td className="p-4 text-right text-gray-700">$733</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nmn450.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nmnSupplement.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥65,000</td>
                                    <td className="p-4 text-right text-gray-700">$360</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nmnSupplement.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* NAD⁺ Section */}
            <section className="px-[5%] py-[4rem] bg-gray-50">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.nad.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.treatment')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nad50.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥45,000</td>
                                    <td className="p-4 text-right text-gray-700">$300</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nad50.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nad100.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥80,000</td>
                                    <td className="p-4 text-right text-gray-700">$533</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nad100.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nad200.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥110,000</td>
                                    <td className="p-4 text-right text-gray-700">$733</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nad200.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nad300.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥130,000</td>
                                    <td className="p-4 text-right text-gray-700">$867</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nad300.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Testing Section */}
            <section className="px-[5%] py-[4rem] bg-white">
                <div className="max-w-[1200px] mx-auto">
                    <div className="mb-8">
                        <h2 className="font-['Cormorant_Garamond'] text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-gray-900">
                            {t('treatmentsPage.sections.testing.title')}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#4a9b7f]/5">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.test')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.jpy')}</th>
                                    <th className="text-right p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.usd')}</th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">{t('treatmentsPage.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.nadTest.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥67,500</td>
                                    <td className="p-4 text-right text-gray-700">$450</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.nadTest.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.telomereTest.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥97,500</td>
                                    <td className="p-4 text-right text-gray-700">$650</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.telomereTest.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.vitaminTest.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥67,500</td>
                                    <td className="p-4 text-right text-gray-700">$450</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.vitaminTest.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.gutTest.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥36,300</td>
                                    <td className="p-4 text-right text-gray-700">$242</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.gutTest.description')}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{t('treatmentsPage.treatments.ageTest.name')}</td>
                                    <td className="p-4 text-right text-gray-700">¥6,600</td>
                                    <td className="p-4 text-right text-gray-700">$44</td>
                                    <td className="p-4 text-gray-600 text-sm leading-relaxed">
                                        {t('treatmentsPage.treatments.ageTest.description')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-[5%] py-[6rem] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[800px] mx-auto text-center">
                    <h3 className="font-['Cormorant_Garamond'] text-[clamp(2rem,4vw,3rem)] mb-4 font-semibold text-gray-900">
                        {t('treatmentsPage.cta.title')}
                    </h3>
                    <p className="text-[1rem] text-gray-600 mb-8 leading-relaxed">
                        {t('treatmentsPage.cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://reservation.medical-force.com/c/b04884e74e2542e0a3e0ae50ce50c26b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#4a9b7f] text-white text-sm font-semibold tracking-[1px] uppercase rounded hover:bg-[#3d8269] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {t('treatmentsPage.cta.bookConsultation')}
                        </a>
                        <a
                            href={`/${locale}/#contact`}
                            className="px-8 py-4 border-2 border-[#4a9b7f] text-[#4a9b7f] text-sm font-semibold tracking-[1px] uppercase rounded hover:bg-[#4a9b7f] hover:text-white transition-all duration-300"
                        >
                            {t('treatmentsPage.cta.contactUs')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a1a1a] text-white/60 px-[5%] py-12 border-t border-white/5">
                <div className="max-w-[1600px] mx-auto text-center">
                    <div className="font-['Cormorant_Garamond'] text-[1.5rem] text-white mb-2">
                        Rakan Clinic Tokyo
                    </div>
                    <p className="text-[0.75rem] text-white/40 mb-6 uppercase tracking-[2px]">
                        Regenerative Medicine Excellence
                    </p>
                    <p className="text-[0.85rem] font-light">
                        © 2024 Rakan Clinic Tokyo. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
