import type { DemoSectionProps } from './sectionProps'

export function DemoFooter({ config }: DemoSectionProps) {
  return (
    <footer style={{ borderTop: '1px solid var(--d-line)' }}>
      <div className="d-wrap flex flex-col gap-4 @3xl:flex-row @3xl:items-center @3xl:justify-between" style={{ paddingBlock: '1.6rem' }}>
        <div>
          <p className="d-h3" style={{ fontSize: 'clamp(0.95rem, 1.7cqw, 1.15rem)' }}>
            {config.businessName}
            <span className="d-accent">.</span>
          </p>
          {config.location && (
            <p className="d-body d-muted" style={{ marginTop: '0.3rem' }}>
              {config.location}
            </p>
          )}
        </div>
        <p className="d-body d-muted">
          © {new Date().getFullYear()} {config.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
