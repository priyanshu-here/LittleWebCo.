export type ServiceVisualKind = 'site' | 'ui' | 'business' | 'landing' | 'redesign' | 'seo' | 'care'

export interface Service {
  id: string
  number: string
  title: string
  short: string
  description: string
  includes: string[]
  /** Longer list rendered on the Services page detail block. */
  details?: string[]
  note?: string
  visual: ServiceVisualKind
}

export const services: Service[] = [
  {
    id: 'website-design-development',
    number: '01',
    title: 'Website Design & Development',
    short: 'Modern responsive websites for businesses and brands.',
    description:
      'A website is often the first serious conversation a business has with a new customer. We design and build sites that make that conversation clear, credible and easy to act on.',
    includes: ['Structure & content planning', 'Custom visual design', 'Responsive development', 'Launch & handover'],
    visual: 'site',
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI/UX Design',
    short: 'User-focused interfaces, wireframes, prototypes and polished visual systems.',
    description:
      'Good interfaces feel obvious. We map user flows, sketch wireframes and refine high-fidelity screens until the product is easy to understand and pleasant to use.',
    includes: ['User flows & wireframes', 'High-fidelity interfaces', 'Interactive prototypes', 'Design systems & components'],
    visual: 'ui',
  },
  {
    id: 'business-websites',
    number: '03',
    title: 'Business Websites',
    short: 'Professional websites for small and growing businesses.',
    description:
      'A clear, well-structured site that explains what you do, builds trust and makes it simple to get in touch, built so you can keep it current without a developer.',
    includes: ['Pages that match how you sell', 'Enquiry & booking forms', 'Editable content', 'Analytics-ready setup'],
    visual: 'business',
  },
  {
    id: 'landing-pages',
    number: '04',
    title: 'Landing Pages',
    short: 'Conversion-focused landing pages for products, services and campaigns.',
    description:
      'One page, one goal. We write, design and build focused landing pages that explain an offer quickly and make the next step unmistakable.',
    includes: ['Messaging & page structure', 'Conversion-focused design', 'Fast, lightweight build', 'Forms & integrations'],
    visual: 'landing',
  },
  {
    id: 'website-redesign',
    number: '05',
    title: 'Website Redesign',
    short: 'Modernise outdated websites and improve UX, responsiveness and performance.',
    description:
      'We audit what your current site does well, where it falls short, and rebuild it into something that looks current, works on every device and is easier to maintain.',
    includes: ['Audit of the existing site', 'New visual direction', 'Content migration', 'Responsive, faster rebuild'],
    visual: 'redesign',
  },
  {
    id: 'seo-visibility',
    number: '06',
    title: 'SEO & Visibility',
    short: 'Technical SEO, content structure, metadata, indexing and search visibility.',
    description:
      'We help businesses build websites that are technically prepared for search engines and easier for users to discover. No guaranteed rankings, just solid foundations and honest reporting.',
    includes: ['Technical SEO & metadata', 'Semantic, structured content', 'Sitemap, robots & Search Console readiness', 'Performance & analytics setup'],
    details: [
      'Technical SEO audit and fixes',
      'Page titles, meta descriptions and Open Graph metadata',
      'Semantic HTML and heading structure',
      'Structured content and schema markup where appropriate',
      'Descriptive image alt text',
      'Internal linking',
      'XML sitemap and robots.txt',
      'Google Search Console and Bing readiness',
      'Performance optimisation for Core Web Vitals',
      'Local SEO fundamentals where relevant',
      'Analytics setup',
      'Search visibility monitoring',
    ],
    note: 'Search results depend on many factors outside any website. We prepare the technical foundations and report honestly on what changes; we do not promise rankings.',
    visual: 'seo',
  },
  {
    id: 'hosting-care',
    number: '07',
    title: 'Hosting & Care',
    short: 'Deployment, maintenance, updates, monitoring and ongoing care.',
    description:
      'A website is never really finished. We deploy it properly, keep it updated and secure, and stay available for the changes and fixes that come up over time.',
    includes: ['Deployment, domain & SSL', 'Security & dependency updates', 'Content updates & bug fixes', 'Monitoring & backups where supported'],
    details: [
      'Website deployment',
      'Domain connection',
      'SSL / HTTPS setup',
      'Hosting configuration',
      'Performance monitoring',
      'Security updates',
      'Content updates',
      'Bug fixes',
      'Backups where the hosting platform supports them',
      'Uptime monitoring where supported',
      'Ongoing technical maintenance',
    ],
    note: 'Exact hosting and support arrangements depend on your setup and the platform your site runs on. We agree the scope with you up front.',
    visual: 'care',
  },
]
