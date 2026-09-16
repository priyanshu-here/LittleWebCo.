import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildDemoConfig } from '@/lib/demo/engine'
import { clearState, loadState, saveState } from '@/lib/demo/storage'
import { track } from '@/lib/demo/analytics'
import { blueprints } from '@/data/demo/blueprints'
import { levelById } from '@/data/demo/levels'
import { site } from '@/data/site'
import type { BusinessBrief, DemoLead, WebsiteLevel } from '@/lib/demo/types'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Em } from '@/components/ui/Em'
import { StepProgress } from '@/components/demo/builder/StepProgress'
import { BusinessForm, emptyBrief } from '@/components/demo/builder/BusinessForm'
import { LevelChooser } from '@/components/demo/builder/LevelChooser'
import { GenerationScreen } from '@/components/demo/builder/GenerationScreen'
import { DevicePreview, DeviceToggle, type PreviewDevice } from '@/components/demo/builder/DevicePreview'
import { DemoEnquiryForm } from '@/components/demo/builder/DemoEnquiryForm'
import { SuccessScreen } from '@/components/demo/builder/SuccessScreen'
import { DemoSite } from '@/components/demo/site/DemoSite'

type Stage = 'business' | 'experience' | 'building' | 'demo' | 'enquiry' | 'done'
const stageIndex: Record<Stage, number> = { business: 0, experience: 1, building: 2, demo: 3, enquiry: 3, done: 3 }

export function DemoPage() {
  const [stage, setStage] = useState<Stage>('business')
  const [brief, setBrief] = useState<BusinessBrief>(emptyBrief)
  const [level, setLevel] = useState<WebsiteLevel | null>(null)
  const [device, setDevice] = useState<PreviewDevice>('desktop')
  const [lead, setLead] = useState<DemoLead | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // Restore an in-progress brief after a refresh. Images cannot survive a
  // reload (they are local object URLs), so the customer re-picks those.
  useEffect(() => {
    track('demo_page_view')
    const saved = loadState()
    if (saved?.brief) {
      setBrief({ ...saved.brief, images: [] })
      if (saved.level) setLevel(saved.level)
    }
  }, [])

  useEffect(() => {
    if (stage === 'done') return
    const { images: _images, ...rest } = brief
    saveState({ brief: rest, level, step: stageIndex[stage] })
  }, [brief, level, stage])

  const goto = useCallback((next: Stage) => {
    setStage(next)
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [])

  const config = useMemo(() => (level ? buildDemoConfig(brief, level) : null), [brief, level])

  const handleMakeItYours = useCallback(() => {
    track('make_it_yours_clicked', { level: level ?? 'none', category: brief.category || 'none' })
    goto('enquiry')
  }, [goto, level, brief.category])

  return (
    <>
      <Seo
        title="Build Your Website Demo"
        description={`Tell ${site.name} about your business and instantly explore a personalised website experience designed around it.`}
      />

      {/* Intro + progress, shown until the demo takes over the screen */}
      <Section padding="none">
        <Container className="pt-32 md:pt-40">
          <div ref={topRef} className="scroll-mt-28" />
          {stage === 'business' && (
            <>
              <Reveal>
                <Eyebrow>Website demo builder</Eyebrow>
              </Reveal>
              <SplitText as="h1" text="Let's Build Your Website" accentWords={['Website']} className="type-display mt-6 max-w-[16ch]" delay={120} />
              <Reveal delay={420}>
                <p className="type-lead mt-8 max-w-2xl text-fg-muted">
                  Tell us about your business. We'll create a website experience designed around it.
                </p>
              </Reveal>
            </>
          )}
          <Reveal className={stage === 'business' ? 'mt-12' : 'mt-2'}>
            <StepProgress current={stageIndex[stage]} />
          </Reveal>
        </Container>
      </Section>

      <Section padding="none" className="pb-section">
        <Container>
          {stage === 'business' && (
            <div className="mt-12 lg:mt-16">
              <BusinessForm
                value={brief}
                onChange={setBrief}
                onStart={() => track('business_details_started')}
                onSubmit={() => {
                  track('business_details_completed', { category: brief.category, images: brief.images.length })
                  goto('experience')
                }}
              />
            </div>
          )}

          {stage === 'experience' && (
            <div className="mt-12 lg:mt-16">
              <LevelChooser
                category={brief.category in blueprints ? brief.category : 'other'}
                selected={level}
                onSelect={(l) => {
                  setLevel(l)
                  track('website_level_selected', { level: l, category: brief.category })
                }}
                onBack={() => goto('business')}
                onBuild={() => {
                  track('demo_generation_started', { level: level ?? 'none', category: brief.category })
                  goto('building')
                }}
              />
            </div>
          )}

          {stage === 'building' && config && (
            <GenerationScreen
              businessName={config.businessName}
              onDone={() => {
                track('demo_generation_completed', {
                  level: config.level,
                  category: config.category,
                  sections: config.sections.length,
                  threeD: config.threeD,
                })
                goto('demo')
              }}
            />
          )}

          {stage === 'enquiry' && config && (
            <div className="mt-12 lg:mt-16">
              <DemoEnquiryForm
                config={config}
                onBack={() => goto('demo')}
                onSuccess={(l) => {
                  setLead(l)
                  clearState()
                  goto('done')
                }}
              />
            </div>
          )}

          {stage === 'done' && lead && <SuccessScreen lead={lead} />}
        </Container>
      </Section>

      {/* The generated website */}
      {stage === 'demo' && config && (
        <>
          <Section padding="none" className="pb-10">
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line-c pt-8">
                <div>
                  <p className="type-label text-fg-muted">Your demo</p>
                  <h2 className="type-h2 mt-4">
                    {config.businessName}
                    <Em>.</Em>
                  </h2>
                  <p className="type-small mt-3 max-w-xl text-fg-muted">
                    {levelById(config.level).title} experience · {config.categoryLabel}
                    {config.categoryInferred && ' (matched from your description)'} · {config.sections.length} sections
                    {config.threeD ? ' · interactive 3D hero' : ''}
                  </p>
                </div>
                <DeviceToggle value={device} onChange={setDevice} />
              </div>
            </Container>
          </Section>

          <Container className="pb-16">
            <DevicePreview device={device}>
              <DemoSite config={config} onMakeItYours={handleMakeItYours} />
            </DevicePreview>
          </Container>

          <Section surface="inverse" padding="sm">
            <Container>
              <Reveal>
                <p className="type-label text-fg-muted">Like what you see?</p>
                <h2 className="type-h1 mt-6 max-w-[14ch]">
                  Ready to take your business <Em>online?</Em>
                </h2>
                <p className="type-lead mt-6 max-w-xl text-fg-muted">
                  Turn this demo into a fully customised website for your business. We'll pick up everything you have
                  already told us.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button onClick={handleMakeItYours} size="lg">
                    Make It Yours
                  </Button>
                  <Button onClick={() => goto('experience')} variant="secondary" icon="none">
                    Try another experience
                  </Button>
                </div>
              </Reveal>
            </Container>
          </Section>
        </>
      )}
    </>
  )
}
