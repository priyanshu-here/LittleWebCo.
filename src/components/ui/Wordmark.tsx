import { brandBase, cn } from '@/lib/utils'
import { site } from '@/data/site'

/** Brand wordmark. The accent full stop is added here, so a brand name that
 *  already ends in one ("Little Web Co.") is not doubled. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-display font-medium tracking-[-0.03em] whitespace-nowrap', className)}>
      {brandBase(site.name)}
      <span aria-hidden className="text-accent">
        .
      </span>
    </span>
  )
}
