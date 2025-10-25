import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine";
import { backgroundThemes } from "@/lib/backgroundThemes";
import type { Locale } from "@/lib/i18n";

interface CookieCategory {
  title: string;
  description: string;
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: meta("cookies.title"),
    description: meta("cookies.description"),
  };
}

export default async function CookiesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cookies = await getTranslations({ locale, namespace: "cookies" });
  const categories = (cookies.raw("categories") as CookieCategory[]) ?? [];

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10">
        <BackgroundEngine theme={backgroundThemes.legal} />
      </div>

      <Header />

      <main id="main-content">
        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {cookies("title", { fallback: "Cookies" })}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">{cookies("intro")}</p>
            <p className="text-sm text-[color:var(--fg-muted)]">{cookies("preferences")}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6">
            {categories.map((category) => (
              <GlassCard
                key={category.title}
                className="space-y-3 rounded-3xl border border-white/10 bg-white/12 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.12)] backdrop-blur"
              >
                <h2 className="text-lg font-semibold text-[color:var(--fg)]">{category.title}</h2>
                <p className="text-sm text-[color:var(--fg-subtle)]">{category.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
