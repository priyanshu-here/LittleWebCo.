import { links, site } from '@/data/site'
import { Seo } from '@/components/seo/Seo'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, WhatsApp } from '@/components/ui/Icons'
import { ContactForm } from '@/components/contact/ContactForm'
import { useIndiaTime } from '@/hooks/useIndiaTime'

export function ContactPage() {
  const time = useIndiaTime()
  return (
    <>
      <Seo
        title="Contact"
        description={`Tell us about your business, your goals and what you'd like to build. ${site.name} replies to every inquiry personally.`}
      />
      <Section padding="none">
        <Container className="pb-section pt-32 md:pt-44">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
              </Reveal>
              <SplitText as="h1" text="Let's build something together." accentWords={['together.']} className="type-h1 mt-6" delay={120} />
              <Reveal delay={450}>
                <p className="type-lead mt-8 max-w-md text-fg-muted">
                  Tell us about your business, your goals and what you'd like to build. We'll get back to you with the
                  next steps.
                </p>
              </Reveal>

              <Reveal delay={520}>
                <dl className="mt-12 divide-y divide-line-c border-y border-line-c">
                  <div className="flex items-center gap-4 py-5">
                    <dt className="grid size-10 shrink-0 place-items-center rounded-full border border-line-c">
                      <Mail className="size-4" />
                      <span className="sr-only">Email</span>
                    </dt>
                    <dd>
                      <a href={links.email} className="link-line text-fg">
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-4 py-5">
                    <dt className="grid size-10 shrink-0 place-items-center rounded-full border border-line-c">
                      <WhatsApp className="size-[18px]" />
                      <span className="sr-only">WhatsApp</span>
                    </dt>
                    <dd>
                      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line text-fg">
                        {site.contact.whatsapp.display}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-4 py-5">
                    <dt className="grid size-10 shrink-0 place-items-center rounded-full border border-line-c">
                      <Phone className="size-4" />
                      <span className="sr-only">Phone</span>
                    </dt>
                    <dd>
                      <a href={links.tel} className="link-line text-fg">
                        {site.contact.phone.display}
                      </a>
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={600} id="schedule" className="mt-12 scroll-mt-28 rounded-md border border-line-c bg-surface p-6 md:p-8">
                <p className="type-label text-fg-muted">Schedule a call</p>
                <h2 className="type-h4 mt-3">A free, no-obligation conversation.</h2>
                <p className="mt-3 text-[0.9375rem] text-fg-muted">
                  {site.contact.schedulingUrl
                    ? 'Pick a time that suits you and we will send a calendar invite.'
                    : 'Send us a couple of times that suit you, in your time zone, and we will confirm a slot by email or WhatsApp.'}
                </p>
                <p className="type-small mt-3 flex items-center gap-2 text-fg-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  Studio time now {time} IST
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {site.contact.schedulingUrl ? (
                    <Button href={site.contact.schedulingUrl} icon="external">
                      Pick a time
                    </Button>
                  ) : (
                    <>
                      <Button href={links.whatsapp} icon="external">
                        Message on WhatsApp
                      </Button>
                      <Button href={links.email} variant="secondary">
                        Email us
                      </Button>
                    </>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={300} className="lg:col-span-6 lg:col-start-7">
              <ContactForm variant="full" />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
