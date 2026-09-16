import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { links, site } from '@/data/site'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Close, Mail, WhatsApp } from '@/components/ui/Icons'
import { EASE } from '@/lib/utils'
import { ContactForm } from './ContactForm'
import { useContact } from './ContactContext'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Contact overlay: opens from the navbar icon and every "Start a Project" button.
 * Escape and click-outside close it; focus is trapped inside and returned on close.
 */
export function ContactModal() {
  const { isOpen, close } = useContact()
  const panel = useRef<HTMLDivElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)
  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return
    returnTo.current = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key === 'Tab' && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>('input:not([type="checkbox"]), select, textarea')?.focus({ preventScroll: true })
    }, 120)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
      returnTo.current?.focus?.()
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.22 }}
        >
          <button type="button" aria-label="Close contact form" className="absolute inset-0 cursor-default bg-ink/55" onClick={close} tabIndex={-1} />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-2xl border border-line-c bg-bg text-fg sm:max-w-2xl sm:rounded-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985, transition: { duration: 0.18, ease: EASE } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-line-c px-6 py-5 md:px-8">
              <div>
                <p className="type-label text-fg-muted">Contact</p>
                <h2 id="contact-modal-title" className="type-h3 mt-2">
                  Tell us about your project.
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full transition-fast hover:bg-fg/8"
              >
                <Close className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <ContactForm variant="compact" />
              <div className="type-small mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line-c pt-6 text-fg-muted">
                <a href={links.email} className="inline-flex items-center gap-2 text-fg transition-fast hover:text-accent-text">
                  <Mail className="size-4" />
                  {site.contact.email}
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fg transition-fast hover:text-accent-text"
                >
                  <WhatsApp className="size-4" />
                  WhatsApp {site.contact.whatsapp.display}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
