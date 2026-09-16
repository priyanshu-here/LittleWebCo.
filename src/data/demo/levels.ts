import type { AnimationLevel, InteractionLevel, WebsiteLevel } from '@/lib/demo/types'

export interface LevelDefinition {
  id: WebsiteLevel
  title: string
  strapline: string
  description: string
  bestFor: string
  includes: string[]
  animationLevel: AnimationLevel
  interactionLevel: InteractionLevel
  /** Professional only: 3D is then decided per industry by the engine. */
  allowThreeD: boolean
}

export const levels: LevelDefinition[] = [
  {
    id: 'basic',
    title: 'Basic',
    strapline: 'Simple & Professional',
    description: 'Simple, clean and professional.',
    bestFor: 'Perfect for small businesses that need a strong online presence.',
    includes: [
      'Professional responsive design',
      'Your business information and images',
      'Services, about and contact sections',
      'Location section',
      'WhatsApp button and contact CTA',
      'Smooth scrolling and clean transitions',
      'SEO-friendly structure',
    ],
    animationLevel: 'minimal',
    interactionLevel: 'basic',
    allowThreeD: false,
  },
  {
    id: 'business',
    title: 'Business',
    strapline: 'Premium & Interactive',
    description: 'Premium design with animation and richer interactions.',
    bestFor: 'For businesses that want to stand out online.',
    includes: [
      'Everything in Basic',
      'Scroll-triggered reveal animations',
      'Parallax and image reveals',
      'Interactive cards and hover states',
      'Animated statistics and visual storytelling',
      'Premium typography and visual hierarchy',
      'Enhanced mobile experience',
    ],
    animationLevel: 'advanced',
    interactionLevel: 'advanced',
    allowThreeD: false,
  },
  {
    id: 'professional',
    title: 'Professional',
    strapline: 'Immersive & Advanced',
    description: 'An immersive interactive website built to make your brand unforgettable.',
    bestFor: 'For brands that want a high-end digital experience.',
    includes: [
      'Everything in Business',
      'Cinematic scroll choreography',
      'Mouse-reactive depth and parallax',
      'Interactive 3D where it suits your industry',
      'Advanced visual effects',
      'Premium page transitions',
      'High-end responsive experience',
    ],
    animationLevel: 'premium',
    interactionLevel: 'immersive',
    allowThreeD: true,
  },
]

export const levelById = (id: WebsiteLevel): LevelDefinition => levels.find((l) => l.id === id) ?? levels[0]

/** `true` = included, `false` = not in this level, 'conditional' = only where it suits the industry. */
export type FeatureAvailability = boolean | 'conditional'

export const comparisonMatrix: Array<{ feature: string; basic: FeatureAvailability; business: FeatureAvailability; professional: FeatureAvailability }> = [
  { feature: 'Responsive design', basic: true, business: true, professional: true },
  { feature: 'Business sections', basic: true, business: true, professional: true },
  { feature: 'Your images', basic: true, business: true, professional: true },
  { feature: 'WhatsApp button', basic: true, business: true, professional: true },
  { feature: 'Contact form', basic: true, business: true, professional: true },
  { feature: 'Smooth scrolling', basic: true, business: true, professional: true },
  { feature: 'Animations', basic: false, business: true, professional: true },
  { feature: 'Advanced interactions', basic: false, business: true, professional: true },
  { feature: 'Parallax', basic: false, business: true, professional: true },
  { feature: 'Advanced visual effects', basic: false, business: true, professional: true },
  { feature: 'Advanced motion', basic: false, business: true, professional: true },
  { feature: '3D experience', basic: false, business: false, professional: 'conditional' },
  { feature: 'Interactive 3D', basic: false, business: false, professional: 'conditional' },
]
