'use client'

import Hero3D from '@/components/3d/Hero3D'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="hero-glow__background" />
      <div className="container-custom relative">
        <div className="grid items-center gap-16 py-20 md:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-28">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex max-w-max items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--brand)] shadow-[0_0_12px_color-mix(in_oklab,var(--brand)_60%,transparent)]" />
              Caribbean Azure · Automation Studio
            </motion.div>

            <motion.h1
              className="text-balance font-bold tracking-tight"
              style={{ maxWidth: '18ch' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {t('qualifier')}
            </motion.p>

            <motion.p
              className="copy-20 text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/${locale}/contact`}>
                  {t('cta.primary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-outline w-full sm:w-auto"
              >
                <Link href={`/${locale}/cases`}>
                  {t('cta.secondary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-6 border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] pt-8 text-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="space-y-2">
                <p className="copy-13 uppercase tracking-[0.24em] text-[color:var(--fg-subtle)]">
                  {t('trustedBy')}
                </p>
                <div className="flex flex-wrap items-center gap-4 opacity-75">
                  {['Randstad', 'ABN AMRO', 'CM.com', 'Exact', 'Bol.com'].map((label) => (
                    <span key={label} className="text-sm font-semibold text-[color:var(--fg-muted)]">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden h-12 w-px bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] lg:block" />
              <div className="flex gap-6 text-sm text-[color:var(--fg-subtle)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Implementaties
                  </p>
                  <p className="text-lg font-semibold text-body">150+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Gem. ROI
                  </p>
                  <p className="text-lg font-semibold text-body">612%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[520px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="hero-glow__orb absolute inset-0" />
            <Hero3D className="relative z-10 h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

