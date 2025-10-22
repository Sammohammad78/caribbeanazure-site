import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

type SecuritySection = {
  title: string
  copy: string
}

export default async function SecurityPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'security' })
  const sections = t.raw('sections') as SecuritySection[]

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <Card
                key={section.title}
                className="card flex h-full flex-col gap-3 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
              >
                <CardHeader className="space-y-2 pb-0">
                  <CardTitle className="text-lg font-semibold text-body">{section.title}</CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    {section.copy}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom flex flex-col items-center gap-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_82%,transparent)100%)] px-8 py-16 text-center text-white shadow-[0_40px_120px_rgb(45_43_99/28%)] md:px-16">
            <h2 className="text-3xl font-semibold">{t('cta')}</h2>
            <Button asChild size="lg">
              <a href={`mailto:security@caribbeanazure.nl`}>security@caribbeanazure.nl</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

