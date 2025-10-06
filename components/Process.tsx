import { site } from '@/content/site';

/**
 * Visualizes the four‑step process for working with Caribbean Azure.
 */
export default function Process() {
  const { process } = site.en;
  return (
    <section id="process" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {process.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-4">
          {process.steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-full bg-azure text-white flex items-center justify-center font-bold mb-3">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}