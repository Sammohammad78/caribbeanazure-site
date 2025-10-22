'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function CTASection() {
  const t = useTranslations('cta')
  const locale = useLocale()

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 md:px-16 md:py-24 shadow-strong">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
              {t('title')}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href={`/${locale}/contact`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
