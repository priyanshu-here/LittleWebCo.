import { blueprints } from '@/data/demo/blueprints'
import { comparisonMatrix, levels } from '@/data/demo/levels'
import type { CategoryId, WebsiteLevel } from '@/lib/demo/types'
import { Button } from '@/components/ui/Button'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export function LevelChooser({
  category,
  selected,
  onSelect,
  onBack,
  onBuild,
}: {
  category: CategoryId
  selected: WebsiteLevel | null
  onSelect: (l: WebsiteLevel) => void
  onBack: () => void
  onBuild: () => void
}) {
  const suitsThreeD = blueprints[category]?.threeD !== null

  return (
    <div className="space-y-12">
      <Reveal>
        <h2 className="type-h2 max-w-[20ch]">What kind of website experience do you want?</h2>
        <p className="type-lead mt-5 max-w-xl text-fg-muted">
          We handle the design. This only decides how much motion and interaction it carries.
        </p>
      </Reveal>

      <Reveal group className="grid gap-4 lg:grid-cols-3">
        {levels.map((level, i) => {
          const active = selected === level.id
          return (
            <div key={level.id} {...revealItem(i)}>
              <button
                type="button"
                onClick={() => onSelect(level.id)}
                aria-pressed={active}
                className={cn(
                  'flex h-full w-full flex-col rounded-md border p-6 text-left transition-ui hover:-translate-y-0.5 md:p-7',
                  active ? 'border-fg bg-fg text-bg' : 'border-line-c bg-surface hover:border-fg/40',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={cn('type-label', active ? 'text-bg/70' : 'text-fg-muted')}>{level.strapline}</span>
                  <span
                    aria-hidden
                    className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border', active ? 'border-bg bg-bg' : 'border-fg/30')}
                  >
                    {active && <span className="size-2 rounded-full bg-fg" />}
                  </span>
                </div>
                <h3 className="type-h3 mt-5 uppercase">{level.title}</h3>
                <p className={cn('mt-3 text-[0.9375rem]', active ? 'text-bg/80' : 'text-fg-muted')}>{level.description}</p>
                <p className={cn('type-small mt-4', active ? 'text-bg/70' : 'text-fg-muted')}>{level.bestFor}</p>
                <ul className={cn('mt-6 space-y-2 text-[0.875rem]', active ? 'text-bg/85' : 'text-fg-muted')}>
                  {level.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', active ? 'bg-bg/70' : 'bg-accent')} />
                      {item}
                    </li>
                  ))}
                </ul>
                {level.id === 'professional' && (
                  <p className={cn('type-small mt-6 border-t pt-4', active ? 'border-bg/25 text-bg/70' : 'border-line-c text-fg-muted')}>
                    {suitsThreeD
                      ? 'For your industry we would use an interactive 3D hero.'
                      : 'For your industry 3D would not add anything, so we use a cinematic 2D experience instead.'}
                  </p>
                )}
              </button>
            </div>
          )
        })}
      </Reveal>

      <Reveal>
        <h3 className="type-h4">Compare the three</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">Feature comparison of the Basic, Business and Professional website experiences</caption>
            <thead>
              <tr className="border-b border-line-c">
                <th scope="col" className="type-label py-3 pr-4 font-medium text-fg-muted">
                  Feature
                </th>
                {levels.map((l) => (
                  <th key={l.id} scope="col" className="type-label px-3 py-3 text-center font-medium text-fg">
                    {l.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonMatrix.map((row) => (
                <tr key={row.feature} className="border-b border-line-c">
                  <th scope="row" className="py-3 pr-4 text-[0.9375rem] font-normal">
                    {row.feature}
                  </th>
                  {(['basic', 'business', 'professional'] as const).map((lv) => {
                    const v = row[lv]
                    return (
                      <td key={lv} className="px-3 py-3 text-center">
                        {v === true && (
                          <span className="text-accent-text" aria-label="Included">
                            ✓
                          </span>
                        )}
                        {v === false && (
                          <span className="text-fg-muted/50" aria-label="Not included">
                            —
                          </span>
                        )}
                        {v === 'conditional' && (
                          <span className="type-small text-fg-muted" aria-label="Where it suits your industry">
                            where it fits
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal className="flex flex-wrap items-center gap-3">
        <Button onClick={onBuild} size="lg" disabled={!selected}>
          Build My Demo
        </Button>
        <Button onClick={onBack} variant="ghost" icon="none">
          Back to business details
        </Button>
        {!selected && <p className="type-small text-fg-muted">Choose an experience to continue.</p>}
      </Reveal>
    </div>
  )
}
