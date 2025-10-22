import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(nl|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
