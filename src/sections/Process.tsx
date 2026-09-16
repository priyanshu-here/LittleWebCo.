import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { Button } from '@/components/ui/Button'
import { ProcessTimeline } from '@/components/process/ProcessTimeline'

export function Process({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section id="process" className="border-t border-line-c">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow number="04">Process</Eyebrow>
              <Reveal>
                <h2 className="type-h2 mt-6">
                  How we <Em>work.</Em>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 max-w-sm text-fg-muted">
                  Six clear steps, one point of contact throughout. You will always know what is happening and what
                  comes next.
                </p>
              </Reveal>
              {showLink && (
                <Reveal delay={160} className="mt-8">
                  <Button to="/process" variant="ghost">
                    More about the process
                  </Button>
                </Reveal>
              )}
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessTimeline />
          </div>
        </div>
      </Container>
    </Section>
  )
}
