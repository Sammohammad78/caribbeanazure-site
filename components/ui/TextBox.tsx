/**
 * TextBox Component
 * Liquid-glass informational box matching reference design
 * Used for: callouts, notices, FAQs, feature boxes, footer panels, etc.
 *
 * Reference: public/design/style-reference.jpg
 * Styles: styles/glass.css
 */

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type TextBoxVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'subtle'
export type TextBoxSize = 'sm' | 'md' | 'lg'

export interface TextBoxProps {
  /** Main title/heading */
  title?: string | ReactNode
  /** Subtitle or body content */
  subtitle?: string | ReactNode
  /** Optional icon on the left (can be a React component or emoji) */
  iconLeft?: ReactNode
  /** Icon background variant color */
  variant?: TextBoxVariant
  /** Size preset */
  size?: TextBoxSize
  /** Action buttons or links at the bottom */
  actions?: ReactNode
  /** Children content (rendered after subtitle) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Make interactive (hover/focus effects) */
  interactive?: boolean
  /** Custom icon background gradient */
  iconBg?: string
  /** Accessibility: ARIA label */
  'aria-label'?: string
  /** Accessibility: ARIA role */
  role?: string
  /** Click handler (if interactive) */
  onClick?: () => void
  /** Tab index for keyboard navigation */
  tabIndex?: number
}

/**
 * Variant to icon pill gradient mapping
 * Uses brand tokens for consistency
 */
const variantStyles = {
  neutral: {
    iconBg: 'linear-gradient(135deg, rgba(107, 114, 128, 0.9) 0%, rgba(156, 163, 175, 0.8) 100%)',
    iconClass: 'text-white'
  },
  accent: {
    iconBg: 'linear-gradient(135deg, #FFB703 0%, #E5A503 100%)',
    iconClass: 'text-white'
  },
  success: {
    iconBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    iconClass: 'text-white'
  },
  warning: {
    iconBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    iconClass: 'text-white'
  },
  info: {
    iconBg: 'linear-gradient(135deg, #4BA3F7 0%, #0F5E9C 100%)',
    iconClass: 'text-white'
  },
  subtle: {
    iconBg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)',
    iconClass: 'text-[color:var(--fg)]'
  }
}

/**
 * Size preset mappings
 */
const sizePresets = {
  sm: {
    containerClass: 'p-4 md:p-5 gap-3',
    iconSize: 'w-10 h-10 text-lg',
    titleClass: 'text-base md:text-lg font-semibold',
    subtitleClass: 'text-sm md:text-base',
    glassSize: 'glass--sm'
  },
  md: {
    containerClass: 'p-6 md:p-8 gap-4',
    iconSize: 'w-12 h-12 text-xl',
    titleClass: 'text-lg md:text-xl font-semibold',
    subtitleClass: 'text-base md:text-lg',
    glassSize: ''
  },
  lg: {
    containerClass: 'p-8 md:p-10 gap-5',
    iconSize: 'w-14 h-14 text-2xl',
    titleClass: 'text-xl md:text-2xl font-bold',
    subtitleClass: 'text-lg md:text-xl',
    glassSize: 'glass--lg'
  }
}

export function TextBox({
  title,
  subtitle,
  iconLeft,
  variant = 'neutral',
  size = 'md',
  actions,
  children,
  className,
  interactive = false,
  iconBg,
  'aria-label': ariaLabel,
  role,
  onClick,
  tabIndex
}: TextBoxProps) {
  const variantStyle = variantStyles[variant]
  const sizePreset = sizePresets[size]

  const hasInteraction = interactive || !!onClick

  return (
    <div
      className={cn(
        'glass',
        sizePreset.glassSize,
        sizePreset.containerClass,
        'flex flex-col',
        hasInteraction && 'glass--interactive cursor-pointer',
        className
      )}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      tabIndex={hasInteraction ? tabIndex ?? 0 : undefined}
      {...(hasInteraction && {
        onKeyDown: (e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick()
          }
        }
      })}
    >
      {/* Icon pill (if provided) */}
      {iconLeft && (
        <div
          className={cn(
            sizePreset.iconSize,
            'flex items-center justify-center rounded-2xl flex-shrink-0',
            variantStyle.iconClass
          )}
          style={{
            background: iconBg || variantStyle.iconBg
          }}
          aria-hidden="true"
        >
          {iconLeft}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3
          className={cn(
            sizePreset.titleClass,
            'text-[color:var(--fg)] tracking-tight'
          )}
        >
          {title}
        </h3>
      )}

      {/* Subtitle / body text */}
      {subtitle && (
        <p
          className={cn(
            sizePreset.subtitleClass,
            'text-[color:var(--fg-muted)] leading-relaxed'
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Children (additional content) */}
      {children && (
        <div className="mt-2 text-[color:var(--fg-muted)]">
          {children}
        </div>
      )}

      {/* Actions row (buttons, links, etc.) */}
      {actions && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

/**
 * Specialized TextBox variants for common use cases
 */

export function FeatureBox(props: Omit<TextBoxProps, 'variant' | 'size'>) {
  return <TextBox {...props} variant="info" size="md" />
}

export function AlertBox(props: Omit<TextBoxProps, 'variant' | 'size'>) {
  return <TextBox {...props} variant="warning" size="md" role="alert" />
}

export function SuccessBox(props: Omit<TextBoxProps, 'variant' | 'size'>) {
  return <TextBox {...props} variant="success" size="md" role="status" />
}

export function InfoBox(props: Omit<TextBoxProps, 'variant' | 'size'>) {
  return <TextBox {...props} variant="info" size="md" role="note" />
}

export function FooterPanel(props: Omit<TextBoxProps, 'size'>) {
  return <TextBox {...props} size="sm" />
}

/**
 * TextBoxGroup - For arranging multiple TextBoxes in a grid
 */
export interface TextBoxGroupProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

const gapSizes = {
  sm: 'gap-4',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-10'
}

export function TextBoxGroup({
  children,
  columns = 2,
  gap = 'md',
  className
}: TextBoxGroupProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div
      className={cn(
        'grid',
        gridCols[columns],
        gapSizes[gap],
        className
      )}
    >
      {children}
    </div>
  )
}
