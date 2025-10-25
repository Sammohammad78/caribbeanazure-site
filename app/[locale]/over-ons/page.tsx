import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine";
import { backgroundThemes } from "@/lib/backgroundThemes";
import { resolveMaybeKey } from "@/lib/i18n-helpers";
import { buildLocalizedPath } from "@/lib/slugMap";
import type { Locale } from "@/lib/i18n";

interface PillarItem {
  title: string;
  body: string;
}

interface TimelineItem {
  label: string;
  detail: string;
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: meta("about.title"),
    description: meta("about.description"),
  };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const about = await getTranslations({ locale, namespace: "about" });

  const pillars = (about.raw("pillars") as PillarItem[]) ?? [];
  const timeline = (about.raw("timeline") as TimelineItem[]) ?? [];
  const ctaLabel = await resolveMaybeKey(locale, about("cta"));

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.about} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {about("title")}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">{about("subtitle")}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <GlassCard
                key={pillar.title}
                className="h-full space-y-3"
              >
                <div className="flex items-center gap-2 text-[color:var(--accent)]">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                    {pillar.title}
                  </p>
                </div>
                <p className="text-sm text-[color:var(--fg-subtle)]">{pillar.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_92%,transparent)]">
          <div className="container-custom mx-auto max-w-4xl space-y-6">
            <h2 className="text-2xl font-semibold text-[color:var(--fg)] md:text-3xl">
              {about("timelineTitle", { fallback: about("title") })}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {timeline.map((item) => (
                <GlassCard
                  key={item.label}
                  className="space-y-2 text-left"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
                    {item.label}
                  </p>
                  <p className="text-sm text-[color:var(--fg-subtle)]">{item.detail}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom text-center">
            <Button asChild size="lg">
              <Link href={buildLocalizedPath("contact", locale)}>
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
