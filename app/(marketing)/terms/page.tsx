import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p>
        By accessing and using this website, you accept and agree to be bound by
        these terms. If you do not agree, you must not use this site.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Use of Website</h2>
      <p>
        You may use this website for informational purposes only. You must not
        misuse the site or attempt to access it using a method other than the
        interface provided.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Intellectual Property</h2>
      <p>
        All content on this site, including text, graphics, and code, is owned
        by Caribbean Azure or its licensors. You may not reproduce, duplicate,
        copy, sell or exploit any portion of the site without express written
        permission.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Limitation of Liability</h2>
      <p>
        The information on this site is provided “as is.” We do not warrant its
        completeness or accuracy. To the fullest extent permitted by law,
        Caribbean Azure shall not be liable for any damages arising from your
        use of this site.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Changes to Terms</h2>
      <p>
        We may update these terms periodically. It is your responsibility to
        check this page for changes. Continued use of the site following the
        posting of changes constitutes acceptance of those changes.
      </p>
    </div>
  );
}