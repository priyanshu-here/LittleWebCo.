import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Dot } from '@/components/ui/Dot'
import { Button } from '@/components/ui/Button'
import { ServiceList } from '@/components/services/ServiceList'

export function Services() {
  return (
    <Section id="services" className="border-t border-line-c">
      <Container>
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end lg:mb-20">
          <div className="md:col-span-7">
            <Eyebrow number="02">Services</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6">
                Seven ways we can help
                <Dot />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100} className="md:col-span-5 md:justify-self-end">
            <p className="max-w-sm text-fg-muted">
              From a first website to search visibility and long-term care. Every project pairs design and development
              from the first conversation.
            </p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <ServiceList />
        </Reveal>
        <Reveal className="mt-10">
          <Button to="/services" variant="ghost">
            Explore all services
          </Button>
        </Reveal>
      </Container>
    </Section>
  )
}
