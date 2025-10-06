import { site } from '@/content/site';

/**
 * Pricing section showing three tiers with features and call‑to‑action.
 */
export default function Pricing() {
  const { pricing, whatsappNumber } = site.en;
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {pricing.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className="p-6 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col"
            >
              <h3 className="text-2xl font-semibold mb-1 text-gray-900">
                {tier.name}
              </h3>
              <p className="text-4xl font-bold text-azure mb-2">
                {tier.price}
              </p>
              <p className="text-gray-600 mb-4">
                {tier.description}
              </p>
              <ul className="flex-1 space-y-2 mb-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="mr-2 text-azure" aria-hidden="true">✔️</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hello Caribbean Azure team! I am interested in the ${tier.name} plan.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-center bg-azure text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-azure-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
              >
                Enquire
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}