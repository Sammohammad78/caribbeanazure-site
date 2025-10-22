import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Dutch-only configuration (English removed per redesign requirements)
export const locales = ['nl'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'nl'

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
