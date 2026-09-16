import { DReveal, dItem, DSectionHead } from './DemoPrimitives'
import { DemoMedia } from './DemoMedia'
import { imageAt, type DemoSectionProps } from './sectionProps'

/** Renders whatever this industry calls its offerings: menu, services, properties, programs. */
export function DemoServices({ config }: DemoSectionProps) {
  const a = config.animationLevel
  const withImages = config.brief.images.length > 0 || ['restaurant', 'cafe', 'retail', 'ecommerce', 'real-estate', 'automotive', 'hotel'].includes(config.category)

  return (
    <section id="d-offerings" className="d-section" style={{ background: 'color-mix(in srgb, var(--d-accent) 4%, var(--d-paper))' }}>
      <DSectionHead level={a} label={config.offeringsLabel} title={config.offeringsLabel} intro={config.offeringsIntro} />
      <DReveal level={a} group className="d-wrap" >
        <ul className="grid gap-4" style={{ marginTop: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))' }}>
          {config.offerings.map((o, i) => (
            <li key={o.title} {...dItem(i, a)} className="d-card overflow-hidden">
              {withImages && <DemoMedia motif={config.motif} image={imageAt(config, i + 2)} alt={o.title} ratio="16 / 10" index={i} className="rounded-none" />}
              <div style={{ padding: '1.1rem 1.2rem 1.3rem' }}>
                <p className="d-label d-muted">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="d-h3" style={{ marginTop: '0.55rem' }}>
                  {o.title}
                </h3>
                <p className="d-body d-muted" style={{ marginTop: '0.5rem' }}>
                  {o.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </DReveal>
    </section>
  )
}
