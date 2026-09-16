import { createElement, type CSSProperties } from 'react'
import { useRevealRef } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface SplitTextProps {
  text: string
  as?: Tag
  className?: string
  /** Words rendered in the serif accent style (case-insensitive, punctuation kept). */
  accentWords?: string[]
  /** Delay before the first word, in ms. */
  delay?: number
  /** Delay between words, in ms. */
  stagger?: number
  /** Animate on mount (true) or when scrolled into view (false). */
  immediate?: boolean
  id?: string
}

/** Word-by-word headline rise using CSS keyframes (no JS animation loop). */
export function SplitText({
  text,
  as = 'h1',
  className,
  accentWords = [],
  delay = 0,
  stagger = 50,
  immediate = true,
  id,
}: SplitTextProps) {
  const ref = useRevealRef()
  const words = text.split(' ')
  const accents = accentWords.map((w) => w.toLowerCase())

  const children = words.map((word, i) => (
    <span key={`${word}-${i}`} aria-hidden className="split-word">
      <span
        className={cn(accents.includes(word.toLowerCase()) && 'type-serif text-accent-display')}
        style={{ '--d': `${delay + i * stagger}ms` } as CSSProperties}
      >
        {word}
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))

  const props: Record<string, unknown> = {
    id,
    className: cn('whitespace-pre-wrap', immediate && 'split-run', className),
    'aria-label': text,
  }
  if (!immediate) {
    props.ref = ref
    props['data-reveal'] = ''
  }
  return createElement(as, props, children)
}
