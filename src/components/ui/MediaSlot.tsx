import { cn } from '@/lib/utils'

interface MediaSlotProps {
  label: string
  hint?: string
  ratio?: string
  image?: { src: string; alt: string }
  className?: string
  rounded?: boolean
}

/**
 * Renders a real image when provided, otherwise an intentional placeholder that
 * clearly signals where imagery belongs.
 */
export function MediaSlot({ label, hint, ratio = '16 / 10', image, className, rounded = true }: MediaSlotProps) {
  if (image) {
    return (
      <figure className={cn('overflow-hidden bg-bg-2', rounded && 'rounded-md', className)} style={{ aspectRatio: ratio }}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover" />
      </figure>
    )
  }
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        'relative flex items-end overflow-hidden border border-dashed border-fg/25 bg-bg-2 p-4 grid-paper',
        rounded && 'rounded-md',
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div className="relative z-10">
        <p className="type-label text-fg">{label}</p>
        {hint && <p className="type-small mt-1 text-fg-muted">{hint}</p>}
      </div>
      <span aria-hidden className="absolute right-4 top-4 size-2 rounded-full bg-accent" />
    </div>
  )
}
