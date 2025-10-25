import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const normalizedLocale = locale as Locale

  // Validate locale
  if (!locales.includes(normalizedLocale)) {
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
      canonical: normalizedLocale === 'nl' ? baseUrl : `${baseUrl}/${normalizedLocale}`,
      languages: alternateLanguages,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const normalizedLocale = locale as Locale

  // Validate locale
  if (!locales.includes(normalizedLocale)) {
    notFound()
  }

  setRequestLocale(normalizedLocale)

  // Get messages for the locale
  const messages = await getMessages({ locale: normalizedLocale })

  return (
    <NextIntlClientProvider messages={messages} locale={normalizedLocale}>
      {children}
    </NextIntlClientProvider>
  )
}
