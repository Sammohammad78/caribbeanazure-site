import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { tier1, formatPriceLabel } from '@/lib/pricing'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { ROICalculator } from '@/components/sections/roi-calculator'

export default async function LightAutomationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      title: 'Light Automations',
      subtitle: 'Snelle micro-automaties die handmatig werk elimineren en je team tijd teruggeven.',
      price: formatPriceLabel(tier1.basePrice, locale, tier1.priceType),
      examples: 'Voorbeelden',
      exampleItems: [
        {
          title: 'Inbox-to-Action',
          desc: 'E-mails automatisch sorteren, taggen en naar juiste persoon routeren',
        },
        {
          title: 'Leads-naar-Booking',
          desc: 'Nieuwe leads automatisch in je agenda plaatsen met reminder',
        },
        {
          title: 'WhatsApp Helpdesk',
          desc: 'FAQ bot die veelgestelde vragen beantwoordt via WhatsApp',
        },
        {
          title: 'Invoice Robot',
          desc: 'Facturen automatisch verwerken en in je boekhouding zetten',
        },
      ],
      included: 'Wat krijg je',
      roiTitle: 'Bereken je ROI',
      upgradeNote: 'Meer nodig?',
      upgradeText: 'Voor complexere processen zoals Sales→BOM of configurators, bekijk onze andere oplossingen of plan een intake.',
      ctaButton: 'Plan een intake',
    },
    en: {
      title: 'Light Automations',
      subtitle: 'Quick micro-automations that eliminate manual work and give your team time back.',
      price: formatPriceLabel(tier1.basePrice, locale, tier1.priceType),
      examples: 'Examples',
      exampleItems: [
        {
          title: 'Inbox-to-Action',
          desc: 'Automatically sort, tag, and route emails to the right person',
        },
        {
          title: 'Leads-to-Booking',
          desc: 'Automatically place new leads in your calendar with reminder',
        },
        {
          title: 'WhatsApp Helpdesk',
          desc: 'FAQ bot that answers common questions via WhatsApp',
        },
        {
          title: 'Invoice Robot',
          desc: 'Automatically process invoices and add to your accounting',
        },
      ],
      included: 'What you get',
      roiTitle: 'Calculate your ROI',
      upgradeNote: 'Need more?',
      upgradeText: 'For more complex processes like Sales→BOM or configurators, check our other solutions or book an intake.',
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
                  <Zap className="h-4 w-4" />
                  Tier 1
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
                  <Link href={`/${locale}/contact?tier=light`}>
                    {content[locale].ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Examples Grid */}
          <section className="section-padding-y">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].examples}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {content[locale].exampleItems.map((item, index) => (
                  <Card
                    key={index}
                    className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                  >
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-xl text-body">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-[color:var(--fg-subtle)]">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].included}
              </h2>
              <Card className="mx-auto max-w-2xl rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                <ul className="space-y-3">
                  {tier1.features[locale].map((feature) => (
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

          {/* Mini ROI Calculator */}
          <section className="section-padding-y">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
                {content[locale].roiTitle}
              </h2>
              <ROICalculator />
            </div>
          </section>

          {/* Upgrade Path */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <Card className="mx-auto max-w-2xl rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_78%,transparent)100%)] p-12 text-center text-white">
                <h3 className="text-2xl font-bold">{content[locale].upgradeNote}</h3>
                <p className="mt-4 text-white/90">{content[locale].upgradeText}</p>
                <Button asChild size="lg" variant="secondary" className="mt-6 text-body">
                  <Link href={`/${locale}/oplossingen`}>
                    {locale === 'nl' ? 'Bekijk alle oplossingen' : 'View all solutions'}
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
