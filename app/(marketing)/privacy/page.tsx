import type { Metadata } from 'next';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Caribbean Azure respects your privacy and is committed to protecting it. This
        policy explains what data we collect, how we use it, and your rights.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
      <p>
        When you fill out our contact form, we collect your name, email address,
        company, budget range and the message you provide. We use this
        information solely to respond to your inquiry and provide our services.
      </p>
      <p>
        We use Plausible Analytics to measure website usage. Plausible does not
        use cookies, does not generate any persistent identifiers, and only
        collects aggregated data【816421071388910†L83-L87】. No personal data or personally
        identifiable information (PII) is collected, stored or shared【816421071388910†L83-L87】.
      </p>
      <h2 className="text-2xl font-semibold mt-6">How We Use Data</h2>
      <p>
        Your contact details are used to communicate with you about our
        services. We may retain this information for administrative purposes but
        will never sell or share it with third parties without your consent.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
      <p>
        Under the GDPR, you have the right to access, rectify, or request
        deletion of your personal data. To exercise these rights, please contact
        us at the email address provided on this site.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Changes</h2>
      <p>
        We may update this privacy policy from time to time. The latest
        version will always be available on this page.
      </p>
    </div>
  );
}