/**
 * GlassCard Component
 * Premium pricing/feature card with liquid-glass morphism
 * Matches reference design in public/design/style-reference.jpg
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  gradient?: boolean
  elevated?: boolean
  href?: string
  onClick?: () => void
  'aria-label'?: string
}

const sizeClasses = {
  sm: 'p-6',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10 lg:p-12'
}

export function GlassCard({
  children,
  className,
  size = 'md',
  interactive = false,
  gradient = false,
  elevated = false,
  href,
  onClick,
  'aria-label': ariaLabel
}: GlassCardProps) {
  const Component = href ? 'a' : 'div'
  const isInteractive = interactive || !!href || !!onClick

  return (
    <Component
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'glass',
        sizeClasses[size],
        gradient && 'glass-card--gradient',
        elevated && 'glass--elevated',
        isInteractive && 'glass--interactive',
        'overflow-hidden',
        className
      )}
      {...(isInteractive && {
        tabIndex: 0,
        role: onClick ? 'button' : undefined,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick()
          }
        }
      })}
    >
      {children}
    </Component>
  )
}

/**
 * PricingCard - Specialized glass card for pricing tiers
 * Includes tier badge, title, price, features, and CTA
 */
export interface PricingCardProps {
  tier: string
  tierBadge?: ReactNode
  title: string
  subtitle?: string
  price: string | ReactNode
  priceNote?: string
  features?: Array<string | ReactNode>
  cta?: ReactNode
  popular?: boolean
  className?: string
  iconBg?: string
}

export function PricingCard({
  tier,
  tierBadge,
  title,
  subtitle,
  price,
  priceNote,
  features,
  cta,
  popular = false,
  className,
  iconBg
}: PricingCardProps) {
  return (
    <GlassCard
      className={cn(
        'flex flex-col h-full relative',
        popular && 'glass--elevated ring-2 ring-[color:var(--brand)]',
        className
      )}
      size="md"
      gradient
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="glass-badge text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--accent)] text-white px-4 py-1">
            Populair
          </span>
        </div>
      )}

      {/* Tier badge/icon */}
      {tierBadge && (
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
          style={{ background: iconBg }}
        >
          {tierBadge}
        </div>
      )}

      {/* Tier label */}
      <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--fg-muted)] mb-2">
        {tier}
      </span>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-[color:var(--fg)] mb-2">
        {title}
      </h3>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base text-[color:var(--fg-muted)] mb-6">
          {subtitle}
        </p>
      )}

      {/* Price */}
      <div className="mb-6">
        {typeof price === 'string' ? (
          <div className="text-4xl md:text-5xl font-bold text-[color:var(--brand)]">
            {price}
          </div>
        ) : (
          price
        )}
        {priceNote && (
          <p className="text-sm text-[color:var(--fg-muted)] mt-2">
            {priceNote}
          </p>
        )}
      </div>

      {/* Features list */}
      {features && features.length > 0 && (
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[color:var(--fg-muted)]">
              <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--brand)] flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {cta && <div className="mt-auto">{cta}</div>}
    </GlassCard>
  )
}
