import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params

  // Validate locale
  if (!locales.includes(locale as any)) {
    return {
      title: 'Page Not Found',
    }
  }

  // Base URL for the site
  const baseUrl = 'https://www.caribbeanazure.com'

  // Get current path (would be set dynamically in actual pages)
  // For layout, we set root alternates
  const alternateLanguages: Record<string, string> = {
    'x-default': baseUrl,
  }

  locales.forEach((loc) => {
    if (loc === 'nl') {
      alternateLanguages[loc] = baseUrl
    } else {
      alternateLanguages[loc] = `${baseUrl}/${loc}`
    }
  })

  return {
    alternates: {
      canonical: locale === 'nl' ? baseUrl : `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  unstable_setRequestLocale(locale as any)

  // Get messages for the locale
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
