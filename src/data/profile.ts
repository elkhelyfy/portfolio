/** Who you are. Every section reads from here, so change a detail once. */
export const profile = {
  name: 'Mohammed El Khelyfy',
  short: 'M. El Khelyfy',
  role: 'Backend Engineer',
  focus: 'PHP · Java · Cloud',
  location: 'Casablanca / Rabat, Morocco',
  timezone: 'Africa/Casablanca',
  email: 'khelyfy.mohammed@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohammed-el-khelyfy',
  resume: '/cv/Mohammed-El-Khelyfy-CV.pdf',
  description:
    'Mohammed El Khelyfy is a backend engineer in Casablanca building fund-accounting and SaaS platforms in PHP (Laminas, Laravel, Symfony) and Java (Spring Boot), with AI features shipped to production.',
} as const;

export const mailto = `mailto:${profile.email}?subject=${encodeURIComponent('Backend role — hello from your portfolio')}`;
