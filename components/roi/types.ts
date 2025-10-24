/**
 * ROI Calculator Types
 * Universal calculator for Caribbean Azure website
 */

export interface RoiInputs {
  /** Number of team members */
  teamSize: number
  /** Hourly rate in EUR */
  hourlyRate: number
  /** Hours saved per week per person */
  hoursSavedPerWeek: number
  /** Adoption rate (0-1, e.g. 0.6 = 60%) */
  adoption: number
}

export interface RoiResult {
  /** Weekly savings in EUR */
  weeklySavings: number
  /** Monthly savings in EUR */
  monthlySavings: number
  /** Annual savings in EUR */
  annualSavings: number
  /** Hours saved annually */
  hoursSavedAnnually: number
}

export type RoiVariant = 'inline' | 'card' | 'page'

export interface RoiCalculatorProps {
  /** Initial input values */
  initialInputs?: Partial<RoiInputs>
  /** Display variant */
  variant?: RoiVariant
  /** Show method explanation note */
  showMethodNote?: boolean
  /** Custom CTA label */
  ctaLabel?: string
  /** Callback when user submits */
  onSubmit?: (inputs: RoiInputs, result: RoiResult) => void | Promise<void>
  /** Show CSV export button */
  showExport?: boolean
  /** Enable querystring sync */
  enableUrlSync?: boolean
}

export const DEFAULT_INPUTS: RoiInputs = {
  teamSize: 5,
  hourlyRate: 65,
  hoursSavedPerWeek: 2,
  adoption: 0.7,
}
