import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { href: `/${locale}/over-ons`, label: t('nav.about') },
      { href: `/${locale}/cases`, label: t('nav.cases') },
      { href: `/${locale}/contact`, label: t('nav.contact') },
    ],
    services: [
      { href: `/${locale}/diensten/automatisering`, label: t('services.automation.title') },
      { href: `/${locale}/diensten/integraties`, label: t('services.integrations.title') },
      { href: `/${locale}/diensten/ai-chatbots`, label: t('services.chatbots.title') },
      { href: `/${locale}/diensten/dashboards`, label: t('services.dashboards.title') },
    ],
    resources: [
      { href: `/${locale}/inzichten`, label: t('nav.insights') },
    ],
    legal: [
      { href: `/${locale}/privacybeleid`, label: 'Privacy' },
      { href: `/${locale}/voorwaarden`, label: 'Terms' },
    ],
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              CA
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Caribbean Azure. {t('footer.rights')}.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
