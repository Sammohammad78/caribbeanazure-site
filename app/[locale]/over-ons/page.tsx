import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Target, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { Hreflang } from '@/components/seo/hreflang'
import { TrustStrip } from '@/components/ui/trust-strip'

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'nl' | 'en'

  const content = {
    nl: {
      hero: {
        badge: 'Over Caribbean Azure',
        title: 'Van aanvraag tot productie—geautomatiseerd voor MKB-makers',
        subtitle:
          'We helpen Nederlandse maakindustrie en dienstverlenende bedrijven om handmatig werk te elimineren met slimme automatisering, AI-workflows en configurators.',
      },
      mission: {
        title: 'Onze missie',
        description:
          'Technologie moet werken vóór jou, niet andersom. We bouwen praktische automatisering die tijd bespaart, fouten elimineert en je team focust op werk dat echt telt—zonder vendor lock-in of complexe systemen.',
      },
      values: [
        {
          icon: Sparkles,
          title: 'Pragmatisch bouwen',
          description: 'Geen over-engineering. We leveren werkende oplossingen in sprints van 2 weken.',
        },
        {
          icon: Target,
          title: 'ROI-gedreven',
          description: 'Elk project meet impact. We tonen baseline, target en gerealiseerde resultaten.',
        },
        {
          icon: Zap,
          title: 'Open & overdraagbaar',
          description: 'Je houdt volledige controle. Self-hosted workflows, geen vendor lock-in.',
        },
        {
          icon: Shield,
          title: 'EU-first & GDPR',
          description: 'Data blijft in de EU. DPA beschikbaar. Self-host opties voor volledige controle.',
        },
      ],
      approach: {
        title: 'Hoe we werken',
        subtitle: 'Van intake tot livegang in drie heldere fases',
        steps: [
          {
            number: '01',
            title: 'Intake & Blueprint',
            description:
              '30-minuten scan van je processen. We identificeren snelle winsten en maken een visueel blueprint met KPIs en flowdiagram.',
          },
          {
            number: '02',
            title: 'Build & Test',
            description:
              'Sprints van 2 weken met wekelijkse demos. Je ziet elk onderdeel live voor het in productie gaat.',
          },
          {
            number: '03',
            title: 'Launch & Optimalisatie',
            description:
              'Training voor je team, live dashboards met SLAs en retainer voor doorontwikkeling. Je draait zelfstandig.',
          },
        ],
      },
      team: {
        title: 'Het team',
        description:
          'Caribbean Azure wordt gerund door makers die begrijpen hoe MKB-processen werken. We combineren technische expertise (n8n, Make, Python, AI) met begrip van productie-workflows en sales-processen.',
        expertise: [
          'Workflow automation (n8n, Make, Zapier)',
          'AI & RAG agents (OpenAI, Anthropic)',
          'BOM & CAD integration (SolidWorks, AutoCAD)',
          'ERP/CRM koppeling (Exact, Dynamics, ClickUp)',
          'Self-hosted & EU compliance',
        ],
      },
      clients: {
        title: 'Met wie we werken',
        description:
          'We specialiseren ons in Nederlandse MKB-bedrijven die klaar zijn om handmatige processen te automatiseren.',
        segments: [
          'Maakindustrie (metaal, kunststof, hout)',
          'Technische dienstverlening',
          'Groothandel & distributie',
          'Engineering & consultancy',
        ],
      },
      cta: {
        title: 'Klaar om te starten?',
        description: 'Plan een gratis intake en ontdek wat automatisering voor jouw team kan betekenen.',
        button: 'Plan een intake',
      },
    },
    en: {
      hero: {
        badge: 'About Caribbean Azure',
        title: 'From request to production—automated for SME manufacturers',
        subtitle:
          'We help Dutch manufacturing and service companies eliminate manual work with smart automation, AI workflows, and configurators.',
      },
      mission: {
        title: 'Our mission',
        description:
          'Technology should work for you, not the other way around. We build practical automation that saves time, eliminates errors, and lets your team focus on work that truly matters—without vendor lock-in or complex systems.',
      },
      values: [
        {
          icon: Sparkles,
          title: 'Pragmatic building',
          description: 'No over-engineering. We deliver working solutions in 2-week sprints.',
        },
        {
          icon: Target,
          title: 'ROI-driven',
          description: 'Every project measures impact. We show baseline, target, and realized results.',
        },
        {
          icon: Zap,
          title: 'Open & transferable',
          description: 'You maintain full control. Self-hosted workflows, no vendor lock-in.',
        },
        {
          icon: Shield,
          title: 'EU-first & GDPR',
          description: 'Data stays in the EU. DPA available. Self-host options for complete control.',
        },
      ],
      approach: {
        title: 'How we work',
        subtitle: 'From intake to go-live in three clear phases',
        steps: [
          {
            number: '01',
            title: 'Intake & Blueprint',
            description:
              '30-minute scan of your processes. We identify quick wins and create a visual blueprint with KPIs and flow diagrams.',
          },
          {
            number: '02',
            title: 'Build & Test',
            description:
              '2-week sprints with weekly demos. You see each component live before it goes to production.',
          },
          {
            number: '03',
            title: 'Launch & Optimization',
            description:
              'Team training, live dashboards with SLAs, and retainer for ongoing development. You operate independently.',
          },
        ],
      },
      team: {
        title: 'The team',
        description:
          'Caribbean Azure is run by makers who understand how SME processes work. We combine technical expertise (n8n, Make, Python, AI) with understanding of production workflows and sales processes.',
        expertise: [
          'Workflow automation (n8n, Make, Zapier)',
          'AI & RAG agents (OpenAI, Anthropic)',
          'BOM & CAD integration (SolidWorks, AutoCAD)',
          'ERP/CRM integration (Exact, Dynamics, ClickUp)',
          'Self-hosted & EU compliance',
        ],
      },
      clients: {
        title: 'Who we work with',
        description:
          'We specialize in Dutch SMEs ready to automate manual processes.',
        segments: [
          'Manufacturing (metal, plastics, wood)',
          'Technical services',
          'Wholesale & distribution',
          'Engineering & consultancy',
        ],
      },
      cta: {
        title: 'Ready to start?',
        description: 'Book a free intake and discover what automation can mean for your team.',
        button: 'Book an intake',
      },
    },
  }

  return (
    <>
      <Hreflang />

      <div className="relative">
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.about} />
        </div>

        <Header />
        <main id="main-content">
          {/* Hero */}
          <section className="section-padding-y hero-glow">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
                  {content[locale].hero.badge}
                </div>
                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  {content[locale].hero.title}
                </h1>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)] md:text-xl">
                  {content[locale].hero.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Trust Strip */}
          <section className="border-y border-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_95%,transparent)] py-6">
            <div className="container-custom">
              <TrustStrip />
            </div>
          </section>

          {/* Mission */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].mission.title}
                </h2>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].mission.description}
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {content[locale].values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <Card
                      key={index}
                      className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6"
                    >
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-body">{value.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--fg-subtle)]">{value.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Approach */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].approach.title}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].approach.subtitle}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {content[locale].approach.steps.map((step, index) => (
                  <Card
                    key={index}
                    className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                  >
                    <div className="mb-4 text-5xl font-bold text-[color:var(--brand)] opacity-20">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-body">{step.title}</h3>
                    <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">{step.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Team & Expertise */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].team.title}
                </h2>
                <p className="mt-6 text-center text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].team.description}
                </p>

                <Card className="mt-12 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <h3 className="mb-6 text-lg font-semibold text-body">
                    {locale === 'nl' ? 'Expertise' : 'Expertise'}
                  </h3>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {content[locale].team.expertise.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Clients */}
          <section className="section-padding-y">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].clients.title}
                </h2>
                <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].clients.description}
                </p>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {content[locale].clients.segments.map((segment, index) => (
                    <Card
                      key={index}
                      className="rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6 text-center"
                    >
                      <p className="font-medium text-body">{segment}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
            <div className="container-custom">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {content[locale].cta.title}
                </h2>
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">
                  {content[locale].cta.description}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href={`/${locale}/contact`}>
                    {content[locale].cta.button}
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
