import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrustStrip } from "@/components/sections/trust-strip"
import { TierLadder } from "@/components/sections/tier-ladder"
import { ProofStrip } from "@/components/sections/proof-strip"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/GlassCard"
import { ArrowRight } from "lucide-react"
import { buildLocalizedPath } from "@/lib/slugMap"
import type { Locale } from "@/lib/i18n"

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
    title: meta("solutions.title"),
    description: meta("solutions.description"),
  }
}

export default async function SolutionsOverviewPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const overview = await getTranslations({ locale, namespace: "solutions.overview" })
  const buttonLabel = await resolveLabel(locale, overview("cta", { fallback: "cta.intake" }))

  return (
    <div className="relative">
      <Header />
      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {overview("title")}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">
              {overview("description")}
            </p>
            <Button asChild size="lg" className="inline-flex items-center">
              <Link href={buildLocalizedPath("contact", locale)}>
                {buttonLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <TrustStrip className="pb-12" />

        <TierLadder />

        <ProofStrip />

        <section className="section-padding-y">
          <div className="container-custom">
            <GlassCard size="lg" className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
                {overview("microLabel")}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[color:var(--fg)] md:text-4xl">
                {overview("microTitle", { fallback: "Micro-automatie" })}
              </h2>
              <p className="mt-4 text-base text-[color:var(--fg-subtle)]">
                {overview("microDescription", { fallback: "Start met een beperkte flow en schaaf verder." })}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={buildLocalizedPath("solutionsLight", locale)}>
                    {overview("microCta", { fallback: "Bekijk Light" })}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={buildLocalizedPath("contact", locale)}>
                    {buttonLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
