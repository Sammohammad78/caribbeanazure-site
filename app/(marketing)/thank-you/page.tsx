import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your message has been received. We'll get back to you shortly.
      </p>
      <Link
        href="/"
        className="bg-azure text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-azure-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
      >
        Return to home
      </Link>
    </div>
  );
}