/** Shared types for the Website Demo Builder. */

export type CategoryId =
  | 'restaurant'
  | 'cafe'
  | 'salon'
  | 'barbershop'
  | 'real-estate'
  | 'hotel'
  | 'gym'
  | 'clinic'
  | 'hospital'
  | 'retail'
  | 'ecommerce'
  | 'education'
  | 'travel'
  | 'architecture'
  | 'interior-design'
  | 'photography'
  | 'automotive'
  | 'professional-services'
  | 'startup'
  | 'technology'
  | 'other'

export type WebsiteLevel = 'basic' | 'business' | 'professional'

/** Sections the composition engine can place, in any order a blueprint asks for. */
export type SectionId =
  | 'hero'
  | 'about'
  | 'offerings'
  | 'features'
  | 'stats'
  | 'gallery'
  | 'projects'
  | 'testimonials'
  | 'location'
  | 'cta'
  | 'contact'

/** Drives the generated placeholder artwork when the customer uploads no images. */
export type VisualMotif =
  | 'food'
  | 'beauty'
  | 'building'
  | 'fitness'
  | 'medical'
  | 'retail'
  | 'education'
  | 'travel'
  | 'lens'
  | 'vehicle'
  | 'brief'
  | 'circuit'
  | 'hospitality'

/** Hero composition. Different industries get genuinely different first screens. */
export type HeroVariant = 'split' | 'centered' | 'editorial' | 'fullbleed' | 'showcase'

/** What a 3D scene would actually depict. `null` means 3D adds nothing here. */
export type ThreeDKind = 'structure' | 'vehicle' | 'product' | 'network' | null

export type AnimationLevel = 'minimal' | 'advanced' | 'premium'
export type InteractionLevel = 'basic' | 'advanced' | 'immersive'

export interface DemoPalette {
  /** Accent used for buttons and highlights inside the demo. */
  accent: string
  /** Ink colour for the demo's dark surfaces. */
  ink: string
  /** Page background. */
  paper: string
  /** Slightly raised surface. */
  surface: string
  /** Body text. */
  fg: string
  /** Muted body text. */
  muted: string
  /** Hairlines. */
  line: string
}

export interface Offering {
  title: string
  body: string
}

export interface CategoryBlueprint {
  id: CategoryId
  label: string
  /** Shown under the business name in the hero. */
  tagline: string
  /** Small line above the business name. */
  kicker: string
  heroVariant: HeroVariant
  /** Ordered sections for the Basic level. */
  core: SectionId[]
  /** Ordered sections for Business and Professional. A superset of `core`. */
  full: SectionId[]
  /** What this industry calls its offerings: "Our Menu", "Featured Properties"… */
  offeringsLabel: string
  offeringsIntro: string
  /** Used when the customer lists no services of their own. */
  defaultOfferings: Offering[]
  featuresLabel: string
  features: Offering[]
  galleryLabel: string
  aboutLabel: string
  projectsLabel: string
  statLabels: string[]
  /** Primary action for this industry: "Reserve a Table", "Book an Appointment"… */
  primaryCta: string
  secondaryCta: string
  palette: DemoPalette
  motif: VisualMotif
  threeD: ThreeDKind
  /** Words in a free-text description that point at this category. */
  keywords: string[]
}

/** Everything the customer told us. */
export interface BusinessBrief {
  businessName: string
  category: CategoryId
  /** Free text shown when `category` is 'other'. */
  categoryOther: string
  contactPerson: string
  email: string
  phone: string
  whatsapp: string
  city: string
  country: string
  description: string
  services: string
  instagram: string
  website: string
  /** Object URLs for locally-selected images. Never uploaded anywhere. */
  images: DemoImage[]
  consent: boolean
}

export interface DemoImage {
  id: string
  url: string
  name: string
}

/** The composed design decision, produced by the engine from a brief + level. */
export interface DemoConfig {
  businessName: string
  category: CategoryId
  categoryLabel: string
  /** True when the category was inferred rather than picked from the list. */
  categoryInferred: boolean
  level: WebsiteLevel
  sections: SectionId[]
  heroVariant: HeroVariant
  headline: string
  tagline: string
  kicker: string
  about: string
  offeringsLabel: string
  offeringsIntro: string
  offerings: Offering[]
  featuresLabel: string
  features: Offering[]
  galleryLabel: string
  aboutLabel: string
  projectsLabel: string
  statLabels: string[]
  primaryCta: string
  secondaryCta: string
  palette: DemoPalette
  motif: VisualMotif
  animationLevel: AnimationLevel
  interactionLevel: InteractionLevel
  /** Resolved: only true when the level allows it AND 3D suits the industry. */
  threeD: boolean
  threeDKind: ThreeDKind
  contentDensity: 'compact' | 'standard' | 'rich'
  location: string
  brief: BusinessBrief
}

/** Flattened lead payload sent to Little Web Co. */
export interface DemoLead {
  businessName: string
  category: string
  contactPerson: string
  email: string
  phone: string
  whatsapp: string
  city: string
  country: string
  websiteLevel: string
  businessDescription: string
  services: string
  selectedSections: string
  demoConfiguration: string
  requirements: string
  source: string
  createdAt: string
}
