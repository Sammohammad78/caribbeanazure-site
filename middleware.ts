import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

// Dutch-only configuration (no /en routes)
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Dutch at / (no prefix)
});

export const config = {
  matcher: ['/', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
