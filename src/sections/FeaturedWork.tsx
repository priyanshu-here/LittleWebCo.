import { projects } from '@/data/projects'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Dot } from '@/components/ui/Dot'
import { Button } from '@/components/ui/Button'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { pad } from '@/lib/utils'

export function FeaturedWork() {
  const featured = projects.slice(0, 3)
  return (
    <Section id="work" surface="inverse">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 lg:mb-20">
          <div>
            <Eyebrow number="03">Work</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6 flex items-baseline gap-4">
                <span>
                  Featured work
                  <Dot />
                </span>
                <span className="type-num text-[0.4em] text-fg-muted">({pad(projects.length)})</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <Button to="/work" variant="secondary">
              All projects
            </Button>
          </Reveal>
        </div>
        <ProjectGrid projects={featured} />
        <Reveal className="mt-16 border-t border-line-c pt-6">
          <p className="type-small max-w-xl text-fg-muted">
            The projects shown are concept and self-initiated explorations, clearly labelled as such. Client work will
            appear here as it launches and with each client's permission.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
