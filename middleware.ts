import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

// NL-first: / for NL, /en for EN
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // NL at / (no prefix), EN at /en
});

export const config = {
  matcher: ['/', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
