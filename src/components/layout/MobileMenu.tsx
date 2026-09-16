import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { links, nav, site } from '@/data/site'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { useContact } from '@/components/contact/ContactContext'
import { useScrollLock } from '@/hooks/useScrollLock'
import { cn, EASE, pad } from '@/lib/utils'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const extraLinks = [
  { label: 'Process', to: '/process' },
  { label: 'Blog', to: '/blog' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useScrollLock(open)
  const panel = useRef<HTMLDivElement>(null)
  const { open: openContact } = useContact()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panel.current?.focus({ preventScroll: true }), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, onClose])

  const items = [...nav, ...extraLinks]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-surface="inverse"
          ref={panel}
          tabIndex={-1}
          className="fixed inset-0 z-40 overflow-y-auto bg-bg text-fg outline-none lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: EASE } }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <Container className="flex min-h-full flex-col pb-10 pt-24">
            <nav aria-label="Mobile">
              <ul data-reveal-group className="is-visible">
                {items.map((item, i) => (
                  <li key={item.to} data-reveal-item style={{ '--i': i } as React.CSSProperties}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline gap-5 border-b border-line-c py-4 font-display text-[2.25rem] font-medium tracking-[-0.03em] transition-fast sm:text-[2.75rem]',
                          isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                        )
                      }
                    >
                      <span className="type-label w-6 text-fg-muted">{pad(i + 1)}</span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:items-end">
              <div className="type-small space-y-2 text-fg-muted">
                <p className="type-label mb-4 text-fg-muted">Get in touch</p>
                <a className="link-line block w-fit text-fg" href={links.email}>
                  {site.contact.email}
                </a>
                <a className="link-line block w-fit text-fg" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.contact.whatsapp.display}
                </a>
                <a className="link-line block w-fit text-fg" href={links.tel}>
                  Call {site.contact.phone.display}
                </a>
              </div>
              <Button
                className="w-full sm:w-auto sm:justify-self-end"
                onClick={() => {
                  onClose()
                  openContact()
                }}
              >
                Start a Project
              </Button>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
