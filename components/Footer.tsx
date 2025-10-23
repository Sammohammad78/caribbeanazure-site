import Link from 'next/link';
import { site } from '@/content/site';

/**
 * Footer component with copyright and basic links.
 */
export default function Footer() {
  const { footer } = site.en;
  return (
    <footer className="border-t bg-gray-50 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
        <p>{footer.text}</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}