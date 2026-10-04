import { mailto, profile } from './profile';

export const footer = {
  wordmark: 'El Khelyfy',
  /** shown in base64 under the wordmark */
  motto: 'correct first, then fast. then boring. boring is good.',
  links: [
    { label: 'Résumé (PDF)', href: profile.resume, external: true },
    { label: 'Projects', href: '/#projects' },
    { label: 'Image Credits', href: '/credits' },
  ],
  social: [
    { label: 'LinkedIn', href: profile.linkedin, external: true },
    { label: profile.email, href: mailto },
  ],
};
