import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { AlertCircle, Home, Contact, Compass } from 'lucide-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { buildLocalizedPath } from '@/lib/slugMap'
import type { Locale } from '@/lib/i18n'

export default function NotFound() {
  const locale = useLocale() as Locale
  const t = useTranslations('errors.notFound')

  const suggestions = [
    { href: buildLocalizedPath('home', locale), label: t('home', { fallback: 'Home' }), icon: Home },
    { href: buildLocalizedPath('solutions', locale), label: t('solutions', { fallback: 'Solutions' }), icon: Compass },
    { href: buildLocalizedPath('contact', locale), label: t('contact', { fallback: 'Contact' }), icon: Contact },
  ]

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.default} />
      </div>

      <Header />
      <main id="main-content" className="flex flex-1 items-center justify-center">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)]">
              <AlertCircle className="h-12 w-12" />
            </div>

            <h1 className="mb-4 text-8xl font-bold tracking-tight text-[color:var(--brand)]">404</h1>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t('title')}</h2>
            <p className="mb-8 text-lg text-[color:var(--fg-subtle)]">{t('description')}</p>

            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {suggestions.map((link) => (
                <Button key={link.href} asChild variant="outline">
                  <Link href={link.href} className="inline-flex items-center gap-2">
                    <link.icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>

            <p className="text-sm text-[color:var(--fg-muted)]">
              {t('help')}{' '}
              <Link href={buildLocalizedPath('contact', locale)} className="text-[color:var(--brand)] hover:underline">
                {t('cta')}
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
