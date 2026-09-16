import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useRevealRef } from '@/hooks/useReveal'
import type { AnimationLevel } from '@/lib/demo/types'
import { cn } from '@/lib/utils'

/**
 * Reveal that honours the chosen website level. Basic renders plain markup so
 * there is genuinely less motion, not just a shorter duration. Business and
 * Professional reuse the site's shared IntersectionObserver reveal system.
 */
export function DReveal({
  children,
  level,
  delay = 0,
  group = false,
  className,
  as = 'div',
  id,
}: {
  children: ReactNode
  level: AnimationLevel
  delay?: number
  group?: boolean
  className?: string
  as?: 'div' | 'section' | 'ul' | 'li' | 'figure' | 'header'
  id?: string
}) {
  const ref = useRevealRef()
  if (level === 'minimal') return createElement(as, { className, id }, children)
  const props: Record<string, unknown> = {
    ref,
    id,
    className,
    style: { '--delay': `${delay}ms` } as CSSProperties,
  }
  if (group) props['data-reveal-group'] = ''
  else props['data-reveal'] = ''
  return createElement(as, props, children)
}

export function dItem(index: number, level: AnimationLevel) {
  if (level === 'minimal') return {}
  return { 'data-reveal-item': '', style: { '--i': index } as CSSProperties }
}

export function DSectionHead({
  label,
  title,
  intro,
  level,
  align = 'left',
  className,
}: {
  label?: string
  title: string
  intro?: string
  level: AnimationLevel
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <DReveal level={level} className={cn('d-wrap', align === 'center' && 'text-center', className)}>
      {label && (
        <p className="d-label d-accent" style={{ marginBottom: '0.75rem' }}>
          {label}
        </p>
      )}
      <h2 className="d-h2">{title}</h2>
      {intro && (
        <p className={cn('d-lead d-muted', align === 'center' && 'mx-auto')} style={{ marginTop: '0.9rem', maxWidth: '38rem' }}>
          {intro}
        </p>
      )}
    </DReveal>
  )
}
