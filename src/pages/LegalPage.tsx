import { Navigate, useLocation } from 'react-router'
import { getLegalPage } from '@/data/legal'
import { site } from '@/data/site'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'

export function LegalPage() {
  const { pathname } = useLocation()
  const page = getLegalPage(pathname.replace(/^\/+|\/+$/g, ''))
  if (!page) return <Navigate to="/404" replace />

  return (
    <>
      <Seo title={page.title} description={page.summary} />
      <Section padding="none">
        <Container className="pb-section pt-32 md:pt-44">
          <div className="lg:grid lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-3">
              <Reveal>
                <Eyebrow>Legal</Eyebrow>
              </Reveal>
              <SplitText as="h1" text={page.title} className="type-h1 mt-6" delay={100} />
              <Reveal delay={400}>
                <p className="type-lead mt-6 text-fg-muted">{page.summary}</p>
                <p className="type-small mt-4 text-fg-muted">Last updated {site.legal.lastUpdated}</p>
              </Reveal>

              <Reveal delay={460} className="mt-10 rounded-md border border-dashed border-fg/30 bg-bg-2 p-5">
                <p className="type-label text-accent-text">Draft template</p>
                <p className="type-small mt-2 text-fg-muted">
                  This page is a starting template and has not been legally reviewed. Text in square brackets is a
                  placeholder to be completed. Have the final version checked by a qualified professional before
                  relying on it.
                </p>
              </Reveal>

              <div className="mt-14 space-y-12 border-t border-line-c pt-12">
                {page.sections.map((section, i) => (
                  <Reveal key={section.heading} delay={Math.min(i * 40, 120)}>
                    <h2 className="type-h4">{section.heading}</h2>
                    <div className="mt-4 space-y-4 text-fg-muted">
                      {section.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
