import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type PreviewDevice = 'desktop' | 'mobile'

export function DeviceToggle({ value, onChange }: { value: PreviewDevice; onChange: (d: PreviewDevice) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line-c p-1" role="group" aria-label="Preview size">
      {(['desktop', 'mobile'] as const).map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          aria-pressed={value === d}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm capitalize transition-fast',
            value === d ? 'bg-fg text-bg' : 'text-fg-muted hover:text-fg',
          )}
        >
          {d}
        </button>
      ))}
    </div>
  )
}

/** Frames the generated site. Mobile narrows the container so the demo's own
 *  container queries lay it out exactly as they would on a phone. */
export function DevicePreview({ device, children }: { device: PreviewDevice; children: ReactNode }) {
  return (
    <div className={cn('mx-auto w-full', device === 'mobile' && 'max-w-[390px]')}>
      <div
        className={cn(
          'demo-frame overflow-hidden border border-line-c bg-bg',
          device === 'mobile' ? 'rounded-[1.75rem] p-2' : 'rounded-lg',
        )}
      >
        <div className={cn('overflow-hidden', device === 'mobile' && 'rounded-[1.25rem]')}>{children}</div>
      </div>
    </div>
  )
}
