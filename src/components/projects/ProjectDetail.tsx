import { Link } from 'react-router'
import { projectKindLabel, projects, type Project } from '@/data/projects'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'
import { MediaSlot } from '@/components/ui/MediaSlot'
import { Button } from '@/components/ui/Button'
import { ContactButton } from '@/components/ui/ContactButton'
import { ArrowUpRight } from '@/components/ui/Icons'
import { ProjectVisual } from './ProjectVisual'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line-c py-10 md:grid-cols-12 md:py-14">
      <h2 className="type-label text-fg-muted md:col-span-3">{label}</h2>
      <div className="type-lead md:col-span-8 md:col-start-5">{children}</div>
    </Reveal>
  )
}

/** Reusable case-study template: challenge, approach, design, development, result, technology, gallery, final site. */
export function ProjectDetail({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const isConcept = project.kind !== 'client'

  return (
    <article>
      <Section padding="none">
        <Container className="pb-12 pt-32 md:pt-44">
          <Reveal>
            <Link to="/work" className="type-label link-line text-fg-muted">
              All work
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="type-label rounded-full border border-line-c px-3 py-2">{projectKindLabel[project.kind]}</span>
              <span className="type-label text-fg-muted">{project.category}</span>
              <span className="type-label text-fg-muted">{project.year}</span>
            </div>
          </Reveal>
          <SplitText as="h1" text={project.title} className="type-display mt-6" delay={100} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={350} className="lg:col-span-7">
              <p className="type-lead text-fg-muted">{project.summary}</p>
            </Reveal>
            <Reveal delay={420} className="lg:col-span-4 lg:col-start-9">
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="type-label text-fg-muted">Client</dt>
                  <dd className="mt-2 text-[0.9375rem]">{project.client}</dd>
                </div>
                <div>
                  <dt className="type-label text-fg-muted">Industry</dt>
                  <dd className="mt-2 text-[0.9375rem]">{project.industry}</dd>
                </div>
                <div>
                  <dt className="type-label text-fg-muted">Services</dt>
                  <dd className="mt-2 text-[0.9375rem]">{project.services.join(', ')}</dd>
                </div>
                <div>
                  <dt className="type-label text-fg-muted">Technology</dt>
                  <dd className="mt-2 text-[0.9375rem]">{project.technology.join(', ')}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section padding="none">
        <Container>
          <Reveal delay={250}>
            <div className="aspect-[4/3] overflow-hidden rounded-md md:aspect-[16/9]">
              <ProjectVisual project={project} />
            </div>
            {isConcept && (
              <p className="type-small mt-4 text-fg-muted">
                This is a {projectKindLabel[project.kind].toLowerCase()}. {project.title} is a fictional business created
                to explore an approach, not a client.
              </p>
            )}
          </Reveal>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <Row label="Challenge">{project.challenge}</Row>
          <Row label="Approach">{project.approach}</Row>
          <Row label="Design">{project.design}</Row>
          <Row label="Development">{project.development}</Row>
          <Row label="Result">{project.result}</Row>
          <Reveal className="grid gap-4 border-t border-line-c py-10 md:grid-cols-12 md:py-14">
            <h2 className="type-label text-fg-muted md:col-span-3">Technologies</h2>
            <ul className="flex flex-wrap gap-2 md:col-span-8 md:col-start-5">
              {project.technology.map((t) => (
                <li key={t} className="rounded-full border border-line-c px-4 py-2 text-[0.9375rem]">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section padding="sm" className="border-t border-line-c">
        <Container>
          <Reveal>
            <h2 className="type-h3">Gallery</h2>
          </Reveal>
          <Reveal group className="mt-8 grid gap-6 md:grid-cols-2">
            {(project.gallery.length ? project.gallery : project.desktopShots.length ? project.desktopShots : [null, null]).map((shot, i) => (
              <div key={i} data-reveal-item style={{ '--i': i } as React.CSSProperties}>
                <MediaSlot label={`Gallery image ${i + 1}`} hint="Add via src/data/projects.ts" ratio="16 / 10" image={shot ?? undefined} />
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-16">
            <h2 className="type-h3">Mobile</h2>
          </Reveal>
          <Reveal group className="mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
            {(project.mobileShots.length ? project.mobileShots : [null, null, null]).map((shot, i) => (
              <div key={i} data-reveal-item style={{ '--i': i } as React.CSSProperties}>
                <MediaSlot label={`Mobile ${i + 1}`} ratio="9 / 18" image={shot ?? undefined} />
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section padding="sm" className="border-t border-line-c">
        <Container>
          <Reveal className="grid gap-4 border-t border-line-c py-10 md:grid-cols-12 md:py-14">
            <h2 className="type-label text-fg-muted md:col-span-3">Final website</h2>
            <div className="md:col-span-8 md:col-start-5">
              {project.liveUrl ? (
                <Button href={project.liveUrl} icon="external" variant="secondary">
                  Visit the live site
                </Button>
              ) : (
                <p className="type-lead text-fg-muted">
                  {isConcept ? 'Concept projects are not deployed as live websites.' : 'Live website link to be added.'}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <ContactButton>Discuss Your Project</ContactButton>
                <Button to="/work" variant="secondary">
                  View Our Work
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section surface="inverse" padding="sm">
        <Container>
          <Reveal>
            <p className="type-label text-fg-muted">Next project</p>
            <Link to={`/work/${next.slug}`} className="group mt-6 flex items-center justify-between gap-6 rounded-sm">
              <span className="type-h1 transition-fast group-hover:text-accent-display">{next.title}</span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-c transition-ui group-hover:bg-fg group-hover:text-bg md:size-20">
                <ArrowUpRight className="size-6" />
              </span>
            </Link>
            <p className="type-small mt-4 text-fg-muted">
              {next.category} · {next.services.join(' + ')}
            </p>
          </Reveal>
        </Container>
      </Section>
    </article>
  )
}
