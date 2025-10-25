import { getTranslations } from "next-intl/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/sections/contact-form"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine"
import { backgroundThemes } from "@/lib/backgroundThemes"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" })
  return {
    title: meta("contact.title"),
    description: meta("contact.description"),
  }
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const contact = await getTranslations({ locale, namespace: "contact" })

  const channels = [
    {
      icon: MessageCircle,
      label: contact("channel.whatsapp.label", { fallback: "WhatsApp" }),
      description: contact("channel.whatsapp.description", {
        fallback: "Snel antwoord binnen kantooruren.",
      }),
      href: siteConfig.links.whatsapp,
      external: true,
    },
    {
      icon: Mail,
      label: contact("channel.email.label", { fallback: "E-mail" }),
      description: contact("channel.email.description", {
        fallback: "We reageren binnen één werkdag.",
      }),
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Phone,
      label: contact("channel.phone.label", { fallback: "Telefoon" }),
      description: contact("channel.phone.description", {
        fallback: "Bereikbaar op werkdagen 09:00-17:00.",
      }),
      href: `tel:${siteConfig.contact.phone}`,
    },
  ]

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.contact} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
              {contact("badge", { fallback: "Contact" })}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {contact("title")}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">{contact("subtitle")}</p>
            <p className="text-sm text-[color:var(--fg-muted)]">{contact("privacyNote")}</p>
          </div>
        </section>

        <section className="section-padding-y pt-0">
          <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
            <div className="space-y-6">
              {channels.map((channel) => {
                const Icon = channel.icon
                return (
                  <Card
                    key={channel.label}
                    className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--accent)_20%,transparent)] text-[color:var(--accent)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className="text-base font-semibold text-[color:var(--fg)] hover:text-[color:var(--accent)]"
                      >
                        {channel.label}
                      </a>
                      <p className="text-sm text-[color:var(--fg-subtle)]">{channel.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)]">
                {contact("formTitle", { fallback: contact("title") })}
              </h2>
              <p className="text-sm text-[color:var(--fg-subtle)]">
                {contact("formSubtitle", { fallback: contact("subtitle") })}
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
