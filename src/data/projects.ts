import type { ArtId } from './art';

/** one tier of a simplified architecture diagram, top (client) to bottom (infra) */
export interface Layer {
  tier: string;
  parts: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** `work` shows under Experience, `side` under Projects */
  kind: 'work' | 'side';
  /** where it was built */
  org: string;
  tagline: string;
  /** the one-paragraph version, used on cards */
  summary: string;
  /** a short highlight shown next to the name */
  badge: string;
  stack: string[];
  context: string;
  /** what I did; the first three appear on the home page */
  highlights: string[];
  /** simplified architecture, drawn as stacked tiers */
  layers?: Layer[];
  image: string;
  art: ArtId[];
}

export const projects: Project[] = [
  {
    slug: 'e-lma',
    name: 'E-LMA',
    kind: 'work',
    org: 'Winfox Service',
    tagline: 'Portfolio management and fund accounting for investment firms in Luxembourg',
    summary:
      'A large financial platform in daily production use. I extend its 450-entity data model, write the money logic, and helped move it from Zend Framework to Laminas without taking it offline.',
    badge: '450+ entities',
    stack: ['PHP 8', 'Laminas', 'Doctrine ORM', 'MySQL', 'jQuery', 'GitLab CI', 'Plesk'],
    context:
      'E-LMA keeps the books for investment companies in Luxembourg: portfolios, fund accounting, interest, coupons and the reports that go with them. People rely on it every day, so every change has to be correct the first time and invisible to them.',
    highlights: [
      'Evolved the data model of a 450+ entity Doctrine ORM application on MySQL.',
      'Built financial services for interest, coupons, distributions, bank reconciliation and bank-statement import.',
      'Modernised the platform from Zend Framework to Laminas and from PHP 5 to PHP 8, with no service interruption.',
      'Optimised the SQL behind financial reports over large data volumes, with PDF and Excel exports.',
      'Secured access with role-based permissions (ACL / RBAC), one-time-password 2FA and Microsoft 365 single sign-on over OAuth2.',
      'Integrated DocuSign e-signatures and exchange rates from the ECB and OANDA.',
      'Shipped through GitLab merge requests, code review and CI/CD, deployed on Plesk with per-client feature configuration, and fixed production incidents.',
    ],
    image: '/images/work/e-lma.webp',
    art: ['calculator', 'punchcard'],
  },
  {
    slug: 'igodar',
    name: 'IGODAR',
    kind: 'work',
    org: 'Winfox Service',
    tagline: 'AI fund administration, a new platform built by a team of three',
    summary:
      'A greenfield Laravel platform: exact money maths in bcmath, a Service–Repository architecture, and an assistant that answers questions in plain language with read-only SQL.',
    badge: 'TDD · team of 3',
    stack: ['PHP 8.3', 'Laravel 13', 'MySQL', 'Pest', 'Tailwind CSS', 'Claude', 'OpenAI', 'Ollama'],
    context:
      'IGODAR is a new fund-administration product, started from an empty repository by three engineers. It is where the lessons from years of E-LMA got applied on day one.',
    highlights: [
      'Designed the Service–Repository architecture: thin controllers, validated input, dependency injection.',
      'Built financial modules for equalisation, distributions and waterfalls, with exact monetary arithmetic in bcmath.',
      'Created a business assistant that answers natural-language questions about the data by generating SQL with Claude, OpenAI or Ollama, restricted to read-only queries.',
      'Worked test-first with Pest and automated the deployment to Plesk with a script.',
    ],
    image: '/images/work/igodar.webp',
    art: ['hollerith'],
  },
  {
    slug: 'e-lma-cosec',
    name: 'E-LMA CoSec',
    kind: 'work',
    org: 'Winfox Service',
    tagline: 'Entity management and company secretariat: governance, documents and litigation',
    summary:
      'Company management for whole groups of companies. I connected it to the Moroccan courts’ API and taught it to summarise litigation files with an LLM.',
    badge: 'courts API + LLM',
    stack: ['PHP 8', 'Laminas', 'Doctrine ORM', 'MySQL', 'OpenAI API', 'jQuery', 'Nginx', 'GitLab CI'],
    context:
      'CoSec, also deployed for Bayard, manages the companies of a group: governance, corporate documents, litigation and bond coupons. Legal teams work in it all day, so records have to be complete and documents easy to find.',
    highlights: [
      'Integrated Mahakim, the Moroccan courts’ API: hearings are imported, kept in sync by cron jobs, and case files export to PDF.',
      'Used the OpenAI API to summarise litigation files automatically from their PDF documents.',
      'Built the business logic for litigation, document management and bond coupons, including interest notices sent by email.',
      'Implemented role-based access, application security and document-governance rules.',
      'Automated Linux / Nginx deployments and GitLab CI pipelines, and supported the platform in production.',
    ],
    image: '/images/work/e-lma-cosec.webp',
    art: ['cabinet'],
  },
  {
    slug: 'smartview',
    name: 'SmartView',
    kind: 'work',
    org: 'Winfox Service',
    tagline: 'Multi-tenant SaaS for reporting and dashboards',
    summary:
      'Reporting for many clients from one codebase: a tenant-aware Laravel, Vue.js and Inertia.js platform with dashboards and PDF / Excel exports.',
    badge: 'multi-tenant SaaS',
    stack: ['Laravel', 'Vue.js', 'Inertia.js', 'PDF / Excel exports'],
    context:
      'SmartView gives each client its own reporting space, with dashboards and exports for decision-making, on one shared multi-tenant platform.',
    highlights: [
      'Architected and developed a multi-tenant SaaS platform with Laravel, Vue.js and Inertia.js.',
      'Built reporting features, dashboards and PDF / Excel exports for decision-making.',
      'Structured the codebase for maintainability, growth and performance.',
    ],
    image: '/images/work/smartview.webp',
    art: ['census'],
  },
  {
    slug: 'marechal',
    name: 'Marechal',
    kind: 'side',
    org: 'Final-year project',
    tagline: 'A RAG platform that answers questions from your documents, with sources',
    summary:
      'A multi-tenant SaaS API for document Q&A, with hybrid search, OCR, row-level security and 319 automated tests.',
    badge: '319 tests',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Qdrant', 'Meilisearch', 'Next.js', 'Docker', 'Prometheus', 'Grafana'],
    context:
      'Marechal answers questions using only the documents a customer uploads, and cites the passages it used. It was my final-year engineering project, built like a product rather than a demo.',
    highlights: [
      'A SaaS API that answers questions from the user’s own documents and cites its sources.',
      'Hybrid search that combines vectors (Qdrant) with keywords (Meilisearch).',
      'Background processing on Redis workers, including OCR for scanned pages.',
      'Per-tenant data isolation with PostgreSQL row-level security, and JWT authentication.',
      '319 automated tests, with Prometheus and Grafana for monitoring.',
    ],
    layers: [
      { tier: 'client', parts: ['Next.js', 'React'] },
      { tier: 'api', parts: ['FastAPI', 'JWT'] },
      { tier: 'jobs', parts: ['Redis workers', 'OCR'] },
      { tier: 'data', parts: ['PostgreSQL + RLS', 'Qdrant', 'Meilisearch'] },
      { tier: 'ops', parts: ['Docker', 'Prometheus', 'Grafana'] },
    ],
    image: '/images/work/marechal.webp',
    art: ['typewriter'],
  },
  {
    slug: 'event-platform',
    name: 'Event Platform',
    kind: 'side',
    org: 'Side project',
    tagline: 'Event booking on six Spring Boot microservices',
    summary:
      'Six services behind an API gateway, talking over Kafka, discovered through Eureka, deployed to AWS.',
    badge: '6 services',
    stack: ['Java 17', 'Spring Boot', 'Spring Cloud', 'Kafka', 'Eureka', 'PostgreSQL', 'React', 'Docker', 'AWS'],
    context:
      'A side project to practise distributed systems end to end: an event-booking platform split into services the way a larger team would split it.',
    highlights: [
      'Six services: API gateway, customers, events, reservations, notifications and a service registry.',
      'Asynchronous messaging between services over Kafka, and service discovery with Eureka.',
      'The whole stack in Docker Compose, with JWT authentication and a waitlist when events sell out.',
      'Deployed to AWS through an automated cloud pipeline.',
    ],
    layers: [
      { tier: 'client', parts: ['React'] },
      { tier: 'edge', parts: ['API Gateway', 'JWT'] },
      { tier: 'services', parts: ['customers', 'events', 'reservations', 'notifications'] },
      { tier: 'platform', parts: ['Kafka', 'Eureka registry'] },
      { tier: 'data', parts: ['PostgreSQL'] },
      { tier: 'ops', parts: ['Docker Compose', 'AWS'] },
    ],
    image: '/images/work/event-platform.webp',
    art: ['telegraph'],
  },
  {
    slug: 'rihla',
    name: 'Rihla',
    kind: 'side',
    org: 'Side project',
    tagline: 'A mobile guide to Moroccan culture, narrated by AI',
    summary:
      'A Laravel backend feeding a Flutter app with location-aware cultural content and audio generated by ElevenLabs.',
    badge: 'AI audio',
    stack: ['Laravel', 'Flutter', 'PostgreSQL', 'ElevenLabs'],
    context:
      'Rihla, Arabic for “journey”, helps people discover the Moroccan culture around them, with stories they can listen to on the spot.',
    highlights: [
      'A mobile app for discovering Moroccan culture, with AI-generated audio from ElevenLabs.',
      'Content chosen by the user’s location.',
      'A service-oriented Laravel backend that drives the Flutter app’s dynamic content.',
    ],
    layers: [
      { tier: 'client', parts: ['Flutter app'] },
      { tier: 'api', parts: ['Laravel services'] },
      { tier: 'ai', parts: ['ElevenLabs audio', 'location context'] },
      { tier: 'data', parts: ['PostgreSQL'] },
    ],
    image: '/images/work/rihla.webp',
    art: ['astrolabe'],
  },
  {
    slug: 'tripi',
    name: 'Tripi',
    kind: 'side',
    org: 'Side project',
    tagline: 'An AI itinerary generator for travel in Morocco',
    summary: 'Day-by-day trip plans with a budget, generated by Gemini from the traveller’s preferences.',
    badge: 'Gemini',
    stack: ['Node.js', 'Next.js', 'Prisma', 'PostgreSQL', 'Gemini API'],
    context:
      'Tripi turns a traveller’s preferences into a day-by-day plan for Morocco, with local recommendations and a budget.',
    highlights: [
      'A web platform that generates day-by-day itineraries for Morocco, with budget management.',
      'Gemini API integration for personalised local recommendations based on the user’s preferences.',
    ],
    layers: [
      { tier: 'client', parts: ['Next.js'] },
      { tier: 'api', parts: ['Node.js', 'Prisma'] },
      { tier: 'ai', parts: ['Gemini'] },
      { tier: 'data', parts: ['PostgreSQL'] },
    ],
    image: '/images/work/tripi.webp',
    art: ['map'],
  },
];

export const bySlug = (slug: string) => {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`No project with slug "${slug}" in src/data/projects.ts`);
  return project;
};

/** the "Projects" section on the home page: things I built myself */
export const projectsSection = {
  label: 'Projects',
  headline: 'Things I Built On My Own Time',
  intro:
    'Where I try the architectures my day job doesn’t need yet: microservices, RAG, mobile, AI generation. Each one is built like a product, not a demo.',
  /** order on the page, by slug */
  projects: ['marechal', 'event-platform', 'rihla', 'tripi'],
};
