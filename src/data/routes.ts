/**
 * Route list used for the generated sitemap.xml. Pure data — no React imports —
 * because vite.config.ts imports this file at build time.
 */
import { projects } from './projects'
import { blogPosts } from './blog'
import { legalPages } from './legal'

export interface SitemapRoute {
  path: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: string
}

const staticRoutes: SitemapRoute[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/work', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/process', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/blog', changefreq: 'weekly', priority: '0.6' },
]

export const sitemapRoutes: SitemapRoute[] = [
  ...staticRoutes,
  ...projects.map((p) => ({ path: `/work/${p.slug}`, changefreq: 'monthly' as const, priority: '0.7' })),
  ...blogPosts
    .filter((p) => p.status === 'published')
    .map((p) => ({ path: `/blog/${p.slug}`, changefreq: 'monthly' as const, priority: '0.5' })),
  ...legalPages.map((p) => ({ path: `/${p.slug}`, changefreq: 'yearly' as const, priority: '0.3' })),
]
