import type { Locale } from '@/lib/i18n'

export type PriceKey = 'micro' | 'tier1' | 'tier2' | 'tier3'

const priceStrings: Record<Locale, Record<PriceKey, string>> = {
  nl: {
    micro: 'Micro-automatie. Vanaf € 799 excl. btw.',
    tier1: 'Vanaf € 999 excl. btw.',
    tier2: 'Vanaf € 1.999 excl. btw.',
    tier3: 'Prijs op aanvraag.',
  },
  en: {
    micro: 'Micro-automation. From € 799 excl. VAT.',
    tier1: 'From € 999 excl. VAT.',
    tier2: 'From € 1,999 excl. VAT.',
    tier3: 'Price on request.',
  },
}

export function getPriceLabel(priceKey: PriceKey, locale: Locale) {
  return priceStrings[locale][priceKey]
}
