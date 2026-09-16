import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  number?: string
  dot?: boolean
}

export function Eyebrow({ number, dot = true, className, children, ...props }: EyebrowProps) {
  return (
    <span className={cn('type-label inline-flex items-center gap-3 text-fg-muted', className)} {...props}>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {number && <span className="type-num text-fg">{number}</span>}
      <span>{children}</span>
    </span>
  )
}
