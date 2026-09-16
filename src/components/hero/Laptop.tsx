import { useEffect, useState } from 'react'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const KEYS = Array.from({ length: 56 }, (_, i) => i)

/**
 * CSS-only 3D laptop. The lid opens once after mount (transform transition);
 * phones and reduced-motion visitors get the open state immediately.
 * No WebGL, no render loop, nothing runs after the opening completes.
 */
export function Laptop({ className }: { className?: string }) {
  const [state, setState] = useState<'closed' | 'open'>('closed')

  useEffect(() => {
    const id = window.setTimeout(() => setState('open'), 380)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className={cn('laptop-scene', className)} role="img" aria-label={`A laptop opening to reveal the ${site.name} website`}>
      <div className="laptop" aria-hidden>
        <div className="laptop-lid" data-state={state}>
          <div className="laptop-screen">
            <div className="laptop-display">
              <div className="ls">
                <div className="ls-nav">
                  <span className="ls-brand">
                    {site.name}
                    <span style={{ color: 'var(--color-accent)' }}>.</span>
                  </span>
                  <span className="ls-links">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="ls-cta">Start a project</span>
                </div>
                <div className="ls-hero">
                  <div>
                    <span className="ls-eyebrow">Independent digital studio</span>
                    <p className="ls-h">
                      Websites that <em>work</em> for your business.
                    </p>
                    <p className="ls-p">Design, development, SEO and ongoing care from one small team.</p>
                    <div className="ls-btns">
                      <span className="ls-btn">Start a project</span>
                      <span className="ls-btn ghost">View work</span>
                    </div>
                  </div>
                  <div className="ls-art" />
                </div>
                <div className="ls-cards">
                  <div className="ls-card">
                    <b>Design</b>
                    <i />
                    <i />
                  </div>
                  <div className="ls-card">
                    <b>Build</b>
                    <i />
                    <i />
                  </div>
                  <div className="ls-card">
                    <b>Care</b>
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-lid-back">
            <span />
          </div>
        </div>
        <div className="laptop-base-wrap">
          <div className="laptop-base">
            <div className="laptop-keys">
              {KEYS.map((k) => (
                <span key={k} />
              ))}
            </div>
            <div className="laptop-trackpad" />
          </div>
          <div className="laptop-shadow" />
        </div>
      </div>
    </div>
  )
}
