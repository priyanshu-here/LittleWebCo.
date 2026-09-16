import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ContactButton } from '@/components/ui/ContactButton'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noIndex />
      <Section padding="none">
        <Container className="flex min-h-[80svh] flex-col justify-center pb-section pt-32">
          <Reveal>
            <Eyebrow>404</Eyebrow>
          </Reveal>
          <SplitText as="h1" text="This page doesn't exist." accentWords={['exist.']} className="type-display mt-6 max-w-4xl" />
          <Reveal delay={400}>
            <p className="type-lead mt-8 max-w-md text-fg-muted">The link may be old, or the page may have moved. Let's get you back on track.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/">Back to home</Button>
              <ContactButton variant="secondary">Get in Touch</ContactButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
