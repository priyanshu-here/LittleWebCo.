import { DReveal, dItem } from './DemoPrimitives'
import type { DemoSectionProps } from './sectionProps'

/**
 * Figures are intentionally left as placeholders. We do not know the customer's
 * real numbers and will not invent them, so the section shows the layout with a
 * visible "sample figures" marker until they give us the real ones.
 */
export function DemoStats({ config }: DemoSectionProps) {
  const a = config.animationLevel
  return (
    <section id="d-stats" className="d-section d-ink">
      <DReveal level={a} className="d-wrap">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="d-label" style={{ opacity: 0.7 }}>
            {config.businessName} in numbers
          </p>
          <span className="d-sample" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.75)' }}>
            Sample figures
          </span>
        </div>
      </DReveal>
      <DReveal level={a} group className="d-wrap">
        <ul className="grid gap-6" style={{ marginTop: '1.8rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 10rem), 1fr))' }}>
          {config.statLabels.map((label, i) => (
            <li key={label} {...dItem(i, a)}>
              <span className="d-h2" style={{ display: 'block', opacity: 0.35 }}>
                00
              </span>
              <span className="d-body" style={{ display: 'block', marginTop: '0.5rem', opacity: 0.75 }}>
                {label}
              </span>
            </li>
          ))}
        </ul>
        <p className="d-body" style={{ marginTop: '1.6rem', opacity: 0.55, maxWidth: '32rem' }}>
          Your real figures go here once we build this for you.
        </p>
      </DReveal>
    </section>
  )
}
