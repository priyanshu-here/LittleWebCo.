import { Seo } from '@/components/seo/Seo'
import { Hero } from '@/sections/Hero'
import { TrustStrip } from '@/sections/TrustStrip'
import { WhatWeDo } from '@/sections/WhatWeDo'
import { Services } from '@/sections/Services'
import { FeaturedWork } from '@/sections/FeaturedWork'
import { Process } from '@/sections/Process'
import { WhyUs } from '@/sections/WhyUs'
import { Benefits } from '@/sections/Benefits'
import { Testimonials } from '@/sections/Testimonials'
import { About } from '@/sections/About'
import { FinalCTA } from '@/sections/FinalCTA'

export function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <Services />
      <FeaturedWork />
      <Process />
      <WhyUs />
      <Benefits />
      <Testimonials />
      <About />
      <FinalCTA />
    </>
  )
}
