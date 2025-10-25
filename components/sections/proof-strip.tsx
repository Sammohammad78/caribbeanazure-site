'use client'

import { useTranslations } from 'next-intl'
import { TextBox } from '@/components/ui/TextBox'

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
            <TextBox
              key={item.label}
              title={item.value}
              subtitle={item.detail}
              variant="info"
              size="md"
              interactive
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                {item.label}
              </span>
            </TextBox>
          ))}
        </div>
      </div>
    </section>
  )
}
