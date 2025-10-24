'use client'

import { usePathname } from 'next/navigation'

interface HreflangProps {
  defaultLocale?: string
  locales?: string[]
  baseUrl?: string
}

/**
 * Hreflang component for multi-language SEO
 * Generates alternate language links for NL-first routing
 *
 * @example
 * // In layout or page:
 * <Hreflang />
 *
 * // Generates:
 * // <link rel="alternate" hreflang="nl" href="https://domain.com/page" />
 * // <link rel="alternate" hreflang="en" href="https://domain.com/en/page" />
 * // <link rel="alternate" hreflang="x-default" href="https://domain.com/page" />
 */
export function Hreflang({
  defaultLocale = 'nl',
  locales = ['nl', 'en'],
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://caribbeanazure.com'
}: HreflangProps) {
  const pathname = usePathname()

  // Remove locale prefix from pathname if present
  const getCleanPath = (path: string) => {
    // Remove leading /en if present (NL is at root)
    const cleaned = path.replace(/^\/en(\/|$)/, '/')
    return cleaned === '' ? '/' : cleaned
  }

  const cleanPath = getCleanPath(pathname)

  // Generate alternate URLs for each locale
  const alternates = locales.map((locale) => {
    const href = locale === defaultLocale
      ? `${baseUrl}${cleanPath}`
      : `${baseUrl}/${locale}${cleanPath}`

    return {
      locale,
      href: href.replace(/\/$/, '') || baseUrl // Remove trailing slash except for root
    }
  })

  // x-default should point to the default locale (NL)
  const xDefaultHref = `${baseUrl}${cleanPath}`.replace(/\/$/, '') || baseUrl

  return (
    <>
      {alternates.map(({ locale, href }) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />
    </>
  )
}
