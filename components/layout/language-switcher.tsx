'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { translatePath } from '@/lib/slugMap'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    const targetPath = translatePath(pathname, locale as Locale, newLocale)
    router.push(targetPath)
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Globe
        className="h-4 w-4 text-[color:var(--fg-muted)]"
        aria-hidden="true"
      />
      <div className="flex items-center gap-1">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              'relative rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200',
              'text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-0',
              'before:absolute before:inset-0 before:rounded-xl before:border before:border-white/45 before:bg-white/35 before:backdrop-blur before:shadow-[inset_0_0_0_1px_rgba(255,255,255,.3),0_6px_18px_-8px_rgba(0,0,0,.25)] before:opacity-0 before:transition-opacity before:duration-200',
              locale === loc
                ? 'text-[color:var(--fg)] before:opacity-100'
                : 'hover:before:opacity-100 focus-visible:before:opacity-100'
            )}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-current={locale === loc ? 'page' : undefined}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
