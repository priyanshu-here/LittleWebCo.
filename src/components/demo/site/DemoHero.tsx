import { lazy, Suspense, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { DemoMedia } from './DemoMedia'
import { imageAt, type DemoSectionProps } from './sectionProps'
import { cn } from '@/lib/utils'

const Hero3D = lazy(() => import('./Hero3D'))

/** One cheap probe, cached: does this device do WebGL at all? */
let webglSupported: boolean | null = null
function supportsWebGL(): boolean {
  if (webglSupported !== null) return webglSupported
  try {
    const canvas = document.createElement('canvas')
    webglSupported = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    webglSupported = false
  }
  return webglSupported
}

export function DemoHero({ config, onMakeItYours }: DemoSectionProps) {
  const reduced = usePrefersReducedMotion()
  const [render3D, setRender3D] = useState(false)

  // 3D is opt-in per device: never under reduced motion, never on small
  // screens, never without WebGL. The 2D composition stays underneath either way.
  useEffect(() => {
    if (!config.threeD || reduced) {
      setRender3D(false)
      return
    }
    const decide = () => setRender3D(window.innerWidth >= 900 && supportsWebGL())
    decide()
    window.addEventListener('resize', decide)
    return () => window.removeEventListener('resize', decide)
  }, [config.threeD, reduced])

  const hero = imageAt(config, 0)
  const v = config.heroVariant

  const copy = (
    <>
      <p className="d-label d-accent">{config.kicker}</p>
      <h1 className="d-display" style={{ marginTop: '0.9rem' }}>
        {config.headline}
      </h1>
      <p className="d-lead" style={{ marginTop: '1rem', maxWidth: '34rem', opacity: 0.86 }}>
        {config.tagline}
      </p>
      <div className="flex flex-wrap gap-2.5" style={{ marginTop: '1.6rem' }}>
        <button type="button" className="d-btn" onClick={onMakeItYours}>
          {config.primaryCta}
        </button>
        <a href="#d-offerings" className="d-btn d-btn--ghost">
          {config.secondaryCta}
        </a>
      </div>
    </>
  )

  const visual = (ratio: string, className?: string) => (
    <div className={cn('relative', className)}>
      <DemoMedia motif={config.motif} image={hero} alt={`${config.businessName}`} ratio={ratio} eager />
      {render3D && (
        <Suspense fallback={null}>
          <Hero3D kind={config.threeDKind!} accent={config.palette.accent} ink={config.palette.ink} />
        </Suspense>
      )}
    </div>
  )

  if (v === 'fullbleed') {
    return (
      <section id="d-hero" className="relative">
        <div className="relative" style={{ minHeight: 'clamp(22rem, 58cqw, 34rem)' }}>
          <div className="absolute inset-0">
            <DemoMedia motif={config.motif} image={hero} alt={config.businessName} ratio="auto" className="size-full rounded-none" style={{ height: '100%' }} eager />
          </div>
          {render3D && (
            <Suspense fallback={null}>
              <Hero3D kind={config.threeDKind!} accent={config.palette.accent} ink={config.palette.ink} />
            </Suspense>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--d-ink) 82%, transparent) 0%, color-mix(in srgb, var(--d-ink) 46%, transparent) 62%, transparent 100%)' }} />
          <div className="d-wrap relative flex h-full flex-col justify-center" style={{ minHeight: 'clamp(22rem, 58cqw, 34rem)', color: '#fff', paddingBlock: '3rem' }}>
            <div style={{ maxWidth: '40rem' }}>{copy}</div>
          </div>
        </div>
      </section>
    )
  }

  if (v === 'centered') {
    return (
      <section id="d-hero" className="d-section">
        <div className="d-wrap text-center">
          <div className="mx-auto" style={{ maxWidth: '46rem' }}>
            {copy}
          </div>
          {visual('16 / 9', 'mt-10')}
        </div>
      </section>
    )
  }

  if (v === 'editorial') {
    return (
      <section id="d-hero" className="d-section">
        <div className="d-wrap">
          <div style={{ maxWidth: '52rem' }}>{copy}</div>
          <div className="grid gap-4 @3xl:grid-cols-12" style={{ marginTop: '2.5rem' }}>
            {visual('4 / 3', '@3xl:col-span-8')}
            <div className="@3xl:col-span-4 @3xl:self-end">
              <DemoMedia motif={config.motif} image={imageAt(config, 1)} alt={config.businessName} ratio="3 / 4" index={1} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (v === 'showcase') {
    return (
      <section id="d-hero" className="d-section">
        <div className="d-wrap">
          <div className="grid gap-8 @3xl:grid-cols-12 @3xl:items-end">
            <div className="@3xl:col-span-7">{copy}</div>
            <div className="@3xl:col-span-5">{visual('4 / 3')}</div>
          </div>
          <div className="grid gap-3" style={{ marginTop: '1rem', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {[1, 2, 3].map((i) => (
              <DemoMedia key={i} motif={config.motif} image={imageAt(config, i)} alt={config.businessName} ratio="4 / 3" index={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // split
  return (
    <section id="d-hero" className="d-section">
      <div className="d-wrap grid gap-8 @3xl:grid-cols-2 @3xl:items-center">
        <div>{copy}</div>
        {visual('4 / 3')}
      </div>
    </section>
  )
}
