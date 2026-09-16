import { services } from '@/data/services'
import { site } from '@/data/site'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal, revealItem } from '@/components/ui/Reveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ContactButton } from '@/components/ui/ContactButton'
import { ServiceList } from '@/components/services/ServiceList'
import { ServiceVisual } from '@/components/services/ServiceVisual'
import { PageHero } from '@/sections/PageHero'
import { Process } from '@/sections/Process'
import { FinalCTA } from '@/sections/FinalCTA'

const detailed = services.filter((s) => s.details && s.details.length)

export function ServicesPage() {
  const origin = site.url || (typeof window !== 'undefined' ? window.location.origin : '')
  return (
    <>
      <Seo
        title="Services"
        description="Website design and development, UI/UX design, business websites, landing pages, redesigns, SEO & visibility and hosting & care from Little Web Company."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Services',
            itemListElement: services.map((s, i) => ({
              '@type': 'Service',
              position: i + 1,
              name: s.title,
              description: s.short,
              url: `${origin}/services#${s.id}`,
              provider: { '@type': 'Organization', name: site.name },
              areaServed: 'Worldwide',
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Services"
        number="02"
        title="What we do."
        lead="Seven services, one small team. Every project pairs design and development from the first conversation, so what gets designed is what gets built."
      />
      <Section padding="none" className="pb-section">
        <Container>
          <Reveal>
            <ServiceList headingLevel="h2" />
          </Reveal>
        </Container>
      </Section>

      {detailed.map((service, idx) => (
        <Section key={service.id} id={`${service.id}-detail`} className="border-t border-line-c" surface={idx % 2 === 0 ? 'inverse' : 'default'}>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow number={service.number}>{service.title}</Eyebrow>
                  <Reveal>
                    <h2 className="type-h2 mt-6">{service.title}</h2>
                  </Reveal>
                  <Reveal delay={100}>
                    <p className="type-lead mt-6 max-w-md text-fg-muted">{service.description}</p>
                  </Reveal>
                  <Reveal delay={160} className="mt-8">
                    <ServiceVisual kind={service.visual} className="max-w-md" />
                  </Reveal>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  <p className="type-label text-fg-muted">What it covers</p>
                </Reveal>
                <Reveal group as="ul" className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {service.details!.map((item, i) => (
                    <li key={item} {...revealItem(Math.min(i, 8))} className="flex items-start gap-3 border-b border-line-c py-3 text-[0.9375rem]">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </Reveal>
                {service.note && (
                  <Reveal delay={120}>
                    <p className="type-small mt-6 max-w-lg text-fg-muted">{service.note}</p>
                  </Reveal>
                )}
                <Reveal delay={160} className="mt-8">
                  <ContactButton variant={idx % 2 === 0 ? 'primary' : 'secondary'}>Discuss Your Project</ContactButton>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Process showLink={false} />
      <FinalCTA />
    </>
  )
}
