export interface ProcessStep {
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'Understand the business, goals and audience.' },
  { number: '02', title: 'Plan', description: 'Define sitemap, content structure and project direction.' },
  { number: '03', title: 'Design', description: 'Create the visual direction and UI/UX.' },
  { number: '04', title: 'Build', description: 'Develop the responsive website.' },
  { number: '05', title: 'Launch', description: 'Deploy, test and optimise.' },
  { number: '06', title: 'Care', description: 'Provide ongoing updates, maintenance and support.' },
]
