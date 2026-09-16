import { projects } from '@/data/projects'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { PageHero } from '@/sections/PageHero'
import { FinalCTA } from '@/sections/FinalCTA'

export function WorkPage() {
  return (
    <>
      <Seo
        title="Work"
        description="Selected work from Little Web Company: concept and client projects across business websites, online stores, redesigns and UI/UX."
      />
      <PageHero
        eyebrow="Work"
        number="03"
        title="Selected work."
        lead="A small, growing collection. Concept projects are clearly labelled; client work is added as it launches and with each client's permission."
      />
      <Section padding="none" className="pb-section">
        <Container>
          <ProjectGrid projects={projects} headingLevel="h2" />
          <Reveal className="mt-20 border-t border-line-c pt-6">
            <p className="type-small max-w-xl text-fg-muted">
              Want to see how we would approach your project? Send us a short brief and we will reply with first
              thoughts, no strings attached.
            </p>
          </Reveal>
        </Container>
      </Section>
      <FinalCTA />
    </>
  )
}
