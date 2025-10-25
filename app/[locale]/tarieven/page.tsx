import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine"
import { backgroundThemes } from "@/lib/backgroundThemes"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { buildLocalizedPath } from "@/lib/slugMap"
import { getPriceLabel, type PriceKey } from "@/lib/pricing"
import type { Locale } from "@/lib/i18n"

interface TierCard {
  id: string
  title: string
  description: string
  priceKey: string
  inclusions: string[]
  cta: string
}

async function resolveLabel(locale: Locale, value: string) {
  if (!value.includes(".")) {
    return value
  }
  const [namespace, key] = value.split(".", 2)
  const translator = await getTranslations({ locale, namespace })
  return translator(key)
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" })
  return {
    title: meta("pricing.title"),
    description: meta("pricing.description"),
  }
}

export default async function PricingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const pricing = await getTranslations({ locale, namespace: "pricing" })
  const tiers = (pricing.raw("tiers") as TierCard[]) ?? []
  const addOns = pricing.raw("addOns") as {
    light: string[]
    manufacturing: string[]
    retainers: string[]
  }

  const priceMap: Record<string, PriceKey> = {
    micro: "micro",
    light: "tier1",
    manufacturing: "tier2",
    configurators: "tier3",
  }

  const enrichedTiers = await Promise.all(
    tiers.map(async (tier) => ({
      ...tier,
      priceLabel: getPriceLabel(priceMap[tier.id], locale),
      ctaLabel: await resolveLabel(locale, tier.cta),
    }))
  )

  const configTier = enrichedTiers.find((tier) => tier.id === "configurators")
  const primaryTiers = enrichedTiers.filter((tier) => tier.id !== "configurators")

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.pricing} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {pricing("title")}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">
              {pricing("subtitle")}
            </p>
          </div>
        </section>

        <TrustStrip className="pb-12" />

        <section className="section-padding-y">
          <div className="container-custom grid gap-6 lg:grid-cols-2">
            {primaryTiers.map((tier) => {
              const tierLabel = tier.id === "micro" ? "Tier 0" : tier.id === "light" ? "Tier 1" : "Tier 2"
              return (
                <article
                  key={tier.id}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/12 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl"
                >
                  <header className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
                      {tierLabel}
                    </span>
                    <h2 className="text-2xl font-semibold text-[color:var(--fg)]">{tier.title}</h2>
                    <p className="text-sm text-[color:var(--fg-subtle)]">{tier.description}</p>
                    <p className="text-lg font-semibold text-[color:var(--brand)]">{tier.priceLabel}</p>
                  </header>
                  <ul className="mt-6 space-y-3 text-sm text-[color:var(--fg-subtle)]">
                    {tier.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent)_20%,transparent)] text-[color:var(--accent)]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <footer className="mt-8">
                    <Button asChild size="lg" className="w-full">
                      <Link href={buildLocalizedPath("contact", locale)}>
                        {tier.ctaLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </footer>
                </article>
              )
            })}
          </div>
        </section>

        {configTier && (
          <section className="section-padding-y">
            <div className="container-custom mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.15)] backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-[color:var(--fg)] md:text-3xl">{configTier.title}</h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">{configTier.description}</p>
              <p className="mt-6 text-lg font-semibold text-[color:var(--accent)]">{configTier.priceLabel}</p>
              <Button asChild size="lg" className="mt-8">
                <Link href={buildLocalizedPath("contact", locale)}>
                  {configTier.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--panel)_30%,transparent)]">
          <div className="container-custom grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">{pricing("addOnsTitle", { fallback: "Add-ons" })}</h3>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Light</h4>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {addOns?.light?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">Manufacturing</h4>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {addOns?.manufacturing?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">{pricing("retainersTitle", { fallback: "Retainers" })}</h3>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-6 text-sm text-[color:var(--fg-subtle)]">
                <ul className="space-y-2">
                  {addOns?.retainers?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-[color:var(--fg-muted)]">{pricing("retainersNote", { fallback: "Beschikbaar na oplevering." })}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom text-center text-sm text-[color:var(--fg-muted)]">
            {pricing("finePrint")}
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-[color:var(--fg)] md:text-4xl">{pricing("roiTitle", { fallback: "Bereken jouw ROI" })}</h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">{pricing("roiSubtitle", { fallback: "Kies een preset passend bij je traject." })}</p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <ROICalculator preset="light" variant="card" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
