import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['nl', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'nl'

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
