import { DReveal, DSectionHead } from './DemoPrimitives'
import { waLink, type DemoSectionProps } from './sectionProps'

export function DemoLocation({ config }: DemoSectionProps) {
  const a = config.animationLevel
  const place = config.location || 'Your city'
  const mapsQuery = encodeURIComponent(`${config.businessName} ${config.location}`.trim())
  const wa = waLink(config)

  return (
    <section id="d-location" className="d-section">
      <DSectionHead level={a} label="Visit" title={`Find ${config.businessName}`} />
      <DReveal level={a} className="d-wrap">
        <div className="grid gap-5 @3xl:grid-cols-12" style={{ marginTop: '1.8rem' }}>
          {/* A real map embed needs an API key the customer has not given us, so
              this is a styled stand-in that links out to a live map search. */}
          <div className="d-media @3xl:col-span-7" style={{ aspectRatio: '16 / 10' }}>
            <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="size-full" role="img" aria-label={`Map placeholder for ${place}`} style={{ color: 'var(--d-fg)' }}>
              <rect width="400" height="250" fill="color-mix(in srgb, var(--d-accent) 7%, var(--d-surface))" />
              {[40, 96, 152, 208].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
              ))}
              {[60, 140, 230, 320].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="250" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" />
              ))}
              <path d="M0 152 L140 152 L140 40" stroke="var(--d-accent)" strokeOpacity="0.3" strokeWidth="6" fill="none" />
              <path d="M230 250 L230 96 L400 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="6" fill="none" />
              <circle cx="196" cy="122" r="30" fill="var(--d-accent)" fillOpacity="0.14" />
              <path d="M196 100a15 15 0 0 1 15 15c0 11-15 27-15 27s-15-16-15-27a15 15 0 0 1 15-15Z" fill="var(--d-accent)" />
              <circle cx="196" cy="115" r="5" fill="#fff" />
            </svg>
            <span className="d-media__tag">Map preview</span>
          </div>

          <div className="@3xl:col-span-5">
            <div className="d-card" style={{ padding: '1.3rem' }}>
              <p className="d-label d-muted">Where to find us</p>
              <p className="d-h3" style={{ marginTop: '0.6rem' }}>
                {place}
              </p>
              <dl className="d-body" style={{ marginTop: '1.1rem', display: 'grid', gap: '0.7rem' }}>
                {config.brief.phone && (
                  <div>
                    <dt className="d-label d-muted">Phone</dt>
                    <dd style={{ marginTop: '0.2rem' }}>
                      <a href={`tel:${config.brief.phone.replace(/\s+/g, '')}`}>{config.brief.phone}</a>
                    </dd>
                  </div>
                )}
                {config.brief.email && (
                  <div>
                    <dt className="d-label d-muted">Email</dt>
                    <dd style={{ marginTop: '0.2rem', wordBreak: 'break-word' }}>
                      <a href={`mailto:${config.brief.email}`}>{config.brief.email}</a>
                    </dd>
                  </div>
                )}
              </dl>
              <div className="flex flex-wrap gap-2" style={{ marginTop: '1.2rem' }}>
                <a className="d-btn" href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer">
                  Open in Maps
                </a>
                {wa && (
                  <a className="d-btn d-btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </DReveal>
    </section>
  )
}
