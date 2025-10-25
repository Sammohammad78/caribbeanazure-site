import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Zap, Factory, Settings } from "lucide-react"
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine"
import { backgroundThemes } from "@/lib/backgroundThemes"
import { ROICalculator } from "@/components/sections/roi-calculator"
import { buildLocalizedPath } from "@/lib/slugMap"
import { getPriceLabel, type PriceKey } from "@/lib/pricing"
import type { Locale } from "@/lib/i18n"
import { PricingCard } from "@/components/ui/GlassCard"
import { TextBox } from "@/components/ui/TextBox"

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

  // Icon and gradient mapping for tiers
  const tierConfig: Record<string, { icon: any; gradient: string; tier: string }> = {
    micro: {
      icon: <Zap className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      tier: 'Tier 0'
    },
    light: {
      icon: <Zap className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      tier: 'Tier 1'
    },
    manufacturing: {
      icon: <Factory className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #4BA3F7 0%, #0F5E9C 100%)',
      tier: 'Tier 2'
    },
    configurators: {
      icon: <Settings className="h-6 w-6" />,
      gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
      tier: 'Tier 3'
    }
  }

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
          <div className="container-custom grid gap-6 md:gap-8 lg:grid-cols-2">
            {primaryTiers.map((tier) => {
              const config = tierConfig[tier.id]
              return (
                <PricingCard
                  key={tier.id}
                  tier={config?.tier || ''}
                  tierBadge={config?.icon}
                  title={tier.title}
                  subtitle={tier.description}
                  price={tier.priceLabel}
                  features={tier.inclusions}
                  iconBg={config?.gradient}
                  popular={tier.id === 'manufacturing'}
                  cta={
                    <Button asChild size="lg" className="w-full">
                      <Link href={buildLocalizedPath("contact", locale)}>
                        {tier.ctaLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  }
                />
              )
            })}
          </div>
        </section>

        {configTier && (
          <section className="section-padding-y">
            <div className="container-custom mx-auto max-w-4xl">
              <PricingCard
                tier={tierConfig.configurators.tier}
                tierBadge={tierConfig.configurators.icon}
                title={configTier.title}
                subtitle={configTier.description}
                price={configTier.priceLabel}
                features={configTier.inclusions}
                iconBg={tierConfig.configurators.gradient}
                cta={
                  <Button asChild size="lg" className="w-full">
                    <Link href={buildLocalizedPath("contact", locale)}>
                      {configTier.ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                }
                className="mx-auto"
              />
            </div>
          </section>
        )}

        <section className="section-padding-y">
          <div className="container-custom grid gap-6 md:gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">{pricing("addOnsTitle", { fallback: "Add-ons" })}</h3>
              <TextBox
                title="Light"
                variant="accent"
                size="sm"
              >
                <ul className="space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {addOns?.light?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TextBox>
              <TextBox
                title="Manufacturing"
                variant="info"
                size="sm"
              >
                <ul className="space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {addOns?.manufacturing?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--brand)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TextBox>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[color:var(--fg)]">{pricing("retainersTitle", { fallback: "Retainers" })}</h3>
              <TextBox
                title="Maandelijkse retainers"
                subtitle={pricing("retainersNote", { fallback: "Beschikbaar na oplevering." })}
                variant="neutral"
                size="sm"
              >
                <ul className="space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {addOns?.retainers?.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--fg-muted)] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TextBox>
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
