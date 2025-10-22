import type { ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/sections/contact-form'
import { MessageCircle, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'

type ContactChannel = {
  title: string
  tagline: string
  body: string
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const channels = t.raw('channels') as Record<string, ContactChannel>

  return (
    <>
      <Header />
      <main>
        <section className="hero-glow section-padding-y">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-body">{t('title')}</h2>

              <ContactChannelCard
                icon={<MessageCircle className="h-5 w-5" />}
                accent="brand"
                title={channels.whatsapp.title}
                tagline={channels.whatsapp.tagline}
                body={channels.whatsapp.body}
              >
                <Button asChild className="w-full">
                  <a
                    href="https://wa.me/31612345678?text=Hoi%20Caribbean%20Azure%2C%20ik%20wil%20graag%20meer%20informatie."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('channels.whatsapp.title')}
                  </a>
                </Button>
              </ContactChannelCard>

              <ContactChannelCard
                icon={<Mail className="h-5 w-5" />}
                accent="accent"
                title={channels.email.title}
                tagline={channels.email.tagline}
                body={channels.email.body}
              >
                <p className="text-sm font-semibold text-body">info@caribbeanazure.nl</p>
              </ContactChannelCard>

              <ContactChannelCard
                icon={<Calendar className="h-5 w-5" />}
                accent="brand"
                title={channels.call.title}
                tagline={channels.call.tagline}
                body={channels.call.body}
              >
                <Button asChild variant="outline" className="w-full">
                  <a href="https://cal.com/caribbeanazure" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    {channels.call.title}
                  </a>
                </Button>
              </ContactChannelCard>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-body">{t('formIntro')}</h2>
              <div className="mt-6 rounded-3xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-6 shadow-[0_18px_60px_rgb(15_23_42/12%)]">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ContactChannelCard({
  icon,
  title,
  tagline,
  body,
  accent,
  children,
}: {
  icon: React.ReactNode
  title: string
  tagline: string
  body: string
  accent: 'brand' | 'accent'
  children: ReactNode
}) {
  const background =
    accent === 'brand'
      ? 'bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)]'
      : 'bg-[color:color-mix(in_oklab,var(--accent-soft)_68%,transparent)] text-[color:var(--accent)]'

  return (
    <Card className="card card-gradient-stripe rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${background}`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-body">{title}</CardTitle>
            <CardDescription className="text-sm text-[color:var(--fg-subtle)]">{tagline}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-[color:var(--fg-subtle)]">
        <p>{body}</p>
        {children}
      </CardContent>
    </Card>
  )
}
