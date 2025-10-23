import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { OutcomesStrip } from '@/components/sections/outcomes-strip'
import { ServicesGrid } from '@/components/sections/services-grid'
import { ProcessSection } from '@/components/sections/process-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import {
  OrganizationSchema,
  ServiceSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from '@/components/seo/structured-data'

export default function HomePage() {
  return (
    <>
      {/* Schema.org structured data for SEO */}
      <OrganizationSchema />
      <ServiceSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />

      <Header />
      <main id="main-content">
        <Hero />
        <OutcomesStrip />
        <ProcessSection />
        <UseCasesSection />
        <ServicesGrid />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
