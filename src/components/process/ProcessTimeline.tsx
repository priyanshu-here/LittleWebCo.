import { processSteps } from '@/data/process'
import { Reveal, revealItem } from '@/components/ui/Reveal'

/** Numbered steps with staggered reveal. No scroll-linked JavaScript. */
export function ProcessTimeline({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <Reveal group as="ol" className="relative">
      <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line-c" />
      {processSteps.map((step, i) => (
        <li key={step.number} {...revealItem(i)} className="relative grid grid-cols-[2rem_1fr] gap-x-5 py-7 md:grid-cols-[7rem_1fr] md:py-9">
          <div className="relative">
            <span className="absolute left-0 top-2 size-[15px] rounded-full border border-fg bg-bg" />
            <span className="type-num hidden pl-9 text-fg-muted md:block">Step {step.number}</span>
          </div>
          <div>
            <Heading className="type-h3">
              <span className="type-num mr-3 text-[0.55em] text-fg-muted md:hidden">{step.number}</span>
              {step.title}
            </Heading>
            <p className="mt-3 max-w-lg text-fg-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </Reveal>
  )
}
