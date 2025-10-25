import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

export default async function DemoPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'demo' })

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom flex flex-col items-center gap-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
            <p className="max-w-2xl text-lg text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
            <div className="glass flex aspect-video w-full max-w-3xl items-center justify-center bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_75%,transparent)0%,color-mix(in_oklab,var(--accent)_65%,transparent)100%)]">
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
                Demo video placeholder
              </span>
            </div>
            <Button asChild size="lg">
              <a href={`/${params.locale}/contact`}>{t('cta')}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
