import type { CategoryId } from '@/lib/demo/types'

/** The dropdown, in the order it is shown. */
export const categoryOptions: Array<{ id: CategoryId; label: string }> = [
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'cafe', label: 'Cafe' },
  { id: 'salon', label: 'Salon' },
  { id: 'barbershop', label: 'Barbershop' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'gym', label: 'Gym & Fitness' },
  { id: 'clinic', label: 'Doctor / Clinic' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'retail', label: 'Retail' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'education', label: 'Education' },
  { id: 'travel', label: 'Travel' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'interior-design', label: 'Interior Design' },
  { id: 'photography', label: 'Photography' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'professional-services', label: 'Professional Services' },
  { id: 'startup', label: 'Startup' },
  { id: 'technology', label: 'Technology' },
  { id: 'other', label: 'Other' },
]

export const categoryLabel = (id: CategoryId): string =>
  categoryOptions.find((c) => c.id === id)?.label ?? 'Business'
