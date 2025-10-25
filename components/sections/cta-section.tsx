'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'

export function CTASection() {
  const t = useTranslations('home.cta')
  const globalT = useTranslations()
  const locale = useLocale()

  const buttonValue = t('button')
  const buttonLabel = buttonValue.includes('.') ? globalT(buttonValue as any) : buttonValue

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <GlassCard
          size="lg"
          gradient
          elevated
          className="relative text-center"
        >
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--fg)]">
              {t('title')}
            </h2>
            <p className="text-xl text-[color:var(--fg-subtle)]">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="xl" variant="default">
                <Link href={`/${locale}/contact`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  {buttonLabel}
                </Link>
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
