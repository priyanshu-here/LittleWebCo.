import { useId, type ReactNode } from 'react'
import { ArrowDown } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

export const fieldClass =
  'w-full border-b border-line-c bg-transparent py-3 text-base text-fg outline-none transition-fast placeholder:text-fg-muted/60 focus:border-fg'

export function Field({
  label,
  required,
  optional,
  hint,
  error,
  children,
  className,
}: {
  label: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
  children: (id: string, describedBy?: string) => ReactNode
  className?: string
}) {
  const id = useId()
  const hintId = hint || error ? `${id}-hint` : undefined
  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="type-label block text-fg-muted">
        {label}
        {required && (
          <span className="ml-1 text-accent-text" aria-hidden>
            *
          </span>
        )}
        {optional && <span className="ml-1 normal-case tracking-normal text-fg-muted/80">(optional)</span>}
      </label>
      {children(id, hintId)}
      {(hint || error) && (
        <p id={hintId} className={cn('type-small mt-1.5', error ? 'text-accent-text' : 'text-fg-muted')}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

export function Select({
  id,
  name,
  options,
  value,
  onChange,
  required,
  describedBy,
}: {
  id: string
  name: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (v: string) => void
  required?: boolean
  describedBy?: string
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldClass, 'appearance-none pr-8')}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ArrowDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
    </div>
  )
}
