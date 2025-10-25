import { Locale, defaultLocale } from '@/lib/i18n'

const LOCALE_PREFIX: Record<Locale, string> = {
  nl: '',
  en: '/en',
}

type RouteKey =
  | 'home'
  | 'solutions'
  | 'solutionsLight'
  | 'solutionsManufacturing'
  | 'solutionsConfigurators'
  | 'pricing'
  | 'cases'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'roi'
  | 'notFound'
  | 'serverError'

type RouteSegments = Record<RouteKey, Record<Locale, readonly string[]>>

const routeSegments: RouteSegments = {
  home: {
    nl: [],
    en: [],
  },
  solutions: {
    nl: ['oplossingen'],
    en: ['solutions'],
  },
  solutionsLight: {
    nl: ['oplossingen', 'light'],
    en: ['solutions', 'light'],
  },
  solutionsManufacturing: {
    nl: ['oplossingen', 'maakindustrie'],
    en: ['solutions', 'manufacturing'],
  },
  solutionsConfigurators: {
    nl: ['oplossingen', 'configurators'],
    en: ['solutions', 'configurators'],
  },
  pricing: {
    nl: ['tarieven'],
    en: ['pricing'],
  },
  cases: {
    nl: ['cases'],
    en: ['cases'],
  },
  about: {
    nl: ['over-ons'],
    en: ['about'],
  },
  contact: {
    nl: ['contact'],
    en: ['contact'],
  },
  privacy: {
    nl: ['privacy'],
    en: ['privacy'],
  },
  cookies: {
    nl: ['cookies'],
    en: ['cookies'],
  },
  roi: {
    nl: ['roi'],
    en: ['roi'],
  },
  notFound: {
    nl: ['404'],
    en: ['404'],
  },
  serverError: {
    nl: ['500'],
    en: ['500'],
  },
}

export function getLocalizedSegments(routeKey: RouteKey, locale: Locale) {
  return routeSegments[routeKey][locale]
}

export function buildLocalizedPath(routeKey: RouteKey, locale: Locale) {
  const segments = getLocalizedSegments(routeKey, locale)
  const suffix = segments.length ? `/${segments.join('/')}` : '/'
  const prefix = LOCALE_PREFIX[locale]

  if (locale === defaultLocale) {
    return suffix
  }

  return `${prefix}${suffix === '/' ? '' : suffix}`
}

const reverseLookup: Record<Locale, Record<string, RouteKey>> = (() => {
  const map: Record<Locale, Record<string, RouteKey>> = {
    nl: {},
    en: {},
  }

  Object.entries(routeSegments).forEach(([routeKey, locales]) => {
    Object.entries(locales).forEach(([locale, segments]) => {
      const lastSegment = segments[segments.length - 1]
      if (lastSegment) {
        map[locale as Locale][lastSegment] = routeKey as RouteKey
      }
    })
  })

  return map
})()

export function translatePath(pathname: string, fromLocale: Locale, toLocale: Locale) {
  if (fromLocale === toLocale) {
    return pathname
  }

  const trimmed = pathname.replace(/\/+$/, '')
  const parts = trimmed.split('/').filter(Boolean)

  const relevantParts =
    fromLocale === defaultLocale ? parts : parts.slice(1) // strip locale prefix for EN

  const translated = relevantParts.map((part) => {
    const routeKey = reverseLookup[fromLocale][part]
    if (!routeKey) {
      return part
    }
    const segments = getLocalizedSegments(routeKey, toLocale)
    return segments[segments.length - 1] ?? part
  })

  const suffix = translated.length ? `/${translated.join('/')}` : '/'

  if (toLocale === defaultLocale) {
    return suffix
  }

  return `${LOCALE_PREFIX[toLocale]}${suffix === '/' ? '' : suffix}`
}

export function buildAlternateLinks(routeKey: RouteKey, baseUrl: string) {
  const locales: Locale[] = ['nl', 'en']

  return locales.reduce<Record<string, string>>(
    (acc, locale) => {
      const href = new URL(buildLocalizedPath(routeKey, locale), baseUrl).toString()
      acc[locale === 'nl' ? 'nl-NL' : 'en'] = href
      return acc
    },
    {
      'x-default': new URL(buildLocalizedPath(routeKey, defaultLocale), baseUrl).toString(),
    }
  )
}

export type { RouteKey }
