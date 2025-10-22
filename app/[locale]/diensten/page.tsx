import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowRightCircle, Sparkles, Workflow, MessageCircle, ShieldCheck } from 'lucide-react'

type ServiceBlock = {
  title: string
  description: string
  points: string[]
}

const nlServices: ServiceBlock[] = [
  {
    title: 'E-mail naar actie',
    description:
      'Wij koppelen Gmail of Outlook direct aan ClickUp, Notion of HubSpot. Inkomende mails worden automatisch taken met context, labels en deadlines.',
    points: [
      'Slimme parsers die informatie uit mails filteren',
      'Automatische prioriteiten en owners',
      'Realtime synchronisatie met je werkstack',
    ],
  },
  {
    title: 'WhatsApp funnels',
    description:
      'Van intake tot follow-up: WhatsApp flows die leads kwalificeren, offertes versturen en herinneringen plannen zonder handwerk.',
    points: [
      "Gebruik je bestaande nummers met officiele API's",
      'AI-gesprekken die intentie herkennen',
      'Automatische opvolging via CRM of kalender',
    ],
  },
  {
    title: 'AI agents en chatbots',
    description:
      '24/7 agents die kennisbanken lezen, klantvragen beantwoorden en tickets of orders aanmaken zodra het nodig is.',
    points: [
      'Gevoed met je eigen data en tone of voice',
      'Hand-off naar medewerkers met volledige context',
      'Monitoring dashboards voor kwaliteit',
    ],
  },
  {
    title: 'Dashboards en rapportage',
    description:
      "Power BI en Looker dashboards met realtime KPI's. Ideaal voor MT-updates, sales pipe monitoring en service performance.",
    points: [
      'Data modellering en automatisering van ETL',
      "Alerts op afwijkingen en SLA's",
      'Toegang per team met row-level security',
    ],
  },
  {
    title: 'Proces automatisering',
    description:
      'We bouwen orchestraties met Zapier, Make of n8n plus maatwerk scripts waar nodig. Van facturatie tot onboarding.',
    points: [
      'Bibliotheek met 350+ bewezen templates',
      'Code waar nodig, low-code waar het kan',
      'Monitoring en fallback alerts',
    ],
  },
  {
    title: 'Training en enablement',
    description:
      'Workshops en enablement routes waardoor je team zelfstandig kan beheren, uitbreiden en optimaliseren.',
    points: [
      'On-site of remote sessies met je team',
      'Documentatie en playbooks in Nederlands',
      'Support abonnementen vanaf 10 uur per maand',
    ],
  },
]

const enServices: ServiceBlock[] = [
  {
    title: 'Email to action',
    description:
      'We connect Gmail or Outlook to ClickUp, Notion or HubSpot so incoming email becomes structured, actionable tasks automatically.',
    points: [
      'Smart parsers that surface key details',
      'Automatic priorities and assignees',
      'Realtime sync with your daily tools',
    ],
  },
  {
    title: 'WhatsApp funnels',
    description:
      'Intake to follow-up on autopilot: WhatsApp flows that qualify leads, send quotes and trigger reminders without manual effort.',
    points: [
      'Use existing numbers with official APIs',
      'AI conversations that capture intent',
      'Automatic follow-up via CRM or calendar',
    ],
  },
  {
    title: 'AI agents and chatbots',
    description:
      '24/7 agents that read your knowledge base, answer support tickets and create tasks or orders whenever needed.',
    points: [
      'Grounded in your data and tone of voice',
      'Seamless hand-off to humans with context',
      'Quality dashboards and monitoring',
    ],
  },
  {
    title: 'Dashboards and reporting',
    description:
      'Power BI and Looker dashboards with real-time KPIs. Perfect for leadership, sales pipeline tracking and service performance.',
    points: [
      'Data modeling and automated ETL',
      'Alerting on anomalies and SLAs',
      'Team-based access with row-level security',
    ],
  },
  {
    title: 'Process automation',
    description:
      'We orchestrate flows with Zapier, Make or n8n plus custom scripts where needed. From billing to onboarding.',
    points: [
      'Library of 350+ proven templates',
      'Code where it matters, low-code where it fits',
      'Monitoring and intelligent fallbacks',
    ],
  },
  {
    title: 'Training and enablement',
    description:
      'Workshops and enablement tracks so your team can maintain, extend and optimise independently.',
    points: [
      'On-site or remote sessions',
      'Documentation and playbooks in plain language',
      'Support retainers starting at 10 hours per month',
    ],
  },
]

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const services = params.locale === 'nl' ? nlServices : enServices
  const introTitle =
    params.locale === 'nl'
      ? 'Diensten die omzet opleveren'
      : 'Services that accelerate revenue'
  const introSubtitle =
    params.locale === 'nl'
      ? 'We combineren no-code, AI en maatwerk zodat elk repetitief proces schaalbaar en meetbaar wordt.'
      : 'We blend no-code, AI and custom engineering to make every repetitive process scalable and measurable.'

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-subtle)]">
                <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
                {params.locale === 'nl' ? 'Expertise' : 'What we do'}
              </div>
              <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                {introTitle}
              </h1>
              <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{introSubtitle}</p>
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service) => (
                <Card key={service.title} className="card-gradient-stripe h-full rounded-3xl p-8">
                  <CardHeader className="space-y-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)] shadow-[0_12px_32px_color-mix(in_oklab,var(--brand)_30%,transparent)]">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-body">{service.title}</CardTitle>
                    <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
                        <ArrowRightCircle className="mt-0.5 h-4 w-4 text-[color:var(--accent)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <Card className="rounded-3xl p-10">
                <CardHeader className="space-y-4 pb-6">
                  <CardTitle className="text-2xl font-semibold text-body">
                    {params.locale === 'nl'
                      ? 'Hoe we samen bouwen'
                      : 'How collaboration works'}
                  </CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    {params.locale === 'nl'
                      ? 'Elke implementatie volgt dezelfde flow: analyse, blueprint, bouwen, enablement.'
                      : 'Every build follows the same flow: analysis, blueprint, build, enablement.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 text-sm text-[color:var(--fg-subtle)]">
                  <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-5">
                    <h3 className="text-sm font-semibold text-body">
                      {params.locale === 'nl' ? '1. Analyse' : '1. Analysis'}
                    </h3>
                    <p className="mt-2">
                      {params.locale === 'nl'
                        ? 'Intake van huidige processen, data en tools. We toetsen haalbaarheid en impact in een scorecard.'
                        : 'Intake of current processes, data and tools. We validate feasibility and impact in a scorecard.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-5">
                    <h3 className="text-sm font-semibold text-body">
                      {params.locale === 'nl' ? '2. Blueprint' : '2. Blueprint'}
                    </h3>
                    <p className="mt-2">
                      {params.locale === 'nl'
                        ? 'Solution design met flows, systemen en verantwoordelijkheden. Je krijgt een visueel plan en planning.'
                        : 'Solution design covering flows, systems and owners. You receive a visual plan and timeline.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-5">
                    <h3 className="text-sm font-semibold text-body">
                      {params.locale === 'nl' ? '3. Bouwen en testen' : '3. Build and test'}
                    </h3>
                    <p className="mt-2">
                      {params.locale === 'nl'
                        ? 'We leveren in sprints van twee weken met testcases, logging en dashboards voor adoptie.'
                        : 'Delivered in two-week sprints with test cases, logging and dashboards ready for adoption.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex h-full flex-col justify-between rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_80%,transparent)0%,color-mix(in_oklab,var(--brand)_75%,transparent)100%)] p-8 text-white">
                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl font-semibold">
                    {params.locale === 'nl'
                      ? 'Klaar voor een automation sprint?'
                      : 'Ready for an automation sprint?'}
                  </CardTitle>
                  <CardDescription className="text-sm text-white/85">
                    {params.locale === 'nl'
                      ? 'Plan een sessie van 45 minuten en ontvang een voorstel met roadmap, planning en investering.'
                      : 'Book a 45-minute session and receive a proposal with roadmap, timeline and investment.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {params.locale === 'nl'
                        ? 'WhatsApp intake mogelijk binnen 24 uur'
                        : 'WhatsApp intake available within 24 hours'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span>
                      {params.locale === 'nl'
                        ? 'NDA standaard beschikbaar'
                        : 'NDA ready on request'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

