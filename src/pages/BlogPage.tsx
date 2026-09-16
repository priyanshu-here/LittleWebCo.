import { useState } from 'react'
import { Link } from 'react-router'
import { blogCategories, blogPosts, type BlogCategory } from '@/data/blog'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { ArrowUpRight } from '@/components/ui/Icons'
import { PageHero } from '@/sections/PageHero'
import { FinalCTA } from '@/sections/FinalCTA'
import { cn } from '@/lib/utils'

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export function BlogPage() {
  const [category, setCategory] = useState<BlogCategory | 'All'>('All')
  const posts = blogPosts.filter((p) => category === 'All' || p.category === category)

  return (
    <>
      <Seo
        title="Blog"
        description="Notes on web design, UI/UX, SEO and digital strategy for small businesses, from Little Web Company."
      />
      <PageHero
        eyebrow="Resources"
        title="Notes on design, development and small business websites."
        accentWords={['development']}
        lead="Short, practical writing for business owners deciding what to build next. New articles are added as we write them."
      />
      <Section padding="none" className="pb-section">
        <Container>
          <div className="flex flex-wrap gap-2 border-b border-line-c pb-8" role="group" aria-label="Filter by category">
            {(['All', ...blogCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-fast',
                  category === c ? 'border-fg bg-fg text-bg' : 'border-line-c text-fg-muted hover:border-fg hover:text-fg',
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="py-16 text-fg-muted">No articles in this category yet.</p>
          ) : (
            <Reveal group as="ul" key={category}>
              {posts.map((post, i) => (
                <li key={post.slug} {...revealItem(i)} className="group relative border-b border-line-c">
                  <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:py-10">
                    <div className="type-label flex gap-4 text-fg-muted md:col-span-3">
                      <span>{post.category}</span>
                      {post.status === 'draft' && <span className="text-accent-text">Draft</span>}
                    </div>
                    <div className="md:col-span-7">
                      <h2 className="type-h3">
                        <Link to={`/blog/${post.slug}`} className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                          <span className="transition-fast group-hover:text-accent-text group-focus-within:text-accent-text">{post.title}</span>
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-xl text-fg-muted">{post.excerpt}</p>
                    </div>
                    <div className="type-small flex items-center justify-between gap-4 text-fg-muted md:col-span-2 md:justify-end">
                      <span>
                        {dateFormat.format(new Date(post.date))} · {post.readTime}
                      </span>
                      <ArrowUpRight className="size-4 transition-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </li>
              ))}
            </Reveal>
          )}
        </Container>
      </Section>
      <FinalCTA />
    </>
  )
}
