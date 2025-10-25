'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { trackEvent } from '@/lib/tracking'

export interface CaseItem {
  id: string
  sector: string
  headline: string
  kpis: string[]
  video?: {
    src: string
    thumbnail?: string
  }
}

interface CasesGridProps {
  items: CaseItem[]
  videoLabel: string
  contactHref: string
  contactLabel: string
  roiHref: string
  roiLabel: string
}

export function CasesGrid({
  items,
  videoLabel,
  contactHref,
  contactLabel,
  roiHref,
  roiLabel,
}: CasesGridProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  const casesById = useMemo(
    () =>
      items.reduce<Record<string, CaseItem>>((acc, item) => {
        acc[item.id] = item
        return acc
      }, {}),
    [items]
  )

  const toggleCase = (id: string) => {
    setActiveId((prev) => {
      const next = prev === id ? null : id
      if (next === id) {
        trackEvent('ca.case.expand', { caseId: id })
      }
      return next
    })
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCase(item.id)}
              className="glass group flex flex-col p-6 text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-expanded={isActive}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
                    {item.sector}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[color:var(--fg)]">
                    {item.headline}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[color:var(--fg-muted)] transition-transform duration-200 ${
                    isActive ? 'rotate-180 text-[color:var(--accent)]' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--fg-subtle)]">
                {item.kpis.map((kpi) => (
                  <li key={kpi} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
              {item.video && (
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {videoLabel}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeId && casesById[activeId] && (
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass p-8"
          >
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[color:var(--fg)]">
                  {casesById[activeId].sector}
                </h3>
                <p className="mt-2 text-base text-[color:var(--fg-subtle)]">
                  {casesById[activeId].headline}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 text-sm text-[color:var(--fg-subtle)] sm:flex-row sm:items-center">
                <Link
                  href={contactHref}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--accent)]"
                >
                  {contactLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={roiHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--accent)]"
                >
                  {roiLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
