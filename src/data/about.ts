export const about = {
  label: 'About',
  statement:
    'I build the parts of software nobody sees and everybody relies on: data models, money logic, APIs and the pipelines that ship them.',
  bio: [
    'I’m a backend engineer based between Casablanca and Rabat, with more than three years of PHP in production on Laminas, Laravel and Symfony. Most of my work lives where mistakes are expensive: interest, coupons, distributions and reports an auditor will read.',
    'Outside work I build to learn: microservices in Spring Boot with Kafka, a RAG platform in FastAPI, and two AI-powered apps for discovering Morocco. I use Claude Code and GitHub Copilot every day, and I ship AI features where they earn their place.',
  ],

  /** the `whoami` window: [key, value] */
  whoami: [
    ['name', 'Mohammed El Khelyfy'],
    ['role', 'Backend engineer · PHP, Java'],
    ['based', 'Casablanca / Rabat, Morocco'],
    ['shipping', 'in production since Dec 2022'],
    ['speaks', 'Arabic · French (B2) · English'],
    ['status', 'open to new roles'],
  ] as [string, string][],

  /** how I got here, oldest first */
  path: [
    { step: 'BTS', title: 'Computer Systems & Networks', where: 'BTS Laayoune' },
    { step: 'LICENCE', title: 'Computer Systems Engineering', where: 'IGA Casablanca' },
    { step: 'DLTI', title: 'Engineering degree, Software Development & IT', where: 'IGA Casablanca' },
    { step: 'WINFOX', title: 'Full-stack developer, backend focus', where: 'Dec 2022 → now' },
  ],

  principles: [
    { title: 'Exact, Not Approximate', text: 'Money maths in bcmath. Never floats.' },
    { title: 'Secure By Default', text: 'Roles and permissions, one-time-password 2FA, single sign-on.' },
    { title: 'Legacy, Modernised', text: 'Old code moved forward while it keeps running.' },
    { title: 'Tested Before Trusted', text: 'TDD where it pays, CI on every merge request.' },
  ],
};
