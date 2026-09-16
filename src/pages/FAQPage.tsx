import { faqs } from '@/data/faq'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { FAQ } from '@/components/faq/FAQ'
import { PageHero } from '@/sections/PageHero'
import { FinalCTA } from '@/sections/FinalCTA'

export function FAQPage() {
  return (
    <>
      <Seo
        title="FAQ"
        description="Answers to common questions about working with Little Web Company."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]}
      />
      <PageHero eyebrow="FAQ" title="Questions, answered." accentWords={['answered.']} />
      <Section padding="none" className="pb-section">
        <Container>
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-3">
              <FAQ items={faqs} defaultOpen={faqs[0].id} headingLevel="h2" />
            </div>
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  )
}
