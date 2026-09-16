import { blueprints } from '@/data/demo/blueprints'
import { categoryLabel, categoryOptions } from '@/data/demo/categories'
import { levelById } from '@/data/demo/levels'
import type {
  BusinessBrief,
  CategoryId,
  DemoConfig,
  DemoLead,
  Offering,
  SectionId,
  WebsiteLevel,
} from './types'

/* ------------------------------------------------------------------ */
/* Category resolution                                                  */
/* ------------------------------------------------------------------ */

/**
 * Works out which blueprint to build from. A picked category wins outright.
 * When the customer picks "Other" we score their free text and description
 * against each blueprint's keywords and use the best match, falling back to
 * the neutral `other` blueprint when nothing scores.
 */
export function resolveCategory(brief: Pick<BusinessBrief, 'category' | 'categoryOther' | 'description' | 'services'>): {
  category: CategoryId
  inferred: boolean
} {
  // A category we know about wins outright. Anything unset or unrecognised
  // falls through to inference so the page can never render without a blueprint.
  if (brief.category && brief.category !== 'other' && brief.category in blueprints) {
    return { category: brief.category, inferred: false }
  }

  const haystack = `${brief.categoryOther} ${brief.description} ${brief.services}`.toLowerCase()
  let best: { id: CategoryId; score: number } | null = null

  for (const option of categoryOptions) {
    if (option.id === 'other') continue
    const bp = blueprints[option.id]
    let score = 0
    for (const keyword of bp.keywords) {
      if (!haystack.includes(keyword)) continue
      // Longer keywords are more specific, and the "what type of business"
      // answer counts for more than a passing mention in the description.
      score += keyword.length
      if (brief.categoryOther.toLowerCase().includes(keyword)) score += keyword.length * 2
    }
    if (score > 0 && (!best || score > best.score)) best = { id: option.id, score }
  }

  if (best && best.score >= 6) return { category: best.id, inferred: true }
  return { category: 'other', inferred: false }
}

/* ------------------------------------------------------------------ */
/* Content derived from what the customer typed                         */
/* ------------------------------------------------------------------ */

/** Short supporting lines used when the customer lists their own services. */
const serviceBodies: Partial<Record<CategoryId, string[]>> = {
  restaurant: [
    'Prepared fresh by our kitchen and served the way our regulars expect.',
    'On the menu every day, cooked to order.',
    'Ask our team for the current selection and timings.',
  ],
  cafe: ['Served through the day, made properly.', 'A regular fixture on our counter.', 'Ask us what is good today.'],
  salon: [
    'Booked as a dedicated appointment with time to do it properly.',
    'Handled by stylists who do this every day.',
    'We talk through what you want before we start.',
  ],
  barbershop: ['Book ahead or take a chair when one opens up.', 'Done the way it should be.', 'Straight pricing, no surprises.'],
  'real-estate': [
    'Available now, with the full details on request.',
    'We will walk you through the paperwork and the numbers.',
    'Viewings arranged around your schedule.',
  ],
  hotel: ['Available to book directly with us.', 'Part of every stay.', 'Ask the front desk for current availability.'],
  gym: ['Coached properly, whatever your starting point.', 'Built into our weekly schedule.', 'Ask about a trial session.'],
  clinic: ['Booked as a full appointment with time to ask questions.', 'Available at the practice.', 'Get in touch to arrange a visit.'],
  hospital: ['Available through our outpatient department.', 'Staffed by our specialists.', 'Contact us to arrange an appointment.'],
  retail: ['In stock now on our shelves.', 'Part of our regular range.', 'Come in and see it in person.'],
  ecommerce: ['Available to order online with tracked delivery.', 'Part of our current range.', 'In stock and ready to ship.'],
  education: ['Structured across the term with regular assessment.', 'Taught in small groups.', 'Enquire for the current schedule.'],
  travel: ['Planned around your dates and your pace.', 'Arranged end to end by our team.', 'Ask us for a detailed itinerary.'],
  architecture: ['Taken from first sketch through to construction.', 'Handled by the same team throughout.', 'Scoped properly before we begin.'],
  'interior-design': ['Managed end to end, including the trades.', 'Resolved down to the last fitting.', 'Samples and finishes shown before anything is ordered.'],
  photography: ['Planned beforehand so the day runs to time.', 'Edited carefully and delivered on schedule.', 'Ask about availability for your dates.'],
  automotive: ['Quoted before any work begins.', 'Handled by technicians who know these vehicles.', 'Book a slot that suits you.'],
  'professional-services': ['Scope and fees agreed in writing before we start.', 'Handled by the person you actually speak to.', 'Arrange a consultation to discuss it.'],
  startup: ['Included from day one, no add-on pricing.', 'Built around how teams actually work.', 'Try it and see whether it helps.'],
  technology: ['Delivered in stages so you see progress early.', 'Built to be maintained by whoever comes next.', 'Scoped and estimated up front.'],
}

const fallbackBodies = [
  'Handled properly from the first enquiry to the finish.',
  'Something we are regularly asked for, and glad to help with.',
  'Get in touch and we will talk through what you need.',
]

/** Extra offerings inferred from phrases in the customer's own description. */
const descriptionSignals: Array<{ match: RegExp; offering: Offering }> = [
  { match: /\bhome deliver|\bdeliver(y|ies|ed)?\b/i, offering: { title: 'Delivery', body: 'Brought to your door, packed so it arrives the way it left us.' } },
  { match: /\btake[\s-]?away|\bparcel\b|\bpick[\s-]?up\b/i, offering: { title: 'Takeaway', body: 'Order ahead and collect when it suits you.' } },
  { match: /\b24\s*[x/*]\s*7\b|\b24 hours?\b|round[\s-]the[\s-]clock/i, offering: { title: 'Available Around the Clock', body: 'Reachable at any hour, not just office hours.' } },
  { match: /\bonline\b|\bvirtual\b|\bremote(ly)?\b/i, offering: { title: 'Online & Remote', body: 'Handled remotely when coming in person is not practical.' } },
  { match: /\bwedding|\bbridal\b/i, offering: { title: 'Weddings', body: 'Planned carefully around the day and everything leading up to it.' } },
  { match: /\bcustom(ised|ized)?\b|\bbespoke\b|\bmade[\s-]to[\s-]order\b/i, offering: { title: 'Custom Work', body: 'Made to your specification rather than off the shelf.' } },
  { match: /\bcorporate\b|\bb2b\b|\bbusiness clients?\b/i, offering: { title: 'For Businesses', body: 'Arrangements built around company requirements and volumes.' } },
  { match: /\bemergency\b|\burgent\b/i, offering: { title: 'Urgent Requests', body: 'Prioritised when it genuinely cannot wait.' } },
]

/** Splits a free-text services field into individual items. */
export function splitServices(raw: string): string[] {
  return raw
    .split(/[,\n;•|/]+/)
    .map((s) => s.trim().replace(/^[-–—*]\s*/, ''))
    .filter((s) => s.length > 1 && s.length <= 60)
    .slice(0, 8)
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function buildOfferings(brief: BusinessBrief, category: CategoryId): Offering[] {
  const bp = blueprints[category] ?? blueprints.other
  const listed = splitServices(brief.services)
  const bodies = serviceBodies[category] ?? fallbackBodies

  const fromCustomer: Offering[] = listed.map((service, i) => ({
    title: titleCase(service),
    body: bodies[i % bodies.length],
  }))

  // Pull in anything their description implies that they did not list.
  const text = `${brief.description} ${brief.services}`
  const inferred = descriptionSignals
    .filter((s) => s.match.test(text))
    .map((s) => s.offering)
    .filter((o) => !fromCustomer.some((f) => f.title.toLowerCase() === o.title.toLowerCase()))
    .slice(0, 2)

  const combined = [...fromCustomer, ...inferred]
  if (combined.length >= 3) return combined.slice(0, 8)

  // Top up with the blueprint's own list so the section never looks thin.
  const filler = bp.defaultOfferings.filter((d) => !combined.some((c) => c.title.toLowerCase() === d.title.toLowerCase()))
  return [...combined, ...filler].slice(0, Math.max(4, combined.length + 2))
}

function buildAbout(brief: BusinessBrief, category: CategoryId): string {
  const described = brief.description.trim()
  if (described.length >= 40) return described
  const bp = blueprints[category] ?? blueprints.other
  const where = brief.city ? ` in ${brief.city}` : ''
  return described
    ? `${described} ${bp.tagline}`
    : `${brief.businessName || 'We'} ${where ? `is a ${bp.label.toLowerCase()} business${where}.` : `is a ${bp.label.toLowerCase()} business.`} ${bp.tagline}`
}

function contentDensity(brief: BusinessBrief): DemoConfig['contentDensity'] {
  const words = brief.description.trim().split(/\s+/).filter(Boolean).length
  const services = splitServices(brief.services).length
  if (words > 45 || services >= 5 || brief.images.length >= 4) return 'rich'
  if (words < 15 && services <= 1) return 'compact'
  return 'standard'
}

/* ------------------------------------------------------------------ */
/* Section composition                                                  */
/* ------------------------------------------------------------------ */

function composeSections(category: CategoryId, level: WebsiteLevel, density: DemoConfig['contentDensity'], hasImages: boolean): SectionId[] {
  const bp = blueprints[category] ?? blueprints.other
  let sections: SectionId[] = level === 'basic' ? [...bp.core] : [...bp.full]

  // A thin brief should not be padded out with empty-looking sections.
  if (density === 'compact') {
    sections = sections.filter((s) => s !== 'stats')
  }
  // Galleries need something to show. Keep them only where the industry is
  // visual by nature, or where the customer actually supplied images.
  const visualCategories: CategoryId[] = ['restaurant', 'cafe', 'salon', 'barbershop', 'hotel', 'real-estate', 'gym', 'retail', 'ecommerce', 'travel', 'architecture', 'interior-design', 'photography', 'automotive']
  if (!hasImages && !visualCategories.includes(category)) {
    sections = sections.filter((s) => s !== 'gallery')
  }
  return sections
}

/* ------------------------------------------------------------------ */
/* The engine                                                           */
/* ------------------------------------------------------------------ */

/** Turns what the customer told us plus their chosen level into a design. */
export function buildDemoConfig(brief: BusinessBrief, level: WebsiteLevel): DemoConfig {
  const { category, inferred } = resolveCategory(brief)
  const bp = blueprints[category] ?? blueprints.other
  const def = levelById(level)
  const density = contentDensity(brief)
  const sections = composeSections(category, level, density, brief.images.length > 0)

  // 3D only when the level allows it AND the industry is one where a 3D scene
  // depicts something real. Everything else gets a cinematic 2D hero instead.
  const threeDKind = def.allowThreeD ? bp.threeD : null

  const location = [brief.city, brief.country].filter(Boolean).join(', ')

  return {
    businessName: brief.businessName.trim() || bp.label,
    category,
    categoryLabel: category === 'other' && brief.categoryOther.trim() ? titleCase(brief.categoryOther.trim()) : categoryLabel(category),
    categoryInferred: inferred,
    level,
    sections,
    heroVariant: bp.heroVariant,
    headline: brief.businessName.trim() || bp.label,
    tagline: bp.tagline,
    kicker: location ? `${bp.kicker} · ${location}` : bp.kicker,
    about: buildAbout(brief, category),
    offeringsLabel: bp.offeringsLabel,
    offeringsIntro: bp.offeringsIntro,
    offerings: buildOfferings(brief, category),
    featuresLabel: bp.featuresLabel,
    features: bp.features,
    galleryLabel: bp.galleryLabel,
    aboutLabel: bp.aboutLabel,
    projectsLabel: bp.projectsLabel,
    statLabels: bp.statLabels,
    primaryCta: bp.primaryCta,
    secondaryCta: bp.secondaryCta,
    palette: bp.palette,
    motif: bp.motif,
    animationLevel: def.animationLevel,
    interactionLevel: def.interactionLevel,
    threeD: threeDKind !== null,
    threeDKind,
    contentDensity: density,
    location,
    brief,
  }
}

/* ------------------------------------------------------------------ */
/* Lead                                                                 */
/* ------------------------------------------------------------------ */

/** Flattens a finished demo into the lead that reaches Little Web Co. */
export function buildLead(config: DemoConfig, overrides: Partial<DemoLead>): DemoLead {
  const b = config.brief
  return {
    businessName: b.businessName,
    category: config.categoryLabel,
    contactPerson: b.contactPerson,
    email: b.email,
    phone: b.phone,
    whatsapp: b.whatsapp || b.phone,
    city: b.city,
    country: b.country,
    websiteLevel: levelById(config.level).title,
    businessDescription: b.description,
    services: b.services || config.offerings.map((o) => o.title).join(', '),
    selectedSections: config.sections.join(', '),
    demoConfiguration: [
      `category=${config.category}`,
      `level=${config.level}`,
      `hero=${config.heroVariant}`,
      `animation=${config.animationLevel}`,
      `interaction=${config.interactionLevel}`,
      `3d=${config.threeD ? config.threeDKind : 'none'}`,
      `density=${config.contentDensity}`,
      `images=${b.images.length}`,
    ].join(' | '),
    source: 'Website Demo Builder',
    createdAt: new Date().toISOString(),
    requirements: '',
    ...overrides,
  }
}
