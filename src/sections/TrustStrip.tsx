import { trustFacts } from '@/data/whyUs'
import { Container } from '@/components/ui/Container'
import { Reveal, revealItem } from '@/components/ui/Reveal'

/** Credibility strip: only true statements about the studio, no invented logos or numbers. */
export function TrustStrip() {
  return (
    <div className="border-y border-line-c bg-bg text-fg">
      <Container>
        <Reveal group as="ul" className="grid grid-cols-1 gap-x-8 gap-y-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustFacts.map((fact, i) => (
            <li key={fact} {...revealItem(i)} className="type-small flex items-center gap-3 text-fg-muted">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
              {fact}
            </li>
          ))}
        </Reveal>
      </Container>
    </div>
  )
}
