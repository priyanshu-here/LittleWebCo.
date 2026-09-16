import { DReveal, dItem, DSectionHead } from './DemoPrimitives'
import { DemoMedia } from './DemoMedia'
import { imageAt, type DemoSectionProps } from './sectionProps'

/** Portfolio-style listing used by the studio and practice categories. */
export function DemoProjects({ config }: DemoSectionProps) {
  const a = config.animationLevel
  const items = config.offerings.slice(0, 4)

  return (
    <section id="d-projects" className="d-section">
      <DSectionHead level={a} label="Selected" title={config.projectsLabel} />
      <DReveal level={a} group className="d-wrap">
        <div className="grid gap-x-6 gap-y-10 @3xl:grid-cols-2" style={{ marginTop: '2.2rem' }}>
          {items.map((p, i) => (
            <article key={p.title} {...dItem(i, a)} className={i % 3 === 0 ? '@3xl:col-span-2' : ''}>
              <DemoMedia motif={config.motif} image={imageAt(config, i)} alt={p.title} ratio={i % 3 === 0 ? '16 / 9' : '4 / 3'} index={i} />
              <div className="flex items-baseline justify-between gap-4" style={{ marginTop: '0.9rem' }}>
                <h3 className="d-h3">{p.title}</h3>
                <span className="d-label d-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="d-body d-muted" style={{ marginTop: '0.4rem', maxWidth: '34rem' }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </DReveal>
    </section>
  )
}
