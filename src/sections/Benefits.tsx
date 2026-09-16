import { benefits } from '@/data/whyUs'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'

/** Results / benefits: what a client gets, described without invented metrics. */
export function Benefits() {
  return (
    <Section id="benefits" className="border-t border-line-c">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow number="06">What you get</Eyebrow>
          <Reveal>
            <h2 className="type-h2 mt-6">
              Built to <Em>perform,</Em> not just to look good.
            </h2>
          </Reveal>
        </div>
        <Reveal group className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              {...revealItem(i)}
              className="rounded-md border border-line-c bg-surface p-7 transition-ui hover:-translate-y-0.5 hover:border-fg/35"
            >
              <span aria-hidden className="block size-2 rounded-full bg-accent" />
              <h3 className="type-h4 mt-6">{b.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-fg-muted">{b.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
