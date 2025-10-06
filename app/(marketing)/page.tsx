import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import { organizationStructuredData, websiteStructuredData } from '@/lib/seo';
import { site } from '@/content/site';

export default function Page() {
  // Generate structured data for SEO
  const org = organizationStructuredData();
  const website = websiteStructuredData();
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{site.en.contact.title}</h2>
          <p className="text-gray-600 mb-8">{site.en.contact.description}</p>
          <ContactForm />
        </div>
      </section>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([org, website]) }}
      />
    </>
  );
}