import type { DemoConfig, DemoImage } from '@/lib/demo/types'

export interface DemoSectionProps {
  config: DemoConfig
  onMakeItYours: () => void
}

/** Hands out the customer's uploaded images in order, wrapping when short. */
export function imageAt(config: DemoConfig, index: number): DemoImage | undefined {
  const imgs = config.brief.images
  if (imgs.length === 0) return undefined
  return imgs[index % imgs.length]
}

export const waLink = (config: DemoConfig): string => {
  const number = (config.brief.whatsapp || config.brief.phone).replace(/[^\d]/g, '')
  const text = encodeURIComponent(`Hi ${config.businessName}, I found you online and would like to know more.`)
  return number ? `https://wa.me/${number}?text=${text}` : ''
}
