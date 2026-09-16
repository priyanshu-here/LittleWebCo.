import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import type { DemoLead } from '@/lib/demo/types'

export function SuccessScreen({ lead }: { lead: DemoLead }) {
  return (
    <div className="flex min-h-[60svh] flex-col justify-center" role="status" aria-live="polite">
      <Reveal>
        <span aria-hidden className="block size-2.5 rounded-full bg-accent" />
        <h2 className="type-h1 mt-6 max-w-[16ch]">Your enquiry has been received.</h2>
        <p className="type-lead mt-6 max-w-xl text-fg-muted">
          Thanks for choosing Little Web Co. We'll review your requirements and get in touch with you shortly.
        </p>
      </Reveal>
      <Reveal delay={90} className="mt-10">
        <dl className="grid max-w-lg gap-3 rounded-md border border-line-c bg-surface p-5 text-[0.9375rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">Business</dt>
            <dd className="text-right">{lead.businessName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">Experience</dt>
            <dd className="text-right">{lead.websiteLevel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">We'll reply to</dt>
            <dd className="break-all text-right">{lead.email}</dd>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={120} className="mt-10 flex flex-wrap gap-3">
        <Button to="/">Back to Little Web Co.</Button>
        <Button to="/work" variant="secondary">
          View Our Work
        </Button>
      </Reveal>
    </div>
  )
}
