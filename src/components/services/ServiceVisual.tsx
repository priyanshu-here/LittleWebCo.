import { AnimatePresence, motion } from 'framer-motion'
import type { ServiceVisualKind } from '@/data/services'
import { cn, EASE } from '@/lib/utils'

function Bar({ className }: { className?: string }) {
  return <div className={cn('h-1.5 rounded-full bg-fg/15', className)} />
}

function Frame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn('absolute overflow-hidden rounded-lg border border-fg/15 bg-surface', className)}>{children}</div>
}

function Chrome() {
  return (
    <div className="flex h-6 items-center gap-1.5 border-b border-fg/10 px-3">
      <span className="size-1.5 rounded-full bg-fg/25" />
      <span className="size-1.5 rounded-full bg-fg/25" />
      <span className="size-1.5 rounded-full bg-fg/25" />
    </div>
  )
}

function Check() {
  return (
    <span className="grid size-4 place-items-center rounded-full bg-fg text-bg">
      <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m5 12 5 5L20 7" />
      </svg>
    </span>
  )
}

const visuals: Record<ServiceVisualKind, React.ReactNode> = {
  site: (
    <Frame className="inset-[9%]">
      <Chrome />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Bar className="w-12 bg-fg/70" />
          <div className="flex gap-2">
            <Bar className="w-6" />
            <Bar className="w-6" />
            <Bar className="w-8 bg-fg/50" />
          </div>
        </div>
        <div className="mt-7 grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="h-4 w-[85%] rounded bg-fg" />
            <div className="mt-2 h-4 w-[60%] rounded bg-fg" />
            <Bar className="mt-4 w-[80%]" />
            <Bar className="mt-2 w-[65%]" />
            <div className="mt-5 h-7 w-24 rounded-full bg-accent" />
          </div>
          <div className="col-span-2 rounded-md border border-fg/15 text-fg hatch" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-fg/6 p-3">
              <div className="h-8 rounded bg-fg/10" />
              <Bar className="mt-2 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),
  ui: (
    <>
      <Frame className="left-1/2 top-[8%] h-[84%] w-[36%] -translate-x-1/2 rounded-[1.4rem] border-fg/25">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-fg/20" />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Bar className="w-10 bg-fg/70" />
            <span className="size-5 rounded-full bg-fg/15" />
          </div>
          <div className="mt-5 rounded-lg bg-fg p-3 text-bg">
            <div className="h-2 w-1/2 rounded bg-bg/70" />
            <div className="mt-2 h-4 w-3/4 rounded bg-bg" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="mt-3 flex items-center justify-between rounded-md border border-fg/10 p-2.5">
              <div>
                <Bar className="w-12 bg-fg/60" />
                <Bar className="mt-1.5 w-8" />
              </div>
              <span className={cn('h-4 w-8 rounded-full', i === 0 ? 'bg-accent' : 'bg-fg/15')}>
                <span className={cn('mt-0.5 block size-3 rounded-full bg-surface', i === 0 ? 'ml-4' : 'ml-0.5')} />
              </span>
            </div>
          ))}
        </div>
      </Frame>
      <Frame className="left-[6%] top-[18%] w-[24%] -rotate-3 p-3">
        <Bar className="w-8 bg-fg/60" />
        <div className="mt-2 h-10 rounded bg-fg/8" />
        <div className="mt-2 h-5 w-14 rounded-full bg-fg" />
      </Frame>
      <Frame className="right-[6%] top-[52%] w-[24%] rotate-2 p-3">
        <div className="flex gap-1.5">
          <span className="size-4 rounded-full bg-accent" />
          <span className="size-4 rounded-full bg-fg" />
          <span className="size-4 rounded-full bg-fg/30" />
        </div>
        <Bar className="mt-3 w-full" />
        <Bar className="mt-1.5 w-2/3" />
      </Frame>
    </>
  ),
  business: (
    <Frame className="inset-[9%]">
      <Chrome />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-fg/80" />
          <div className="h-6 w-16 rounded-full bg-fg" />
        </div>
        <div className="mt-6 grid grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="h-4 w-[90%] rounded bg-fg" />
            <div className="mt-2 h-4 w-[55%] rounded bg-fg" />
            <Bar className="mt-4 w-[75%]" />
            <Bar className="mt-2 w-[60%]" />
          </div>
          <div className="col-span-2 rounded-md bg-fg/8 p-3">
            <Bar className="w-1/2 bg-fg/50" />
            <div className="mt-2 h-6 rounded border border-fg/15" />
            <div className="mt-2 h-6 rounded border border-fg/15" />
            <div className="mt-2 h-6 w-2/3 rounded-full bg-accent" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-md border border-fg/10 px-2 py-2">
              <span className="size-3 rounded-full bg-fg/20" />
              <Bar className="w-2/3 bg-fg/40" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),
  landing: (
    <Frame className="inset-x-[16%] inset-y-[8%]">
      <Chrome />
      <div className="flex flex-col items-center px-6 pt-8 text-center">
        <Bar className="w-14 bg-accent" />
        <div className="mt-4 h-5 w-[80%] rounded bg-fg" />
        <div className="mt-2 h-5 w-[55%] rounded bg-fg" />
        <Bar className="mt-4 w-[70%]" />
        <Bar className="mt-2 w-[50%]" />
        <div className="mt-6 flex w-full gap-2">
          <div className="h-8 flex-1 rounded-full border border-fg/20" />
          <div className="h-8 w-20 rounded-full bg-accent" />
        </div>
        <div className="mt-6 grid w-full grid-cols-3 gap-2">
          <div className="h-10 rounded bg-fg/8" />
          <div className="h-10 rounded bg-fg/8" />
          <div className="h-10 rounded bg-fg/8" />
        </div>
      </div>
    </Frame>
  ),
  redesign: (
    <>
      <Frame className="left-[6%] top-[14%] h-[72%] w-[40%] border-dashed border-fg/30 bg-bg-2 p-3 opacity-80">
        <div className="h-3 w-full bg-fg/25" />
        <div className="mt-2 flex gap-2">
          <div className="h-8 w-8 bg-fg/20" />
          <div className="h-8 flex-1 bg-fg/10" />
        </div>
        <div className="mt-2 h-10 w-[70%] bg-fg/15" />
        <div className="mt-1 h-4 w-[90%] bg-fg/25" />
        <div className="mt-1 h-4 w-[40%] bg-fg/25" />
        <div className="mt-2 grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-fg/10" />
          ))}
        </div>
      </Frame>
      <div className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-paper">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </div>
      <Frame className="right-[6%] top-[14%] h-[72%] w-[40%]">
        <Chrome />
        <div className="p-3">
          <div className="h-4 w-[70%] rounded bg-fg" />
          <Bar className="mt-2 w-[85%]" />
          <Bar className="mt-1.5 w-[60%]" />
          <div className="mt-3 h-12 rounded-md border border-fg/15 text-fg hatch" />
          <div className="mt-3 h-6 w-16 rounded-full bg-fg" />
        </div>
      </Frame>
    </>
  ),
  seo: (
    <Frame className="inset-[9%]">
      <div className="flex h-9 items-center gap-2 border-b border-fg/10 px-3">
        <div className="flex h-6 flex-1 items-center gap-2 rounded-full border border-fg/15 px-3">
          <span className="size-2.5 rounded-full border border-fg/40" />
          <Bar className="w-1/3 bg-fg/40" />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-md border border-accent/50 bg-accent/5 p-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-fg" />
            <Bar className="w-16 bg-fg/50" />
          </div>
          <div className="mt-2 h-3 w-[70%] rounded bg-fg" />
          <Bar className="mt-2 w-[90%]" />
          <Bar className="mt-1.5 w-[60%]" />
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="p-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-fg/25" />
              <Bar className="w-14" />
            </div>
            <div className="mt-2 h-3 w-[55%] rounded bg-fg/40" />
            <Bar className="mt-2 w-[80%]" />
          </div>
        ))}
      </div>
    </Frame>
  ),
  care: (
    <Frame className="inset-[9%]">
      <Chrome />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Bar className="w-16 bg-fg/70" />
          <span className="flex items-center gap-1.5 rounded-full border border-fg/15 px-2 py-1">
            <span className="size-1.5 rounded-full bg-accent" />
            <Bar className="w-6" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[72, 91, 58].map((w, i) => (
            <div key={i} className="rounded-md bg-fg/6 p-3">
              <Bar className="w-8" />
              <div className="mt-3 h-1.5 rounded-full bg-fg/10">
                <div className={cn('h-full rounded-full', i === 1 ? 'bg-accent' : 'bg-fg')} style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border border-fg/10 px-3 py-2">
              <Check />
              <Bar className={cn(i % 2 ? 'w-1/2' : 'w-2/3', 'bg-fg/40')} />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),
}

export function ServiceVisual({ kind, className }: { kind: ServiceVisualKind; className?: string }) {
  return (
    <div className={cn('relative aspect-[4/3] w-full overflow-hidden rounded-md bg-bg-2 grid-paper', className)} aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={kind}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {visuals[kind]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
