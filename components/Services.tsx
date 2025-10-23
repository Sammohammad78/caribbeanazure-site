import { site } from '@/content/site';

/**
 * Renders the services offered by Caribbean Azure as cards.
 */
export default function Services() {
  const { services } = site.en;
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {services.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.items.map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}