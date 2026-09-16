import { Navigate, useParams } from 'react-router'
import { getProject } from '@/data/projects'
import { site } from '@/data/site'
import { breadcrumbJsonLd, Seo } from '@/components/seo/Seo'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/404" replace />
  const origin = site.url || window.location.origin
  return (
    <>
      <Seo
        title={project.title}
        description={project.summary}
        type="article"
        jsonLd={[
          breadcrumbJsonLd(origin, [
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <ProjectDetail project={project} />
    </>
  )
}
