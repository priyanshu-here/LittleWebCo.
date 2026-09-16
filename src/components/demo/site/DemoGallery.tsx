import { DReveal, dItem, DSectionHead } from './DemoPrimitives'
import { DemoMedia } from './DemoMedia'
import { imageAt, type DemoSectionProps } from './sectionProps'

export function DemoGallery({ config }: DemoSectionProps) {
  const a = config.animationLevel
  const count = config.contentDensity === 'rich' ? 6 : 5
  const tiles = Array.from({ length: count }, (_, i) => i)
  // Deliberately uneven so the grid reads as editorial rather than a plain strip.
  const spans = ['@3xl:col-span-7', '@3xl:col-span-5', '@3xl:col-span-4', '@3xl:col-span-4', '@3xl:col-span-4', '@3xl:col-span-12']
  const ratios = ['4 / 3', '4 / 3', '1 / 1', '1 / 1', '1 / 1', '21 / 9']

  return (
    <section id="d-gallery" className="d-section">
      <DSectionHead level={a} label="Gallery" title={config.galleryLabel} />
      <DReveal level={a} group className="d-wrap">
        <div className="grid gap-3 @3xl:grid-cols-12" style={{ marginTop: '2rem' }}>
          {tiles.map((i) => (
            <div key={i} {...dItem(Math.min(i, 5), a)} className={spans[i]}>
              <DemoMedia motif={config.motif} image={imageAt(config, i)} alt={`${config.businessName} gallery image ${i + 1}`} ratio={ratios[i]} index={i} />
            </div>
          ))}
        </div>
      </DReveal>
    </section>
  )
}
