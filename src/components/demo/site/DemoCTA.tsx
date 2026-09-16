import { DReveal } from './DemoPrimitives'
import type { DemoSectionProps } from './sectionProps'

export function DemoCTA({ config, onMakeItYours }: DemoSectionProps) {
  const a = config.animationLevel
  return (
    <section id="d-cta" className="d-section d-ink">
      <DReveal level={a} className="d-wrap">
        <div className="grid gap-6 @3xl:grid-cols-12 @3xl:items-end">
          <div className="@3xl:col-span-7">
            <p className="d-label" style={{ opacity: 0.7 }}>
              {config.categoryLabel}
            </p>
            <h2 className="d-h2" style={{ marginTop: '0.8rem' }}>
              Ready when you are.
            </h2>
            <p className="d-lead" style={{ marginTop: '0.9rem', opacity: 0.78, maxWidth: '32rem' }}>
              Get in touch with {config.businessName} and we will take it from there.
            </p>
          </div>
          <div className="@3xl:col-span-5 @3xl:justify-self-end">
            <button type="button" className="d-btn d-btn--onink" onClick={onMakeItYours}>
              {config.primaryCta}
            </button>
          </div>
        </div>
      </DReveal>
    </section>
  )
}
