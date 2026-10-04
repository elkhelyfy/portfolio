// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: production URL (canonical + Open Graph links)
  // lets a parent style the root of a child component through its `class` prop
  scopedStyleStrategy: 'where',
  devToolbar: { enabled: false },
  fonts: [
    {
      // display + body: a tight neo-grotesk for the giant headlines
      provider: fontProviders.google(),
      name: 'Inter Tight',
      cssVariable: '--font-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      // window chrome and terminal output: a CRT bitmap face
      provider: fontProviders.google(),
      name: 'VT323',
      cssVariable: '--font-pixel',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
    {
      // small labels, code, base64 blocks
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
