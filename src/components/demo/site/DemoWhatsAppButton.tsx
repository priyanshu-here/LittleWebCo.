import { WhatsApp } from '@/components/ui/Icons'
import { waLink, type DemoSectionProps } from './sectionProps'

/**
 * Floating WhatsApp action. Sticky rather than fixed so it stays inside the
 * demo preview frame instead of escaping onto the Little Web Co. page.
 */
export function DemoWhatsAppButton({ config }: Pick<DemoSectionProps, 'config'>) {
  const wa = waLink(config)
  if (!wa) return null
  return (
    <div
      className="pointer-events-none sticky z-20 flex justify-end"
      style={{ bottom: '1rem', paddingRight: '1rem', height: 0, marginTop: '-4rem' }}
    >
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message ${config.businessName} on WhatsApp`}
        className="pointer-events-auto grid size-12 place-items-center rounded-full text-white transition-fast hover:-translate-y-0.5"
        style={{ background: '#25D366', boxShadow: '0 10px 26px -10px rgba(0,0,0,0.5)' }}
      >
        <WhatsApp className="size-6" />
      </a>
    </div>
  )
}
