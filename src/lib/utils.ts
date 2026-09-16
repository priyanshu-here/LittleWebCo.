export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Brand name with any trailing period removed, for places where the UI supplies
 * its own punctuation (the wordmark's accent dot, the copyright line). Keeps
 * "Little Web Co." from rendering as "Little Web Co..".
 */
export function brandBase(name: string): string {
  return name.replace(/\s*\.\s*$/, '')
}

/**
 * Rough advance width (in em) of a string in the display font. Used to size the
 * footer watermark so it fills its container whatever the brand name is.
 */
export function approxTextWidth(text: string): number {
  let w = 0
  for (const ch of text) {
    if (ch === ' ') w += 0.26
    else if ('.,:;!|\'`iljtIf'.includes(ch)) w += 0.3
    else if ('mwMW'.includes(ch)) w += 0.85
    else if (ch !== ch.toLowerCase() && ch === ch.toUpperCase()) w += 0.64
    else w += 0.55
  }
  return w
}
