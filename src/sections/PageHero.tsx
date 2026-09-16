import type { ReactNode } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SplitText } from '@/components/ui/SplitText'
import { Reveal } from '@/components/ui/Reveal'

interface PageHeroProps {
  eyebrow: string
  number?: string
  title: string
  accentWords?: string[]
  lead?: string
  children?: ReactNode
  size?: 'display' | 'h1'
}

export function PageHero({ eyebrow, number, title, accentWords, lead, children, size = 'h1' }: PageHeroProps) {
  return (
    <Section padding="none">
      <Container className="pb-16 pt-32 md:pb-24 md:pt-44">
        <Reveal>
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          text={title}
          accentWords={accentWords}
          className={size === 'display' ? 'type-display mt-6 max-w-6xl' : 'type-h1 mt-6 max-w-5xl'}
          delay={120}
        />
        {lead && (
          <Reveal delay={450}>
            <p className="type-lead mt-8 max-w-2xl text-fg-muted">{lead}</p>
          </Reveal>
        )}
        {children}
      </Container>
    </Section>
  )
}
