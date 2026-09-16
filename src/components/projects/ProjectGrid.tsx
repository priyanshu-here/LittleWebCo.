import type { Project } from '@/data/projects'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { ProjectCard, type CardVariant } from './ProjectCard'

const pattern: Array<{ variant: CardVariant; className: string }> = [
  { variant: 'feature', className: 'md:col-span-12' },
  { variant: 'half', className: 'md:col-span-6' },
  { variant: 'half-offset', className: 'md:col-span-6 md:mt-20 lg:mt-28' },
  { variant: 'wide', className: 'md:col-span-8' },
  { variant: 'editorial', className: 'md:col-span-4 md:self-end' },
]

export function ProjectGrid({ projects, className, headingLevel = 'h3' }: { projects: Project[]; className?: string; headingLevel?: 'h2' | 'h3' }) {
  return (
    <Reveal group className={cn('grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-20', className)}>
      {projects.map((project, i) => {
        const slot = pattern[i % pattern.length]
        return (
          <div key={project.slug} {...revealItem(i)} className={slot.className}>
            <ProjectCard project={project} variant={slot.variant} headingLevel={headingLevel} />
          </div>
        )
      })}
    </Reveal>
  )
}
