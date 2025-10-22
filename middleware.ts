import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Dutch at /, English at /en
});

export const config = {
  matcher: ['/', '/(en)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
};
