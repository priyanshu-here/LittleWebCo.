import { Link } from 'react-router'
import { footerColumns, links, site } from '@/data/site'
import { Container } from '@/components/ui/Container'
import { Wordmark } from '@/components/ui/Wordmark'
import { useIndiaTime } from '@/hooks/useIndiaTime'
import { approxTextWidth, brandBase } from '@/lib/utils'

/**
 * Oversized wordmark sitting just above the divider that tops the copyright bar,
 * right-aligned at 70% of the footer width. Decorative only: hidden from
 * assistive tech, unselectable and non-interactive. `textLength` locks the text
 * to its box, so it can never cause horizontal overflow.
 */
function FooterWatermark() {
  // Sized from the brand name so the wordmark fills its box with natural letter
  // spacing no matter how long the name is.
  const width = Math.round(approxTextWidth(site.name) * 112)
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-full right-0 mb-2 w-[70%] select-none">
      <svg viewBox={`0 0 ${width} 132`} className="w-full" role="presentation" focusable="false">
        <text
          x="0"
          y="104"
          textLength={width}
          lengthAdjust="spacing"
          fill="currentColor"
          fillOpacity="0.055"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '112px' }}
        >
          {site.name}
        </text>
      </svg>
    </div>
  )
}

export function Footer() {
  const time = useIndiaTime()
  return (
    <footer data-surface="inverse" className="relative overflow-hidden bg-bg text-fg">
      <Container className="relative pb-28 pt-16 md:pb-12 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block rounded-sm" aria-label="Little Web Company, home">
              <Wordmark className="text-2xl md:text-[1.75rem]" />
            </Link>
            <p className="type-lead mt-5 max-w-sm text-fg-muted">
              A small digital studio designing and building modern websites, interfaces and the care they need after
              launch.
            </p>
            <ul className="mt-10 space-y-2.5 text-[0.9375rem]">
              <li>
                <a className="link-hover-line text-fg" href={links.email}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a className="link-hover-line text-fg" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="link-hover-line text-fg" href={links.tel}>
                  Call
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:col-span-7">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="type-label text-fg-muted">{col.title}</h2>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label + l.to}>
                      <Link to={l.to} className="link-hover-line text-[0.9375rem] text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="type-small relative mt-16 flex flex-col gap-4 border-t border-line-c pt-8 text-fg-muted md:flex-row md:items-center md:justify-between">
          <FooterWatermark />
          <p>
            © {site.copyrightYear} {brandBase(site.name)}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Based in India, working worldwide · {time} IST
          </p>
          {site.social.length > 0 && (
            <ul className="flex gap-5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a className="link-hover-line text-fg" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  )
}
