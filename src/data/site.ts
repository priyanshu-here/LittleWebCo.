/**
 * Single source of truth for brand + contact details.
 * Edit this file to update details everywhere on the site.
 */

export const site = {
  name: 'Little Web Co.',
  tagline: 'Digital design & development for ambitious businesses.',
  description:
    'Little Web Co. is a digital web studio creating modern websites, UI/UX experiences, SEO-ready digital experiences and ongoing website care for businesses.',
  /** Canonical site URL. Empty until a domain is connected. */
  url: import.meta.env.VITE_SITE_URL || '',
  location: {
    country: 'India',
    countryCode: 'IN',
    timeZone: 'Asia/Kolkata',
    timeZoneLabel: 'IST · UTC+5:30',
  },
  contact: {
    email: 'littleweb.company@gmail.com',
    /** Prefills the subject line of every mailto link on the site. */
    emailSubject: 'Project Enquiry - Little Web Co.',
    phone: {
      e164: '+919026799302',
      display: '+91 90267 99302',
    },
    whatsapp: {
      /** Digits only, with country code, no plus sign. */
      number: '919026799302',
      display: '+91 90267 99302',
      message: 'Hi, I would like to talk about a project.',
    },
    /** Calendly / Cal.com / Google appointment URL. Leave empty to route to the contact page. */
    schedulingUrl: '',
  },
  /** Company social links. Only links listed here are rendered. Example: { label: 'Instagram', href: 'https://instagram.com/…' } */
  social: [] as Array<{ label: string; href: string }>,
  /** Used by the legal page templates. Replace the placeholders when known. */
  legal: {
    entityName: '[Registered business name]',
    city: '[City]',
    state: '[State]',
    lastUpdated: '17 September 2026',
  },
  copyrightYear: 2026,
} as const

export const links = {
  email: `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.emailSubject)}`,
  tel: `tel:${site.contact.phone.e164}`,
  whatsapp: `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(
    site.contact.whatsapp.message,
  )}`,
  schedule: site.contact.schedulingUrl || '/contact#schedule',
  scheduleIsExternal: Boolean(site.contact.schedulingUrl),
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Demo', to: '/demo' },
] as const

export const footerColumns = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Work', to: '/work' },
      { label: 'About', to: '/about' },
      { label: 'Process', to: '/process' },
      { label: 'Demo Builder', to: '/demo' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Website Design', to: '/services#website-design-development' },
      { label: 'UI/UX', to: '/services#ui-ux-design' },
      { label: 'Development', to: '/services#website-design-development' },
      { label: 'Landing Pages', to: '/services#landing-pages' },
      { label: 'SEO & Visibility', to: '/services#seo-visibility' },
      { label: 'Hosting & Care', to: '/services#hosting-care' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
] as const
