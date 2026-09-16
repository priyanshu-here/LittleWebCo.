import type { Founder } from '@/data/founders'
import { site } from '@/data/site'
import { Instagram } from '@/components/ui/Icons'

/**
 * Compact founder card: photo, name, role, Instagram handle.
 * Photo and Instagram fall back to clearly-marked placeholders until real data is added
 * to src/data/founders.ts; placeholder handles are only shown in development.
 */
export function FounderCard({ founder }: { founder: Founder }) {
  const hasInstagram = Boolean(founder.instagram.handle && founder.instagram.url)
  const alt = founder.photo?.alt || `Portrait of ${founder.name}, ${founder.role} of ${site.name}`

  return (
    <article className="group flex items-center gap-4 rounded-md border border-line-c bg-surface p-3 transition-ui hover:-translate-y-0.5 hover:border-fg/35 sm:p-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-md bg-bg-2 sm:size-24">
        {founder.photo ? (
          <img
            src={founder.photo.src}
            alt={alt}
            width={founder.photo.width}
            height={founder.photo.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-ui group-hover:scale-[1.04]"
          />
        ) : (
          <div className="relative size-full grid-paper" role="img" aria-label={`${alt} (photo to be added)`}>
            <span aria-hidden className="absolute inset-0 grid place-items-center font-display text-2xl font-medium tracking-[-0.04em] text-fg/35">
              {founder.initials}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="type-h4">{founder.name}</h3>
        <p className="type-small mt-0.5 text-fg-muted">{founder.role}</p>
        {hasInstagram ? (
          <a
            href={founder.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${founder.name}'s Instagram profile`}
            className="mt-2 inline-flex max-w-full items-center gap-1.5 text-[0.8125rem] text-fg-muted transition-fast hover:text-accent-text group-hover:text-fg"
          >
            <Instagram className="size-3.5 shrink-0" />
            <span className="truncate">@{founder.instagram.handle}</span>
          </a>
        ) : (
          import.meta.env.DEV && (
            <span className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] text-fg-muted/70" title="Placeholder: set instagram in src/data/founders.ts">
              <Instagram className="size-3.5 shrink-0" />
              <span className="border-b border-dashed border-fg/30">@handle-to-add</span>
            </span>
          )
        )}
      </div>
    </article>
  )
}
