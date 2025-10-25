/**
 * GlassBadge Component
 * Small glass chips, badges, and tags with liquid-glass effect
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface GlassBadgeProps {
  children: ReactNode
  className?: string
  variant?: 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'info'
  size?: 'xs' | 'sm' | 'md'
  icon?: ReactNode
  onClick?: () => void
  'aria-label'?: string
}

const variantClasses = {
  neutral: 'text-[color:var(--fg)]',
  brand: 'text-[color:var(--brand-strong)]',
  accent: 'text-[color:var(--accent-strong)]',
  success: 'text-[color:var(--ok)]',
  warning: 'text-[color:var(--warn)]',
  info: 'text-[color:var(--brand)]'
}

const sizeClasses = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2'
}

export function GlassBadge({
  children,
  className,
  variant = 'neutral',
  size = 'sm',
  icon,
  onClick,
  'aria-label': ariaLabel
}: GlassBadgeProps) {
  const Component = onClick ? 'button' : 'span'
  const isInteractive = !!onClick

  return (
    <Component
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'glass glass--xs',
        'inline-flex items-center justify-center',
        'font-medium tracking-wide',
        'whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        isInteractive && 'glass--interactive cursor-pointer',
        className
      )}
      {...(isInteractive && {
        type: 'button' as const,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick?.()
          }
        }
      })}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Component>
  )
}

/**
 * StatusBadge - For displaying status with color coding
 */
export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  children: ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md'
  showDot?: boolean
}

const statusConfig = {
  success: {
    variant: 'success' as const,
    dotColor: 'bg-[color:var(--ok)]'
  },
  warning: {
    variant: 'warning' as const,
    dotColor: 'bg-[color:var(--warn)]'
  },
  error: {
    variant: 'warning' as const,
    dotColor: 'bg-[color:var(--err)]'
  },
  info: {
    variant: 'info' as const,
    dotColor: 'bg-[color:var(--brand)]'
  },
  neutral: {
    variant: 'neutral' as const,
    dotColor: 'bg-[color:var(--fg-muted)]'
  }
}

export function StatusBadge({
  status,
  children,
  className,
  size = 'sm',
  showDot = true
}: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <GlassBadge
      variant={config.variant}
      size={size}
      className={className}
      icon={
        showDot ? (
          <span className={cn('w-2 h-2 rounded-full', config.dotColor)} />
        ) : undefined
      }
    >
      {children}
    </GlassBadge>
  )
}

/**
 * CategoryBadge - For tags, categories, topics
 */
export interface CategoryBadgeProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function CategoryBadge({
  children,
  className,
  href,
  onClick
}: CategoryBadgeProps) {
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          'glass glass--xs',
          'inline-flex items-center px-3 py-1.5',
          'text-xs font-medium tracking-wide',
          'text-[color:var(--fg)] hover:text-[color:var(--brand)]',
          'glass--interactive',
          'transition-colors',
          className
        )}
      >
        {children}
      </a>
    )
  }

  return (
    <GlassBadge
      variant="neutral"
      size="sm"
      onClick={onClick}
      className={className}
    >
      {children}
    </GlassBadge>
  )
}
