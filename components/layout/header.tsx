'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { Logo, LogoMark } from '@/components/brand/logo'
import { buildLocalizedPath, type RouteKey } from '@/lib/slugMap'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Updated navigation with new IA structure
  const navItems = useMemo(
    () =>
      ([
        { key: 'home', label: t('nav.home') },
        { key: 'solutions', label: t('nav.solutions') },
        { key: 'pricing', label: t('nav.pricing') },
        { key: 'cases', label: t('nav.cases') },
        { key: 'contact', label: t('nav.contact') },
      ] satisfies Array<{ key: RouteKey; label: string }>).map((item) => ({
        ...item,
        href: buildLocalizedPath(item.key, locale as Locale),
      })),
    [locale, t]
  )

  const intakeHref = buildLocalizedPath('contact', locale as Locale)

  return (
    <header className="glass-header w-full">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href={buildLocalizedPath('home', locale as Locale)} className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
            <Logo className="hidden h-8 w-auto sm:block" />
            <LogoMark className="h-10 w-10 sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navItems.map((item) => {
              const normalizedPath =
                pathname === '/' ? '/' : pathname.replace(/\/$/, '')
              const normalizedHref =
                item.href === '/' ? '/' : item.href.replace(/\/$/, '')
              const isActive =
                normalizedHref === '/'
                  ? normalizedPath === '/'
                  : normalizedPath === normalizedHref ||
                    normalizedPath.startsWith(`${normalizedHref}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-xl px-3 py-1.5 text-sm font-medium text-[color:var(--fg-muted)] transition-all duration-200 ease-out hover:text-[color:var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
                    'before:absolute before:inset-0 before:rounded-xl before:border before:border-white/50 before:bg-white/45 before:backdrop-blur before:shadow-[inset_0_0_0_1px_rgba(255,255,255,.35),0_8px_20px_-10px_rgba(0,0,0,.35)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 focus-visible:before:opacity-100',
                    isActive && 'text-[color:var(--fg)] before:opacity-100'
                  )}
                  data-active={isActive}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher, Theme Toggle & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:flex" />
            <ThemeToggle className="hidden md:inline-flex" />

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href={intakeHref}>
                {t('cta.intake')}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button
              className="glass-btn inline-flex h-10 w-10 items-center justify-center p-0 text-[color:var(--fg)] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-b border-[color:var(--glass-border-color)] glass-header transition-[max-height,opacity] duration-300 ease-out md:hidden',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container-custom flex flex-col gap-4 py-6">
          <div className="flex items-center justify-end gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass glass--sm px-4 py-2 text-sm font-medium text-[color:var(--fg-muted)] glass--interactive hover:text-[color:var(--fg)] focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
