export const experience = {
  label: 'Experience',
  headline: 'My Day Job: Software For Investment Funds',

  company: 'Winfox Service',
  role: 'Full-Stack Developer',
  focus: 'backend focus',
  location: 'Casablanca, Morocco',
  /** ISO date; the tenure counter starts here */
  since: '2022-12-01',
  summary:
    'I work across a family of financial products for investment firms: a fund-accounting platform in daily production use, its company-secretariat sibling, a reporting SaaS, and a new AI-assisted fund-administration platform.',
  duties: [
    'Design and build financial business logic: interest, coupons, distributions, waterfalls.',
    'Evolve large data models and tune the SQL behind heavy reports and exports.',
    'Modernise legacy code without taking production down.',
    'Integrate third-party APIs: e-signature, exchange rates, single sign-on, court records, LLMs.',
    'Ship through GitLab merge requests, code review and CI/CD, and support production.',
  ],
  stats: [
    { value: '450+', label: 'Doctrine entities in one model' },
    { value: '4', label: 'products worked on' },
    { value: '5 → 8', label: 'PHP versions, migrated live' },
  ],

  /** the big statement under the projects */
  highlight: {
    lines: ['450+ Entities,', 'Zero Downtime.'],
    note: '*Zend Framework → Laminas and PHP 5 → PHP 8, on a fund-accounting platform that stayed in production the whole time',
    link: { label: 'Case study', href: '/projects/e-lma' },
  },

  /** the projects shown under this job, by slug from projects.ts */
  projects: ['e-lma', 'igodar', 'e-lma-cosec', 'smartview'],
  projectsLabel: 'Projects I Work On',
};
