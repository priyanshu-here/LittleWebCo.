import { DReveal, DSectionHead } from './DemoPrimitives'
import { waLink, type DemoSectionProps } from './sectionProps'

export function DemoContact({ config, onMakeItYours }: DemoSectionProps) {
  const a = config.animationLevel
  const wa = waLink(config)

  return (
    <section id="d-contact" className="d-section">
      <DSectionHead level={a} label="Contact" title="Get in touch" intro={`Send ${config.businessName} a message and we will get back to you.`} />
      <DReveal level={a} className="d-wrap">
        <div className="grid gap-5 @3xl:grid-cols-12" style={{ marginTop: '1.8rem' }}>
          <div className="d-card @3xl:col-span-7" style={{ padding: '1.4rem' }}>
            {/* Presentation only: this is a picture of the form the real site would have. */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onMakeItYours()
              }}
              className="grid gap-4"
            >
              <div className="grid gap-4 @xl:grid-cols-2">
                <label className="d-body">
                  <span className="d-label d-muted">Name</span>
                  <input type="text" placeholder="Your name" className="mt-1.5 w-full bg-transparent py-2 outline-none" style={{ borderBottom: '1px solid var(--d-line)' }} />
                </label>
                <label className="d-body">
                  <span className="d-label d-muted">Phone</span>
                  <input type="tel" placeholder="Your number" className="mt-1.5 w-full bg-transparent py-2 outline-none" style={{ borderBottom: '1px solid var(--d-line)' }} />
                </label>
              </div>
              <label className="d-body">
                <span className="d-label d-muted">Message</span>
                <textarea rows={3} placeholder="How can we help?" className="mt-1.5 w-full resize-none bg-transparent py-2 outline-none" style={{ borderBottom: '1px solid var(--d-line)' }} />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="d-btn">
                  Send Message
                </button>
                <span className="d-label d-muted">Demo form</span>
              </div>
            </form>
          </div>

          <div className="@3xl:col-span-5">
            <ul className="d-body grid gap-3">
              {config.brief.phone && (
                <li className="d-card" style={{ padding: '0.9rem 1.1rem' }}>
                  <span className="d-label d-muted">Call</span>
                  <a className="mt-1 block" href={`tel:${config.brief.phone.replace(/\s+/g, '')}`}>
                    {config.brief.phone}
                  </a>
                </li>
              )}
              {wa && (
                <li className="d-card" style={{ padding: '0.9rem 1.1rem' }}>
                  <span className="d-label d-muted">WhatsApp</span>
                  <a className="mt-1 block" href={wa} target="_blank" rel="noopener noreferrer">
                    {config.brief.whatsapp || config.brief.phone}
                  </a>
                </li>
              )}
              {config.brief.email && (
                <li className="d-card" style={{ padding: '0.9rem 1.1rem' }}>
                  <span className="d-label d-muted">Email</span>
                  <a className="mt-1 block" style={{ wordBreak: 'break-word' }} href={`mailto:${config.brief.email}`}>
                    {config.brief.email}
                  </a>
                </li>
              )}
              {config.brief.instagram && (
                <li className="d-card" style={{ padding: '0.9rem 1.1rem' }}>
                  <span className="d-label d-muted">Instagram</span>
                  <a className="mt-1 block" style={{ wordBreak: 'break-word' }} href={config.brief.instagram} target="_blank" rel="noopener noreferrer">
                    {config.brief.instagram.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </DReveal>
    </section>
  )
}
