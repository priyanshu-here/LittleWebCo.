import { faqs } from '@/data/faq'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Em } from '@/components/ui/Em'
import { ContactButton } from '@/components/ui/ContactButton'
import { FAQ } from '@/components/faq/FAQ'

export function FAQSection({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Section id="faq" className="border-t border-line-c">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>FAQ</Eyebrow>
              <Reveal>
                <h2 className="type-h2 mt-6">
                  Questions, <Em>answered.</Em>
                </h2>
              </Reveal>
              <Reveal delay={100} className="mt-6">
                <p className="max-w-xs text-fg-muted">Something we have not covered?</p>
                <ContactButton variant="ghost" className="mt-2">
                  Ask us directly
                </ContactButton>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FAQ items={items} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
