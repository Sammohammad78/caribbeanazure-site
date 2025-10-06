import { site } from '@/content/site';

/**
 * Section explaining the high‑level mechanism behind Caribbean Azure services.
 */
export default function HowItWorks() {
  const { howItWorks } = site.en;
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          {howItWorks.title}
        </h2>
        <p className="text-lg text-gray-600">
          {howItWorks.description}
        </p>
      </div>
    </section>
  );
}