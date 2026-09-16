import type { CSSProperties } from 'react'
import type { DemoImage, VisualMotif } from '@/lib/demo/types'
import { cn } from '@/lib/utils'

/**
 * Shows the customer's own image where they gave us one. Otherwise it draws an
 * abstract, industry-appropriate composition and labels it as demo artwork.
 * Nothing here is a stock photograph, so there is no licensing question.
 */

const motifs: Record<VisualMotif, React.ReactNode> = {
  food: (
    <>
      <circle cx="200" cy="150" r="86" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <circle cx="200" cy="150" r="58" fill="var(--d-accent)" fillOpacity="0.16" />
      <circle cx="200" cy="150" r="30" fill="var(--d-accent)" fillOpacity="0.32" />
      <path d="M96 108v52a10 10 0 0 0 10 10h2v62" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M96 108v34M106 108v34" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
      <path d="M300 108c10 0 16 14 16 30s-6 22-16 22v72" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  beauty: (
    <>
      <path d="M70 230c40-120 120-170 260-190" stroke="var(--d-accent)" strokeOpacity="0.45" strokeWidth="2.5" fill="none" />
      <path d="M70 250c60-90 140-130 260-140" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.5" fill="none" />
      <circle cx="268" cy="104" r="42" fill="var(--d-accent)" fillOpacity="0.18" />
      <circle cx="150" cy="176" r="26" fill="currentColor" fillOpacity="0.12" />
      <circle cx="268" cy="104" r="12" fill="var(--d-accent)" fillOpacity="0.5" />
    </>
  ),
  building: (
    <>
      <rect x="66" y="132" width="66" height="132" fill="currentColor" fillOpacity="0.14" />
      <rect x="146" y="78" width="80" height="186" fill="var(--d-accent)" fillOpacity="0.2" />
      <rect x="240" y="112" width="58" height="152" fill="currentColor" fillOpacity="0.1" />
      <rect x="310" y="156" width="40" height="108" fill="currentColor" fillOpacity="0.16" />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={160 + c * 22} y={96 + r * 30} width="12" height="16" fill="var(--d-accent)" fillOpacity="0.4" />),
      )}
      <line x1="46" y1="264" x2="364" y2="264" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
    </>
  ),
  fitness: (
    <>
      <rect x="120" y="140" width="160" height="16" rx="8" fill="currentColor" fillOpacity="0.4" />
      <rect x="84" y="112" width="26" height="72" rx="8" fill="var(--d-accent)" fillOpacity="0.45" />
      <rect x="58" y="126" width="20" height="44" rx="7" fill="currentColor" fillOpacity="0.22" />
      <rect x="290" y="112" width="26" height="72" rx="8" fill="var(--d-accent)" fillOpacity="0.45" />
      <rect x="322" y="126" width="20" height="44" rx="7" fill="currentColor" fillOpacity="0.22" />
      <path d="M70 232h58l22-34 26 60 24-44 20 18h110" stroke="var(--d-accent)" strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  medical: (
    <>
      <path d="M200 66c38 18 62 22 74 22v74c0 46-34 78-74 96-40-18-74-50-74-96V88c12 0 36-4 74-22Z" fill="var(--d-accent)" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="186" y="116" width="28" height="84" rx="6" fill="var(--d-accent)" fillOpacity="0.5" />
      <rect x="158" y="144" width="84" height="28" rx="6" fill="var(--d-accent)" fillOpacity="0.5" />
      <path d="M64 226h48l16-26 18 48 16-22h30" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  retail: (
    <>
      <path d="M128 118h144l14 146H114Z" fill="var(--d-accent)" fillOpacity="0.16" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <path d="M166 132V104a34 34 0 0 1 68 0v28" stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="166" cy="146" r="6" fill="var(--d-accent)" fillOpacity="0.55" />
      <circle cx="234" cy="146" r="6" fill="var(--d-accent)" fillOpacity="0.55" />
      <rect x="62" y="196" width="46" height="68" rx="5" fill="currentColor" fillOpacity="0.12" />
      <rect x="296" y="180" width="46" height="84" rx="5" fill="currentColor" fillOpacity="0.16" />
    </>
  ),
  education: (
    <>
      <path d="M200 78 328 126l-128 48-128-48Z" fill="var(--d-accent)" fillOpacity="0.25" />
      <path d="M118 148v52c0 20 38 34 82 34s82-14 82-34v-52" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" fill="none" />
      <path d="M328 126v56" stroke="var(--d-accent)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      <rect x="128" y="242" width="144" height="10" rx="5" fill="currentColor" fillOpacity="0.16" />
    </>
  ),
  travel: (
    <>
      <circle cx="296" cy="98" r="30" fill="var(--d-accent)" fillOpacity="0.35" />
      <path d="M48 244l88-106 58 66 40-44 118 84Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M48 244l88-106 58 66" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <path d="M70 262c60-16 110 10 160-6s80-2 108 6" stroke="var(--d-accent)" strokeOpacity="0.5" strokeWidth="2.5" fill="none" strokeDasharray="8 9" strokeLinecap="round" />
    </>
  ),
  lens: (
    <>
      <circle cx="200" cy="150" r="92" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <circle cx="200" cy="150" r="62" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <path key={deg} d="M200 150 L262 118 L262 182 Z" fill="var(--d-accent)" fillOpacity="0.16" transform={`rotate(${deg} 200 150)`} />
      ))}
      <circle cx="200" cy="150" r="20" fill="var(--d-accent)" fillOpacity="0.45" />
    </>
  ),
  vehicle: (
    <>
      <path d="M64 196c0-14 10-22 24-24l44-46c8-8 18-12 30-12h74c12 0 22 4 30 12l44 46c14 2 24 10 24 24v26h-38a32 32 0 0 0-64 0H166a32 32 0 0 0-64 0H64Z" fill="var(--d-accent)" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" strokeLinejoin="round" />
      <path d="M150 130h100" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="134" cy="222" r="26" fill="currentColor" fillOpacity="0.3" />
      <circle cx="266" cy="222" r="26" fill="currentColor" fillOpacity="0.3" />
      <circle cx="134" cy="222" r="10" fill="var(--d-accent)" fillOpacity="0.55" />
      <circle cx="266" cy="222" r="10" fill="var(--d-accent)" fillOpacity="0.55" />
    </>
  ),
  brief: (
    <>
      <rect x="104" y="72" width="192" height="196" rx="10" fill="var(--d-surface)" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="134" y="106" width="98" height="12" rx="6" fill="var(--d-accent)" fillOpacity="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="134" y={142 + i * 24} width={i % 2 ? 108 : 132} height="8" rx="4" fill="currentColor" fillOpacity="0.16" />
      ))}
      <circle cx="262" cy="232" r="22" fill="var(--d-accent)" fillOpacity="0.2" />
    </>
  ),
  circuit: (
    <>
      {[
        [110, 96], [200, 70], [292, 108], [138, 176], [232, 158], [306, 202], [96, 232], [192, 244],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 11 : 7} fill="var(--d-accent)" fillOpacity={i % 3 === 0 ? 0.55 : 0.3} />
      ))}
      <path
        d="M110 96 200 70 292 108M110 96 138 176 232 158 306 202M138 176 96 232 192 244 232 158M200 70 232 158"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  ),
  hospitality: (
    <>
      <path d="M118 150a82 82 0 0 1 164 0v96H118Z" fill="var(--d-accent)" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M200 68v178M118 158h164" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <rect x="86" y="212" width="228" height="16" rx="8" fill="currentColor" fillOpacity="0.28" />
      <rect x="104" y="188" width="60" height="26" rx="10" fill="var(--d-accent)" fillOpacity="0.4" />
    </>
  ),
}

interface DemoMediaProps {
  motif: VisualMotif
  /** Uses this image when present; falls back to generated artwork otherwise. */
  image?: DemoImage
  alt: string
  ratio?: string
  className?: string
  style?: CSSProperties
  /** Index picks a different crop of the motif so repeated tiles vary. */
  index?: number
  eager?: boolean
}

export function DemoMedia({ motif, image, alt, ratio = '4 / 3', className, style, index = 0, eager = false }: DemoMediaProps) {
  const shift = (index % 4) * 14

  return (
    <div className={cn('d-media', className)} style={{ aspectRatio: ratio, ...style }}>
      {image ? (
        <img src={image.url} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <>
          <svg
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            className="size-full"
            role="img"
            aria-label={`${alt} (demo artwork)`}
            style={{ color: 'var(--d-fg)' }}
          >
            <g transform={`translate(${shift - 14} 0) scale(1.04)`}>{motifs[motif]}</g>
          </svg>
          <span className="d-media__tag">Demo image</span>
        </>
      )}
    </div>
  )
}
