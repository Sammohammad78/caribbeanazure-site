import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bot, Workflow, MessageSquare, BarChart3, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function ServicesGrid() {
  const t = useTranslations('services')
  const locale = useLocale()

  const services = [
    {
      icon: Workflow,
      title: t('automation.title'),
      description: t('automation.description'),
      href: `/${locale}/diensten/automatisering`,
    },
    {
      icon: Bot,
      title: t('integrations.title'),
      description: t('integrations.description'),
      href: `/${locale}/diensten/integraties`,
    },
    {
      icon: MessageSquare,
      title: t('chatbots.title'),
      description: t('chatbots.description'),
      href: `/${locale}/diensten/ai-chatbots`,
    },
    {
      icon: BarChart3,
      title: t('dashboards.title'),
      description: t('dashboards.description'),
      href: `/${locale}/diensten/dashboards`,
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

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={index}
                href={service.href}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-strong hover:-translate-y-1">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {service.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
