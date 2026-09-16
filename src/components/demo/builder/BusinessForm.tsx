import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { categoryOptions } from '@/data/demo/categories'
import type { BusinessBrief, CategoryId, DemoImage } from '@/lib/demo/types'
import { Button } from '@/components/ui/Button'
import { Close } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import { Field, fieldClass, Select } from './fields'

const MAX_IMAGES = 6
const MAX_BYTES = 8 * 1024 * 1024

export const emptyBrief: BusinessBrief = {
  businessName: '',
  category: '' as CategoryId,
  categoryOther: '',
  contactPerson: '',
  email: '',
  phone: '',
  whatsapp: '',
  city: '',
  country: '',
  description: '',
  services: '',
  instagram: '',
  website: '',
  images: [],
  consent: false,
}

type Errors = Partial<Record<keyof BusinessBrief, string>>

function validate(b: BusinessBrief): Errors {
  const e: Errors = {}
  if (!b.businessName.trim()) e.businessName = 'We need your business name to build the demo.'
  if (!b.category) e.category = 'Pick the closest category.'
  if (b.category === 'other' && !b.categoryOther.trim()) e.categoryOther = 'Tell us what type of business you have.'
  if (!b.contactPerson.trim()) e.contactPerson = 'Who should we address this to?'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(b.email.trim())) e.email = 'Enter a valid email address.'
  if (b.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a phone number we can reach you on.'
  if (b.description.trim().length < 20) e.description = 'A sentence or two about the business, so the design fits it.'
  if (!b.consent) e.consent = 'We need your agreement before we can build the demo and get back to you.'
  return e
}

export function BusinessForm({
  value,
  onChange,
  onSubmit,
  onStart,
}: {
  value: BusinessBrief
  onChange: (b: BusinessBrief) => void
  onSubmit: () => void
  onStart: () => void
}) {
  const [errors, setErrors] = useState<Errors>({})
  const [imageNote, setImageNote] = useState('')
  const started = useRef(false)
  const liveRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof BusinessBrief>(key: K, v: BusinessBrief[K]) => {
    if (!started.current) {
      started.current = true
      onStart()
    }
    onChange({ ...value, [key]: v })
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // Object URLs belong to this component; release them when it unmounts.
  const imagesRef = useRef<DemoImage[]>(value.images)
  imagesRef.current = value.images
  useEffect(
    () => () => {
      imagesRef.current.forEach((i) => URL.revokeObjectURL(i.url))
    },
    [],
  )

  function addFiles(files: FileList | null) {
    if (!files?.length) return
    const room = MAX_IMAGES - value.images.length
    const accepted: DemoImage[] = []
    let skipped = 0
    for (const file of Array.from(files).slice(0, Math.max(0, room))) {
      if (!file.type.startsWith('image/') || file.size > MAX_BYTES) {
        skipped++
        continue
      }
      accepted.push({ id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`, url: URL.createObjectURL(file), name: file.name })
    }
    if (accepted.length) set('images', [...value.images, ...accepted])
    setImageNote(
      skipped > 0
        ? `${skipped} file${skipped > 1 ? 's were' : ' was'} skipped. Images only, up to 8MB each.`
        : files.length > room
          ? `Up to ${MAX_IMAGES} images.`
          : '',
    )
  }

  function removeImage(id: string) {
    const target = value.images.find((i) => i.id === id)
    if (target) URL.revokeObjectURL(target.url)
    set(
      'images',
      value.images.filter((i) => i.id !== id),
    )
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(value)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      liveRef.current?.focus()
      const first = document.querySelector<HTMLElement>('[data-invalid="true"]')
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    onSubmit()
  }

  const invalid = (k: keyof BusinessBrief) => (errors[k] ? { 'data-invalid': 'true' } : {})
  const errorCount = Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <div ref={liveRef} tabIndex={-1} aria-live="polite" className="sr-only">
        {errorCount > 0 ? `${errorCount} field${errorCount > 1 ? 's need' : ' needs'} attention.` : ''}
      </div>

      <Reveal>
        <h2 className="type-h2 max-w-[18ch]">First, tell us about your business.</h2>
        <p className="type-lead mt-5 max-w-xl text-fg-muted">
          The more you tell us, the closer the demo lands. Nothing here is published anywhere.
        </p>
      </Reveal>

      <Reveal delay={80} className="grid gap-8 sm:grid-cols-2">
        <Field label="Business name" required error={errors.businessName}>
          {(id, d) => (
            <input
              id={id}
              {...invalid('businessName')}
              value={value.businessName}
              onChange={(e) => set('businessName', e.target.value)}
              aria-describedby={d}
              placeholder="e.g. Royal Bites"
              className={fieldClass}
            />
          )}
        </Field>

        <Field label="Business category" required error={errors.category}>
          {(id, d) => (
            <div {...invalid('category')}>
              <Select
                id={id}
                name="category"
                value={value.category}
                onChange={(v) => set('category', v as CategoryId)}
                describedBy={d}
                options={categoryOptions.map((c) => ({ value: c.id, label: c.label }))}
              />
            </div>
          )}
        </Field>

        {value.category === 'other' && (
          <Field label="Tell us what type of business you have" required error={errors.categoryOther} className="sm:col-span-2">
            {(id, d) => (
              <input
                id={id}
                {...invalid('categoryOther')}
                value={value.categoryOther}
                onChange={(e) => set('categoryOther', e.target.value)}
                aria-describedby={d}
                placeholder="e.g. Pet grooming studio"
                className={fieldClass}
              />
            )}
          </Field>
        )}

        <Field label="Owner / contact person" required error={errors.contactPerson}>
          {(id, d) => (
            <input
              id={id}
              {...invalid('contactPerson')}
              value={value.contactPerson}
              onChange={(e) => set('contactPerson', e.target.value)}
              aria-describedby={d}
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          )}
        </Field>

        <Field label="Email" required error={errors.email}>
          {(id, d) => (
            <input
              id={id}
              {...invalid('email')}
              type="email"
              value={value.email}
              onChange={(e) => set('email', e.target.value)}
              aria-describedby={d}
              autoComplete="email"
              placeholder="you@business.com"
              className={fieldClass}
            />
          )}
        </Field>

        <Field label="Phone number" required error={errors.phone}>
          {(id, d) => (
            <input
              id={id}
              {...invalid('phone')}
              type="tel"
              value={value.phone}
              onChange={(e) => set('phone', e.target.value)}
              aria-describedby={d}
              autoComplete="tel"
              placeholder="+91 …"
              className={fieldClass}
            />
          )}
        </Field>

        <Field label="WhatsApp number" optional hint="Leave blank to use your phone number.">
          {(id) => <input id={id} type="tel" value={value.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+91 …" className={fieldClass} />}
        </Field>

        <Field label="City" optional>
          {(id) => <input id={id} value={value.city} onChange={(e) => set('city', e.target.value)} autoComplete="address-level2" placeholder="e.g. Delhi" className={fieldClass} />}
        </Field>

        <Field label="Country" optional>
          {(id) => <input id={id} value={value.country} onChange={(e) => set('country', e.target.value)} autoComplete="country-name" placeholder="e.g. India" className={fieldClass} />}
        </Field>
      </Reveal>

      <Reveal delay={120} className="grid gap-8">
        <Field
          label="Business description"
          required
          error={errors.description}
          hint="What you do, who you do it for and what makes it worth choosing. This shapes the copy and the layout."
        >
          {(id, d) => (
            <textarea
              id={id}
              {...invalid('description')}
              rows={4}
              value={value.description}
              onChange={(e) => set('description', e.target.value)}
              aria-describedby={d}
              placeholder="e.g. Premium North Indian restaurant serving family recipes since 2012, known for slow-cooked curries and a warm dining room."
              className={cn(fieldClass, 'resize-y')}
            />
          )}
        </Field>

        <Field label="Services offered" optional hint="Separate with commas. These become sections on your demo.">
          {(id, d) => (
            <input
              id={id}
              value={value.services}
              onChange={(e) => set('services', e.target.value)}
              aria-describedby={d}
              placeholder="e.g. Dine-in, takeaway, catering"
              className={fieldClass}
            />
          )}
        </Field>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Instagram URL" optional>
            {(id) => <input id={id} type="url" value={value.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/…" className={fieldClass} />}
          </Field>
          <Field label="Existing website URL" optional>
            {(id) => <input id={id} type="url" value={value.website} onChange={(e) => set('website', e.target.value)} placeholder="https://…" className={fieldClass} />}
          </Field>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <p className="type-label text-fg-muted">
          Business images <span className="ml-1 normal-case tracking-normal text-fg-muted/80">(optional)</span>
        </p>
        <p className="type-small mt-1.5 text-fg-muted">
          Up to {MAX_IMAGES} images, 8MB each. They stay in your browser and are used only to render your demo.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex h-11 cursor-pointer items-center rounded-full border border-fg/25 px-5 text-sm font-medium transition-ui hover:border-fg hover:bg-fg hover:text-bg">
            Choose images
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
          </label>
          {value.images.length > 0 && <span className="type-small text-fg-muted">{value.images.length} selected</span>}
        </div>
        {imageNote && <p className="type-small mt-2 text-accent-text">{imageNote}</p>}
        {value.images.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {value.images.map((img) => (
              <li key={img.id} className="relative">
                <img src={img.url} alt={img.name} className="size-20 rounded-md border border-line-c object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label={`Remove ${img.name}`}
                  className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-fg text-bg transition-fast hover:bg-accent hover:text-paper"
                >
                  <Close className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={160}>
        <div {...invalid('consent')} className="rounded-md border border-line-c bg-surface p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={value.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
              aria-describedby="consent-hint"
            />
            <span className="type-small">
              I agree to Little Web Co. using the information I provide to create my website demo and contact me regarding my enquiry.{' '}
              <Link to="/privacy-policy" className="link-line text-fg">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id="consent-hint" className="type-small mt-2 text-accent-text">
              {errors.consent}
            </p>
          )}
        </div>
      </Reveal>

      <Reveal delay={180} className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Continue
        </Button>
        <p className="type-small text-fg-muted">Next: choose the kind of website experience you want.</p>
      </Reveal>
    </form>
  )
}
