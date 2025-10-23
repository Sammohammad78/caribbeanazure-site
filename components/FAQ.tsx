import { site } from '@/content/site';

/**
 * Frequently Asked Questions rendered using native <details> elements for accessibility.
 */
export default function FAQ() {
  const { faq } = site.en;
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {faq.title}
        </h2>
        <div className="space-y-4">
          {faq.items.map((item, idx) => (
            <details key={idx} className="group border border-gray-200 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-lg flex items-center justify-between text-gray-900">
                {item.question}
                <span
                  className="ml-2 transform transition-transform group-open:rotate-180 text-azure"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </summary>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}