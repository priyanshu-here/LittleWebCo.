import { reasons } from '@/data/whyUs'
import { site } from '@/data/site'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { brandBase } from '@/lib/utils'

export function WhyUs() {
  return (
    <Section id="why-us" className="border-t border-line-c">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow number="05">Why us</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6">
                Why <Em>{brandBase(site.name)}?</Em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <p className="text-fg-muted">
              Because small, done well, is an advantage. Fewer people means clearer thinking, faster decisions and work
              that carries a personal signature.
            </p>
          </Reveal>
        </div>
        <Reveal group as="ol" className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <li key={reason.number} {...revealItem(i)} className="border-t border-line-c py-7">
              <span className="type-num block text-3xl text-fg/50">{reason.number}</span>
              <h3 className="type-h4 mt-8">{reason.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-fg-muted">{reason.description}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
