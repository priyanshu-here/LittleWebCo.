import { DReveal, dItem, DSectionHead } from './DemoPrimitives'
import type { DemoSectionProps } from './sectionProps'

export function DemoFeatures({ config }: DemoSectionProps) {
  const a = config.animationLevel
  return (
    <section id="d-features" className="d-section">
      <DSectionHead level={a} label="Why us" title={config.featuresLabel} />
      <DReveal level={a} group className="d-wrap">
        <ul className="grid gap-x-8 gap-y-6" style={{ marginTop: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))' }}>
          {config.features.map((f, i) => (
            <li key={f.title} {...dItem(i, a)} style={{ borderTop: '1px solid var(--d-line)', paddingTop: '1.1rem' }}>
              <span className="d-h2 d-accent" style={{ fontSize: 'clamp(1.6rem, 3cqw, 2.4rem)', opacity: 0.45 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="d-h3" style={{ marginTop: '1.2rem' }}>
                {f.title}
              </h3>
              <p className="d-body d-muted" style={{ marginTop: '0.5rem' }}>
                {f.body}
              </p>
            </li>
          ))}
        </ul>
      </DReveal>
    </section>
  )
}
