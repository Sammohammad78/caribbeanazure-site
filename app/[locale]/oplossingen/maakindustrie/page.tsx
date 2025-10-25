import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
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
    title: meta("solutionsManufacturing.title"),
    description: meta("solutionsManufacturing.description"),
  }
}

export default async function ManufacturingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const manufacturing = await getTranslations({ locale, namespace: "solutions.manufacturing" })
  const modules = (manufacturing.raw("modules") as string[]) ?? []
  const deliverables = (manufacturing.raw("deliverables") as string[]) ?? []
  const ctaLabel = await resolveMaybeKey(locale, manufacturing("cta"))

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
              <span className="inline-flex items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand)_18%,transparent)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--brand)]">
                Tier 2
              </span>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                {manufacturing("title")}
              </h1>
              <p className="text-lg text-[color:var(--fg-subtle)]">
                {manufacturing("subtitle")}
              </p>
              <div className="inline-flex flex-col items-center gap-2 rounded-2xl border border-[color:color-mix(in_oklab,var(--brand)_30%,transparent)] bg-white/10 px-8 py-6 text-[color:var(--brand)] shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <span className="text-3xl font-semibold">{getPriceLabel("tier2", locale)}</span>
                <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href={buildLocalizedPath("contact", locale)}>
                      {ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href={buildLocalizedPath("pricing", locale)}>
                      {manufacturing("seePricing", { fallback: "Bekijk tarieven" })}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip variant="compact" className="pb-12" />

        <section className="section-padding-y">
          <div className="container-custom grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)]">{manufacturing("modulesTitle", { fallback: "Modules" })}</h2>
              <ul className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
                {modules.map((module) => (
                  <li key={module} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand)_20%,transparent)] text-[color:var(--brand)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">
                {manufacturing("deliverablesTitle", { fallback: "Deliverables" })}
              </h3>
              <ul className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-[color:var(--fg)] md:text-4xl">{manufacturing("roiTitle", { fallback: "Bereken jouw ROI" })}</h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">{manufacturing("roiSubtitle", { fallback: "Zie het effect op sales tot productie." })}</p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <ROICalculator preset="manufacturing" variant="card" />
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-semibold text-[color:var(--fg)] md:text-4xl">{manufacturing("ctaTitle", { fallback: manufacturing("title") })}</h2>
              <p className="text-base text-[color:var(--fg-subtle)]">{manufacturing("ctaSubtitle", { fallback: manufacturing("subtitle") })}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={buildLocalizedPath("solutionsConfigurators", locale)}>
                    {manufacturing("seeConfigurators", { fallback: "Bekijk configurators" })}
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

