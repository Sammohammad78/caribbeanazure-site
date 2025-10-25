import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEngine } from "@/components/backgrounds/BackgroundEngine";
import { backgroundThemes } from "@/lib/backgroundThemes";
import type { Locale } from "@/lib/i18n";

interface PrivacySection {
  title: string;
  items: string[];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: meta("privacy.title"),
    description: meta("privacy.description"),
  };
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const privacy = await getTranslations({ locale, namespace: "privacy" });
  const sections = (privacy.raw("sections") as PrivacySection[]) ?? [];

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
              {privacy("title", { fallback: "Privacy" })}
            </h1>
            <p className="text-lg text-[color:var(--fg-subtle)]">{privacy("intro")}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-4xl space-y-6">
            {sections.map((section) => (
              <GlassCard
                key={section.title}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/12 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.12)] backdrop-blur"
              >
                <h2 className="text-xl font-semibold text-[color:var(--fg)]">{section.title}</h2>
                <ul className="space-y-2 text-sm text-[color:var(--fg-subtle)]">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
