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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
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
