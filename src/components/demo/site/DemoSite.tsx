import type { CSSProperties } from 'react'
import type { DemoConfig, SectionId } from '@/lib/demo/types'
import { DemoNavbar } from './DemoNavbar'
import { DemoHero } from './DemoHero'
import { DemoAbout } from './DemoAbout'
import { DemoServices } from './DemoServices'
import { DemoFeatures } from './DemoFeatures'
import { DemoStats } from './DemoStats'
import { DemoGallery } from './DemoGallery'
import { DemoProjects } from './DemoProjects'
import { DemoTestimonials } from './DemoTestimonials'
import { DemoLocation } from './DemoLocation'
import { DemoCTA } from './DemoCTA'
import { DemoContact } from './DemoContact'
import { DemoFooter } from './DemoFooter'
import { DemoWhatsAppButton } from './DemoWhatsAppButton'
import type { DemoSectionProps } from './sectionProps'
import './demo.css'

/**
 * Renders a generated website from a DemoConfig. There is no fixed template:
 * the engine decides which of these sections appear and in what order, and the
 * level decides how much motion and interaction each one gets.
 */
const registry: Record<Exclude<SectionId, 'hero'>, (p: DemoSectionProps) => React.ReactNode> = {
  about: DemoAbout,
  offerings: DemoServices,
  features: DemoFeatures,
  stats: DemoStats,
  gallery: DemoGallery,
  projects: DemoProjects,
  testimonials: DemoTestimonials,
  location: DemoLocation,
  cta: DemoCTA,
  contact: DemoContact,
}

export function DemoSite({ config, onMakeItYours }: { config: DemoConfig; onMakeItYours: () => void }) {
  const p = config.palette
  const vars = {
    '--d-accent': p.accent,
    '--d-ink': p.ink,
    '--d-paper': p.paper,
    '--d-surface': p.surface,
    '--d-fg': p.fg,
    '--d-muted': p.muted,
    '--d-line': p.line,
  } as CSSProperties

  const props: DemoSectionProps = { config, onMakeItYours }

  return (
    <div className="dsite" style={vars} data-animation={config.animationLevel} data-interaction={config.interactionLevel} lang="en">
      <DemoNavbar {...props} />
      <main>
        <DemoHero {...props} />
        {config.sections
          .filter((s): s is Exclude<SectionId, 'hero'> => s !== 'hero')
          .map((id) => {
            const Section = registry[id]
            return Section ? <Section key={id} {...props} /> : null
          })}
      </main>
      <DemoFooter {...props} />
      <DemoWhatsAppButton config={config} />
    </div>
  )
}
