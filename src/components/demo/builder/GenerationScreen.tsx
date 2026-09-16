import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const steps = [
  'Understanding your business',
  'Creating your website structure',
  'Selecting relevant sections',
  'Preparing your content',
  'Designing your visual experience',
  'Adding your business information',
  'Optimising the experience',
  'Preparing your demo',
]

/**
 * The build screen. Everything is already computed synchronously by the engine;
 * this paces the reveal so the customer can see what was decided on their behalf.
 */
export function GenerationScreen({ businessName, onDone }: { businessName: string; onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const [done, setDone] = useState(0)
  const finished = useRef(false)

  useEffect(() => {
    if (reduced) {
      setDone(steps.length)
      const t = window.setTimeout(() => !finished.current && ((finished.current = true), onDone()), 400)
      return () => window.clearTimeout(t)
    }
    const perStep = 340
    const timers = steps.map((_, i) => window.setTimeout(() => setDone(i + 1), (i + 1) * perStep))
    const end = window.setTimeout(() => {
      if (!finished.current) {
        finished.current = true
        onDone()
      }
    }, steps.length * perStep + 700)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(end)
    }
  }, [reduced, onDone])

  const complete = done >= steps.length

  return (
    <div className="flex min-h-[60svh] flex-col justify-center" role="status" aria-live="polite">
      <p className="type-label text-fg-muted">Building</p>
      <h2 className="type-h1 mt-5 max-w-[16ch]">{complete ? 'Your website is ready.' : `Building ${businessName}…`}</h2>

      <ul className="mt-10 max-w-lg space-y-3">
        {steps.map((step, i) => {
          const state = i < done ? 'done' : i === done ? 'active' : 'todo'
          return (
            <li key={step} className="flex items-center gap-3">
              <span
                aria-hidden
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-full border transition-ui',
                  state === 'done' && 'border-accent bg-accent text-paper',
                  state === 'active' && 'border-fg',
                  state === 'todo' && 'border-line-c',
                )}
              >
                {state === 'done' && (
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                )}
              </span>
              <span className={cn('text-[0.9375rem] transition-ui', state === 'todo' ? 'text-fg-muted/55' : 'text-fg')}>{step}</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 h-px w-full max-w-lg overflow-hidden bg-line-c" aria-hidden>
        <div
          className="h-full bg-accent transition-[width] duration-300 ease-[var(--ease-out)]"
          style={{ width: `${(done / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
