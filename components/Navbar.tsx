"use client";

import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/content/site';

/**
 * The main navigation bar. Stays fixed to the top and collapses on small screens.
 */
export default function Navbar() {
  const { en } = site;
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image src="/logo.svg" alt="Caribbean Azure logo" width={140} height={40} priority />
        </Link>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {en.navbar.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-azure focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}