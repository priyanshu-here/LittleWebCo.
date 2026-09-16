/**
 * Client testimonials.
 *
 * Every entry below is marked `sample: true`. That copy is illustrative only,
 * written to show the layout — it is NOT real customer feedback, and the UI
 * labels each card as a sample so it cannot be mistaken for a genuine quote.
 *
 * To publish a real testimonial: add it with `sample` omitted, and only after you
 * have the person's permission. Put their name in `attribution`, plus role and
 * company if they are happy for those to appear, for example
 * `attribution: 'Asha Menon, Director, Northline Motors'`. Delete the samples as
 * real ones arrive — the section handles a mix of both.
 *
 * Never add star ratings, review counts, company logos, customer photos or claims
 * such as "100+ happy clients". None of those are represented here by design.
 */
export interface Testimonial {
  id: string
  quote: string
  /**
   * Who the quote is credited to. Samples use a generic descriptor because there
   * is no real person or company behind them. Real entries use the person's name.
   */
  attribution: string
  /** Illustrative copy, labelled as a sample in the UI. Omit for real testimonials. */
  sample?: boolean
  /** Optional link to the client's website. Real testimonials only. */
  url?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'sample-website-client',
    quote:
      'Really happy with the website. The design came out clean and professional, and they were very patient with all the changes we asked for.',
    attribution: 'Website Client',
    sample: true,
  },
  {
    id: 'sample-business-owner',
    quote:
      'We had a basic idea of what we wanted, and the team turned it into something much more polished. The website works really well on mobile too.',
    attribution: 'Business Owner',
    sample: true,
  },
  {
    id: 'sample-business-website-client',
    quote:
      'Good communication throughout the project and they were quick to make changes whenever we had feedback. The final website looks much better than what we had before.',
    attribution: 'Business Website Client',
    sample: true,
  },
  {
    id: 'sample-ui-ux-client',
    quote:
      'Really liked the overall design and attention to detail. They understood the style we were looking for and made the whole process quite straightforward.',
    attribution: 'UI/UX Client',
    sample: true,
  },
  {
    id: 'sample-web-development-client',
    quote:
      'The website feels modern, loads quickly and is much easier for our customers to use. Overall, a very smooth experience working with the team.',
    attribution: 'Web Development Client',
    sample: true,
  },
]

/** True while any card in the section is illustrative rather than a real quote. */
export const hasSampleTestimonials = testimonials.some((t) => t.sample)
