'use client'

import { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { RoiCalculator } from '@/components/roi/RoiCalculator'
import type { RoiInputs, RoiPreset, RoiResult, RoiVariant } from '@/components/roi/types'
import { buildLocalizedPath } from '@/lib/slugMap'
import type { Locale } from '@/lib/i18n'

interface RoiSectionProps {
  preset?: RoiPreset
  enableUrlSync?: boolean
  showMethodNote?: boolean
  layout?: 'full' | 'minimal'
  heading?: string
  subheading?: string
  variant?: RoiVariant
  showDisclaimer?: boolean
}

export function ROICalculator({
  preset = 'light',
  enableUrlSync = false,
  showMethodNote = false,
  layout = 'full',
  heading,
  subheading,
  variant,
  showDisclaimer = layout === 'full',
}: RoiSectionProps) {
  const locale = useLocale() as Locale
  const t = useTranslations('roi.section')
  const router = useRouter()

  const contactPath = useMemo(() => buildLocalizedPath('contact', locale), [locale])

  const handleSubmit = useCallback(
    async (_inputs: RoiInputs, result: RoiResult) => {
      const params = new URLSearchParams()
      params.set('preset', preset)
      params.set('annualSavings', result.annualSavings.toString())

      const target = params.toString() ? `${contactPath}?${params}` : contactPath
      router.push(target)
    },
    [contactPath, preset, router]
  )

  const renderCalculator = () => (
    <RoiCalculator
      preset={preset}
      enableUrlSync={enableUrlSync}
      showMethodNote={showMethodNote}
      variant={variant}
      onSubmit={handleSubmit}
    />
  )

  if (layout === 'minimal') {
    return (
      <section className="section-padding-y">
        <div className="container-custom">
          {(heading || subheading) && (
            <div className="mx-auto mb-12 max-w-3xl text-center">
              {heading && (
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
              )}
              {subheading && (
                <p className="mt-4 text-lg text-[color:var(--fg-subtle)]">{subheading}</p>
              )}
            </div>
          )}
          {renderCalculator()}

          {showDisclaimer && (
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-[color:var(--fg-muted)]">
              <strong>{t('disclaimerStrong')} </strong>
              {t('disclaimer')}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="roi-calculator" className="section-padding-y scroll-mt-20">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] bg-[color:color-mix(in_oklab,var(--brand-soft)_40%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Calculator className="size-4" aria-hidden="true" />
            {t('badge')}
          </motion.div>

          <motion.h2
            className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heading ?? t('title')}
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-[color:var(--fg-subtle)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subheading ?? t('subtitle')}
          </motion.p>
        </div>

        {renderCalculator()}

        {showDisclaimer && (
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-[color:var(--fg-muted)]">
            <strong>{t('disclaimerStrong')} </strong>
            {t('disclaimer')}
          </p>
        )}
      </div>
    </section>
  )
}
