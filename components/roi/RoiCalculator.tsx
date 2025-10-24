'use client'

/**
 * Universal ROI Calculator
 * Used across /, /diensten, /prijzen, and /roi with different variants
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ArrowRight, Download, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoiCalculatorProps } from './types'
import { DEFAULT_INPUTS } from './types'
import {
  calculateRoi,
  validateInputs,
  formatCurrency,
  formatPercent,
  exportToCsv,
  syncToUrl,
  readFromUrl,
} from './utils'

export function RoiCalculator({
  initialInputs,
  variant = 'card',
  showMethodNote = false,
  ctaLabel = 'Plan een intake',
  onSubmit,
  showExport = true,
  enableUrlSync = false,
}: RoiCalculatorProps) {
  // Initialize state from URL if enabled, otherwise use defaults
  const [inputs, setInputs] = React.useState(() => {
    const defaults = { ...DEFAULT_INPUTS, ...initialInputs }
    if (enableUrlSync && typeof window !== 'undefined') {
      return { ...defaults, ...readFromUrl(defaults) }
    }
    return defaults
  })

  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Calculate result
  const result = React.useMemo(() => calculateRoi(inputs), [inputs])

  // Sync to URL when inputs change (debounced)
  React.useEffect(() => {
    if (!enableUrlSync) return
    const timer = setTimeout(() => syncToUrl(inputs), 500)
    return () => clearTimeout(timer)
  }, [inputs, enableUrlSync])

  // Handle input change
  const handleChange = (field: keyof typeof inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setError(null)

    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('calc_input_change', { props: { field, value } })
    }
  }

  // Handle submit
  const handleSubmit = async () => {
    const validationError = validateInputs(inputs)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('calc_cta_click', {
        props: {
          annualSavings: result.annualSavings,
          variant,
        },
      })
    }

    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(inputs, result)
      } catch (err) {
        setError('Er ging iets mis. Probeer het opnieuw.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Handle CSV export
  const handleExport = () => {
    exportToCsv(inputs, result)

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('calc_export', {
        props: { annualSavings: result.annualSavings },
      })
    }
  }

  // Variant-specific wrapper
  const Wrapper = variant === 'inline' ? 'div' : Card
  const wrapperClassName = cn(
    variant === 'inline' && 'bg-[color:color-mix(in_oklab,var(--panel)_50%,transparent)] rounded-2xl p-6 sm:p-8',
    variant === 'page' && 'max-w-4xl mx-auto'
  )

  return (
    <Wrapper className={wrapperClassName}>
      {/* Header */}
      {variant !== 'inline' && (
        <div className="mb-8">
          <Heading level="h2" className="mb-3">
            Bereken je ROI
          </Heading>
          <Text variant="subtle" size="lg">
            Ontdek hoeveel je kunt besparen met automatisering
          </Text>
        </div>
      )}

      {/* Input Grid */}
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <InputField
          label="Teamgrootte"
          value={inputs.teamSize}
          onChange={(val) => handleChange('teamSize', val)}
          min={1}
          max={1000}
          step={1}
          suffix="personen"
        />
        <InputField
          label="Uurtarief"
          value={inputs.hourlyRate}
          onChange={(val) => handleChange('hourlyRate', val)}
          min={10}
          max={500}
          step={5}
          prefix="€"
        />
        <InputField
          label="Uren bespaard per week"
          value={inputs.hoursSavedPerWeek}
          onChange={(val) => handleChange('hoursSavedPerWeek', val)}
          min={0.5}
          max={40}
          step={0.5}
          suffix="uur"
        />
        <InputField
          label="Adoptiepercentage"
          value={inputs.adoption * 100}
          onChange={(val) => handleChange('adoption', val / 100)}
          min={10}
          max={100}
          step={5}
          suffix="%"
        />
      </div>

      {/* Error */}
      {error && (
        <div
          className="mb-6 rounded-xl bg-[color:color-mix(in_oklab,var(--err)_15%,transparent)] border border-[color:var(--err)] p-4"
          role="alert"
        >
          <Text variant="error" size="sm">
            {error}
          </Text>
        </div>
      )}

      {/* Result Card */}
      <div className="rounded-xl bg-gradient-to-br from-[color:var(--brand-600)] to-[color:var(--brand-400)] p-8 text-white mb-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <ResultMetric label="Per maand" value={formatCurrency(result.monthlySavings)} />
          <ResultMetric
            label="Per jaar"
            value={formatCurrency(result.annualSavings)}
            highlight
          />
          <ResultMetric label="Uren bespaard" value={result.hoursSavedAnnually.toLocaleString('nl-NL')} suffix="uur/jaar" />
        </div>
      </div>

      {/* Method Note */}
      {showMethodNote && (
        <div className="mb-6 rounded-xl bg-[color:color-mix(in_oklab,var(--fg)_6%,transparent)] p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-[color:var(--fg-muted)] mt-0.5 flex-shrink-0" />
          <Text variant="subtle" size="sm">
            <strong>Rekenmethode:</strong> teamgrootte × uurtarief × uren per week × 52 weken ×
            adoptiepercentage. Dit is een indicatie; werkelijke resultaten kunnen variëren per
            organisatie en proces.
          </Text>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Bezig...' : ctaLabel}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        {showExport && (
          <Button size="lg" variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporteer CSV
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

/**
 * Input Field Component
 */
interface InputFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}

function InputField({ label, value, onChange, min, max, step, prefix, suffix }: InputFieldProps) {
  const inputId = React.useId()

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[color:var(--fg)] mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)]">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className={cn(
            'w-full h-11 rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_20%,transparent)]',
            'bg-[color:var(--bg)] text-[color:var(--fg)]',
            'px-4 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]',
            'transition-all duration-200',
            prefix && 'pl-8',
            suffix && 'pr-20'
          )}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--fg-muted)] text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Result Metric Component
 */
interface ResultMetricProps {
  label: string
  value: string
  suffix?: string
  highlight?: boolean
}

function ResultMetric({ label, value, suffix, highlight }: ResultMetricProps) {
  return (
    <div className={cn('text-center', highlight && 'sm:scale-110')}>
      <div className="text-sm opacity-90 mb-2">{label}</div>
      <div className={cn('font-bold', highlight ? 'text-3xl' : 'text-2xl')}>{value}</div>
      {suffix && <div className="text-xs opacity-75 mt-1">{suffix}</div>}
    </div>
  )
}
