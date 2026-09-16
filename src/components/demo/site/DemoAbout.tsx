import { DReveal } from './DemoPrimitives'
import { DemoMedia } from './DemoMedia'
import { imageAt, type DemoSectionProps } from './sectionProps'

export function DemoAbout({ config }: DemoSectionProps) {
  const a = config.animationLevel
  return (
    <section id="d-about" className="d-section">
      <div className="d-wrap grid gap-8 @3xl:grid-cols-12 @3xl:items-center">
        <DReveal level={a} className="@3xl:col-span-6">
          <p className="d-label d-accent">{config.aboutLabel}</p>
          <h2 className="d-h2" style={{ marginTop: '0.75rem' }}>
            {config.businessName}
          </h2>
          <p className="d-lead" style={{ marginTop: '1rem', opacity: 0.88 }}>
            {config.about}
          </p>
          {config.location && (
            <p className="d-body d-muted" style={{ marginTop: '0.9rem' }}>
              Based in {config.location}.
            </p>
          )}
        </DReveal>
        <DReveal level={a} delay={90} className="@3xl:col-span-5 @3xl:col-start-8">
          <DemoMedia motif={config.motif} image={imageAt(config, 1)} alt={`About ${config.businessName}`} ratio="4 / 5" index={1} />
        </DReveal>
      </div>
    </section>
  )
}
