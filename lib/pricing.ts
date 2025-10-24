/**
 * Caribbean Azure - Pricing Utilities
 * EUR-only pricing with NL/EN locale formatting
 */

export type PricingTier = 'light' | 'manufacturing' | 'configurators'

export interface TierPricing {
  tier: PricingTier
  name: { nl: string; en: string }
  priceType: 'vanaf' | 'contact'
  basePrice?: number // in EUR, undefined for contact-only
  description: { nl: string; en: string }
  features: { nl: string[]; en: string[] }
  badges?: { nl: string[]; en: string[] }
  cta: { nl: string; en: string }
}

/**
 * Format EUR price with locale-specific formatting
 * NL: €999 or €1.999
 * EN: €999 or €1,999
 */
export function formatEUR(amount: number, locale: 'nl' | 'en' = 'nl'): string {
  return new Intl.NumberFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format price with "vanaf" prefix for NL, "from" for EN
 */
export function formatPriceLabel(
  amount: number | undefined,
  locale: 'nl' | 'en',
  type: 'vanaf' | 'contact'
): string {
  if (type === 'contact' || amount === undefined) {
    return locale === 'nl' ? 'Prijs op aanvraag' : 'Price on request'
  }

  const formatted = formatEUR(amount, locale)
  const prefix = locale === 'nl' ? 'vanaf' : 'from'
  return `${prefix} ${formatted}`
}

/**
 * Tier 1: Light automations - vanaf €999
 */
export const tier1: TierPricing = {
  tier: 'light',
  name: {
    nl: 'Light Automations',
    en: 'Light Automations',
  },
  priceType: 'vanaf',
  basePrice: 999,
  description: {
    nl: 'Snelle micro-automaties voor teams die handmatig werk willen elimineren.',
    en: 'Quick micro-automations for teams that want to eliminate manual work.',
  },
  features: {
    nl: [
      'Inbox-to-Action workflows',
      'Leads-naar-Booking automatie',
      'WhatsApp Helpdesk bot',
      'Invoice Robot',
      'Setup & training inbegrepen',
      '30-60 dagen support',
    ],
    en: [
      'Inbox-to-Action workflows',
      'Leads-to-Booking automation',
      'WhatsApp Helpdesk bot',
      'Invoice Robot',
      'Setup & training included',
      '30-60 days support',
    ],
  },
  badges: {
    nl: ['Setup', 'Training', 'Support 30-60d'],
    en: ['Setup', 'Training', 'Support 30-60d'],
  },
  cta: {
    nl: 'Plan een intake',
    en: 'Book an intake',
  },
}

/**
 * Tier 2: Sales→BOM & Drawing Packs - vanaf €1.999
 */
export const tier2: TierPricing = {
  tier: 'manufacturing',
  name: {
    nl: 'Sales→BOM & Tekenpakketten',
    en: 'Sales→BOM & Drawing Packs',
  },
  priceType: 'vanaf',
  basePrice: 1999,
  description: {
    nl: 'Productie-klare workflows van offerte tot stuklijst en technische tekeningen.',
    en: 'Production-ready workflows from quote to BOM and technical drawings.',
  },
  features: {
    nl: [
      'Sales→BOM Bridge (ERP-integratie)',
      'Drawing Pack Generator (PDF/DXF)',
      'ERP-connectors (Exact, AFAS, etc.)',
      'Custom calculators & prijslogica',
      'Blueprint presentatie',
      '60-90 dagen support',
    ],
    en: [
      'Sales→BOM Bridge (ERP integration)',
      'Drawing Pack Generator (PDF/DXF)',
      'ERP connectors (Exact, AFAS, etc.)',
      'Custom calculators & pricing logic',
      'Blueprint presentation',
      '60-90 days support',
    ],
  },
  badges: {
    nl: ['Blueprint', 'ERP-koppeling', 'Support 60-90d'],
    en: ['Blueprint', 'ERP integration', 'Support 60-90d'],
  },
  cta: {
    nl: 'Plan een intake',
    en: 'Book an intake',
  },
}

/**
 * Tier 3: Configurators (CPQ & C2P) - contact only
 */
export const tier3: TierPricing = {
  tier: 'configurators',
  name: {
    nl: 'Configurators (CPQ & C2P)',
    en: 'Configurators (CPQ & C2P)',
  },
  priceType: 'contact',
  basePrice: undefined,
  description: {
    nl: 'Maatwerk configure-to-order en configure-to-production oplossingen.',
    en: 'Custom configure-to-order and configure-to-production solutions.',
  },
  features: {
    nl: [
      'CPQ (Configure-Price-Quote) standard',
      'C2P (Configure-to-Production)',
      '3D visualisatie optioneel',
      'Volledige ERP-integratie',
      'Maatwerk regels & validatie',
      'Doorlopende support & iteraties',
    ],
    en: [
      'CPQ (Configure-Price-Quote) standard',
      'C2P (Configure-to-Production)',
      'Optional 3D visualization',
      'Full ERP integration',
      'Custom rules & validation',
      'Ongoing support & iterations',
    ],
  },
  badges: {
    nl: ['Maatwerk', 'CPQ', 'C2P'],
    en: ['Custom', 'CPQ', 'C2P'],
  },
  cta: {
    nl: 'Plan een intake',
    en: 'Book an intake',
  },
}

/**
 * All tiers in order
 */
export const allTiers = [tier1, tier2, tier3] as const

/**
 * Get tier by key
 */
export function getTier(tier: PricingTier): TierPricing {
  switch (tier) {
    case 'light':
      return tier1
    case 'manufacturing':
      return tier2
    case 'configurators':
      return tier3
  }
}

/**
 * Fine print text
 */
export const finePrint = {
  nl: 'Alle prijzen zijn "vanaf" prijzen en excl. btw. Scope, integraties en complexiteit beïnvloeden de definitieve prijs.',
  en: 'All prices are "from" prices and excl. VAT. Scope, integrations, and complexity affect the final price.',
}
