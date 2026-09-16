export interface Reason {
  number: string
  title: string
  description: string
}

/** Why Little Web Company — differentiators that are true of how the studio works. */
export const reasons: Reason[] = [
  { number: '01', title: 'Personal attention', description: 'You work directly with the two people designing and building your site.' },
  { number: '02', title: 'Modern design', description: 'Typography, spacing and layout considered from the first sketch, not added at the end.' },
  { number: '03', title: 'Responsive development', description: 'Built for phones, tablets and desktops from the start, not shrunk to fit.' },
  { number: '04', title: 'Performance-focused builds', description: 'Lightweight code, optimised assets and fast loading as a baseline.' },
  { number: '05', title: 'SEO-ready structure', description: 'Semantic markup, metadata and sitemaps set up so search engines can find you.' },
  { number: '06', title: 'Clear communication', description: 'Plain-language updates, agreed timelines and one point of contact.' },
  { number: '07', title: 'Flexible solutions', description: 'Scoped around what your business needs rather than a fixed package.' },
  { number: '08', title: 'Long-term care', description: 'Hosting, updates and support after launch, for as long as you need us.' },
]

/** Results / benefits: what a client receives, stated without unverifiable numbers. */
export const benefits = [
  { title: 'A site that loads fast', body: 'Optimised images, minimal scripts and clean code so pages feel instant on mobile data.' },
  { title: 'Looks right on every screen', body: 'Layouts designed and tested from 320px phones to wide desktops.' },
  { title: 'Ready to be found', body: 'Titles, descriptions, structured data, sitemap and analytics in place from day one.' },
  { title: 'Accessible by default', body: 'Semantic HTML, keyboard navigation and readable contrast for everyone.' },
  { title: 'Easy to keep current', body: 'Content you can edit yourself, with us on hand for the rest.' },
  { title: 'Yours to keep', body: 'Domain, hosting and code registered in your name. No lock-in.' },
]

/** Trust strip facts: true statements about the studio. */
export const trustFacts = [
  'Independent two-person studio',
  'Design and development in-house',
  'Based in India, working worldwide',
  'Direct line to the people building your site',
]

export const globalPoints = [
  'Remote collaboration',
  'Flexible communication',
  'International project support',
  'Time-zone friendly scheduling',
  'Professional project workflow',
]
