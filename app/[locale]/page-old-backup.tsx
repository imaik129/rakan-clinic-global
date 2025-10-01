import Link from "next/link";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { type Locale } from '@/i18n';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[rgba(248,246,243,0.98)] backdrop-blur-[20px] z-50 border-b border-[rgba(74,155,127,0.1)]">
        <nav className="max-w-[1600px] mx-auto px-[5%] py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="font-['Cormorant_Garamond'] text-[1.3rem] font-semibold text-[#1a1a1a] tracking-[0.5px]">
                  {t('header.brand')}
                </h1>
                <div className="text-[0.7rem] text-[#666666] font-light tracking-[2px] uppercase">
                  Global Medical Tourism
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-[3.5rem]">
              <Link href="#services" className="text-[#1a1a1a] text-[0.85rem] font-normal tracking-[1px] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                {t('header.nav.services')}
              </Link>
              <Link href="#about" className="text-[#1a1a1a] text-[0.85rem] font-normal tracking-[1px] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                {t('header.nav.about')}
              </Link>
              <Link href="#contact" className="text-[#1a1a1a] text-[0.85rem] font-normal tracking-[1px] uppercase transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[#4a9b7f] after:transition-[width] after:duration-300 hover:after:w-full">
                {t('header.nav.contact')}
              </Link>
              <LanguageSwitcher currentLocale={locale} />
              <button className="bg-[#4a9b7f] text-white px-12 py-[1.2rem] text-[0.85rem] font-medium tracking-[2px] uppercase transition-all duration-[400ms] hover:bg-[#3d8269] hover:-translate-y-[2px] hover:shadow-[0_15px_40px_rgba(74,155,127,0.3)]">
                {t('header.cta')}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-[5%] pt-[8rem] pb-[4rem] bg-[linear-gradient(135deg,#f8f6f3_0%,#ffffff_100%)] relative overflow-hidden">
        {/* Floating background decoration */}
        <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(74,155,127,0.05)_0%,transparent_70%)] animate-[float_20s_ease-in-out_infinite] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-[4rem] lg:gap-[8rem] items-center relative w-full">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-[rgba(74,155,127,0.1)] text-[#4a9b7f] rounded-full text-[0.75rem] font-medium tracking-[3px] uppercase">
              {t('hero.badge')}
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.5rem,8vw,7rem)] leading-[1] tracking-[-2px] font-light">
              {t('hero.title.line1')}<br />
              <span className="italic text-[#4a9b7f] font-normal">{t('hero.title.line2')}</span>
            </h1>
            <p className="text-[1.1rem] text-[#666666] leading-[1.8] font-light max-w-[540px]">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#4a9b7f] text-white px-12 py-[1.2rem] text-[0.85rem] font-medium tracking-[2px] uppercase transition-all duration-[400ms] hover:bg-[#3d8269] hover:-translate-y-[2px] hover:shadow-[0_15px_40px_rgba(74,155,127,0.3)]">
                {t('hero.cta.primary')}
              </button>
              <button className="border-2 border-[#1a1a1a] text-[#1a1a1a] px-12 py-[1.2rem] text-[0.85rem] font-medium tracking-[2px] uppercase transition-all duration-[400ms] hover:bg-[#1a1a1a] hover:text-white">
                {t('hero.cta.secondary')}
              </button>
            </div>
          </div>
          <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <Image
              src="/images/rakan_entrance.png"
              alt="Rakan Clinic Entrance"
              fill
              className="object-cover transition-transform duration-[600ms] hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-[5%] py-[8rem] bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
              About Us
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
              {t('about.heading')}
            </h2>
            <p className="text-[1.1rem] text-[#666666] leading-[1.8] font-light">
              {t('about.paragraph1')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-[3rem] max-w-[1200px] mx-auto">
            {[
              {
                number: t('about.stats.experience.number'),
                label: t('about.stats.experience.label'),
                description: 'Proven track record of excellence in international healthcare'
              },
              {
                number: t('about.stats.specialists.number'),
                label: t('about.stats.specialists.label'),
                description: 'World-renowned physicians across multiple disciplines'
              },
              {
                number: t('about.stats.patients.number'),
                label: t('about.stats.patients.label'),
                description: 'Trusted by patients from over 60 countries worldwide'
              }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="text-[4rem] font-['Cormorant_Garamond'] text-[#4a9b7f] font-light leading-none">
                  {stat.number}
                </div>
                <div className="text-[1.1rem] font-medium text-[#1a1a1a] uppercase tracking-[1px]">
                  {stat.label}
                </div>
                <p className="text-[0.95rem] text-[#666666] leading-[1.7] font-light">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Location Showcase */}
          <div className="mt-[4rem] max-w-[1200px] mx-auto">
            <div className="relative h-[500px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <Image
                src="/images/azabudai_hills.png"
                alt="Azabudai Hills - Our Premium Location"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent flex items-end">
                <div className="text-white p-8 md:p-12 w-full">
                  <div className="max-w-[600px]">
                    <p className="text-[0.75rem] tracking-[3px] uppercase text-[#c9a962] mb-3 font-medium">
                      Our Location
                    </p>
                    <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] md:text-[3.5rem] font-light mb-4 leading-tight">
                      Premium Medical District
                    </h3>
                    <p className="text-[1.1rem] font-light leading-[1.8] opacity-90">
                      Located in the prestigious Azabudai Hills, our state-of-the-art clinic combines world-class medical care with the convenience and luxury of Tokyo's premier international district.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-[5%] py-[8rem] bg-[#f8f6f3]">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
              Our Services
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
              {t('services.heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[3rem] max-w-[1200px] mx-auto">
            {[
              {
                title: t('services.features.experts.title'),
                description: t('services.features.experts.description')
              },
              {
                title: t('services.features.standards.title'),
                description: t('services.features.standards.description')
              },
              {
                title: t('services.features.support.title'),
                description: t('services.features.support.description')
              }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                <div className="text-[5rem] font-['Cormorant_Garamond'] text-[#4a9b7f] opacity-20 font-light leading-[1] mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-[1.8rem] mb-3 font-normal">
                  {service.title}
                </h3>
                <p className="text-[#666666] leading-[1.7] font-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Treatment Image Showcase */}
          <div className="mt-[4rem] max-w-[1200px] mx-auto">
            <div className="relative h-[400px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <Image
                src="/images/injection.png"
                alt="Advanced Medical Treatment"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 to-transparent flex items-center">
                <div className="text-white px-[5%] max-w-[600px]">
                  <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-4 font-light">
                    Advanced Treatment Protocols
                  </h3>
                  <p className="text-[1.1rem] font-light leading-[1.8]">
                    State-of-the-art medical procedures performed by world-renowned specialists using cutting-edge technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="px-[5%] py-[8rem] bg-[#1a1a1a] text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#c9a962] mb-4 font-medium">
              Excellence
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
              Why Choose Rakan Clinic
            </h2>
            <p className="text-[1.1rem] text-white/80 leading-[1.8] font-light">
              Unparalleled expertise and luxury healthcare services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-[3rem] max-w-[1200px] mx-auto">
            {[
              {
                title: 'Distinguished Physicians',
                description: 'Internationally recognized specialists with decades of experience and training from the world\'s leading institutions.'
              },
              {
                title: 'Advanced Technology',
                description: 'State-of-the-art medical equipment and cutting-edge treatment protocols for the highest quality care.'
              },
              {
                title: 'Luxury Experience',
                description: 'VIP facilities and personalized concierge services designed to provide comfort and privacy throughout your journey.'
              },
              {
                title: 'Global Standards',
                description: 'Highest international accreditations and rigorous quality protocols to ensure exceptional safety and results.'
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-[rgba(74,155,127,0.1)] border border-[rgba(74,155,127,0.3)] flex items-center justify-center transition-all duration-300 hover:bg-[rgba(74,155,127,0.2)] hover:scale-105">
                  <div className="w-8 h-8 bg-[#4a9b7f] rounded-full" />
                </div>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-3 font-normal">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-[1.7] font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-[5%] py-[8rem] bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-[4rem]">
            <div className="text-[0.75rem] tracking-[3px] uppercase text-[#4a9b7f] mb-4 font-medium">
              Get in Touch
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,6vw,5rem)] mb-6 leading-[1.1] font-light">
              {t('contact.heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-[4rem] max-w-[1200px] mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-[2.5rem] mb-6 font-light leading-tight">
                  Contact<br />Information
                </h3>
              </div>

              {[
                { label: 'Phone', value: '+1 (555) 123-4567' },
                { label: 'Email', value: 'international@rakanclinic.com' },
                { label: 'Location', value: 'Premium Medical District\nGlobal Healthcare Center' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-[0.75rem] uppercase tracking-[2px] text-[#4a9b7f] mb-2 font-medium">
                    {item.label}
                  </div>
                  <div className="text-[1.1rem] text-[#1a1a1a] font-light whitespace-pre-line">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form className="bg-[#f8f6f3] p-10">
              <h3 className="font-['Cormorant_Garamond'] text-[1.5rem] mb-8 font-normal">
                Request a Consultation
              </h3>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                      {t('contact.form.firstName.label')}
                    </label>
                    <input
                      type="text"
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
                      required
                      className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                      placeholder={t('contact.form.email.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                      {t('contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                      placeholder={t('contact.form.phone.placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.75rem] uppercase tracking-[1px] text-[#666666] mb-2 font-medium">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full p-4 border border-black/10 bg-white text-[0.95rem] font-light resize-none transition-all focus:outline-none focus:border-[#4a9b7f] focus:shadow-[0_0_0_3px_rgba(74,155,127,0.1)]"
                    placeholder={t('contact.form.message.placeholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-[1.2rem] bg-[#1a1a1a] text-white text-[0.85rem] font-medium tracking-[2px] uppercase transition-all duration-300 hover:bg-[#4a9b7f] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,155,127,0.3)]"
                >
                  {t('contact.form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white/60 px-[5%] py-16">
        <div className="max-w-[1600px] mx-auto text-center">
          <div className="font-['Cormorant_Garamond'] text-[1.5rem] text-white mb-4">
            {t('footer.brand.name')}
          </div>
          <p className="text-[0.85rem] font-light">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}
