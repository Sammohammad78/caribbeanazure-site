'use client'

type AnalyticsPayload = Record<string, unknown>

declare global {
  interface Window {
    caEventQueue?: Array<{ name: string; payload?: AnalyticsPayload }>
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return
  window.caEventQueue = window.caEventQueue ?? []
  window.caEventQueue.push({ name, payload })
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[ca:event]', name, payload)
  }
}
