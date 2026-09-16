import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { ContactButton } from '@/components/ui/ContactButton'
import { ScheduleButton } from '@/components/ui/ScheduleButton'

export function FinalCTA() {
  return (
    <Section id="cta" surface="inverse" className="overflow-hidden">
      <Container className="relative">
        <Eyebrow>Let's talk</Eyebrow>
        <Reveal>
          <h2 className="type-display mt-8 max-w-5xl">
            Have something in <Em>mind?</Em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="type-lead max-w-xl text-fg-muted">
              Tell us what you're building, where you're stuck, or where you'd like to go. We'll figure out the next
              step together.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ContactButton size="lg" />
            <ScheduleButton variant="secondary" size="lg" />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
