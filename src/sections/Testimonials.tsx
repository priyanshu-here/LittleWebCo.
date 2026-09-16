import { hasSampleTestimonials, testimonials } from '@/data/testimonials'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { Quote } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

/**
 * Client feedback. Renders whatever is in src/data/testimonials.ts. Entries
 * flagged `sample` are labelled in the UI and called out above the grid, so
 * illustrative copy is never presented as a genuine customer statement. No
 * ratings, review counts, logos or photos — by design.
 */
export function Testimonials() {
  const items = testimonials

  return (
    <Section id="testimonials" className="border-t border-line-c">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow number="07">Client feedback</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6">
                In their <Em>words.</Em>
              </h2>
            </Reveal>
            {hasSampleTestimonials && (
              <Reveal delay={100}>
                <p className="mt-6 flex max-w-xs items-start gap-2.5 text-fg-muted">
                  <Quote className="mt-1 size-4 shrink-0 text-accent" />
                  <span className="type-small">
                    The quotes shown are sample copy while we collect real feedback. Each is labelled, and they will be
                    replaced with genuine, permissioned client quotes.
                  </span>
                </p>
              </Reveal>
            )}
            {items.length === 0 && (
              <Reveal delay={100}>
                <p className="mt-6 max-w-xs text-fg-muted">
                  We are a young studio and would rather show nothing than something invented. Client feedback will
                  appear here as projects launch.
                </p>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-8">
            {items.length > 0 ? (
              <Reveal group className="grid gap-4 sm:grid-cols-2">
                {items.map((t, i) => (
                  <figure
                    key={t.id}
                    {...revealItem(Math.min(i, 5))}
                    className={cn(
                      'flex h-full flex-col rounded-md border border-line-c bg-surface p-5 transition-ui hover:-translate-y-0.5 hover:border-fg/35 md:p-6',
                      // Let a lone final card fill the row instead of leaving a gap.
                      i === items.length - 1 && items.length % 2 === 1 && 'sm:col-span-2',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Quote className="size-5 shrink-0 text-accent" />
                      {t.sample && (
                        <span className="type-label rounded-full border border-accent/40 px-2.5 py-1.5 text-accent-text">
                          Sample
                        </span>
                      )}
                    </div>
                    <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed">
                      <p>“{t.quote}”</p>
                    </blockquote>
                    <figcaption className="type-small mt-5 flex items-center gap-2.5 border-t border-line-c pt-4 text-fg-muted">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
                      {t.url ? (
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="link-hover-line text-fg">
                          {t.attribution}
                        </a>
                      ) : (
                        t.attribution
                      )}
                      {t.sample && <span className="sr-only"> (sample testimonial, not real client feedback)</span>}
                    </figcaption>
                  </figure>
                ))}
              </Reveal>
            ) : (
              <Reveal className="rounded-md border border-dashed border-line-c p-8 md:p-10">
                <p className="type-label text-fg-muted">Coming soon</p>
                <p className="type-lead mt-4 max-w-lg">
                  Real client feedback, published with permission, once our first client projects go live.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
