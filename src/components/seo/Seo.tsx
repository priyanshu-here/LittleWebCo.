import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '@/data/site'
import { founders } from '@/data/founders'

type JsonLd = Record<string, unknown>

interface SeoProps {
  title?: string
  description?: string
  /** Override the canonical path (defaults to the current route). */
  path?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  /** Additional JSON-LD objects for this page (Organization + WebSite are always included). */
  jsonLd?: JsonLd[]
}

const DEFAULT_TITLE = `${site.name} — Digital Design & Development Studio`

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(data: JsonLd[]) {
  let el = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-seo-jsonld', '')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data.length === 1 ? data[0] : data)
}

export function organizationJsonLd(origin: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: origin,
    logo: `${origin}/icon-512.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone.e164,
    founder: founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.role })),
    address: { '@type': 'PostalAddress', addressCountry: site.location.countryCode },
    areaServed: 'Worldwide',
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  }
}

export function breadcrumbJsonLd(origin: string, items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  }
}

/**
 * Manages document title, description, canonical URL, social metadata and JSON-LD
 * for a route. Updates the static tags shipped in index.html instead of duplicating them.
 */
export function Seo({ title, description = site.description, path, type = 'website', noIndex = false, jsonLd = [] }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} — ${site.name}` : DEFAULT_TITLE
    const origin = site.url || window.location.origin
    const url = `${origin}${path ?? pathname}`
    const image = `${origin}/og-image.png`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', 'en_IN')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    const base: JsonLd[] = [
      organizationJsonLd(origin),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: origin,
        description: site.description,
        inLanguage: 'en',
      },
    ]
    upsertJsonLd([...base, ...jsonLd])
    // jsonLd is compared by content, not identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, pathname, type, noIndex, JSON.stringify(jsonLd)])

  return null
}
