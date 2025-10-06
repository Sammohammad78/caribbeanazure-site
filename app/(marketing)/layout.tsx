import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      {/* Plausible Analytics (loads lazily). Uses NEXT_PUBLIC_PLAUSIBLE_DOMAIN env var if set. */}
      <Script
        defer
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'caribbeanazure.com'}
        src="https://plausible.io/js/script.js"
        strategy="lazyOnload"
      />
    </>
  );
}