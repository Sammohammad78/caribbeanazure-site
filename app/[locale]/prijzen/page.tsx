import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Info, MessageCircle } from 'lucide-react'

type Tier = {
  name: string
  price: string
  description: string
  perks: string[]
  highlight?: boolean
}

const nlTiers: Tier[] = [
  {
    name: 'Kickstart',
    price: 'vanaf 2.500 EUR',
    description: 'Voor teams die een concreet proces willen automatiseren binnen een maand.',
    perks: [
      '1-2 workflows met Zapier, Make of n8n',
      'Integratie met bestaande tools',
      'Workshop van 2 uur voor adoptie',
      '30 dagen support en optimalisatie',
    ],
  },
  {
    name: 'Scale',
    price: 'vanaf 7.500 EUR',
    description: 'Volledige customer journey automatisering inclusief AI agents en dashboards.',
    perks: [
      '5+ workflows over meerdere teams',
      'AI agent of chatbot op maat',
      'Maatwerk scripts of connectors',
      'Dashboards voor MT en teams',
      '60 dagen support en iteraties',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise retainer',
    price: 'op maat vanaf 4.500 EUR p/m',
    description: 'Dedicated automation squad. Perfect voor scale-ups en corporates.',
    perks: [
      'Roadmap co-creatie per kwartaal',
      'Prioriteit op sprintcapaciteit',
      'SLA en 24/7 incident response',
      'Security reviews en NDA standaard',
      'Maandelijkse enablement sessies',
    ],
  },
]

const enTiers: Tier[] = [
  {
    name: 'Kickstart',
    price: 'from 2,500 EUR',
    description: 'For teams that want to automate a concrete process within a month.',
    perks: [
      '1-2 workflows via Zapier, Make or n8n',
      'Integration with your current tools',
      '2-hour enablement workshop',
      '30 days support and optimisation',
    ],
  },
  {
    name: 'Scale',
    price: 'from 7,500 EUR',
    description: 'Full customer journey automation including AI agents and dashboards.',
    perks: [
      '5+ workflows across multiple teams',
      'Custom AI agent or chatbot',
      'Custom scripts or connectors',
      'Dashboards for leadership and teams',
      '60 days support and iterations',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise retainer',
    price: 'custom from 4,500 EUR p/m',
    description: 'Dedicated automation squad. Ideal for scale-ups and enterprises.',
    perks: [
      'Quarterly roadmap co-creation',
      'Priority sprint capacity',
      'SLA and 24/7 incident response',
      'Security reviews and NDA by default',
      'Monthly enablement sessions',
    ],
  },
]

export default function PricingPage({ params }: { params: { locale: string } }) {
  const tiers = params.locale === 'nl' ? nlTiers : enTiers
  const headline =
    params.locale === 'nl'
      ? 'Pricing die meegroeit met je automatisering'
      : 'Pricing designed to scale with automation'
  const subline =
    params.locale === 'nl'
      ? 'Je krijgt een duidelijke scope, sprintplanning en ROI-inschatting voordat we starten.'
      : 'You receive a clear scope, sprint plan and ROI projection before we begin.'

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{headline}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{subline}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-3">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`card-gradient-stripe flex h-full flex-col rounded-3xl p-8 ${
                    tier.highlight
                      ? 'border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] shadow-[0_28px_90px_rgb(45_43_99/28%)]'
                      : 'border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]'
                  }`}
                >
                  {tier.highlight && (
                    <span className="mb-4 inline-flex max-w-max items-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                      {params.locale === 'nl' ? 'Meest gekozen' : 'Most selected'}
                    </span>
                  )}
                  <CardHeader className="space-y-4">
                    <CardTitle className="text-2xl font-semibold text-body">{tier.name}</CardTitle>
                    <CardDescription className="text-sm text-[color:var(--fg-muted)]">
                      {tier.price}
                    </CardDescription>
                    <p className="text-sm text-[color:var(--fg-subtle)]">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="mt-4 flex-1 space-y-3">
                    {tier.perks.map((perk) => (
                      <div key={perk} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="mt-6">
                    <Button asChild className="w-full" variant={tier.highlight ? 'default' : 'outline'}>
                      <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {params.locale === 'nl' ? 'Plan een intake' : 'Book an intake'}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom">
            <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-10">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-semibold text-body">
                  {params.locale === 'nl' ? 'Wat inbegrepen is' : 'What is included'}
                </CardTitle>
                <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                  {params.locale === 'nl'
                    ? 'We leveren meer dan alleen configuratie. Elk traject bevat kennisoverdracht en borging.'
                    : 'You get more than configuration. Every engagement includes knowledge transfer and governance.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {[
                  params.locale === 'nl'
                    ? 'Kick-off sessie met stakeholders en scope review'
                    : 'Kick-off session with stakeholders and scope review',
                  params.locale === 'nl'
                    ? 'Blueprint presentatie inclusief flowcharts en datastromen'
                    : 'Blueprint presentation with flowcharts and data flows',
                  params.locale === 'nl'
                    ? 'Logging, monitoring en rollback scenario\'s'
                    : 'Logging, monitoring and rollback scenarios',
                  params.locale === 'nl'
                    ? 'Training en documentatie voor je team in Nederlands en Engels'
                    : 'Training and documentation for your team in Dutch and English',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                    <Info className="mt-0.5 h-4 w-4 text-[color:var(--accent)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

