import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Caribbean Azure – WhatsApp‑first websites & AI automation',
    template: '%s | Caribbean Azure',
  },
  description:
    'We turn scattered processes into clean, automated flows—web, chat, and back‑office—so you close more deals with less effort.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}