/**
 * Projects / case studies shown across the site.
 *
 * `kind` is displayed prominently. Only mark a project as `client` when it is real,
 * delivered work that the client has agreed to have shown.
 *
 * To add real imagery, place files in /public/projects/<slug>/ and fill in `cover`,
 * `gallery`, `desktopShots` and `mobileShots`. When these are empty the site renders
 * clearly-labelled placeholder compositions.
 */

export type ProjectKind = 'concept' | 'self-initiated' | 'client'
export type ProjectVisualKind = 'showroom' | 'storefront' | 'editorial'

export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface Project {
  slug: string
  number: string
  title: string
  kind: ProjectKind
  client: string
  category: string
  industry: string
  services: string[]
  year: string
  summary: string
  challenge: string
  approach: string
  design: string
  development: string
  result: string
  technology: string[]
  /** Hex colour used for the placeholder composition */
  tone: string
  visual: ProjectVisualKind
  cover?: ProjectImage
  gallery: ProjectImage[]
  desktopShots: ProjectImage[]
  mobileShots: ProjectImage[]
  /** Final live website, when one exists. */
  liveUrl?: string
}

export const projectKindLabel: Record<ProjectKind, string> = {
  concept: 'Concept project',
  'self-initiated': 'Self-initiated project',
  client: 'Client project',
}

export const projects: Project[] = [
  {
    slug: 'northline-motors',
    number: '01',
    title: 'Northline Motors',
    kind: 'concept',
    client: 'Concept — fictional dealership',
    category: 'Business website',
    industry: 'Automotive',
    services: ['Website Design', 'Development', 'SEO setup'],
    year: '2026',
    summary:
      'A showroom website concept for a multi-brand vehicle dealership: browse stock, compare models and book a test drive without a phone call.',
    challenge:
      'Dealership websites tend to be cluttered listing pages with buried contact details. A buyer wants to see the vehicles clearly, understand what is in stock and get to a real person quickly.',
    approach:
      'Put the vehicles first. Large photography slots, a calm inventory grid and an enquiry path that is visible on every screen. The layout is designed to be maintained by the showroom team, not a developer.',
    design:
      'A restrained palette that lets vehicle photography carry the page, a filterable inventory built around the questions buyers actually ask, and detail pages that lead to one clear action.',
    development:
      'A fast, component-based build with editable inventory content, structured metadata for each vehicle page and a WhatsApp enquiry flow that works on every device.',
    result:
      'A complete, presentation-ready concept covering the core journeys of a modern showroom website. Real outcomes will be reported when the concept is applied to a live client project.',
    technology: ['React', 'TypeScript', 'Tailwind CSS', 'Headless CMS-ready'],
    tone: '#1f2a3a',
    visual: 'showroom',
    gallery: [],
    desktopShots: [],
    mobileShots: [],
  },
  {
    slug: 'terra-and-kiln',
    number: '02',
    title: 'Terra & Kiln',
    kind: 'concept',
    client: 'Concept — fictional ceramics studio',
    category: 'Online store',
    industry: 'Homeware',
    services: ['Brand Direction', 'UI/UX Design', 'Development'],
    year: '2026',
    summary:
      'An online store concept for a small-batch ceramics studio, designed to let the product photography breathe and make buying feel effortless.',
    challenge:
      'Handmade products are sold on craft and story, yet most store templates flatten everything into identical grids. The concept needed warmth and space while still handling stock, variants and shipping.',
    approach:
      'A restrained, editorial layout with generous whitespace, product stories alongside product specs, and a checkout reduced to the essentials.',
    design:
      'Warm neutrals drawn from the clay itself, large uncropped product imagery, and typography that reads like a studio journal rather than a catalogue.',
    development:
      'A headless storefront with variant selection, a streamlined cart and checkout, and product pages structured so search engines understand each item.',
    result:
      'A store concept that demonstrates how a small maker can present work at a premium level online. Real outcomes will be reported when the concept is applied to a live client project.',
    technology: ['React', 'TypeScript', 'Headless commerce', 'Tailwind CSS'],
    tone: '#7a4a2e',
    visual: 'storefront',
    gallery: [],
    desktopShots: [],
    mobileShots: [],
  },
  {
    slug: 'fold-architecture',
    number: '03',
    title: 'Fold Architecture',
    kind: 'concept',
    client: 'Concept — fictional architecture practice',
    category: 'Website redesign',
    industry: 'Architecture',
    services: ['UI/UX Design', 'Website Redesign', 'SEO & Visibility'],
    year: '2026',
    summary:
      'A redesign concept for an architecture practice: an editorial project index, calm case-study pages and a site that finally matches the quality of the work.',
    challenge:
      'Practices often have exceptional work trapped inside an outdated, slow website. The concept explores how a redesign can foreground projects and drawings without decoration getting in the way.',
    approach:
      'Typography-led layouts, an index that can be browsed by type or year, and case studies structured around plans, process and finished photography.',
    design:
      'A near-monochrome system with one accent, wide margins, and image layouts that respect the proportions of architectural photography and drawings.',
    development:
      'A lightweight, statically generated build with lazy-loaded imagery, descriptive alt text and metadata for every project, and a sitemap that keeps the index discoverable.',
    result:
      'A redesign concept that shows how an established practice can move from a dated website to a considered digital presence. Real outcomes will be reported when the concept is applied to a live client project.',
    technology: ['React', 'TypeScript', 'Tailwind CSS'],
    tone: '#4a5560',
    visual: 'editorial',
    gallery: [],
    desktopShots: [],
    mobileShots: [],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
