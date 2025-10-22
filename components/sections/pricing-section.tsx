'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function PricingSection() {
  const t = useTranslations('pricing')
  const locale = useLocale()

  const whatsappNumber = '31612345678'
  const whatsappMessage = encodeURIComponent(
    locale === 'nl'
      ? 'Hoi Caribbean Azure, ik wil graag meer weten over jullie pakketten.'
      : 'Hi Caribbean Azure, I\'d like to learn more about your packages.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const tiers = [
    {
      name: t('starter.name'),
      price: t('starter.price'),
      description: t('starter.description'),
      features: t.raw('starter.features') as string[],
      popular: false,
    },
    {
      name: t('pro.name'),
      price: t('pro.price'),
      description: t('pro.description'),
      features: t.raw('pro.features') as string[],
      popular: true,
    },
    {
      name: t('scale.name'),
      price: t('scale.price'),
      description: t('scale.description'),
      features: t.raw('scale.features') as string[],
      popular: false,
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={cn(
                'relative flex flex-col',
                tier.popular && 'border-primary shadow-strong scale-105'
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground shadow-medium">
                    Populair
                  </span>
                </div>
              )}

              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                </div>
                <CardDescription className="mt-2 leading-relaxed">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('cta')}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
