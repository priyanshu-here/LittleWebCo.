/**
 * Legal pages, transcribed from the documents supplied by Little Web Co.
 * (Little_Web_Co_Legal_Documents.zip, dated 17 September 2026).
 *
 * Square brackets are the placeholders that were in those source documents and
 * still need filling in: the registered entity name and business address.
 * These have not been reviewed by a legal professional.
 */

/** Kept as a literal rather than imported from site.ts: routes.ts pulls this
 *  file into vite.config.ts at build time, where import.meta.env is unavailable. */
const EMAIL = 'littleweb.company@gmail.com'
const ENTITY = '[Registered business name]'
const ADDRESS = '[Business address]'
const SITE = 'https://littlewebco.vercel.app/'

export interface LegalSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface LegalPage {
  slug: string
  title: string
  summary: string
  sections: LegalSection[]
}

const contactSection = (): LegalSection => ({
  heading: 'Contact',
  paragraphs: [`Little Web Co.`, ENTITY, ADDRESS, `Email: ${EMAIL}`, `Website: ${SITE}`],
})

export const legalPages: LegalPage[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How we collect, use, store and protect personal information.',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Privacy Policy explains how Little Web Co. ("Little Web Co.", "we", "us", or "our") collects, uses, stores, and protects personal information when you visit our website, submit an enquiry, contact us, request a quotation, schedule a call, or engage our services.',
        ],
      },
      {
        heading: 'Information we may collect',
        paragraphs: ['Depending on how you interact with us, we may collect:'],
        bullets: [
          'Name and contact details, including email address and phone/WhatsApp number.',
          'Business or company name and country.',
          'Project information, requirements, budget, timeline, preferences, and other information voluntarily provided.',
          'Information submitted through enquiry/contact forms.',
          'Communications exchanged by email, WhatsApp, telephone, or scheduling services.',
          'Technical information such as IP address, browser/device type, operating system, referring pages, and website usage information.',
          'Information contained in files, images, documents, or other materials voluntarily provided for a project.',
          'Payment and billing information where required for an engagement. Payment-card details may be processed directly by payment providers rather than stored by us.',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: ['We may use information to:'],
        bullets: [
          'Respond to enquiries and communicate with prospective or existing clients.',
          'Understand project requirements and prepare proposals or quotations.',
          'Deliver, maintain, improve, and support our services.',
          'Process payments, invoices, and business records.',
          'Schedule meetings and calls.',
          'Maintain website functionality, security, and performance.',
          'Detect, prevent, and address fraud, abuse, security incidents, or unlawful activity.',
          'Comply with applicable legal, tax, accounting, and regulatory obligations.',
          'Send marketing communications where permitted by applicable law and where the required consent or other lawful basis exists.',
        ],
      },
      {
        heading: 'Contact forms and enquiries',
        paragraphs: [
          'Information submitted through a contact or project enquiry form is used to respond to your request and, where applicable, discuss or deliver requested services.',
          'Please do not submit passwords, payment-card numbers, government identification numbers, or other highly sensitive information through a general enquiry form unless we specifically request it through an appropriate secure process.',
        ],
      },
      {
        heading: 'Legal basis and consent',
        paragraphs: [
          'Where applicable law requires a particular legal basis or consent for processing personal data, we will process information in accordance with those requirements. Where processing is based on consent, you may withdraw consent subject to applicable law and any consequences explained at the time of collection.',
        ],
      },
      {
        heading: 'Cookies and similar technologies',
        paragraphs: [
          'Our website may use cookies and similar technologies for essential functionality, preferences, analytics, security, and other purposes. Details are provided in our Cookie Policy.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: ['We may use third-party providers for services such as:'],
        bullets: [
          'Website hosting and deployment',
          'Forms and enquiry handling',
          'Email and communications',
          'Scheduling',
          'Analytics',
          'Payment processing',
          'Maps and embedded content',
          'Security and content delivery',
          'Fonts and other website functionality',
        ],
      },
      {
        heading: 'Data sharing',
        paragraphs: [
          'Third-party providers may process information under their own terms and privacy policies.',
          'We do not sell personal information as a business model.',
          'We may disclose information to service providers, professional advisers, payment providers, hosting providers, technology providers, or government/law-enforcement authorities where required by law or where reasonably necessary to provide services, protect rights, security, or users, or comply with legal obligations.',
        ],
      },
      {
        heading: 'International processing',
        paragraphs: [
          'Because we may use international technology providers and work with clients in different countries, information may be processed outside your country of residence. Where applicable law imposes requirements for international transfers, we will seek to comply with those requirements.',
        ],
      },
      {
        heading: 'Data retention',
        paragraphs: [
          'We retain personal information for as long as reasonably necessary for the purposes for which it was collected, including providing services, maintaining business and accounting records, resolving disputes, enforcing agreements, meeting legal obligations, and protecting legitimate interests, subject to applicable law.',
        ],
      },
      {
        heading: 'Data security',
        paragraphs: [
          'We use reasonable administrative, technical, and organisational safeguards appropriate to the information we handle. However, no internet transmission or storage system can be guaranteed to be completely secure.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Depending on your location and applicable law, you may have rights relating to access, correction, deletion, withdrawal of consent, objection, restriction, portability, or other controls over personal information.',
          'Requests may be submitted using the contact details below.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'Our website and services are primarily directed toward businesses and general audiences. We do not intentionally design our services to collect personal information from children.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, security, content, or availability of third-party websites.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this Privacy Policy when our services, data practices, or legal obligations change. The updated version will be posted on this page with a revised Last Updated date.',
        ],
      },
      contactSection(),
    ],
  },

  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    summary: 'The terms that govern use of this website and our services.',
    sections: [
      {
        heading: 'Acceptance',
        paragraphs: [
          'These Terms & Conditions govern access to and use of the Little Web Co. website and the services offered through it. By using the website or engaging our services, you agree to these Terms, subject to any separate written project agreement.',
        ],
      },
      {
        heading: 'Our services',
        paragraphs: ['Little Web Co. provides digital design and development services that may include:'],
        bullets: [
          'Website design and development',
          'UI/UX design',
          'Landing pages',
          'E-commerce websites',
          'Frontend and backend development',
          'Integrations',
          'Deployment and hosting assistance',
          'Website maintenance and technical support',
          'Related digital services agreed in writing',
        ],
      },
      {
        heading: 'Website use',
        paragraphs: ['You agree to use the website only for lawful purposes. You must not:'],
        bullets: [
          'Attempt unauthorised access to our systems.',
          'Interfere with website security or operation.',
          'Introduce malicious code or harmful material.',
          'Scrape, reproduce, redistribute, or commercially exploit website content without permission, except where permitted by law.',
          'Use the website in a way that violates applicable law or the rights of others.',
        ],
      },
      {
        heading: 'Project scope',
        paragraphs: [
          'Specific deliverables, timelines, revisions, prices, and responsibilities are determined by the applicable proposal, quotation, statement of work, or service agreement.',
          'Each client project should have an agreed scope in writing. Work outside the agreed scope may require additional fees, revised timelines, or a new quotation.',
        ],
      },
      {
        heading: 'Client responsibilities',
        paragraphs: ['Clients are responsible for:'],
        bullets: [
          'Providing accurate project information and timely feedback.',
          'Providing content, images, brand assets, credentials, approvals, and other materials reasonably required.',
          'Ensuring that client-provided materials do not infringe third-party rights.',
          'Maintaining ownership and appropriate access to domains, hosting, payment accounts, and other third-party accounts unless otherwise agreed.',
        ],
      },
      {
        heading: 'Fees and payments',
        paragraphs: [
          'Fees, deposits, milestones, taxes where applicable, and payment deadlines will be stated in the applicable proposal, quotation, or agreement.',
          'Third-party costs such as domains, hosting upgrades, premium software, plugins, stock assets, API usage, or payment-provider fees may be charged separately unless expressly included.',
        ],
      },
      {
        heading: 'Revisions',
        paragraphs: [
          'The number of revisions included in a project will be specified in the applicable proposal or agreement. Requests beyond the agreed revision allowance or changes to an approved scope may result in additional charges or timeline changes.',
        ],
      },
      {
        heading: 'Timelines and delays',
        paragraphs: [
          'Estimated timelines depend on timely receipt of required content, approvals, credentials, payments, and feedback. Delays caused by missing information, late approvals, third-party services, or events outside our reasonable control may extend delivery timelines.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Projects may depend on third-party services including hosting providers, domain registrars, APIs, payment gateways, analytics services, email providers, software libraries, and other platforms.',
          'We do not guarantee uninterrupted availability of third-party services and do not control their pricing, policies, availability, or technical changes.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Ownership and licensing of project deliverables will be governed by the applicable project agreement. Unless otherwise agreed:',
        ],
        bullets: [
          "Client-provided materials remain the client's property or the property of their respective owners.",
          'Third-party assets remain subject to their respective licences.',
          "Little Web Co.'s pre-existing tools, reusable components, templates, frameworks, methods, and know-how remain the property of Little Web Co., unless expressly transferred in writing.",
          'Final client deliverables may be transferred or licensed according to the payment and ownership terms agreed for the project.',
        ],
      },
      {
        heading: 'Portfolio use',
        paragraphs: [
          'Unless a written agreement states otherwise, Little Web Co. may display completed project work, screenshots, or project descriptions in its portfolio for promotional purposes, subject to applicable confidentiality and intellectual-property restrictions.',
        ],
      },
      {
        heading: 'Warranties and results',
        paragraphs: [
          'We will use reasonable professional care in delivering agreed services. Unless expressly agreed in writing, we do not guarantee specific levels of website traffic, leads, sales, revenue, search-engine ranking, conversion rates, or business growth.',
        ],
      },
      {
        heading: 'Maintenance and support',
        paragraphs: [
          'Any maintenance or support period included in a package or agreement applies only to the scope stated in that package or agreement. New features, major redesigns, third-party failures, or work outside the agreed support scope may incur additional charges.',
        ],
      },
      {
        heading: 'Termination',
        paragraphs: [
          'Either party may terminate a project according to the terms of the applicable service agreement. Fees for work already completed, approved third-party costs, and other amounts that are contractually due may remain payable.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the extent permitted by applicable law, Little Web Co. will not be liable for indirect, incidental, special, consequential, or loss-of-profit damages arising from use of the website or services.',
          'Nothing in these Terms excludes liability that cannot lawfully be excluded or limited.',
        ],
      },
      {
        heading: 'Indemnity',
        paragraphs: [
          'To the extent permitted by law, a client may be responsible for claims arising from unlawful, infringing, misleading, or unauthorised materials supplied by the client.',
        ],
      },
      {
        heading: 'Confidentiality',
        paragraphs: [
          'Confidential information supplied by a client should be handled according to any applicable confidentiality or NDA agreement. These website Terms do not replace a separately executed NDA.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'Unless a separate written agreement states otherwise, these Terms are intended to be governed by the applicable laws of India, with the appropriate courts having jurisdiction as determined by applicable law.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may update these Terms from time to time. The updated version will be posted on this website with a revised Last Updated date.',
          'These website Terms are not a substitute for a project-specific service agreement.',
        ],
      },
      contactSection(),
    ],
  },

  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    summary: 'What cookies and similar technologies this website may use.',
    sections: [
      {
        heading: 'What are cookies?',
        paragraphs: [
          'Cookies are small files or similar technologies stored on or accessed from a device when a website is visited. They can help websites operate, remember preferences, understand usage, and improve functionality.',
        ],
      },
      {
        heading: 'How we may use cookies',
        paragraphs: ['Little Web Co. may use cookies or similar technologies for:'],
        bullets: [
          'Essential website functionality',
          'Security and fraud prevention',
          'Remembering preferences',
          'Understanding website traffic and usage',
          'Improving performance and user experience',
          'Supporting embedded or third-party functionality',
        ],
      },
      {
        heading: 'Types of cookies',
        paragraphs: [
          'Essential cookies may be required for core website functionality, security, navigation, or basic operation.',
          'Preference cookies may remember settings or choices made by visitors.',
          'Analytics cookies, where analytics tools are enabled, may help us understand how visitors use the website.',
          'Third-party cookies may be placed by services embedded into or linked from the website, under their respective policies.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Depending on the website configuration, third-party services may include hosting, analytics, scheduling, maps, forms, payment services, embedded media, security tools, or other technologies.',
          'The actual services used by the website should be listed here before publication if they set non-essential cookies or similar identifiers.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'You may be able to manage or disable cookies through your browser settings. Blocking certain cookies may affect website functionality.',
          'Where applicable, cookie-consent controls may also be provided on the website.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this Cookie Policy when our technology, services, or legal requirements change. The updated version will be published with a revised Last Updated date.',
          'This Cookie Policy should be updated if Little Web Co. adds analytics, advertising pixels, marketing technologies, embedded services, or other tracking technologies.',
        ],
      },
      contactSection(),
    ],
  },

  {
    slug: 'refund-policy',
    title: 'Refund & Cancellation Policy',
    summary: 'Our general approach to cancellations, deposits, refunds and related charges.',
    sections: [
      {
        heading: 'Purpose',
        paragraphs: [
          'This Refund & Cancellation Policy explains the general approach of Little Web Co. to cancellations, project deposits, refunds, and related charges for digital design and development services.',
          'The terms of a specific signed proposal, quotation, or service agreement may override this policy where expressly agreed in writing.',
        ],
      },
      {
        heading: 'Project deposits and advance payments',
        paragraphs: [
          'Where an advance payment or deposit is required, the amount and payment schedule will be stated in the applicable proposal or agreement.',
          'An advance payment may be allocated toward project planning, design, development time, reserved capacity, third-party costs, or other project commitments.',
        ],
      },
      {
        heading: 'Cancellation before work starts',
        paragraphs: ['If a client cancels before substantial work has started, any refund will be considered based on:'],
        bullets: [
          'Work already completed.',
          'Non-refundable third-party costs already incurred.',
          'Payment-processing charges where applicable.',
          'Any cancellation terms agreed in the proposal or service agreement.',
        ],
      },
      {
        heading: 'Cancellation after work has started',
        paragraphs: [
          'If a project is cancelled after work has started, amounts corresponding to completed work, committed resources, approved expenses, and non-refundable third-party costs may be retained or become payable.',
          'Any remaining refundable amount, if applicable, will be determined according to the project agreement and applicable law.',
        ],
      },
      {
        heading: 'Non-refundable work and costs',
        paragraphs: [
          'Unless otherwise agreed in writing, the following may be non-refundable to the extent permitted by law:',
        ],
        bullets: [
          'Work already completed or delivered.',
          'Approved third-party purchases.',
          'Domain registration or renewal costs.',
          'Hosting costs already incurred.',
          'Premium software, plugins, fonts, stock assets, or licences purchased for the project.',
          'Payment-provider charges that cannot be recovered.',
        ],
      },
      {
        heading: 'Client delays',
        paragraphs: [
          'If a client substantially delays a project, fails to provide required materials, or becomes unresponsive, the project may be paused or rescheduled. Any restart work, expired third-party services, or additional work caused by the delay may be charged separately.',
        ],
      },
      {
        heading: 'Project abandonment',
        paragraphs: [
          'If a client stops responding for an extended period after reasonable attempts to contact them, the project may be treated as inactive or abandoned according to the applicable project agreement.',
          'Reactivation may require a revised timeline, updated scope, or additional fees.',
        ],
      },
      {
        heading: 'Refunds for defects',
        paragraphs: [
          'If a delivered service has a material defect within an expressly agreed warranty/support period, Little Web Co. will generally seek to correct the issue within the agreed scope.',
          'A defect claim does not automatically entitle a client to a full refund where the service has been substantially delivered and the issue can reasonably be corrected.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Little Web Co. is not responsible for refunds or service failures caused by third-party providers where Little Web Co. has no control over the provider. Any refund available from a third-party provider may be subject to that provider’s own policy.',
        ],
      },
      {
        heading: 'Refund requests',
        paragraphs: [`Refund requests should be sent to ${EMAIL} with:`],
        bullets: ['Client name', 'Project name', 'Payment date', 'Amount paid', 'Reason for the request', 'Relevant supporting information'],
      },
      {
        heading: 'Processing',
        paragraphs: [
          'Where a refund is approved, it will generally be processed using the original payment method where reasonably possible. Processing times may depend on the payment provider or financial institution.',
        ],
      },
      {
        heading: 'Applicable law',
        paragraphs: [
          'Nothing in this policy is intended to remove or restrict any consumer or other legal rights that cannot lawfully be excluded.',
        ],
      },
      contactSection(),
    ],
  },

  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    summary: 'Important notes about the information published on this website.',
    sections: [
      {
        heading: 'General information',
        paragraphs: [
          'The information provided on the Little Web Co. website is for general informational purposes. We make reasonable efforts to keep website information useful and accurate, but we do not guarantee that all information is complete, current, or error-free.',
        ],
      },
      {
        heading: 'No professional advice',
        paragraphs: [
          'Information published on this website should not be treated as legal, financial, tax, accounting, cybersecurity, or other professional advice.',
          'You should consult an appropriately qualified professional where professional advice is required.',
        ],
      },
      {
        heading: 'Services and results',
        paragraphs: [
          'Descriptions of our services, portfolio work, examples, case studies, testimonials, and other project information are provided for informational or illustrative purposes.',
          'Past work does not guarantee future results. Unless expressly agreed in writing, we do not guarantee specific website traffic, leads, revenue, sales, search-engine rankings, conversion rates, or business growth.',
        ],
      },
      {
        heading: 'Concept and self-initiated work',
        paragraphs: [
          'Projects labelled “Concept project” or “Self-initiated project” are design explorations created by the studio. The businesses named in them are fictional and are not clients. They are shown to demonstrate our approach and capabilities.',
          'Website demos generated through our demo builder are illustrative previews. Any figures, reviews or imagery shown in them are marked as samples and do not represent real business data.',
        ],
      },
      {
        heading: 'Third-party links and services',
        paragraphs: [
          'Our website may contain links to or integrations with third-party websites, platforms, software, or services.',
          'We are not responsible for the content, availability, security, privacy practices, terms, or policies of third parties.',
        ],
      },
      {
        heading: 'Client-provided content',
        paragraphs: [
          'Clients are responsible for the legality, accuracy, ownership, licensing, and permissions associated with content, images, trademarks, data, documents, and other materials supplied to Little Web Co.',
        ],
      },
      {
        heading: 'Technology and availability',
        paragraphs: [
          'Websites and digital services may be affected by hosting outages, domain issues, DNS problems, API changes, software vulnerabilities, cyber incidents, maintenance, network failures, or other events outside our reasonable control.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Unless otherwise stated, website text, branding, graphics, designs, code, and other materials owned by Little Web Co. remain our intellectual property or the property of their respective owners.',
          'Third-party materials remain subject to their respective licences and rights.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We take reasonable measures to protect systems and information under our control. However, no internet-connected service can be guaranteed to be completely secure or continuously available.',
        ],
      },
      {
        heading: 'External content',
        paragraphs: [
          'Information, prices, availability, features, and policies of third-party services may change without notice. Users should verify important information directly with the relevant third-party provider.',
        ],
      },
      {
        heading: 'Limitation',
        paragraphs: [
          'To the extent permitted by applicable law, Little Web Co. disclaims responsibility for losses arising solely from reliance on general informational content on this website.',
          'Nothing in this Disclaimer excludes or limits liability that cannot lawfully be excluded or limited.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: ['We may update this Disclaimer when our services, website, or legal obligations change.'],
      },
      contactSection(),
    ],
  },
]

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug)
}
