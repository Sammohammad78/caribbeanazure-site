'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { buildLocalizedPath, type RouteKey } from '@/lib/slugMap'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface TierItem {
  id: string
  label: string
  title: string
  description: string
  cta: string
  routeKey: RouteKey
}

export function TierLadder() {
  const locale = useLocale() as Locale
  const t = useTranslations('home.tiers')
  const tiers = (t.raw('items') as TierItem[]) ?? []

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
            {t('title')}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <article
              key={tier.id}
              className={cn(
                'group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-8 text-left shadow-[0_20px_45px_rgba(15,23,42,0.16)] transition-all duration-300 backdrop-blur-xl',
                'before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]',
                'after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:border after:border-white/25 after:opacity-0 after:transition-opacity after:duration-300',
                'hover:translate-y-[-6px] hover:after:opacity-100 focus-within:translate-y-[-6px] focus-within:after:opacity-100'
              )}
            >
              <header className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                  {tier.label}
                </span>
                <h3 className="text-2xl font-semibold text-[color:var(--fg)]">{tier.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                  {tier.description}
                </p>
              </header>

              <footer className="mt-8">
                <Link
                  href={buildLocalizedPath(tier.routeKey, locale)}
                  className="inline-flex items-center justify-between rounded-2xl border border-transparent bg-[color:var(--accent)]/15 px-4 py-3 text-sm font-semibold text-[color:var(--accent)] transition-colors duration-200 hover:bg-[color:var(--accent)]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </footer>

              <span className="pointer-events-none absolute left-4 top-4 text-5xl font-bold text-white/5">
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
