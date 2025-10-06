import Link from 'next/link';
import { site } from '@/content/site';

/**
 * Hero section with tagline, one‑liner and call‑to‑action buttons.
 */
export default function Hero() {
  const { hero, whatsappNumber } = site.en;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    hero.ctaPrimary.whatsappMessage,
  )}`;
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-azure text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-azure-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
          >
            {hero.ctaPrimary.label}
          </a>
          <Link
            href={hero.ctaSecondary.href}
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
          >
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}