/**
 * Blog / resources. These are placeholder article structures — replace the
 * `sections` with real content and set `status: 'published'` when ready.
 */
export type BlogCategory = 'Web Design' | 'UI/UX' | 'Small Business Websites' | 'E-commerce' | 'Digital Strategy'

export const blogCategories: BlogCategory[] = [
  'Web Design',
  'UI/UX',
  'Small Business Websites',
  'E-commerce',
  'Digital Strategy',
]

export interface BlogPost {
  slug: string
  title: string
  category: BlogCategory
  excerpt: string
  date: string
  readTime: string
  status: 'draft' | 'published'
  sections: Array<{ heading: string; body: string }>
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-a-small-business-website-actually-needs',
    title: 'What a small business website actually needs',
    category: 'Small Business Websites',
    excerpt:
      'Most small business sites try to do too much. A short guide to the few pages and details that genuinely matter.',
    date: '2026-09-16',
    readTime: '5 min read',
    status: 'draft',
    sections: [
      { heading: 'Start with the one thing you want visitors to do', body: '[Draft — content to be written]' },
      { heading: 'The pages that matter', body: '[Draft — content to be written]' },
      { heading: 'Details that build trust', body: '[Draft — content to be written]' },
    ],
  },
  {
    slug: 'signs-your-website-needs-a-redesign',
    title: 'Signs your website needs a redesign',
    category: 'Web Design',
    excerpt: 'Slow pages, awkward mobile layouts, dated visuals. How to tell when a refresh is overdue and what to fix first.',
    date: '2026-09-16',
    readTime: '4 min read',
    status: 'draft',
    sections: [
      { heading: 'It looks fine on your laptop, and only your laptop', body: '[Draft — content to be written]' },
      { heading: 'Updating anything means calling someone', body: '[Draft — content to be written]' },
      { heading: 'Where to start', body: '[Draft — content to be written]' },
    ],
  },
  {
    slug: 'designing-a-product-page-that-sells',
    title: 'Designing a product page that sells',
    category: 'E-commerce',
    excerpt: 'Photography, hierarchy, and the small decisions that make people confident enough to press buy.',
    date: '2026-09-16',
    readTime: '6 min read',
    status: 'draft',
    sections: [
      { heading: 'Let the product breathe', body: '[Draft — content to be written]' },
      { heading: 'Answer the questions before they are asked', body: '[Draft — content to be written]' },
      { heading: 'Reduce the checkout to the essentials', body: '[Draft — content to be written]' },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
