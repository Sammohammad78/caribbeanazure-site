import './globals.css'
import { headers } from 'next/headers'
import { defaultLocale, type Locale } from '@/lib/i18n'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const requestLocale = requestHeaders.get('x-next-intl-locale') as Locale | null
  const locale = requestLocale ?? defaultLocale

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-surface text-body antialiased">
        {children}
      </body>
    </html>
  )
}
