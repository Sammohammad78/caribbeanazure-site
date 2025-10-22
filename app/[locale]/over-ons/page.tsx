import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Target, Heart, Zap, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Resultaat eerst',
    description:
      'Elke sprint koppelen we aan KPI’s zoals responstijd, omzet per lead of doorlooptijd. Geen losse features maar meetbare verbeteringen.',
  },
  {
    icon: Heart,
    title: 'Radicale transparantie',
    description:
      'Vaste prijzen, live dashboards, dagelijks changelog. Je weet altijd wat we bouwen en wat het oplevert.',
  },
  {
    icon: Zap,
    title: 'Sprints, geen trajecten',
    description:
      'Implementaties in blokken van twee weken met demo, documentatie en enablement. Zo blijft iedereen in control.',
  },
]

const timeline = [
  {
    title: 'Kick-off in Amsterdam',
    description:
      'Caribbean Azure startte in 2020 als boutique automation studio voor scale-ups met te veel handwerk.',
  },
  {
    title: 'Growth naar enterprise',
    description:
      'Vandaag ondersteunen we corporates als Randstad en ABN AMRO met AI agents, onboarding flows en KPI dashboards.',
  },
  {
    title: 'AI automation guild',
    description:
      'We geloven in kennisdeling. Daarom publiceren we playbooks, organiseren we workshops en bouwen we tooling voor open samenwerking.',
  },
]

const differentiators = [
  {
    title: 'Eigen automation library',
    description: '350+ battle-tested blueprints voor CRM, support, finance en marketing processen.',
  },
  {
    title: 'Hybride team',
    description: 'Strategen, AI engineers en low-code builders werken samen in één squad.',
  },
  {
    title: 'NL-first service',
    description: 'Nederlandse copy, support op kantooruren én WhatsApp standby voor urgente issues.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-glow section-padding-y">
          <div className="container-custom">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-subtle)]">
                <Sparkles className="h-4 w-4 text-[color:var(--accent)]" />
                NL automation studio
              </div>
              <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Wij bouwen automatisering die teams écht gebruiken
              </h1>
              <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">
                Caribbean Azure brengt AI, no-code en maatwerk samen. We helpen Nederlandse teams om repetitief werk te schrappen,
                processen schaalbaar te maken en servicekwaliteit te verhogen.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <Card key={value.title} className="card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_68%,transparent)] text-[color:var(--brand)]">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-body">{value.title}</CardTitle>
                    <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-10">
              <CardHeader className="space-y-4 pb-6">
                <CardTitle className="text-2xl font-semibold text-body">Onze route</CardTitle>
                <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                  Van boutique studio naar automation guild. Altijd met de voeten in de praktijk en gefocust op snelle impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {timeline.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-5"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">{step.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-between rounded-3xl border-[color:color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_80%,transparent)0%,color-mix(in_oklab,var(--brand)_75%,transparent)100%)] p-10 text-white">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-semibold">Waarom klanten blijven</CardTitle>
                <CardDescription className="text-sm text-white/85">
                  Onze retainers draaien om co-creatie: we bouwen, analyseren, optimaliseren en trainen dezelfde week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                {differentiators.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/10 p-4">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-2">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <Card className="rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-10">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-semibold text-body">Ons team</CardTitle>
                <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                  Een compact team van automation engineers, AI specialists en service designers. We werken remote-first, maar komen wekelijks samen in Amsterdam voor deep work sprints.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'AI lead',
                    description: 'Ontwerpt en traint agents met veilige prompts, guardrails en monitoring.',
                  },
                  {
                    title: 'Automation engineer',
                    description: 'Bouwt orchestraties over Zapier, Make, n8n en custom code.',
                  },
                  {
                    title: 'Service designer',
                    description: 'Zorgt dat flows aansluiten op mensen, tooling en business KPI’s.',
                  },
                ].map((role) => (
                  <div
                    key={role.title}
                    className="rounded-2xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] p-5 text-sm text-[color:var(--fg-subtle)]"
                  >
                    <h3 className="text-base font-semibold text-body">{role.title}</h3>
                    <p className="mt-2">{role.description}</p>
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
