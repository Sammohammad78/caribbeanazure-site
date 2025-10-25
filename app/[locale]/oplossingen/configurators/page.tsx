import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine"
import { backgroundThemes } from "@/lib/backgroundThemes"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { buildLocalizedPath } from "@/lib/slugMap"
import { getPriceLabel } from "@/lib/pricing"
import { resolveMaybeKey } from "@/lib/i18n-helpers"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" })
  return {
    title: meta("solutionsConfigurators.title"),
    description: meta("solutionsConfigurators.description"),
  }
}

interface ServiceItem {
  label: string
  benefits: string[]
}

export default async function ConfiguratorsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const configurators = await getTranslations({ locale, namespace: "solutions.configurators" })
  const services = (configurators.raw("services") as ServiceItem[]) ?? []
  const ctaLabel = await resolveMaybeKey(locale, configurators("cta"))

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.services} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <span className="inline-flex items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent)_20%,transparent)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
                Tier 3
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                {configurators("title")}
              </h1>
              <p className="text-lg text-[color:var(--fg-subtle)]">
                {configurators("subtitle")}
              </p>
              <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] bg-white/10 px-8 py-6 text-[color:var(--accent)] shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <span className="text-3xl font-semibold">{getPriceLabel("tier3", locale)}</span>
                <Button asChild size="lg" className="mt-4">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip variant="compact" className="pb-12" />

        <section className="section-padding-y">
          <div className="container-custom grid gap-10 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.label}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/12 p-8 shadow-[0_20px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              >
                <h2 className="text-xl font-semibold text-[color:var(--fg)]">{service.label}</h2>
                <ul className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-[color:var(--fg)] md:text-4xl">{configurators("roiTitle", { fallback: "Bereken jouw ROI" })}</h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">{configurators("roiSubtitle", { fallback: "Vergelijk scenario's voor CPQ en C2P." })}</p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <ROICalculator preset="configurators" variant="card" />
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-semibold text-[color:var(--fg)] md:text-4xl">{configurators("ctaTitle", { fallback: configurators("title") })}</h2>
              <p className="text-base text-[color:var(--fg-subtle)]">{configurators("ctaSubtitle", { fallback: configurators("subtitle") })}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={buildLocalizedPath("solutionsManufacturing", locale)}>
                    {configurators("seeManufacturing", { fallback: "Bekijk maakindustrie" })}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

