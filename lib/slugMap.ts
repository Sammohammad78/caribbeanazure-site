import { Locale, defaultLocale } from '@/lib/i18n'

type LocaleSlugMap = Record<Locale, string>

type SegmentKey =
  | 'home'
  | 'solutions'
  | 'solutionsLight'
  | 'solutionsManufacturing'
  | 'solutionsConfigurators'
  | 'pricing'
  | 'services'
  | 'cases'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms'

const segmentMap: Record<SegmentKey, LocaleSlugMap | null> = {
  home: null,
  solutions: { nl: 'oplossingen', en: 'solutions' },
  solutionsLight: { nl: 'light', en: 'light' },
  solutionsManufacturing: { nl: 'maakindustrie', en: 'manufacturing' },
  solutionsConfigurators: { nl: 'configurators', en: 'configurators' },
  pricing: { nl: 'tarieven', en: 'pricing' },
  services: { nl: 'diensten', en: 'services' },
  cases: { nl: 'cases', en: 'cases' },
  about: { nl: 'over-ons', en: 'about' },
  contact: { nl: 'contact', en: 'contact' },
  privacy: { nl: 'privacy', en: 'privacy' },
  cookies: { nl: 'cookies', en: 'cookies' },
  terms: { nl: 'voorwaarden', en: 'terms' },
}

const routeSegments: Record<string, SegmentKey[]> = {
  home: ['home'],
  solutions: ['solutions'],
  solutionsLight: ['solutions', 'solutionsLight'],
  solutionsManufacturing: ['solutions', 'solutionsManufacturing'],
  solutionsConfigurators: ['solutions', 'solutionsConfigurators'],
  pricing: ['pricing'],
  services: ['services'],
  cases: ['cases'],
  about: ['about'],
  contact: ['contact'],
  privacy: ['privacy'],
  cookies: ['cookies'],
  terms: ['terms'],
}

function localizeSegments(segments: SegmentKey[], locale: Locale) {
  return segments
    .map((segment) => {
      const map = segmentMap[segment]
      if (!map) return null
      return map[locale]
    })
    .filter(Boolean) as string[]
}

export function buildLocalizedPath(routeKey: keyof typeof routeSegments, locale: Locale) {
  const segments = routeSegments[routeKey]
  if (!segments) return '/'

  const localizedSegments = localizeSegments(segments, locale)
  const pathSuffix = localizedSegments.length ? `/${localizedSegments.join('/')}` : ''

  if (locale === defaultLocale) {
    return pathSuffix || '/'
  }

  return `/en${pathSuffix}`
}

const reverseLookup = Object.entries(segmentMap).reduce<Record<Locale, Record<string, SegmentKey>>>(
  (acc, [segment, locales]) => {
    if (!locales) return acc
    Object.entries(locales).forEach(([locale, value]) => {
      if (!acc[locale as Locale]) {
        acc[locale as Locale] = {}
      }
      acc[locale as Locale][value] = segment as SegmentKey
    })
    return acc
  },
  { nl: {}, en: {} }
)

export function translatePath(pathname: string, fromLocale: Locale, toLocale: Locale) {
  if (fromLocale === toLocale) return pathname

  const trimmed = pathname.replace(/\/+$/, '')
  const segments = trimmed.split('/').filter(Boolean)

  const relevantSegments =
    fromLocale === defaultLocale ? segments : segments.slice(1) // remove locale prefix for non-default

  const translatedSegments = relevantSegments.map((segment) => {
    const key = reverseLookup[fromLocale][segment]
    if (!key) return segment
    const map = segmentMap[key]
    if (!map) return segment
    return map[toLocale]
  })

  const newSuffix = translatedSegments.length ? `/${translatedSegments.join('/')}` : ''

  if (toLocale === defaultLocale) {
    return newSuffix || '/'
  }

  return `/en${newSuffix}`
}

export type RouteKey = keyof typeof routeSegments
