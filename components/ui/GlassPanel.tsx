/**
 * GlassPanel Component
 * Lightweight glass container for forms, sections, and grouped content
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface GlassPanelProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside' | 'form'
  variant?: 'default' | 'form' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  'aria-label'?: string
  role?: string
  [key: string]: any  // Allow additional props to be passed through
}

const paddingClasses = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10'
}

const variantClasses = {
  default: 'glass',
  form: 'glass-panel--form',
  elevated: 'glass glass--elevated'
}

export function GlassPanel({
  children,
  className,
  as: Component = 'div',
  variant = 'default',
  padding = 'md',
  'aria-label': ariaLabel,
  role,
  ...rest
}: GlassPanelProps) {
  return (
    <Component
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        'rounded-[var(--glass-radius-md)]',
        className
      )}
      aria-label={ariaLabel}
      role={role}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * FormPanel - Specialized glass panel for forms
 */
export interface FormPanelProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  'aria-label'?: string
}

export function FormPanel({
  children,
  className,
  title,
  subtitle,
  onSubmit,
  'aria-label': ariaLabel
}: FormPanelProps) {
  return (
    <GlassPanel
      as="form"
      variant="form"
      className={cn('space-y-6', className)}
      aria-label={ariaLabel}
      onSubmit={onSubmit}
    >
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-xl md:text-2xl font-bold text-[color:var(--fg)]">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-base text-[color:var(--fg-muted)]">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </GlassPanel>
  )
}
