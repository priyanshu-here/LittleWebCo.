import { founders } from '@/data/founders'
import { site } from '@/data/site'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { FounderCard } from '@/components/about/FounderCard'
import { PageHero } from '@/sections/PageHero'
import { WhyUs } from '@/sections/WhyUs'
import { Global } from '@/sections/Global'
import { FinalCTA } from '@/sections/FinalCTA'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`${site.name} is an independent two-person digital studio founded by Priyanshu Pal and Vanshika Sachan, based in India and working worldwide.`}
      />
      <PageHero
        eyebrow="About"
        number="08"
        title="Two people. One small studio. Big digital ambitions."
        accentWords={['Big']}
        lead={`${site.name} is an independent digital studio founded by two friends with a shared passion for design, technology and helping businesses build a stronger presence online.`}
      />
      <Section padding="none" className="pb-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5">
              <p className="type-label text-fg-muted">How we work</p>
              <p className="type-lead mt-4">
                We are a small two-person studio where clients work directly with the people designing and building their
                digital experience.
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
              <p className="text-fg-muted">
                Small by design, serious about the work. We keep the team to two so that every project gets our full
                attention, communication stays direct, and design and development happen as one connected process
                rather than a hand-off between departments.
              </p>
              <p className="mt-5 text-fg-muted">
                We are based in India and work remotely with businesses anywhere, on a workflow that is the same whether
                a client is across the city or across an ocean.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 lg:mt-24">
            <Reveal>
              <h2 className="type-h3">Meet the founders</h2>
              <p className="mt-3 max-w-md text-fg-muted">A small team building thoughtful digital experiences for growing businesses.</p>
            </Reveal>
            <Reveal group className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              {founders.map((founder, i) => (
                <div key={founder.id} {...revealItem(i)}>
                  <FounderCard founder={founder} />
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>
      <WhyUs />
      <Global />
      <FinalCTA />
    </>
  )
}
