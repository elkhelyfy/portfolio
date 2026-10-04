export const skills = {
  label: 'Skills',
  headline: 'PHP Every Day. Java And Python Where They Fit.',
  intro:
    'Backend first, full-stack when a feature needs a screen. The card below shows where each skill was actually used: one column per project, a hole where it shipped.',

  /** set large across the section */
  core: ['PHP', 'Laravel', 'Laminas', 'Symfony', 'Java', 'Spring Boot', 'SQL'],

  /** skills × projects, drawn as a punched card. `in` lists project slugs from projects.ts */
  matrix: {
    title: 'skills.card',
    rows: [
      { skill: 'PHP', in: ['e-lma', 'igodar', 'e-lma-cosec', 'smartview', 'rihla'] },
      { skill: 'Laravel', in: ['igodar', 'smartview', 'rihla'] },
      { skill: 'Laminas · Doctrine', in: ['e-lma', 'e-lma-cosec'] },
      { skill: 'MySQL', in: ['e-lma', 'igodar', 'e-lma-cosec'] },
      { skill: 'PostgreSQL', in: ['marechal', 'event-platform', 'rihla', 'tripi'] },
      { skill: 'Java · Spring', in: ['event-platform'] },
      { skill: 'Kafka', in: ['event-platform'] },
      { skill: 'Python · FastAPI', in: ['marechal'] },
      { skill: 'Redis', in: ['marechal'] },
      { skill: 'Docker', in: ['marechal', 'event-platform'] },
      { skill: 'AWS', in: ['event-platform'] },
      { skill: 'Auth · RBAC · JWT', in: ['e-lma', 'e-lma-cosec', 'marechal', 'event-platform'] },
      { skill: 'Automated tests', in: ['e-lma', 'igodar', 'marechal'] },
      { skill: 'LLM / AI APIs', in: ['igodar', 'e-lma-cosec', 'marechal', 'rihla', 'tripi'] },
      { skill: 'Frontend', in: ['e-lma', 'smartview', 'marechal', 'event-platform', 'tripi'] },
    ],
  },

  groups: [
    { name: 'Backend', items: ['PHP 7/8', 'Laravel', 'Laminas', 'Symfony', 'Doctrine ORM', 'Composer', 'REST APIs', 'Java 17', 'Spring Boot', 'Spring Cloud', 'Python', 'FastAPI', 'Node.js'] },
    { name: 'Data', items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Qdrant', 'Meilisearch', 'Data modelling', 'SQL tuning'] },
    { name: 'Cloud & DevOps', items: ['Docker', 'AWS (EC2, ECR, SQS, S3)', 'GitLab CI/CD', 'GitHub Actions', 'Linux', 'Nginx', 'Plesk', 'Prometheus', 'Grafana'] },
    { name: 'Architecture', items: ['Microservices', 'API Gateway', 'Multi-tenant SaaS', 'Kafka', 'Eureka', 'Service–Repository', 'Dependency injection'] },
    { name: 'Security', items: ['RBAC / ACL', 'OAuth2', 'JWT', 'SSO', 'OTP 2FA', 'OWASP', 'Row-level security'] },
    { name: 'AI', items: ['OpenAI', 'Claude', 'Ollama', 'Qwen', 'RAG', 'Text → SQL', 'Vanna AI'] },
    { name: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'Inertia.js', 'jQuery', 'Tailwind CSS'] },
    { name: 'Ways Of Working', items: ['TDD (Pest, PHPUnit, pytest)', 'Code review', 'Agile / Scrum', 'Git', 'Postman', 'Claude Code', 'GitHub Copilot'] },
  ],
};
