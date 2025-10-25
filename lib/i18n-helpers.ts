import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/lib/i18n'

/**
 * Resolve a string that might reference another translation key.
 * Keys use dot-notation (e.g. "cta.intake").
 */
export async function resolveMaybeKey(locale: Locale, value: string) {
  if (!value.includes('.')) {
    return value
  }

  const [namespace, key] = value.split('.', 2)
  const translator = await getTranslations({ locale, namespace })
  return translator(key)
}
