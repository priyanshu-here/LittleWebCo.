import { globalPoints } from '@/data/whyUs'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { useIndiaTime } from '@/hooks/useIndiaTime'

export function Global() {
  const time = useIndiaTime()
  return (
    <Section id="global" className="border-t border-line-c">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Eyebrow>Global</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6">
                Based in India.
                <br />
                Working with businesses <Em>worldwide.</Em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100} className="lg:col-span-4">
            <p className="text-fg-muted">
              We work remotely with businesses wherever they are. Calls are scheduled around your time zone, updates
              arrive in your inbox, and the workflow is the same whether you are across the city or across an ocean.
            </p>
          </Reveal>
        </div>
        <Reveal delay={140} className="mt-14 grid gap-6 border-t border-line-c pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
            {globalPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
          <p className="type-label flex items-center gap-2 text-fg-muted">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            Studio time {time} IST
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
