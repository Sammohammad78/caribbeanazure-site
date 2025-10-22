'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  // WhatsApp deep link with prefilled message
  const whatsappNumber = '31612345678' // TODO: Replace with actual number
  const whatsappMessage = encodeURIComponent(
    locale === 'nl'
      ? 'Hoi Caribbean Azure, ik ben geïnteresseerd in jullie automatiseringsoplossingen.'
      : 'Hi Caribbean Azure, I\'m interested in your automation solutions.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="mr-2">🚀</span>
            <span>{t('trustedBy')} 50+ Nederlandse bedrijven</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('cta.primary')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/contact`}>
                {t('cta.secondary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust badges - Client logos would go here */}
          <div className="pt-12">
            <p className="text-sm text-muted-foreground mb-6">{t('trustedBy')}</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {/* Placeholder for client logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 rounded bg-muted animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blur elements */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
    </section>
  )
}
