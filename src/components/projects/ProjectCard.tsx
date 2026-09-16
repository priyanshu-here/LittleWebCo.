import { Link } from 'react-router'
import { projectKindLabel, type Project } from '@/data/projects'
import { ArrowUpRight } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'
import { ProjectVisual } from './ProjectVisual'

export type CardVariant = 'feature' | 'half' | 'half-offset' | 'wide' | 'editorial'

const aspect: Record<CardVariant, string> = {
  feature: 'aspect-[4/3] md:aspect-[16/9]',
  half: 'aspect-[4/3]',
  'half-offset': 'aspect-[4/3]',
  wide: 'aspect-[4/3] md:aspect-[16/10]',
  editorial: 'aspect-[4/3] md:aspect-[4/5]',
}

interface ProjectCardProps {
  project: Project
  variant?: CardVariant
  headingLevel?: 'h2' | 'h3'
}

/** Work card. Hover = image scale + arrow shift, CSS transitions only. */
export function ProjectCard({ project, variant = 'half', headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel
  return (
    <article className="group relative">
      <div className={cn('relative overflow-hidden rounded-md bg-bg-2', aspect[variant])}>
        <div className="size-full transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
          <ProjectVisual project={project} />
        </div>
        <span className="type-label absolute left-4 top-4 rounded-full border border-paper/25 bg-ink/50 px-3 py-2 text-paper">
          {projectKindLabel[project.kind]}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 md:mt-6">
        <div className="min-w-0">
          <p className="type-label text-fg-muted">{project.category}</p>
          <Heading className="type-h3 mt-2">
            <Link to={`/work/${project.slug}`} className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              <span className="transition-fast group-hover:text-accent-text group-focus-within:text-accent-text">{project.title}</span>
            </Link>
          </Heading>
        </div>
        <span className="type-num shrink-0 pt-6 text-fg-muted">{project.number}</span>
      </div>
      <p className={cn('type-body mt-3 text-fg-muted', variant === 'feature' ? 'max-w-xl' : 'max-w-md')}>{project.summary}</p>
      <p className="type-small mt-3 text-fg-muted">{project.services.join(' · ')}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg" aria-hidden>
        View project
        <ArrowUpRight className="size-4 transition-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </article>
  )
}
