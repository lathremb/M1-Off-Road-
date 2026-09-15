// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The canonical origin. Used for <link rel=canonical>, Open Graph URLs and the
// sitemap, so it has to be the real production domain before launch.
// [needs-input: domain] — see NEEDS-INPUT.md
const SITE = 'https://m1offroad.com';

export default defineConfig({
  site: SITE,

  // Every page prerenders to plain HTML. The quote form posts to /api/quote.js,
  // which Vercel picks up from the root `api/` directory as a serverless
  // function — no adapter, and nothing about the site itself stops being static.
  output: 'static',

  integrations: [
    sitemap({
      // The thank-you state is a client-side swap, not a page, so there is
      // nothing here to exclude yet. Kept explicit so it is obvious where a
      // filter would go.
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    // Small per-page CSS goes inline, which removes a render-blocking request
    // on the pages that matter most for the mobile score.
    inlineStylesheets: 'auto',
  },
});
