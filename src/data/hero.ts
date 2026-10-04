import { mailto, profile } from './profile';

export interface Dialog {
  /** title-bar text; with `dated`, today's date is put in front of it */
  title: string;
  dated?: boolean;
  /** first line, set in capitals */
  heading?: string;
  lines: string[];
  action?: { label: string; href: string; style: 'button' | 'link' };
}

export const hero = {
  /**
   * The punched cards behind the hero. The holes spell `text` in IBM 029 card code,
   * one character per column: A–Z, 0–9, space and - . , / & @ # : ' = " ( ) * $ % _ > ? ; < !
   * Up to 80 characters.
   */
  card: {
    text: 'MOHAMMED EL KHELYFY - BACKEND ENGINEER - PHP JAVA SQL - CASABLANCA',
    caption: 'IBM 029 card code · the holes spell my name',
  },
  backCard: {
    text: 'LAMINAS LARAVEL SYMFONY SPRING BOOT KAFKA MYSQL POSTGRESQL DOCKER AWS',
  },

  dialogs: [
    {
      title: 'Status',
      dated: true,
      heading: 'Open to new roles',
      lines: ['Backend · cloud — Casablanca, Rabat or remote'],
      action: { label: 'Send an email', href: mailto, style: 'button' },
    },
    {
      title: 'Dec 2022 ▪ Right now',
      lines: ['Building fund-accounting software for investment firms in Luxembourg'],
      action: { label: 'See my experience', href: '#experience', style: 'link' },
    },
  ] satisfies Dialog[],

  /** the line above the headline: left ........ right */
  intro: [profile.name, `${profile.role}, ${profile.focus}`],
  headline: 'Backends Where Every Cent Has To Reconcile',
  cta: { label: 'Email Me', href: mailto },

  /** decorative strip down the left margin, shown as base64 */
  strip: `${profile.name} / ${profile.role} / ${profile.location} / PHP, Java, SQL / ${profile.email} / `,
};
