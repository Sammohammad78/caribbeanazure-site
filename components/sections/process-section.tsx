import { useTranslations } from 'next-intl'
import { Search, Wrench, Rocket } from 'lucide-react'

export function ProcessSection() {
  const t = useTranslations('process')

  const steps = [
    {
      icon: Search,
      number: '01',
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      icon: Wrench,
      number: '02',
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      icon: Rocket,
      number: '03',
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/30">
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

        {/* Process steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connection line (hidden on mobile) */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border -z-10" />

            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon circle */}
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background border-4 border-primary shadow-soft">
                      <Icon className="h-12 w-12 text-primary" />
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-medium">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
