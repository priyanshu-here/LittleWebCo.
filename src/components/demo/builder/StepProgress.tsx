import { cn } from '@/lib/utils'

export const demoSteps = ['Business', 'Experience', 'Building', 'Your Demo'] as const

export function StepProgress({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Progress">
      {demoSteps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={label} className="flex items-center gap-2.5">
            <span
              className={cn(
                'type-num text-xs transition-fast',
                state === 'current' && 'text-accent-text',
                state === 'done' && 'text-fg',
                state === 'todo' && 'text-fg-muted',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'type-label transition-fast',
                state === 'current' && 'text-fg',
                state === 'done' && 'text-fg-muted',
                state === 'todo' && 'text-fg-muted',
              )}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {label}
            </span>
            {i < demoSteps.length - 1 && <span aria-hidden className={cn('h-px w-6 transition-fast', i < current ? 'bg-accent' : 'bg-line-c')} />}
          </li>
        )
      })}
    </ol>
  )
}
