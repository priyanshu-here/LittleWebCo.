import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Serif italic accent word inside a display heading. */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn('type-serif text-accent-display', className)}>{children}</em>
}
