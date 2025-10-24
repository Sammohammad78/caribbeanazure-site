'use client'

import { TierPricing, formatPriceLabel } from '@/lib/pricing'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

interface TierCardProps {
  tier: TierPricing
  highlight?: boolean
  index?: number
}

export function TierCard({ tier, highlight = false, index = 0 }: TierCardProps) {
  const locale = useLocale() as 'nl' | 'en'

  return (
    <motion.div
      className={`card-gradient-stripe flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 hover:scale-[1.02] ${
        highlight
          ? 'border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] shadow-[0_28px_90px_rgba(37,99,235,0.28)]'
          : 'border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Highlight Badge */}
      {highlight && (
        <span className="mb-4 inline-flex max-w-max items-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_28px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
          {locale === 'nl' ? 'Meest gekozen' : 'Most selected'}
        </span>
      )}

      {/* Tier Name */}
      <h3 className="text-2xl font-bold text-body">{tier.name[locale]}</h3>

      {/* Price */}
      <div className="mt-4">
        <p className="text-3xl font-bold text-[color:var(--brand)]">
          {formatPriceLabel(tier.basePrice, locale, tier.priceType)}
        </p>
        {tier.priceType === 'vanaf' && (
          <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
            {locale === 'nl' ? 'excl. btw' : 'excl. VAT'}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-[color:var(--fg-subtle)] leading-relaxed">
        {tier.description[locale]}
      </p>

      {/* Badges */}
      {tier.badges && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tier.badges[locale].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] px-3 py-1 text-xs font-semibold text-[color:var(--brand)]"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features[locale].map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-[color:var(--fg-subtle)]">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]">
              <Check className="h-3 w-3" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/${locale}/contact?tier=${tier.tier}`}
        className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
          highlight
            ? 'bg-[linear-gradient(135deg,var(--brand-600)_0%,var(--brand-400)_100%)] text-white shadow-lg hover:scale-105'
            : 'border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] text-[color:var(--fg)] hover:border-[color:color-mix(in_oklab,var(--brand)_25%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_85%,transparent)]'
        }`}
      >
        {tier.cta[locale]}
        <ArrowRight className="h-4 w-4" />
      </Link>

      {/* Contact note for Tier 3 */}
      {tier.tier === 'configurators' && (
        <p className="mt-3 text-xs text-center text-[color:var(--fg-muted)]">
          {locale === 'nl'
            ? 'Maatwerk—prijs op aanvraag. Laat uw use-case beoordelen in een intake.'
            : 'Custom—price on request. Book an intake to assess your use case.'}
        </p>
      )}
    </motion.div>
  )
}
