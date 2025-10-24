/**
 * ROI Calculator Utilities
 * Calculation, validation, export, and URL sync logic
 */

import type { RoiInputs, RoiResult } from './types'

/**
 * Calculate ROI metrics from inputs
 * Formula: teamSize × hourlyRate × hoursSavedPerWeek × 52 × adoption
 */
export function calculateRoi(inputs: RoiInputs): RoiResult {
  const { teamSize, hourlyRate, hoursSavedPerWeek, adoption } = inputs

  const weeklySavings = teamSize * hourlyRate * hoursSavedPerWeek * adoption
  const monthlySavings = weeklySavings * (52 / 12) // ~4.33 weeks per month
  const annualSavings = weeklySavings * 52
  const hoursSavedAnnually = teamSize * hoursSavedPerWeek * 52 * adoption

  return {
    weeklySavings: Math.round(weeklySavings),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    hoursSavedAnnually: Math.round(hoursSavedAnnually),
  }
}

/**
 * Validate ROI inputs
 */
export function validateInputs(inputs: Partial<RoiInputs>): string | null {
  if (!inputs.teamSize || inputs.teamSize < 1 || inputs.teamSize > 1000) {
    return 'Teamgrootte moet tussen 1 en 1000 zijn'
  }
  if (!inputs.hourlyRate || inputs.hourlyRate < 10 || inputs.hourlyRate > 500) {
    return 'Uurtarief moet tussen €10 en €500 zijn'
  }
  if (
    inputs.hoursSavedPerWeek === undefined ||
    inputs.hoursSavedPerWeek < 0.5 ||
    inputs.hoursSavedPerWeek > 40
  ) {
    return 'Bespaarde uren moet tussen 0,5 en 40 zijn'
  }
  if (!inputs.adoption || inputs.adoption < 0.1 || inputs.adoption > 1) {
    return 'Adoptie moet tussen 10% en 100% zijn'
  }
  return null
}

/**
 * Format EUR currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

/**
 * Export ROI data as CSV
 */
export function exportToCsv(inputs: RoiInputs, result: RoiResult): void {
  const rows = [
    ['Caribbean Azure ROI Calculator', ''],
    ['Datum', new Date().toLocaleDateString('nl-NL')],
    ['', ''],
    ['INPUT', ''],
    ['Teamgrootte', inputs.teamSize.toString()],
    ['Uurtarief (EUR)', inputs.hourlyRate.toString()],
    ['Uren bespaard per week', inputs.hoursSavedPerWeek.toString()],
    ['Adoptiepercentage', formatPercent(inputs.adoption)],
    ['', ''],
    ['RESULTAAT', ''],
    ['Besparing per week', formatCurrency(result.weeklySavings)],
    ['Besparing per maand', formatCurrency(result.monthlySavings)],
    ['Besparing per jaar', formatCurrency(result.annualSavings)],
    ['Uren bespaard per jaar', result.hoursSavedAnnually.toString()],
  ]

  const csv = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `roi-calculator-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

/**
 * Sync inputs to URL querystring
 */
export function syncToUrl(inputs: RoiInputs): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  params.set('team', inputs.teamSize.toString())
  params.set('rate', inputs.hourlyRate.toString())
  params.set('hours', inputs.hoursSavedPerWeek.toString())
  params.set('adoptie', inputs.adoption.toString())

  const newUrl = `${window.location.pathname}?${params.toString()}`
  window.history.replaceState({}, '', newUrl)
}

/**
 * Read inputs from URL querystring
 */
export function readFromUrl(defaults: RoiInputs): Partial<RoiInputs> {
  if (typeof window === 'undefined') return defaults

  const params = new URLSearchParams(window.location.search)

  return {
    teamSize: params.has('team') ? parseInt(params.get('team')!, 10) : defaults.teamSize,
    hourlyRate: params.has('rate') ? parseFloat(params.get('rate')!) : defaults.hourlyRate,
    hoursSavedPerWeek: params.has('hours')
      ? parseFloat(params.get('hours')!)
      : defaults.hoursSavedPerWeek,
    adoption: params.has('adoptie') ? parseFloat(params.get('adoptie')!) : defaults.adoption,
  }
}
