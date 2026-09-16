import { useState } from 'react'
import { services } from '@/data/services'
import { ServiceItem } from './ServiceItem'
import { ServiceVisual } from './ServiceVisual'

interface ServiceListProps {
  /** Open the first service by default. */
  defaultOpen?: boolean
  headingLevel?: 'h2' | 'h3'
}

export function ServiceList({ defaultOpen = true, headingLevel = 'h3' }: ServiceListProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ? services[0].id : null)
  const [hoverId, setHoverId] = useState<string | null>(null)
  const preview = services.find((s) => s.id === (hoverId ?? openId)) ?? services[0]

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <ServiceVisual kind={preview.visual} />
          <div className="mt-5 flex items-baseline justify-between border-t border-line-c pt-4">
            <p className="type-label text-fg-muted">
              <span className="type-num mr-3 text-fg">{preview.number}</span>
              {preview.title}
            </p>
          </div>
        </div>
      </div>
      <ul className="border-t border-line-c lg:col-span-7">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            open={openId === service.id}
            onToggle={() => setOpenId((current) => (current === service.id ? null : service.id))}
            onHover={setHoverId}
            headingLevel={headingLevel}
          />
        ))}
      </ul>
    </div>
  )
}
