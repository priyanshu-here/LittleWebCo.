export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'process',
    question: 'How does the process work?',
    answer:
      'It starts with a conversation about your business and goals. From there we plan the structure, design the interfaces, build the site, test it thoroughly and launch it together. You work directly with the two of us at every step.',
  },
  {
    id: 'timeline',
    question: 'How long does a website take?',
    answer:
      'It depends on the scope. A focused landing page moves much faster than a multi-page site or a store. After the first call we share a realistic timeline for your specific project, and we keep you updated as the work progresses.',
  },
  {
    id: 'cost',
    question: 'How much does a website cost?',
    answer:
      'Every project is quoted individually based on scope, the number of pages or screens, integrations and timelines. Send us a short brief and we will reply with a clear, itemised proposal.',
  },
  {
    id: 'international',
    question: 'Do you work with international clients?',
    answer:
      'Yes. We are based in India and work remotely with businesses anywhere. We schedule calls around your time zone and keep communication simple through email, WhatsApp and video calls.',
  },
  {
    id: 'hosting',
    question: 'Do you provide domain and hosting?',
    answer:
      'Yes. Hosting & Care covers deployment, domain connection, SSL and hosting configuration. Domains and hosting are registered in your name so you always own them. Exact arrangements depend on your setup.',
  },
  {
    id: 'maintenance',
    question: 'Do you provide website maintenance?',
    answer:
      'Yes. Our Hosting & Care service covers content updates, security updates, bug fixes and monitoring, so you have someone to call whenever your site needs attention.',
  },
  {
    id: 'seo',
    question: 'Can you help my website get found on Google?',
    answer:
      'We build sites with the technical foundations search engines need: metadata, semantic structure, sitemaps, performance and Search Console readiness. We do not promise rankings, because no honest studio can, but we make sure nothing technical is holding you back.',
  },
  {
    id: 'redesign',
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. We start by reviewing what your current site does well and where it falls short, then design and rebuild it as a modern, responsive site, migrating the content that matters.',
  },
  {
    id: 'revisions',
    question: 'How many revisions are included?',
    answer:
      'Revision rounds are agreed up front in the proposal, so there are no surprises. Because you work directly with us, feedback is quick and most changes are handled within the normal rhythm of the project.',
  },
  {
    id: 'call',
    question: 'Can I schedule a call?',
    answer:
      'Absolutely. Use the contact form or message us on WhatsApp with a couple of times that suit you and we will confirm a slot. Calls are free and there is no obligation.',
  },
]
