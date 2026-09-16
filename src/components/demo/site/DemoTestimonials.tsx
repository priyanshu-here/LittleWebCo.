import { DReveal, dItem, DSectionHead } from './DemoPrimitives'
import type { DemoSectionProps } from './sectionProps'

/**
 * Placeholder feedback, marked as such. We will not put invented quotes from
 * imaginary customers into a business's website without saying what they are.
 */
const samples = [
  { quote: 'Exactly what we were looking for. Easy to deal with from the first conversation.', who: 'Customer review' },
  { quote: 'Good service, fair pricing and they did what they said they would do.', who: 'Customer review' },
  { quote: 'Would happily recommend them to anyone asking.', who: 'Customer review' },
]

export function DemoTestimonials({ config }: DemoSectionProps) {
  const a = config.animationLevel
  return (
    <section id="d-testimonials" className="d-section" style={{ background: 'color-mix(in srgb, var(--d-accent) 5%, var(--d-paper))' }}>
      <DSectionHead level={a} label="Reviews" title="What customers say" />
      <DReveal level={a} className="d-wrap">
        <span className="d-sample" style={{ marginTop: '1rem' }}>
          Sample reviews
        </span>
      </DReveal>
      <DReveal level={a} group className="d-wrap">
        <ul className="grid gap-4" style={{ marginTop: '1.2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))' }}>
          {samples.map((s, i) => (
            <li key={i} {...dItem(i, a)} className="d-card" style={{ padding: '1.3rem' }}>
              <span className="d-h2 d-accent" style={{ fontSize: '1.7rem', lineHeight: 1 }}>
                &ldquo;
              </span>
              <p className="d-body" style={{ marginTop: '0.6rem' }}>
                {s.quote}
              </p>
              <p className="d-label d-muted" style={{ marginTop: '1rem' }}>
                {s.who}
              </p>
            </li>
          ))}
        </ul>
        <p className="d-body d-muted" style={{ marginTop: '1.2rem' }}>
          Your real reviews replace these when we build the site.
        </p>
      </DReveal>
    </section>
  )
}
