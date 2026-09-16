import { useState } from 'react'
import type { FaqItem } from '@/data/faq'
import { Plus } from '@/components/ui/Icons'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export function FAQ({ items, defaultOpen, headingLevel = 'h3' }: { items: FaqItem[]; defaultOpen?: string; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null)

  return (
    <Reveal group as="ul" className="border-t border-line-c">
      {items.map((item, i) => {
        const open = openId === item.id
        const panelId = `faq-${item.id}`
        const buttonId = `faq-${item.id}-button`
        return (
          <li key={item.id} {...revealItem(Math.min(i, 5))} className="border-b border-line-c">
            <Heading>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId((c) => (c === item.id ? null : item.id))}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className={cn('type-h4 transition-fast', open ? 'text-fg' : 'group-hover:text-accent-text')}>{item.question}</span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line-c transition-ui',
                    open ? 'rotate-45 border-fg bg-fg text-bg' : 'group-hover:border-fg',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="acc-panel" data-open={open}>
              <div>
                <p className="max-w-2xl pb-7 text-fg-muted">{item.answer}</p>
              </div>
            </div>
          </li>
        )
      })}
    </Reveal>
  )
}
