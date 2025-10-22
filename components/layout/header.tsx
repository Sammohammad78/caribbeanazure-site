'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/diensten`, label: t('nav.services') },
    { href: `/${locale}/cases`, label: t('nav.cases') },
    { href: `/${locale}/over-ons`, label: t('nav.about') },
    { href: `/${locale}/inzichten`, label: t('nav.insights') },
  ]

  const otherLocale = locale === 'nl' ? 'en' : 'nl'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              CA
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              Caribbean Azure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Language Switcher */}
          <div className="flex items-center space-x-4">
            <Link
              href={`/${otherLocale}`}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{otherLocale.toUpperCase()}</span>
            </Link>

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href={`/${locale}/contact`}>{t('nav.contact')}</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
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
          'md:hidden overflow-hidden transition-all duration-300',
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4 border-t">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="w-full">
            <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
