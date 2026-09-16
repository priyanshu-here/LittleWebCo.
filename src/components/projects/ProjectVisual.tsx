import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

/* Shared browser frame for the placeholder compositions (viewBox 800 x 600). */
function Frame() {
  return (
    <>
      <rect x="64" y="48" width="672" height="640" rx="14" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.18" />
      <line x1="64" y1="86" x2="736" y2="86" stroke="currentColor" strokeOpacity="0.14" />
      <circle cx="90" cy="67" r="4" fill="currentColor" fillOpacity="0.35" />
      <circle cx="106" cy="67" r="4" fill="currentColor" fillOpacity="0.35" />
      <circle cx="122" cy="67" r="4" fill="currentColor" fillOpacity="0.35" />
      <rect x="150" y="60" width="150" height="14" rx="7" fill="currentColor" fillOpacity="0.1" />
    </>
  )
}

const compositions: Record<Project['visual'], React.ReactNode> = {
  showroom: (
    <>
      <Frame />
      {/* nav */}
      <rect x="96" y="112" width="64" height="8" rx="4" fill="currentColor" fillOpacity="0.8" />
      <rect x="548" y="112" width="30" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="590" y="112" width="30" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="640" y="105" width="64" height="22" rx="11" fill="currentColor" fillOpacity="0.85" />
      {/* hero copy */}
      <rect x="96" y="164" width="290" height="24" rx="5" fill="currentColor" />
      <rect x="96" y="198" width="222" height="24" rx="5" fill="currentColor" />
      <rect x="96" y="244" width="230" height="7" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="96" y="260" width="184" height="7" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="96" y="296" width="104" height="32" rx="16" fill="var(--color-accent)" />
      {/* hero image with vehicle silhouette */}
      <rect x="404" y="150" width="300" height="184" rx="10" fill="currentColor" fillOpacity="0.1" />
      <rect x="446" y="238" width="216" height="62" rx="31" fill="currentColor" fillOpacity="0.25" />
      <rect x="480" y="268" width="148" height="34" rx="6" fill="currentColor" fillOpacity="0.25" />
      <circle cx="492" cy="302" r="15" fill="currentColor" fillOpacity="0.6" />
      <circle cx="616" cy="302" r="15" fill="currentColor" fillOpacity="0.6" />
      {/* inventory cards */}
      {[96, 312, 528].map((x) => (
        <g key={x}>
          <rect x={x} y="368" width="176" height="112" rx="8" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.12" />
          <rect x={x + 12} y="380" width="152" height="54" rx="6" fill="currentColor" fillOpacity="0.12" />
          <rect x={x + 12} y="446" width="96" height="7" rx="3.5" fill="currentColor" fillOpacity="0.6" />
          <rect x={x + 12} y="460" width="52" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
      {/* specs strip */}
      <rect x="96" y="512" width="608" height="104" rx="8" fill="currentColor" fillOpacity="0.05" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={120 + i * 150} y="536" width="72" height="14" rx="4" fill="currentColor" fillOpacity="0.7" />
          <rect x={120 + i * 150} y="560" width="96" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
          <rect x={120 + i * 150} y="574" width="64" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
    </>
  ),
  storefront: (
    <>
      <Frame />
      <rect x="96" y="108" width="84" height="12" rx="3" fill="currentColor" fillOpacity="0.85" />
      <rect x="548" y="112" width="30" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="592" y="112" width="30" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="690" cy="115" r="10" fill="none" stroke="currentColor" strokeOpacity="0.5" />
      <circle cx="699" cy="106" r="4.5" fill="var(--color-accent)" />
      {[96, 170, 244, 318].map((x, i) => (
        <rect key={x} x={x} y="146" width="62" height="20" rx="10" fill="currentColor" fillOpacity={i === 0 ? 0.8 : 0} stroke="currentColor" strokeOpacity="0.3" />
      ))}
      {[0, 1].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const x = 96 + col * 158
          const y = 192 + row * 200
          const shape = (row * 4 + col) % 4
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width="134" height="148" rx="8" fill="currentColor" fillOpacity="0.1" />
              {shape === 0 && <circle cx={x + 67} cy={y + 74} r="26" fill="currentColor" fillOpacity="0.3" />}
              {shape === 1 && <rect x={x + 49} y={y + 40} width="36" height="68" rx="18" fill="currentColor" fillOpacity="0.3" />}
              {shape === 2 && <rect x={x + 41} y={y + 48} width="52" height="52" rx="14" fill="currentColor" fillOpacity="0.3" />}
              {shape === 3 && <rect x={x + 37} y={y + 60} width="60" height="30" rx="15" fill="currentColor" fillOpacity="0.3" />}
              <rect x={x} y={y + 160} width="88" height="7" rx="3.5" fill="currentColor" fillOpacity="0.6" />
              <rect x={x} y={y + 174} width="40" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
            </g>
          )
        }),
      )}
    </>
  ),
  editorial: (
    <>
      <Frame />
      <rect x="96" y="122" width="40" height="6" rx="3" fill="var(--color-accent)" />
      <rect x="96" y="142" width="300" height="26" rx="5" fill="currentColor" />
      <rect x="96" y="178" width="238" height="26" rx="5" fill="currentColor" />
      <rect x="96" y="214" width="164" height="26" rx="5" fill="currentColor" />
      <rect x="96" y="266" width="280" height="7" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="96" y="282" width="240" height="7" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="96" y="298" width="196" height="7" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1="96" y1={346 + i * 44} x2="400" y2={346 + i * 44} stroke="currentColor" strokeOpacity="0.15" />
          <rect x="96" y={360 + i * 44} width={150 - (i % 3) * 22} height="8" rx="4" fill="currentColor" fillOpacity="0.55" />
          <rect x="356" y={361 + i * 44} width="44" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
      <rect x="430" y="112" width="274" height="480" rx="10" fill="currentColor" fillOpacity="0.1" />
      <rect x="454" y="136" width="226" height="432" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M484 170v210h132M484 380h60v110" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="642" cy="522" r="22" fill="currentColor" fillOpacity="0.3" />
    </>
  ),
}

interface ProjectVisualProps {
  project: Project
  className?: string
  /** Show the "concept preview" caption. */
  caption?: boolean
}

/**
 * Renders the project's cover image when one exists, otherwise a placeholder
 * composition in the project's tone that clearly reads as a preview.
 */
export function ProjectVisual({ project, className, caption = true }: ProjectVisualProps) {
  if (project.cover) {
    return (
      <img
        src={project.cover.src}
        alt={project.cover.alt}
        loading="lazy"
        decoding="async"
        className={cn('size-full object-cover', className)}
      />
    )
  }
  return (
    <div
      className={cn('relative size-full overflow-hidden text-paper', className)}
      style={{ backgroundColor: project.tone }}
      role="img"
      aria-label={`${project.title}: preview composition, screenshots to be added`}
    >
      <div className="absolute inset-0 grid-ink opacity-60" />
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 size-full" aria-hidden>
        {compositions[project.visual]}
      </svg>
      {caption && (
        <span className="type-label absolute bottom-4 left-4 whitespace-nowrap rounded-full bg-ink/55 px-3 py-2 text-paper/90">
          Concept preview<span className="hidden sm:inline"> · screenshots to follow</span>
        </span>
      )}
    </div>
  )
}
