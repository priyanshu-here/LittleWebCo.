import { site } from '@/data/site'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ContactButton } from '@/components/ui/ContactButton'
import { Laptop } from '@/components/hero/Laptop'

const serviceLine = ['Web Design', 'UI/UX', 'Development', 'SEO', 'Hosting & Care']

export function Hero() {
  return (
    <Section id="hero" padding="none" className="overflow-hidden">
      <Container className="pb-8 pt-28 md:pt-36 lg:pb-10">
        <Reveal>
          <Eyebrow>Independent digital studio · Est. in India</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          text="We build digital experiences that help small businesses grow."
          accentWords={['grow.']}
          className="type-display mt-6 max-w-[15ch] md:mt-8 lg:max-w-none"
          delay={200}
          stagger={55}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start">
          <Reveal delay={550} className="lg:col-span-5 lg:pt-2">
            <p className="type-lead max-w-md text-fg-muted">
              {site.name} is an independent digital design and development studio helping businesses turn their ideas
              into modern websites, intuitive interfaces and powerful digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactButton size="lg" />
              <Button to="/work" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={350} className="lg:col-span-7">
            <Laptop className="mx-auto max-w-[580px] pb-10 lg:ml-auto lg:mr-4" />
          </Reveal>
        </div>

        <Reveal delay={700} className="type-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line-c pt-5 text-fg-muted">
          {serviceLine.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-accent" />}
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
