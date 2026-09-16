import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { buildLead } from '@/lib/demo/engine'
import { track } from '@/lib/demo/analytics'
import { submitToWeb3Forms, Web3FormsError } from '@/lib/web3forms'
import { links, site } from '@/data/site'
import type { DemoConfig, DemoLead } from '@/lib/demo/types'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { Field, fieldClass } from './fields'

type Status = 'idle' | 'submitting' | 'error'

/**
 * "Make It Yours". Everything the customer already told us is pre-filled and
 * still editable, so nobody retypes their details. Submission goes through the
 * same Web3Forms path as the site's own contact form.
 */
export function DemoEnquiryForm({ config, onBack, onSuccess }: { config: DemoConfig; onBack: () => void; onSuccess: (lead: DemoLead) => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [lead, setLead] = useState<DemoLead>(() => buildLead(config, {}))
  const started = useRef(false)

  useEffect(() => {
    track('contact_form_started', { level: config.level, category: config.category })
  }, [config.level, config.category])

  const set = <K extends keyof DemoLead>(k: K, v: DemoLead[K]) => {
    if (!started.current) started.current = true
    setLead((prev) => ({ ...prev, [k]: v }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if ((new FormData(form).get('botcheck') as string) || '') return // honeypot

    setStatus('submitting')
    setError('')
    const payload = { ...lead, createdAt: new Date().toISOString() }

    try {
      await submitToWeb3Forms({
        subject: `New website demo lead — ${payload.businessName || 'Unnamed business'} (${payload.websiteLevel})`,
        fromName: `${site.name} demo builder`,
        fields: {
          'Business': payload.businessName,
          'Category': payload.category,
          'Contact': payload.contactPerson,
          'Email': payload.email,
          'Phone': payload.phone,
          'WhatsApp': payload.whatsapp,
          'Location': [payload.city, payload.country].filter(Boolean).join(', '),
          'Website Experience': payload.websiteLevel.toUpperCase(),
          'Business Description': payload.businessDescription,
          'Services': payload.services,
          'Sections In Demo': payload.selectedSections,
          'Demo Configuration': payload.demoConfiguration,
          'Requirements': payload.requirements || '(none given)',
          'Source': payload.source,
          'Created At': payload.createdAt,
        },
      })
      track('contact_form_submitted', { level: config.level, category: config.category })
      onSuccess(payload)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Web3FormsError ? err.message : 'Something went wrong. Please try again or email us.')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <Reveal>
        <p className="type-label text-fg-muted">Make it yours</p>
        <h2 className="type-h2 mt-5 max-w-[18ch]">Turn this demo into your website.</h2>
        <p className="type-lead mt-5 max-w-xl text-fg-muted">
          We have carried everything across from your demo. Change anything that is not right, add what we missed and send it over.
        </p>
      </Reveal>

      <Reveal delay={80} className="grid gap-8 sm:grid-cols-2">
        <Field label="Business name" required>
          {(id) => <input id={id} required value={lead.businessName} onChange={(e) => set('businessName', e.target.value)} className={fieldClass} />}
        </Field>
        <Field label="Contact person" required>
          {(id) => <input id={id} required value={lead.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} autoComplete="name" className={fieldClass} />}
        </Field>
        <Field label="Email" required>
          {(id) => <input id={id} required type="email" value={lead.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" className={fieldClass} />}
        </Field>
        <Field label="Phone" required>
          {(id) => <input id={id} required type="tel" value={lead.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" className={fieldClass} />}
        </Field>
        <Field label="WhatsApp" optional>
          {(id) => <input id={id} type="tel" value={lead.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={fieldClass} />}
        </Field>
        <Field label="Category">
          {(id) => <input id={id} value={lead.category} onChange={(e) => set('category', e.target.value)} className={fieldClass} />}
        </Field>
        <Field label="City" optional>
          {(id) => <input id={id} value={lead.city} onChange={(e) => set('city', e.target.value)} className={fieldClass} />}
        </Field>
        <Field label="Country" optional>
          {(id) => <input id={id} value={lead.country} onChange={(e) => set('country', e.target.value)} className={fieldClass} />}
        </Field>
      </Reveal>

      <Reveal delay={110} className="grid gap-8">
        <Field label="Website experience">
          {(id) => <input id={id} readOnly value={lead.websiteLevel} className={cn(fieldClass, 'text-fg-muted')} />}
        </Field>
        <Field label="Business description">
          {(id) => <textarea id={id} rows={3} value={lead.businessDescription} onChange={(e) => set('businessDescription', e.target.value)} className={cn(fieldClass, 'resize-y')} />}
        </Field>
        <Field label="Services">
          {(id) => <input id={id} value={lead.services} onChange={(e) => set('services', e.target.value)} className={fieldClass} />}
        </Field>
        <Field label="Anything else you'd like us to build?" optional>
          {(id) => (
            <textarea
              id={id}
              rows={4}
              value={lead.requirements}
              onChange={(e) => set('requirements', e.target.value)}
              placeholder="Booking system, online ordering, a blog, a particular look you have in mind…"
              className={cn(fieldClass, 'resize-y')}
            />
          )}
        </Field>
      </Reveal>

      <Reveal delay={140}>
        <div className="rounded-md border border-line-c bg-surface p-5">
          <p className="type-label text-fg-muted">What we will receive</p>
          <p className="type-small mt-2 text-fg-muted">
            Your details above, the sections in your demo and the design configuration we generated. Sent to {site.name} only.{' '}
            <Link to="/privacy-policy" className="link-line text-fg">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Reveal>

      <Reveal delay={160} className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Project Enquiry'}
        </Button>
        <Button onClick={onBack} variant="ghost" icon="none">
          Back to my demo
        </Button>
      </Reveal>

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
