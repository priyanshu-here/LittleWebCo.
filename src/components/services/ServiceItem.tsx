import type { Service } from '@/data/services'
import { Plus } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'
import { ServiceVisual } from './ServiceVisual'

interface ServiceItemProps {
  service: Service
  open: boolean
  onToggle: () => void
  onHover: (id: string | null) => void
  /** Heading level so the document outline stays valid wherever the list is used. */
  headingLevel?: 'h2' | 'h3'
}

export function ServiceItem({ service, open, onToggle, onHover, headingLevel = 'h3' }: ServiceItemProps) {
  const Heading = headingLevel
  const panelId = `${service.id}-panel`
  const buttonId = `${service.id}-button`
  return (
    <li
      id={service.id}
      className="scroll-mt-28 border-b border-line-c"
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(service.id)}
    >
      <Heading>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-baseline gap-5 py-6 text-left md:gap-8 md:py-7"
        >
          <span className="type-num w-6 shrink-0 text-sm text-fg-muted">{service.number}</span>
          <span className={cn('type-h3 flex-1 transition-ui group-hover:translate-x-1.5', !open && 'group-hover:text-accent-text')}>
            {service.title}
          </span>
          <span
            className={cn(
              'grid size-9 shrink-0 translate-y-1 place-items-center rounded-full border border-line-c transition-ui',
              open ? 'rotate-45 border-fg bg-fg text-bg' : 'group-hover:border-fg',
            )}
            aria-hidden
          >
            <Plus className="size-4" />
          </span>
        </button>
      </Heading>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="acc-panel" data-open={open}>
        <div>
          <div className="grid gap-8 pb-8 pl-11 md:grid-cols-2 md:pb-10 md:pl-14">
            <div>
              <p className="type-lead max-w-md">{service.short}</p>
              <p className="type-body mt-4 max-w-md text-fg-muted">{service.description}</p>
            </div>
            <div>
              <ServiceVisual kind={service.visual} className="mb-6 lg:hidden" />
              <p className="type-label text-fg-muted">Typically includes</p>
              <ul className="mt-4 space-y-2.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
