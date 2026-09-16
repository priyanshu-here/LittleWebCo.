import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** `inverse` contrasts with the page: ink in light mode, an elevated charcoal in dark mode. */
  surface?: 'default' | 'inverse'
  padding?: 'default' | 'sm' | 'none'
}

export function Section({ surface = 'default', padding = 'default', className, ...props }: SectionProps) {
  return (
    <section
      {...(surface === 'inverse' ? { 'data-surface': 'inverse' } : {})}
      className={cn(
        'relative bg-bg text-fg',
        padding === 'default' && 'py-section',
        padding === 'sm' && 'py-section-sm',
        className,
      )}
      {...props}
    />
  )
}
