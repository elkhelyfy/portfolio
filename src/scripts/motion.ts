/**
 * All page motion, in one place. Elements opt in with data attributes:
 *
 *   data-hero-in      hidden until the hero intro plays (see .js-motion in global.css)
 *   data-punchcard    a card whose holes are punched in column by column
 *   data-scramble     text that decodes like a terminal
 *   data-hero-title   the hero headline, revealed line by line
 *   data-split        a section headline, revealed line by line on scroll
 *   data-reveal       fades up once when it scrolls into view
 *   data-stagger      its children fade up one after another
 *   data-media        an image that unmasks from the bottom
 *   data-layers       an architecture diagram that stacks in tier by tier
 *   data-matrix       a skills card whose holes punch in row by row
 *   data-slide        left|right: drifts into place as you scroll past
 *   data-arrows       chevrons that light up in sequence
 *   data-wordmark     the footer wordmark, letter by letter
 *
 * Two modes. "full" is everything above. "gentle" runs when the visitor's system asks
 * for reduced motion (on Windows: Settings › Accessibility › Visual effects › Animation
 * effects off): nothing moves, slides, scales or drifts, but things still fade in, the
 * holes still punch, terminals still print and counters still count.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);
gsap.defaults({ ease: 'power3.out', duration: 0.7 });

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(sel),
];

/** fonts change line breaks, so split text only once they are in */
const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);

/**
 * Play on the way in and never rewind. (Not `once: true`: a trigger that is already
 * passed when the page loads mid-scroll would kill itself inside ScrollTrigger's
 * first refresh and throw.)
 */
const PLAY_ONCE = 'play none none none';

function heroIntro(full: boolean) {
  if (!document.querySelector('.hero')) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const m = full ? 1 : 0; // distances shrink to nothing in gentle mode

  // the two cards drop onto the desk
  const back = document.querySelector('[data-deck="back"]');
  const front = document.querySelector('[data-deck="front"]');
  if (back)
    tl.fromTo(back, { autoAlpha: 0, y: -70 * m, rotation: 3 * m }, { autoAlpha: 1, y: 0, rotation: 0, duration: 1.1 }, 0);
  if (front)
    tl.fromTo(
      front,
      { autoAlpha: 0, y: -110 * m, rotation: -3 * m },
      { autoAlpha: 1, y: 0, rotation: 0, duration: 1.2 },
      0.08,
    );

  // then the keypunch runs: every hole and printed character in a column lands together
  const card = document.querySelector('[data-punchcard]');
  if (card) {
    const marks = $$<SVGElement>('.pc-holes rect, .pc-chars text', card);
    tl.fromTo(
      marks,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.01,
        ease: 'none',
        stagger: (_i, el: Element) => Number((el as SVGElement).dataset.col) * 0.018,
      },
      0.55,
    );
  }

  // the dialogs pop in, and the status line decodes
  const dialogs = $$('[data-dialog]');
  if (dialogs.length)
    tl.fromTo(
      dialogs,
      { autoAlpha: 0, y: 14 * m, scale: full ? 0.97 : 1 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
      0.35,
    );
  $$('[data-scramble]').forEach((el) => {
    const text = el.textContent!.trim();
    el.textContent = '';
    tl.to(
      el,
      { duration: 0.9, ease: 'none', scrambleText: { text, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', speed: 0.6 } },
      0.5,
    );
  });

  const intro = document.querySelector('.intro__line');
  if (intro) tl.fromTo(intro, { autoAlpha: 0, y: 10 * m }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);

  // headline: each line rises out of its own mask (gentle: each line fades in)
  const title = document.querySelector<HTMLElement>('[data-hero-title]');
  if (title) {
    gsap.set(title, { autoAlpha: 1 });
    const split = SplitText.create(title, { type: 'lines', mask: full ? 'lines' : undefined, linesClass: 'split-line' });
    if (full) tl.from(split.lines, { yPercent: 108, duration: 1, ease: 'power4.out', stagger: 0.09 }, 0.62);
    else tl.from(split.lines, { autoAlpha: 0, duration: 0.8, ease: 'power1.out', stagger: 0.12 }, 0.62);
  }

  const rest = $$('.hero .cta, .hero .caption');
  if (rest.length)
    tl.fromTo(rest, { autoAlpha: 0, y: 12 * m }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.05);
}

function scrollMotion(full: boolean) {
  const m = full ? 1 : 0;

  // section headlines rise line by line (gentle: fade line by line)
  $$('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: full ? 'lines' : undefined, linesClass: 'split-line' });
    gsap.from(split.lines, {
      ...(full ? { yPercent: 108, ease: 'power4.out' } : { autoAlpha: 0, ease: 'power1.out' }),
      duration: 0.9,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: PLAY_ONCE },
    });
  });

  // single blocks fade up as they arrive, batched so neighbours stagger together
  // (both run on enter-back too, so a page opened mid-scroll still reveals what is above)
  const reveal = $$('[data-reveal]');
  const show = (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, overwrite: true });
  if (reveal.length) {
    gsap.set(reveal, { autoAlpha: 0, y: 26 * m });
    ScrollTrigger.batch(reveal, { start: 'top 90%', onEnter: show, onEnterBack: show });
  }

  // groups: children one after another
  $$('[data-stagger]').forEach((group) => {
    const items = [...group.children];
    const play = () => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, overwrite: true });
    gsap.set(items, { autoAlpha: 0, y: 20 * m });
    ScrollTrigger.create({ trigger: group, start: 'top 88%', onEnter: play, onEnterBack: play });
  });

  // images unmask upwards while settling from a slight zoom (gentle: a plain fade)
  $$('[data-media]').forEach((media) => {
    const img = media.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: media, start: 'top 88%', toggleActions: PLAY_ONCE } });
    if (full) {
      tl.fromTo(media, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' });
      if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.3, ease: 'power3.out', clearProps: 'transform' }, 0);
    } else if (img) {
      tl.fromTo(img, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power1.out' });
    }
  });

  // architecture diagrams build from the client down
  $$('[data-layers]').forEach((fig) => {
    const rows = $$('li', fig);
    const spine = fig.querySelector('ol');
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 88%', toggleActions: PLAY_ONCE } });
    if (spine && full) tl.fromTo(spine, { '--spine': 0 }, { '--spine': 1, duration: 0.8, ease: 'power2.inOut' }, 0);
    tl.from(rows, { autoAlpha: 0, x: -10 * m, duration: 0.45, stagger: 0.09 }, 0.05);
  });

  // the skills card punches row by row
  $$('[data-matrix]').forEach((table) => {
    gsap.from($$('.hole', table), {
      autoAlpha: 0,
      scaleY: full ? 0.4 : 1,
      duration: 0.2,
      ease: 'power2.out',
      stagger: 0.025,
      scrollTrigger: { trigger: table, start: 'top 80%', toggleActions: PLAY_ONCE },
    });
  });

  // the big statement drifts in from both sides, tied to the scroll (full mode only)
  if (full) {
    $$('[data-slide]').forEach((el) => {
      const from = el.dataset.slide === 'right' ? 1 : -1;
      gsap.fromTo(
        el,
        { x: () => from * window.innerWidth * 0.12 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: 0.6, invalidateOnRefresh: true },
        },
      );
    });
  }

  // terminals print line by line; commands and refusals take a beat
  const terms = $$('[data-terminal]');
  if (terms.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: terms[0], start: 'top 75%', toggleActions: PLAY_ONCE } });
    terms.forEach((list, n) => {
      list.classList.add('is-waiting');
      let t = 0.2 + n * 0.25;
      [...list.children].forEach((line) => {
        tl.call(() => line.classList.add('is-shown'), undefined, t);
        t += line.classList.contains('cmd') ? 0.5 : line.classList.contains('err') ? 0.32 : 0.07;
      });
    });
  }

  // test suites run up to their total, fast at first, careful at the end
  $$('[data-tests]').forEach((suite) => {
    const total = Number(suite.dataset.tests);
    const cells = $$('.cells i', suite);
    const count = suite.querySelector('[data-count]');
    const run = { n: 0 };
    let done = 0;
    suite.classList.add('is-waiting');
    if (count) count.textContent = '000';
    gsap.to(run, {
      n: total,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: suite, start: 'top 80%', toggleActions: PLAY_ONCE },
      onUpdate: () => {
        const target = Math.round(run.n);
        for (; done < target; done++) cells[done]?.classList.add('is-run');
        if (count) count.textContent = String(target).padStart(3, '0');
      },
    });
  });

  // ▶▶▶ light up left to right, once
  $$('[data-arrows]').forEach((svg) => {
    gsap.from($$('path', svg), {
      autoAlpha: 0.15,
      x: -6 * m,
      duration: 0.35,
      stagger: 0.12,
      repeat: 1,
      repeatDelay: 0.2,
      scrollTrigger: { trigger: svg, start: 'top 85%', toggleActions: PLAY_ONCE },
    });
  });

  // footer wordmark, letter by letter
  $$('[data-wordmark]').forEach((mark) => {
    const word = mark.querySelector('span');
    const logo = mark.querySelector('svg');
    if (!word) return;
    const split = SplitText.create(word, { type: 'chars', mask: full ? 'chars' : undefined, charsClass: 'split-char' });
    const tl = gsap.timeline({ scrollTrigger: { trigger: mark, start: 'top 85%', toggleActions: PLAY_ONCE } });
    if (logo) tl.from(logo, { autoAlpha: 0, y: 24 * m, rotation: -8 * m, duration: 0.7 }, 0);
    if (full) tl.from(split.chars, { yPercent: 110, duration: 0.7, ease: 'power4.out', stagger: 0.035 }, 0.1);
    else tl.from(split.chars, { autoAlpha: 0, duration: 0.5, ease: 'power1.out', stagger: 0.04 }, 0.1);
  });
}

const mm = gsap.matchMedia();
mm.add(
  { full: '(prefers-reduced-motion: no-preference)', gentle: '(prefers-reduced-motion: reduce)' },
  (ctx) => {
    const full = Boolean(ctx.conditions?.full);
    fontsReady.then(() => {
      heroIntro(full);
      scrollMotion(full);
      // layout can still shift as lazy images arrive
      if (document.readyState === 'complete') ScrollTrigger.refresh();
      else window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    });
  },
);
