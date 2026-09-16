import { Link, Navigate, useParams } from 'react-router'
import { getPost } from '@/data/blog'
import { site } from '@/data/site'
import { breadcrumbJsonLd, Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'
import { FinalCTA } from '@/sections/FinalCTA'

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <Navigate to="/404" replace />
  const origin = site.url || window.location.origin
  const published = post.status === 'published'

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        type="article"
        noIndex={!published}
        jsonLd={[
          breadcrumbJsonLd(origin, [
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          ...(published
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: post.title,
                  description: post.excerpt,
                  datePublished: post.date,
                  author: { '@type': 'Organization', name: site.name },
                  publisher: { '@type': 'Organization', name: site.name },
                  mainEntityOfPage: `${origin}/blog/${post.slug}`,
                },
              ]
            : []),
        ]}
      />
      <article>
        <Section padding="none">
          <Container className="pb-section pt-32 md:pt-44">
            <div className="lg:grid lg:grid-cols-12">
              <div className="lg:col-span-8 lg:col-start-3">
                <Reveal>
                  <Link to="/blog" className="type-label link-line text-fg-muted">
                    All articles
                  </Link>
                  <p className="type-label mt-8 flex flex-wrap gap-4 text-fg-muted">
                    <span>{post.category}</span>
                    <span>{dateFormat.format(new Date(post.date))}</span>
                    <span>{post.readTime}</span>
                  </p>
                </Reveal>
                <SplitText as="h1" text={post.title} className="type-h1 mt-6" delay={100} />
                <Reveal delay={400}>
                  <p className="type-lead mt-8 text-fg-muted">{post.excerpt}</p>
                </Reveal>

                {!published && (
                  <Reveal className="mt-10 rounded-md border border-dashed border-fg/30 bg-bg-2 p-5">
                    <p className="type-label text-accent-text">Draft outline</p>
                    <p className="type-small mt-2 text-fg-muted">
                      This article structure is a placeholder. Replace the sections in src/data/blog.ts and set the
                      status to published when the piece is written.
                    </p>
                  </Reveal>
                )}

                <div className="mt-14 space-y-12 border-t border-line-c pt-12">
                  {post.sections.map((section, i) => (
                    <Reveal key={section.heading} delay={Math.min(i * 40, 120)}>
                      <h2 className="type-h3">{section.heading}</h2>
                      <p className="mt-4 text-fg-muted">{section.body}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </article>
      <FinalCTA />
    </>
  )
}
