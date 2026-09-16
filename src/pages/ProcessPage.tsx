import { faqs } from '@/data/faq'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { ProcessTimeline } from '@/components/process/ProcessTimeline'
import { PageHero } from '@/sections/PageHero'
import { FAQSection } from '@/sections/FAQSection'
import { FinalCTA } from '@/sections/FinalCTA'

const processFaqs = faqs.filter((f) => ['process', 'timeline', 'revisions', 'call'].includes(f.id))

export function ProcessPage() {
  return (
    <>
      <Seo
        title="Process"
        description="How a project runs at Little Web Company: discover, plan, design, build, launch and care."
      />
      <PageHero
        eyebrow="Process"
        number="04"
        title="How we work."
        accentWords={['work.']}
        lead="Six clear steps, one point of contact throughout. You will always know what is happening and what comes next."
      />
      <Section padding="none" className="pb-section">
        <Container>
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-3">
              <ProcessTimeline headingLevel="h2" />
            </div>
          </div>
        </Container>
      </Section>
      <FAQSection items={processFaqs} />
      <FinalCTA />
    </>
  )
}
