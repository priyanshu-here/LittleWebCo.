import type { BusinessBrief, WebsiteLevel } from './types'

/**
 * Keeps the in-progress brief for the length of the browser tab, so a refresh
 * does not throw the customer back to an empty form. Images are deliberately
 * not persisted: they are local object URLs that die with the page.
 */
const KEY = 'lwc-demo-brief'

export interface StoredState {
  brief: Omit<BusinessBrief, 'images'>
  level: WebsiteLevel | null
  step: number
}

export function saveState(state: StoredState): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* private mode */
  }
}

export function loadState(): StoredState | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StoredState) : null
  } catch {
    return null
  }
}

export function clearState(): void {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
