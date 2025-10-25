import { getMessages, setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { SkipToContent } from '@/components/layout/skip-to-content'
import { ThemeProvider } from '@/components/providers/theme-provider'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
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

  if (!locales.includes(normalizedLocale)) {
    notFound()
  }

  setRequestLocale(normalizedLocale)

  const messages = await getMessages({ locale: normalizedLocale })

  return (
    <NextIntlClientProvider messages={messages} locale={normalizedLocale}>
      <SkipToContent />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
