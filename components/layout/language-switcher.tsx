'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames } from '@/lib/i18n'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const switchLocale = (newLocale: string) => {
    // Remove current locale prefix from pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

    // Build new path
    const newPath = newLocale === 'nl'
      ? pathnameWithoutLocale
      : `/en${pathnameWithoutLocale}`

    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-3 text-sm font-medium text-[color:var(--fg)] transition-all duration-200 hover:border-[color:color-mix(in_oklab,var(--brand)_25%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_85%,transparent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)] focus:ring-offset-2"
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:var(--panel)] shadow-lg backdrop-blur-xl">
          <div className="p-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-all duration-200 ${
                  locale === loc
                    ? 'bg-[color:color-mix(in_oklab,var(--brand)_15%,transparent)] font-semibold text-[color:var(--brand)]'
                    : 'text-[color:var(--fg-muted)] hover:bg-[color:color-mix(in_oklab,var(--fg)_5%,transparent)] hover:text-[color:var(--fg)]'
                }`}
                aria-label={`Switch to ${localeNames[loc]}`}
                aria-current={locale === loc ? 'true' : undefined}
              >
                {localeNames[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
