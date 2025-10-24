import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TierCard } from '@/components/pricing/TierCard'
import { allTiers } from '@/lib/pricing'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function OplössingenPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      title: 'Oplossingen voor elke fase',
      subtitle: 'Van snelle micro-automaties tot volledige configurators. Kies wat past bij jouw situatie.',
      cta: 'Niet zeker? Plan een intake.',
      ctaButton: 'Plan een intake',
    },
    en: {
      title: 'Solutions for every stage',
      subtitle: 'From quick micro-automations to full configurators. Choose what fits your situation.',
      cta: 'Not sure? Book an intake.',
      ctaButton: 'Book an intake',
    },
  }

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.services} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {content[locale].title}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)] md:text-xl">
                  {content[locale].subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Tiers Grid */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="grid gap-8 lg:grid-cols-3">
                {allTiers.map((tier, index) => (
                  <TierCard
                    key={tier.tier}
                    tier={tier}
                    highlight={index === 1} // Highlight Tier 2
                    index={index}
                  />
                ))}
              </div>

              {/* Fine print */}
              <p className="mt-8 text-center text-sm text-[color:var(--fg-muted)]">
                {locale === 'nl'
                  ? 'Alle prijzen zijn "vanaf" prijzen en excl. btw. Scope, integraties en complexiteit beïnvloeden de definitieve prijs.'
                  : 'All prices are "from" prices and excl. VAT. Scope, integrations, and complexity affect the final price.'}
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].cta}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {locale === 'nl'
                    ? 'We helpen je de juiste oplossing te kiezen voor jouw situatie.'
                    : 'We help you choose the right solution for your situation.'}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href={`/${locale}/contact`}>
                    {content[locale].ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
