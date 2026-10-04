import { mailto, profile } from './profile';

export const contact = {
  label: 'Contact',
  line: 'Hiring A Backend Engineer?',
  cta: { label: 'Let’s Talk', href: mailto },

  /** the four windows under the line. `copy` adds a copy-to-clipboard button; `clock` shows live local time */
  channels: [
    { title: 'Email', value: profile.email, href: mailto, copy: profile.email },
    { title: 'LinkedIn', value: 'in/mohammed-el-khelyfy', href: profile.linkedin },
    { title: 'Résumé', value: 'PDF, in French', href: profile.resume },
    { title: 'Local Time', value: profile.location, clock: profile.timezone },
  ] as { title: string; value: string; href?: string; copy?: string; clock?: string }[],

  faqTitle: 'Quick Answers',
  faq: [
    {
      q: 'Are you open to new roles?',
      a: 'Yes. I’m looking for backend or cloud engineering roles in Casablanca, Rabat, or remote. Email is the fastest way to reach me.',
    },
    {
      q: 'PHP or Java?',
      a: 'PHP is my daily driver: more than three years of Laminas, Laravel and Symfony on financial platforms. I use Java with Spring Boot and Spring Cloud for microservices, like my event platform with Kafka and Eureka. Moving between the two is normal for me.',
    },
    {
      q: 'Have you shipped AI features to production?',
      a: 'Yes, inside business software rather than as a chatbot: OpenAI summaries of litigation files in E-LMA CoSec, and an assistant in IGODAR that turns questions into read-only SQL with Claude, OpenAI or Ollama.',
    },
    {
      q: 'How do you handle legacy code?',
      a: 'Incrementally, with production in mind. I helped move E-LMA from Zend Framework to Laminas and from PHP 5 to PHP 8 while it kept running, with no service interruption.',
    },
    {
      q: 'Which languages do you work in?',
      a: 'Arabic is my native language. I work in French (fluent, B2) and English (professional).',
    },
  ],
};
