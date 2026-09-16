/**
 * Legal page templates. Everything in square brackets is a placeholder.
 * These drafts are NOT legally reviewed — have them checked before relying on them.
 */
export interface LegalPage {
  slug: string
  title: string
  summary: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const ENTITY = '[Registered business name]'

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How we collect, use and protect the information you share with us.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `This website is operated by ${ENTITY}, trading as Little Web Company, based in [City], [State], India. Questions about this policy can be sent to the email address on our contact page.`,
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you submit our contact form we receive the details you enter, such as your name, company, email address, phone number, country and project description. This information is used only to respond to your enquiry.',
          'We may also collect basic technical information such as browser type and pages visited through analytics tools, if and when such tools are enabled. [Describe analytics tooling, if any.]',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [
          'We use your information to reply to enquiries, prepare proposals, deliver services you have engaged us for, and maintain our records. We do not sell your personal information.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Form submissions are delivered through a third-party form service. [Name the provider and link to their privacy policy.] Messages sent via WhatsApp are subject to WhatsApp’s own terms and privacy policy.',
        ],
      },
      {
        heading: 'Data retention and your rights',
        paragraphs: [
          'We keep enquiry data only as long as needed to respond and, where a project proceeds, for the duration of the engagement and any legally required period. You may request access to, correction of, or deletion of your information by contacting us.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: ['We may update this policy from time to time. The date of the latest revision is shown at the top of this page.'],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    summary: 'The terms that apply to using this website and engaging our services.',
    sections: [
      {
        heading: 'Use of this website',
        paragraphs: [
          'This website is provided for information about our services. Content is provided in good faith but may change without notice. You may not copy, reproduce or redistribute our content without permission.',
        ],
      },
      {
        heading: 'Project engagements',
        paragraphs: [
          'Services are provided under a written proposal or agreement that sets out scope, deliverables, timelines, payment schedule and revision rounds. Where these terms conflict with a signed agreement, the agreement takes precedence.',
        ],
      },
      {
        heading: 'Payments',
        paragraphs: ['[Describe deposit, milestone and final payment terms, accepted payment methods, and currency.]'],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'On full payment, ownership of the final deliverables transfers to the client, unless otherwise agreed in writing. We retain the right to display completed work in our portfolio with the client’s consent.',
          'Third-party assets such as fonts, stock imagery, plugins and platforms remain subject to their own licences.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: ['[Describe limitation of liability appropriate to your jurisdiction. Seek legal advice before publishing.]'],
      },
      {
        heading: 'Governing law',
        paragraphs: ['These terms are governed by the laws of India. [Specify jurisdiction / courts.]'],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'What cookies and similar technologies this website uses.',
    sections: [
      {
        heading: 'What cookies are',
        paragraphs: ['Cookies are small text files stored on your device by websites you visit. They are used to remember preferences and to understand how a site is used.'],
      },
      {
        heading: 'Cookies we use',
        paragraphs: [
          'This website does not set marketing cookies. [If analytics is enabled, list the tool, the cookies it sets, their purpose and their duration.]',
          'Third-party services linked from this site, such as WhatsApp, may set their own cookies under their own policies.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: ['You can control and delete cookies through your browser settings. Disabling cookies may affect how some websites function.'],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    summary: 'Important notes about the content on this website.',
    sections: [
      {
        heading: 'General information',
        paragraphs: [
          'The content on this website is provided for general information about our services. While we aim to keep it accurate and current, we make no guarantees about its completeness.',
        ],
      },
      {
        heading: 'Concept and self-initiated work',
        paragraphs: [
          'Projects labelled “Concept project” or “Self-initiated project” are design explorations created by the studio. The businesses named in them are fictional and are not clients. They are shown to demonstrate our approach and capabilities.',
        ],
      },
      {
        heading: 'External links',
        paragraphs: ['This website may link to external sites. We are not responsible for the content or practices of those sites.'],
      },
      {
        heading: 'No professional advice',
        paragraphs: ['Articles and resources published here are opinion and general guidance, not professional, legal or financial advice.'],
      },
    ],
  },
]

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug)
}
