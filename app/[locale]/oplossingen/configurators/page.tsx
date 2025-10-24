import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { tier3 } from '@/lib/pricing'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Settings, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Hreflang } from '@/components/seo/hreflang'

export default async function ConfiguratorsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      title: 'CPQ & Configure-to-Production',
      subtitle: 'Enterprise configurators die complexe producten vertalen naar fabricage-klare output.',
      priceLabel: 'Prijs op aanvraag',
      services: 'Wat we bouwen',
      serviceItems: [
        {
          title: 'CPQ (Configure-Price-Quote)',
          desc: 'Klant kiest opties → systeem berekent prijs en genereert offerte',
          icon: Settings,
        },
        {
          title: 'C2P (Configure-to-Production)',
          desc: 'Van configuratie direct naar productie-order, BOM, en tekenpakketten',
          icon: Sparkles,
        },
      ],
      benefits: 'Voordelen',
      benefitItems: [
        { metric: 'Zero fouten', desc: 'In configuratie-naar-productie flow' },
        { metric: '70% sneller', desc: 'Van engineerings-aanvraag tot order' },
        { metric: '€50k-200k+', desc: 'Typische ROI per jaar voor MKB-fabrikanten' },
      ],
      included: 'Wat krijg je',
      ctaButton: 'Plan een intake',
      ctaSticky: 'Bespreek jouw configurator',
    },
    en: {
      title: 'CPQ & Configure-to-Production',
      subtitle: 'Enterprise configurators that translate complex products into manufacturing-ready output.',
      priceLabel: 'Price on request',
      services: 'What we build',
      serviceItems: [
        {
          title: 'CPQ (Configure-Price-Quote)',
          desc: 'Customer selects options → system calculates price and generates quote',
          icon: Settings,
        },
        {
          title: 'C2P (Configure-to-Production)',
          desc: 'From configuration directly to production order, BOM, and drawing packages',
          icon: Sparkles,
        },
      ],
      benefits: 'Benefits',
      benefitItems: [
        { metric: 'Zero errors', desc: 'In configure-to-production flow' },
        { metric: '70% faster', desc: 'From engineering request to order' },
        { metric: '€50k-200k+', desc: 'Typical ROI per year for SME manufacturers' },
      ],
      included: 'What you get',
      ctaButton: 'Book an intake',
      ctaSticky: 'Discuss your configurator',
    },
  }

  return (
    <>
      {/* SEO: Hreflang for multi-language */}
      {/* NOTE: NO Product Schema for Tier 3 per specification */}
      <Hreflang />

      <div className="relative">
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.services} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--accent)_25%,transparent)] bg-[color:color-mix(in_oklab,var(--accent-soft)_45%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <Sparkles className="h-4 w-4" />
                  Tier 3 · Enterprise
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  {content[locale].title}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].subtitle}
                </p>
                <p className="mt-6 text-3xl font-bold text-[color:var(--accent)]">
                  {content[locale].priceLabel}
                </p>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  {locale === 'nl'
                    ? 'Elk project is maatwerk—we bespreken scope en kosten tijdens intake'
                    : 'Each project is custom—we discuss scope and costs during intake'}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href={`/${locale}/contact?tier=configurators`}>
                    {content[locale].ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Service Types */}
          <section className="section-padding-y">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].services}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {content[locale].serviceItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                    >
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="text-xl text-body">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-sm text-[color:var(--fg-subtle)]">{item.desc}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].benefits}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {content[locale].benefitItems.map((item, index) => (
                  <Card
                    key={index}
                    className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 text-center"
                  >
                    <p className="text-4xl font-bold text-[color:var(--accent)]">{item.metric}</p>
                    <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="section-padding-y">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].included}
              </h2>
              <Card className="mx-auto max-w-2xl rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <ul className="space-y-3">
                  {tier3.features[locale].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* Sticky CTA */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <Card className="mx-auto max-w-3xl rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_82%,transparent)0%,color-mix(in_oklab,var(--brand)_80%,transparent)100%)] p-12 text-center text-white">
                <h3 className="text-2xl font-bold">
                  {locale === 'nl'
                    ? 'Klaar voor een configurator op maat?'
                    : 'Ready for a custom configurator?'}
                </h3>
                <p className="mt-4 text-white/90">
                  {locale === 'nl'
                    ? 'Elk configuratorproject begint met een intake waarin we jouw producten, varianten en flow bespreken. Daarna krijg je een offerte op maat.'
                    : 'Each configurator project starts with an intake where we discuss your products, variants, and flow. Then you receive a custom quote.'}
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-6 text-body">
                  <Link href={`/${locale}/contact?tier=configurators`}>
                    {content[locale].ctaSticky}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
