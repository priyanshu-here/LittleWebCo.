import { useEffect, useState } from 'react'
import type { DemoSectionProps } from './sectionProps'
import { cn } from '@/lib/utils'

const labelFor: Record<string, string> = {
  about: 'About',
  offerings: 'Services',
  features: 'Why Us',
  gallery: 'Gallery',
  projects: 'Work',
  testimonials: 'Reviews',
  location: 'Visit',
  contact: 'Contact',
}

export function DemoNavbar({ config, onMakeItYours }: DemoSectionProps) {
  const [open, setOpen] = useState(false)
  const items = config.sections.filter((s) => labelFor[s]).slice(0, 5)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const navLabel = (s: string) => (s === 'offerings' ? config.offeringsLabel : s === 'projects' ? config.projectsLabel : labelFor[s])

  return (
    <header className="sticky top-0 z-30 border-b" style={{ borderColor: 'var(--d-line)', background: 'color-mix(in srgb, var(--d-paper) 88%, transparent)', backdropFilter: 'blur(10px)' }}>
      <div className="d-wrap flex items-center justify-between gap-4" style={{ minHeight: '3.6rem' }}>
        <span className="d-h3 whitespace-nowrap" style={{ fontSize: 'clamp(0.95rem, 1.9cqw, 1.25rem)' }}>
          {config.businessName}
          <span className="d-accent">.</span>
        </span>

        <nav className="hidden items-center gap-5 @3xl:flex" aria-label={`${config.businessName} navigation`}>
          {items.map((s) => (
            <a key={s} href={`#d-${s}`} className="d-body d-muted transition-fast hover:opacity-70" style={{ fontSize: '0.85rem' }}>
              {navLabel(s)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden @xl:block">
            <button type="button" className="d-btn" onClick={onMakeItYours}>
              {config.primaryCta}
            </button>
          </div>
          <button
            type="button"
            className="grid size-9 shrink-0 place-items-center rounded-full @3xl:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            style={{ border: '1px solid var(--d-line)' }}
          >
            <span className="relative block h-2.5 w-4">
              <span className={cn('absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200', open && 'translate-y-[5px] rotate-45')} />
              <span className={cn('absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-200', open && '-translate-y-[5px] -rotate-45')} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="d-wrap @3xl:hidden" style={{ paddingBottom: '1rem' }}>
          <ul className="flex flex-col">
            {items.map((s) => (
              <li key={s} style={{ borderTop: '1px solid var(--d-line)' }}>
                <a href={`#d-${s}`} className="d-body block py-2.5" onClick={() => setOpen(false)}>
                  {navLabel(s)}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="d-btn mt-3 w-full" onClick={onMakeItYours}>
            {config.primaryCta}
          </button>
        </div>
      )}
    </header>
  )
}
