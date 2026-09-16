import type { ReactNode } from 'react'
import { links, site } from '@/data/site'
import { Phone, WhatsApp } from '@/components/ui/Icons'

interface ActionProps {
  href: string
  label: string
  short: string
  icon: ReactNode
  external?: boolean
}

function Action({ href, label, short, icon, external }: ActionProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="group flex h-12 items-center rounded-full border border-bg/20 bg-fg px-3 text-bg shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] transition-ui hover:-translate-y-0.5"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="grid size-6 shrink-0 place-items-center">{icon}</span>
      <span
        aria-hidden
        className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-[max-width,opacity,padding] duration-300 ease-[var(--ease-out)] group-hover:max-w-40 group-hover:pl-2.5 group-hover:pr-1 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pl-2.5 group-focus-visible:pr-1 group-focus-visible:opacity-100"
      >
        {short}
      </span>
    </a>
  )
}

export function FloatingContactButtons() {
  return (
    <div
      className="fixed right-4 z-30 flex flex-col items-end gap-2 md:right-6"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      role="group"
      aria-label="Quick contact"
    >
      <Action
        href={links.whatsapp}
        label={`Chat on WhatsApp, ${site.contact.whatsapp.display}`}
        short="WhatsApp"
        icon={<WhatsApp className="size-[22px]" />}
        external
      />
      <Action href={links.tel} label={`Call ${site.contact.phone.display}`} short="Call us" icon={<Phone className="size-5" />} />
    </div>
  )
}
