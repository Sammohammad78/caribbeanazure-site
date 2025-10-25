import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/GlassCard"
import { GlassBadge } from "@/components/ui/GlassBadge"
import { TextBox } from "@/components/ui/TextBox"
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
    title: meta("solutionsLight.title"),
    description: meta("solutionsLight.description"),
  }
}

export default async function LightAutomationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const light = await getTranslations({ locale, namespace: "solutions.light" })
  const micro = await getTranslations({ locale, namespace: "solutions.micro" })

  const benefits = (light.raw("benefits") as string[]) ?? []
  const deliverables = (light.raw("deliverables") as string[]) ?? []
  const ctaLabel = await resolveMaybeKey(locale, light("cta"))

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
              <GlassBadge variant="accent" size="md">
                Tier 1
              </GlassBadge>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                {light("title")}
              </h1>
              <p className="text-lg text-[color:var(--fg-subtle)]">
                {light("subtitle")}
              </p>
              <GlassCard className="inline-flex flex-col items-center gap-2">
                <span className="text-3xl font-semibold text-[color:var(--brand)]">{getPriceLabel("tier1", locale)}</span>
                <Button asChild size="lg" className="mt-4">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </GlassCard>
            </div>
          </div>
        </section>

        <TrustStrip variant="compact" className="pb-12" />

        <section className="section-padding-y">
          <div className="container-custom grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)]">{light("subtitle")}</h2>
              <ul className="space-y-3 text-sm text-[color:var(--fg-subtle)]">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent)_20%,transparent)] text-[color:var(--accent)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <GlassCard>
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">
                {light("deliverablesLabel", { fallback: "Deliverables" })}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--fg-subtle)]">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <GlassCard size="lg" gradient>
              <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div>
                  <h3 className="text-xl font-semibold text-[color:var(--fg)]">{micro("title")}</h3>
                  <p className="mt-2 text-sm text-[color:var(--fg-subtle)]">{micro("subtitle")}</p>
                </div>
                <div className="space-y-2 text-right md:text-left">
                  <p className="text-lg font-semibold text-[color:var(--brand)]">{getPriceLabel("micro", locale)}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">{micro("note")}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 text-sm text-[color:var(--fg-subtle)] md:flex-row md:items-center md:justify-end">
                <Link
                  href={buildLocalizedPath("contact", locale)}
                  className="inline-flex items-center gap-2 text-[color:var(--accent)] underline-offset-4 hover:underline"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-[color:var(--fg)] md:text-4xl">{light("roiTitle", { fallback: "Bereken jouw ROI" })}</h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">{light("roiSubtitle", { fallback: "Zie direct de besparing met Light." })}</p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <ROICalculator preset="light" variant="card" />
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-semibold text-[color:var(--fg)] md:text-4xl">{light("ctaTitle", { fallback: light("title") })}</h2>
              <p className="text-base text-[color:var(--fg-subtle)]">{light("ctaSubtitle", { fallback: light("subtitle") })}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={buildLocalizedPath("pricing", locale)}>
                    {light("seePricing", { fallback: "Bekijk tarieven" })}
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

