import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useRevealRef } from '@/hooks/useReveal'

type Tag = 'div' | 'li' | 'span' | 'p' | 'ul' | 'ol' | 'figure' | 'article' | 'section' | 'header'

interface RevealProps {
  as?: Tag
  children: ReactNode
  /** Delay in milliseconds. */
  delay?: number
  /** Stagger direct children marked with `revealItem(i)` instead of revealing as one block. */
  group?: boolean
  className?: string
  id?: string
  style?: CSSProperties
}

/**
 * Scroll reveal driven by one shared IntersectionObserver and CSS transitions
 * (opacity + transform only). See [data-reveal] rules in styles/index.css.
 */
export function Reveal({ as = 'div', children, delay = 0, group = false, className, id, style }: RevealProps) {
  const ref = useRevealRef()
  const props: Record<string, unknown> = {
    ref,
    id,
    className,
    style: { ...style, '--delay': `${delay}ms` } as CSSProperties,
  }
  if (group) props['data-reveal-group'] = ''
  else props['data-reveal'] = ''
  return createElement(as, props, children)
}

/** Props for a child of `<Reveal group>` so it staggers in. */
export function revealItem(index: number): { 'data-reveal-item': string; style: CSSProperties } {
  return { 'data-reveal-item': '', style: { '--i': index } as CSSProperties }
}
