import { getTranslations } from "next-intl/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CasesGrid, type CaseItem } from "@/components/sections/cases-grid"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine"
import { backgroundThemes } from "@/lib/backgroundThemes"
import { resolveMaybeKey } from "@/lib/i18n-helpers"
import { buildLocalizedPath } from "@/lib/slugMap"
import type { Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" })
  return {
    title: meta("cases.title"),
    description: meta("cases.description"),
  }
}

export default async function CasesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const cases = await getTranslations({ locale, namespace: "cases" })

  const items = (cases.raw("items") as CaseItem[]) ?? []
  const contactHref = buildLocalizedPath("contact", locale)
  const roiHref = buildLocalizedPath("roi", locale)
  const contactLabel = await resolveMaybeKey(locale, cases("cta"))
  const roiLabel = await resolveMaybeKey(locale, "cta.roi")

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.cases} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {cases("title")}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">{cases("subtitle")}</p>
          </div>
        </section>

        <section className="section-padding-y pt-0">
          <div className="container-custom space-y-12">
            <CasesGrid
              items={items}
              videoLabel={cases("videoLabel", { fallback: "90s video" })}
              contactHref={contactHref}
              contactLabel={contactLabel}
              roiHref={roiHref}
              roiLabel={roiLabel}
            />
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_90%,transparent)]">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-semibold text-[color:var(--fg)] md:text-4xl">
              {cases("ctaHeadline", { fallback: cases("title") })}
            </h2>
            <p className="text-base text-[color:var(--fg-subtle)]">
              {cases("ctaSubtitle", { fallback: cases("subtitle") })}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href={contactHref}>
                  {contactLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={roiHref}>
                  {roiLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
