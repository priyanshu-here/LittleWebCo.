import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { budgetRanges, projectTypes, timelines } from '@/data/contact'
import { links, site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { ArrowDown } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full border-b border-line-c bg-transparent py-3 text-base text-fg outline-none transition-fast placeholder:text-fg-muted/60 focus:border-fg'

function Field({
  label,
  required,
  optional,
  children,
  className,
}: {
  label: string
  required?: boolean
  optional?: boolean
  children: (id: string) => ReactNode
  className?: string
}) {
  const id = useId()
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
      {children(id)}
    </div>
  )
}

function Select({ id, name, options, required }: { id: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div className="relative">
      <select id={id} name={name} required={required} defaultValue="" className={cn(fieldClass, 'appearance-none pr-8')}>
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ArrowDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
    </div>
  )
}

interface ContactFormProps {
  /** `compact` is used in the contact overlay; `full` on the contact page. */
  variant?: 'compact' | 'full'
}

export function ContactForm({ variant = 'full' }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')
  const compact = variant === 'compact'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot

    if (!ACCESS_KEY) {
      setStatus('error')
      setError('The form is not connected yet. Please email us directly.')
      return
    }

    setStatus('submitting')
    setError('')
    const entries = Object.fromEntries(data.entries()) as Record<string, string>
    delete entries.botcheck
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New project inquiry from ${entries.name || 'the website'}`,
      from_name: `${site.name} website`,
      ...entries,
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !json.success) throw new Error(json.message || 'Something went wrong.')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us.')
    }
  }

  if (status === 'success') {
    return (
      <div id="enquiry" role="status" aria-live="polite" className="rounded-md border border-line-c bg-surface p-8 md:p-10">
        <span aria-hidden className="block size-2.5 rounded-full bg-accent" />
        <h3 className="type-h3 mt-6">Thank you. We have your inquiry.</h3>
        <p className="mt-4 max-w-md text-fg-muted">
          We read every message ourselves and will reply by email with the next steps. If it is urgent, message us on
          WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={links.whatsapp} icon="external" variant="secondary">
            WhatsApp us
          </Button>
          <Button variant="ghost" onClick={() => setStatus('idle')}>
            Send another inquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form id="enquiry" onSubmit={onSubmit} noValidate className={cn('scroll-mt-28', compact ? 'space-y-7' : 'space-y-10')}>
      {/* Honeypot: hidden from users, filled only by bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className={cn('grid gap-7 sm:grid-cols-2', !compact && 'gap-8')}>
        <Field label="Name" required>
          {(id) => <input id={id} name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />}
        </Field>
        <Field label="Email" required>
          {(id) => <input id={id} name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />}
        </Field>
        <Field label="Company / Business">
          {(id) => <input id={id} name="Company" type="text" autoComplete="organization" placeholder="Company name" className={fieldClass} />}
        </Field>
        <Field label="Project type" required>
          {(id) => <Select id={id} name="Project type" options={projectTypes} required />}
        </Field>
        <Field label="Budget" optional>
          {(id) => <Select id={id} name="Budget range" options={budgetRanges} />}
        </Field>
        {!compact && (
          <>
            <Field label="Country">
              {(id) => <input id={id} name="Country" type="text" autoComplete="country-name" placeholder="Where you are based" className={fieldClass} />}
            </Field>
            <Field label="Phone / WhatsApp">
              {(id) => <input id={id} name="Phone" type="tel" autoComplete="tel" placeholder="+91 …" className={fieldClass} />}
            </Field>
            <Field label="Expected timeline">
              {(id) => <Select id={id} name="Expected timeline" options={timelines} />}
            </Field>
          </>
        )}
      </div>

      <Field label={compact ? 'Message' : 'Tell us about your project'} required>
        {(id) => (
          <textarea
            id={id}
            name="message"
            required
            rows={compact ? 4 : 5}
            placeholder="What are you building, who is it for, and what would make it a success?"
            className={cn(fieldClass, 'resize-y')}
          />
        )}
      </Field>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size={compact ? 'md' : 'lg'} disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
        </Button>
        <p className="type-small max-w-xs text-fg-muted">We reply to every inquiry personally. Your details are only used to respond to you.</p>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status === 'error' && (
          <p className="type-small text-accent-text">
            {error}{' '}
            <a href={links.email} className="link-line text-fg">
              Email {site.contact.email}
            </a>
          </p>
        )}
      </div>
    </form>
  )
}
