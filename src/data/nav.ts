import { mailto, profile } from './profile';

/** The menu bar at the top of every page. `href`s are section ids on the home page. */
export const nav = {
  brand: profile.name,
  links: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  /** city shown next to the live clock */
  clock: 'Casablanca',
  resume: { label: 'Résumé', href: profile.resume },
  cta: { label: 'Hire Me', href: mailto },
};
