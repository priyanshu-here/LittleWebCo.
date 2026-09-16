import { founders } from '@/data/founders'
import { site } from '@/data/site'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { Button } from '@/components/ui/Button'
import { FounderCard } from '@/components/about/FounderCard'

export function About({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section id="about" className="border-t border-line-c">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Eyebrow number="08">About</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6">
                Two people.
                <br />
                One small studio.
                <br />
                <Em>Big</Em> digital ambitions.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="type-lead mt-8 max-w-md text-fg-muted">
                {site.name} is an independent digital studio founded by two friends with a shared passion for design,
                technology and helping businesses build a stronger presence online.
              </p>
            </Reveal>
            {showLink && (
              <Reveal delay={160} className="mt-8">
                <Button to="/about" variant="ghost">
                  More about the studio
                </Button>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <Reveal>
              <p className="type-label text-fg-muted">Meet the founders</p>
              <p className="mt-3 text-[0.9375rem] text-fg-muted">
                A small team building thoughtful digital experiences for growing businesses.
              </p>
            </Reveal>
            <Reveal group className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {founders.map((founder, i) => (
                <div key={founder.id} {...revealItem(i)}>
                  <FounderCard founder={founder} />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
