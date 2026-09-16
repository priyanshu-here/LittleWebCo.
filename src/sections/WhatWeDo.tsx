import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'

const pillars = [
  {
    title: 'Design',
    body: 'Interfaces, layouts and visual systems shaped around your customers and how you sell.',
  },
  {
    title: 'Build',
    body: 'Fast, responsive, accessible websites written cleanly enough to grow with you.',
  },
  {
    title: 'Grow & care',
    body: 'SEO foundations, analytics, hosting and updates so the site keeps working after launch.',
  },
]

export function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Eyebrow number="01">What we do</Eyebrow>
            <Reveal>
              <h2 className="type-h2 mt-6 max-w-[13ch]">
                Small by design. <Em>Serious</Em> about the work.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={100}>
              <p className="type-lead">
                We are a small two-person studio where clients work directly with the people designing and building their
                digital experience.
              </p>
              <p className="type-body mt-6 text-fg-muted">
                No account managers, no hand-offs between departments. The people you brief are the people who design
                and build, so decisions are quick and details are never lost in translation.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal group className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-c bg-line-c md:grid-cols-3 lg:mt-20">
          {pillars.map((p, i) => (
            <div key={p.title} {...revealItem(i)} className="bg-surface p-7 md:p-8">
              <span className="type-num text-sm text-fg-muted">0{i + 1}</span>
              <h3 className="type-h4 mt-6">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-fg-muted">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
