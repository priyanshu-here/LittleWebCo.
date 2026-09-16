/**
 * Thin analytics shim. The project has no analytics provider wired up, so this
 * no-ops unless one appears on `window` later (gtag or a dataLayer). Only
 * non-identifying properties are ever passed — never name, email or phone.
 */
export type DemoEvent =
  | 'demo_page_view'
  | 'business_details_started'
  | 'business_details_completed'
  | 'website_level_selected'
  | 'demo_generation_started'
  | 'demo_generation_completed'
  | 'make_it_yours_clicked'
  | 'contact_form_started'
  | 'contact_form_submitted'

type Props = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Props) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function track(event: DemoEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, props)
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...props })
    else if (import.meta.env.DEV) console.debug('[demo analytics]', event, props)
  } catch {
    /* analytics must never break the flow */
  }
}
