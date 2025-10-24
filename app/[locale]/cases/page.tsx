import type { ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowUpRight, BarChart3, Clock3, Users } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

type CaseSummary = {
  slug: string
  client: string
  sector: string
  headline: string
  summary: string
  kpis: string[]
  ctaLabel: string
}

type CaseHighlight = {
  title: string
  body: string
}

export default async function CasesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'cases' })
  const items = t.raw('items') as CaseSummary[]
  const highlights = t.raw('highlights') as CaseHighlight[]

  return (
    <>
      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.cases} />
        </div>

        <Header />
        <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom">
            <div className="mx-auto max-w-[720px] text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                {t('title')}
              </h1>
              <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-3">
              {items.map((item) => (
                <Card
                  key={item.slug}
                  className="card-gradient-stripe flex h-full flex-col justify-between rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
                >
                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                        {item.client}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[color:var(--accent)]" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-body">{item.headline}</CardTitle>
                    <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                      {item.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {item.kpis.map((kpi) => (
                      <div key={kpi} className="flex items-center gap-3 text-sm font-semibold text-body">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
                          <BarChart3 className="h-4 w-4" />
                        </span>
                        <span>{kpi}</span>
                      </div>
                    ))}
                  </CardContent>
                  <div className="mt-6 flex">
                    <Link
                      href={`/${params.locale}/cases/${item.slug}`}
                      className="lift-hover inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] transition-colors duration-200 hover:text-[color:var(--accent-strong)]"
                    >
                      {item.ctaLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-3">
              {highlights.map((item, index) => (
                <HighlightTile
                  key={`${item.title}-${index}`}
                  icon={index === 0 ? <Clock3 className="h-5 w-5" /> : index === 1 ? <Users className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
                  title={item.title}
                  description={item.body}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </>
  )
}

function HighlightTile({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <Card className="card flex h-full flex-col gap-4 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_68%,transparent)] p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
        {icon}
      </div>
      <CardHeader className="space-y-3 pb-0">
        <CardTitle className="text-lg font-semibold text-body">{title}</CardTitle>
        <CardDescription className="text-sm text-[color:var(--fg-subtle)]">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
