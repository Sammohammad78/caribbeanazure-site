import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TierCard } from '@/components/pricing/TierCard'
import { allTiers, finePrint } from '@/lib/pricing'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default async function TarievenPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      title: 'Transparante tarieven',
      subtitle: 'Je krijgt vooraf een duidelijke scope, planning en inschatting. Geen verrassingen achteraf.',
      included: 'Wat is altijd inbegrepen',
      includedItems: [
        'Kick-off sessie met stakeholders',
        'Blueprint presentatie met flows',
        'Logging, monitoring en rollback',
        'Training en documentatie (NL/EN)',
      ],
    },
    en: {
      title: 'Transparent pricing',
      subtitle: 'You receive a clear scope, timeline, and estimate upfront. No surprises later.',
      included: 'What is always included',
      includedItems: [
        'Kick-off session with stakeholders',
        'Blueprint presentation with flows',
        'Logging, monitoring, and rollback',
        'Training and documentation (NL/EN)',
      ],
    },
  }

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.pricing} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero Section */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  {content[locale].title}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Grid */}
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
                {finePrint[locale]}
              </p>
            </div>
          </section>

          {/* What's Included Section */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-10">
                <h2 className="text-2xl font-bold text-body mb-6">
                  {content[locale].included}
                </h2>
                <CardContent className="grid gap-4 p-0 md:grid-cols-2">
                  {content[locale].includedItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
