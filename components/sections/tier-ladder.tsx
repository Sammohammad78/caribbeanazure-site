'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { buildLocalizedPath, type RouteKey } from '@/lib/slugMap'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/button'

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
            <GlassCard
              key={tier.id}
              interactive
              gradient
              className="relative flex h-full flex-col justify-between text-left"
            >
              <header className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                  {tier.label}
                </span>
                <h3 className="text-2xl font-bold text-[color:var(--fg)]">{tier.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                  {tier.description}
                </p>
              </header>

              <footer className="mt-8">
                <Button asChild variant="glass" className="w-full justify-between bg-[color:var(--accent)]/10 text-[color:var(--accent)] hover:bg-[color:var(--accent)]/20">
                  <Link href={buildLocalizedPath(tier.routeKey, locale)}>
                    <span>{tier.cta}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </footer>

              <span className="pointer-events-none absolute left-4 top-4 text-6xl font-bold text-white/[0.03]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
