import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/config/site'
import { buildLocalizedPath, type RouteKey } from '@/lib/slugMap'
import { TextBox } from '@/components/ui/TextBox'

type FooterLink = {
  key: RouteKey
  label: string
}

export function Footer() {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const currentYear = new Date().getFullYear()

  const pathFor = (routeKey: RouteKey) => buildLocalizedPath(routeKey, locale)

  const sections: Array<{
    label: string
    links: FooterLink[]
  }> = [
    {
      label: t('footer.company'),
      links: [
        { key: 'about', label: t('nav.about') },
        { key: 'cases', label: t('nav.cases') },
        { key: 'pricing', label: t('nav.pricing') },
        { key: 'contact', label: t('nav.contact') },
      ],
    },
    {
      label: t('footer.solutions'),
      links: [
        { key: 'solutions', label: t('nav.solutions') },
        { key: 'solutionsLight', label: t('solutions.light.title') },
        { key: 'solutionsManufacturing', label: t('solutions.manufacturing.title') },
        { key: 'solutionsConfigurators', label: t('solutions.configurators.title') },
      ],
    },
    {
      label: t('footer.legal'),
      links: [
        { key: 'privacy', label: t('footer.privacy') },
        { key: 'cookies', label: t('footer.cookies') },
      ],
    },
  ]

  return (
    <footer className="glass-footer">
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {sections.map((section) => (
            <FooterColumn
              key={section.label}
              label={section.label}
              links={section.links.map((link) => ({
                href: pathFor(link.key),
                label: link.label,
              }))}
            />
          ))}

          <div className="col-span-2 space-y-4 md:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] transition-colors hover:text-[color:var(--fg)]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] transition-colors hover:text-[color:var(--fg)]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[color:var(--fg-subtle)] transition-colors hover:text-[color:var(--fg)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-6 border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] pt-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-[color:var(--fg-subtle)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--brand)] text-white shadow-[0_12px_32px_color-mix(in_oklab,var(--brand)_35%,transparent)]">
                CA
              </div>
              <p>
                © {currentYear} Caribbean Azure. {t('footer.rights')}.
              </p>
            </div>
            <p className="text-sm text-[color:var(--fg-muted)]">{t('footer.tagline')}</p>
          </div>

          <p className="max-w-3xl text-xs text-[color:var(--fg-muted)]">
            {t('footer.anonymised')}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[color:var(--fg-muted)]">
            <span>KvK: 12345678</span>
            <span>BTW: NL123456789B01</span>
            <span>Ac {currentYear} Caribbean Azure</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  label,
  links,
}: {
  label: string
  links: { href: string; label: string }[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
        {label}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="lift-hover inline-flex items-center gap-2 text-sm font-medium text-[color:var(--fg-subtle)] transition-all duration-200 hover:text-[color:var(--fg)]"
            >
              <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
