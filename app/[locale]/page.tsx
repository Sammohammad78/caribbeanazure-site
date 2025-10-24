import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroEnhanced } from '@/components/sections/hero-enhanced'
import { ROICalculator } from '@/components/sections/roi-calculator'
import { OutcomesStrip } from '@/components/sections/outcomes-strip'
import { ServicesGrid } from '@/components/sections/services-grid'
import { ProcessSection } from '@/components/sections/process-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { OrganizationSchema } from '@/components/seo/json-ld'
import { Hreflang } from '@/components/seo/hreflang'
import { TrustStrip } from '@/components/ui/trust-strip'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  return (
    <>
      {/* SEO: Hreflang for multi-language */}
      <Hreflang />

      {/* SEO: Organization Schema */}
      <OrganizationSchema locale={locale} />

      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.home} />
        </div>

        <Header />
        <main id="main-content">
          <HeroEnhanced />

          {/* Trust Strip */}
          <section className="border-y border-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_95%,transparent)] py-6">
            <div className="container-custom">
              <TrustStrip />
            </div>
          </section>

          <ROICalculator />
          <OutcomesStrip />
          <ProcessSection />
          <UseCasesSection />
          <ServicesGrid />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
