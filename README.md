# Mohammed El Khelyfy — portfolio

A static Astro site for a backend engineer. Loosely inspired by [typesafe.ai](https://typesafe.ai/) (giant grotesk
headlines, 1984-style windows, crop marks), with its own palette and an IBM punched card as the hero: the holes
spell the owner's name in IBM 029 card code.

## Commands

| Command                   | Action                                          |
| :------------------------ | :---------------------------------------------- |
| `npm install`             | Install dependencies                            |
| `npm run dev`             | Dev server at `localhost:4321`                  |
| `npm run build`           | Static build to `./dist/`                       |
| `npx astro check`         | Type-check `.astro` and `.ts` files             |
| `node scripts/images.mjs` | Re-render the project art in `public/images/work` |

## Editing content

Every section reads from its own file in `src/data/`. Change the data, not the components.

| File            | Drives                                                                        |
| :-------------- | :---------------------------------------------------------------------------- |
| `profile.ts`    | Name, email, LinkedIn, résumé path, time zone (shared by every section)        |
| `nav.ts`        | The menu bar: links, clock city, Résumé and Hire Me buttons                    |
| `hero.ts`       | Punched-card text, the two dialogs (incl. “open to roles”), headline, CTA      |
| `about.ts`      | Statement, bio, the `whoami` window, education path, principles               |
| `experience.ts` | Current job, duties, stats, the big highlight, which projects show under it   |
| `projects.ts`   | Every project and case study; `projectsSection` picks the ones you built      |
| `skills.ts`     | Headline, core skills, the skills × projects card, grouped skill lists         |
| `demos.ts`      | Extra blocks on case-study pages (IGODAR terminal, Marechal test grid)         |
| `contact.ts`    | “Let’s Talk” line, contact windows, quick answers                             |
| `footer.ts`     | Wordmark, motto, footer links                                                 |
| `art.ts`        | Image sources, crops and credits                                              |

Each project in `projects.ts` gets a page at `/projects/<slug>`. A `layers` list on a project draws its
architecture diagram. Colours and type live in `src/styles/global.css`; fonts in `astro.config.mjs`.

## Motion

`src/scripts/motion.ts` holds all animation (GSAP, ScrollTrigger, SplitText, ScrambleText). Elements opt in
with data attributes listed at the top of that file, e.g. `data-reveal` or `data-split`. With
`prefers-reduced-motion: reduce` the page renders finished, with no movement.

## Images

Every image is public domain or CC0 from Wikimedia Commons (listed at `/credits`). `scripts/images.mjs` downloads
the sources into `.cache/` (git-ignored) and renders two-colour duotones in the site palette. `public/og.png` is a
screenshot of the hero, used as the Open Graph image.

## Before deploying

Set `site` in `astro.config.mjs` to the real domain; canonical and Open Graph URLs are built from it.
