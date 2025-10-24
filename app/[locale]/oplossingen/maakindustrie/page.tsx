import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { tier2, formatPriceLabel } from '@/lib/pricing'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Factory } from 'lucide-react'
import Link from 'next/link'

export default async function MaakindustriePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      title: 'Sales→BOM & Tekenpakketten',
      subtitle: 'Productie-klare workflows van offerte tot stuklijst en technische tekeningen voor de maakindustrie.',
      price: formatPriceLabel(tier2.basePrice, locale, tier2.priceType),
      kpiTitle: 'Resultaten bij klanten',
      kpis: [
        { metric: '89% sneller', desc: 'Van offerte naar productie-order' },
        { metric: '94% minder fouten', desc: 'In stuklijsten en tekeningen' },
        { metric: '12 uur/week', desc: 'Bespaard op handmatige data-entry' },
      ],
      features: 'Wat krijg je',
      ctaButton: 'Plan een intake',
    },
    en: {
      title: 'Sales→BOM & Drawing Packs',
      subtitle: 'Production-ready workflows from quote to BOM and technical drawings for manufacturing.',
      price: formatPriceLabel(tier2.basePrice, locale, tier2.priceType),
      kpiTitle: 'Results at clients',
      kpis: [
        { metric: '89% faster', desc: 'From quote to production order' },
        { metric: '94% fewer errors', desc: 'In BOMs and drawings' },
        { metric: '12 hours/week', desc: 'Saved on manual data entry' },
      ],
      features: 'What you get',
      ctaButton: 'Book an intake',
    },
  }

  return (
    <>
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
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
                  <Factory className="h-4 w-4" />
                  Tier 2
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                  {content[locale].title}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].subtitle}
                </p>
                <p className="mt-6 text-4xl font-bold text-[color:var(--brand)]">
                  {content[locale].price}
                </p>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  {locale === 'nl' ? 'excl. btw' : 'excl. VAT'}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href={`/${locale}/contact?tier=manufacturing`}>
                    {content[locale].ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* KPI Cards */}
          <section className="section-padding-y">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].kpiTitle}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {content[locale].kpis.map((kpi, index) => (
                  <Card
                    key={index}
                    className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 text-center"
                  >
                    <p className="text-4xl font-bold text-[color:var(--brand)]">{kpi.metric}</p>
                    <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">{kpi.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].features}
              </h2>
              <Card className="mx-auto max-w-2xl rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <ul className="space-y-3">
                  {tier2.features[locale].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
