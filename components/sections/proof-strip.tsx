'use client'

import { useTranslations } from 'next-intl'

interface ProofItem {
  label: string
  value: string
  detail: string
}

export function ProofStrip() {
  const t = useTranslations('home.proof')
  const items = (t.raw('items') as ProofItem[]) ?? []

  return (
    <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_94%,transparent)]">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)] md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/60 p-8 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                {item.label}
              </span>
              <p className="mt-3 text-4xl font-bold text-[color:var(--brand)]">{item.value}</p>
              <p className="mt-3 text-sm text-[color:var(--fg-subtle)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
