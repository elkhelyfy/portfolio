/**
 * Renders the project art in public/images/work from public-domain sources.
 *
 *   node scripts/images.mjs
 *
 * Sources are listed in src/data/art.ts and cached in .cache/art.
 * Each picture gets a levels pass and then a two-colour duotone in the site palette;
 * the E-LMA picture is a collage of two sources.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { art } from '../src/data/art.ts';

const CACHE = '.cache/art';
const OUT = 'public/images/work';
const UA = 'portfolio-image-build/1.0 (khelyfy.mohammed@gmail.com)';

// keep in step with the tokens in src/styles/global.css
const INK = '#1b1a17';
const PAPER = '#f5f1e8';
const CARD = '#ece0c2';
const GREY = '#e2ddd2';
const BLUE = '#3e4fd6';
const BLUE_LIGHT = '#b9c0f2';
const CLAY = '#d8774f';
const CLAY_LIGHT = '#efb89c';

mkdirSync(CACHE, { recursive: true });
mkdirSync(OUT, { recursive: true });

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

async function download(item) {
  const file = join(CACHE, `${item.id}${item.source.match(/\.(png|jpe?g)$/i)?.[0] ?? '.jpg'}`);
  if (!existsSync(file)) {
    const res = await fetch(item.source, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`${item.id}: ${res.status} ${item.source}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${item.id}`);
  }
  return file;
}

/** cropped, resized, grayscale source */
async function load(item, width, height) {
  const file = await download(item);
  let img = sharp(file).flatten({ background: '#ffffff' });
  const meta = await img.metadata();
  if (item.crop) {
    const [l, t, w, h] = item.crop;
    img = img.extract({
      left: Math.round(l * meta.width),
      top: Math.round(t * meta.height),
      width: Math.round(w * meta.width),
      height: Math.round(h * meta.height),
    });
  }
  const { data, info } = await img
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

/** two-colour duotone after a levels pass */
async function duotone(item, { width, height, ink = INK, paper, gamma = 1 }) {
  const src = await load(item, width, height);
  const [black, white] = item.levels ?? [0, 255];
  const a = hex(ink);
  const b = hex(paper);
  const out = Buffer.alloc(src.width * src.height * 3);
  for (let i = 0; i < src.width * src.height; i++) {
    const v = clamp((src.data[i * src.channels] - black) / (white - black)) ** gamma;
    out.set(mix(a, b, v), i * 3);
  }
  return { data: out, width: src.width, height: src.height };
}

const raw = ({ data, width, height }) => sharp(data, { raw: { width, height, channels: 3 } });

/** the featured collage: Burroughs' adding machine under a blue punched card */
async function ledgerCollage() {
  const base = await duotone(art.calculator, { width: 1400, height: 960, paper: CARD });
  const card = await duotone(art.punchcard, { width: 820, paper: BLUE, gamma: 0.8 });
  await raw(base)
    .composite([{ input: await raw(card).png().toBuffer(), left: 300, top: 470 }])
    .webp({ quality: 82 })
    .toFile(join(OUT, 'e-lma.webp'));
}

const work = [
  { slug: 'igodar', item: art.hollerith, paper: BLUE_LIGHT },
  { slug: 'e-lma-cosec', item: art.cabinet, paper: GREY },
  { slug: 'smartview', item: art.census, paper: CARD },
  { slug: 'marechal', item: art.typewriter, paper: CLAY_LIGHT },
  { slug: 'event-platform', item: art.telegraph, paper: PAPER },
  { slug: 'rihla', item: art.astrolabe, paper: CLAY },
  { slug: 'tripi', item: art.map, paper: BLUE_LIGHT },
];

await ledgerCollage();
for (const { slug, item, paper } of work) {
  const img = await duotone(item, { width: 1400, height: 960, paper });
  await raw(img).webp({ quality: 82 }).toFile(join(OUT, `${slug}.webp`));
}
console.log('images rendered');
