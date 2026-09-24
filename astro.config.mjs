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
    // Left at 'auto', which keeps this site's 27KB stylesheet external.
    //
    // 'always' was tried on the theory that a single-page site gains nothing
    // from an external stylesheet — there are no other navigations to reuse
    // the cache on — and that the extra render-blocking request was what took
    // LCP from 2.4s to 2.6s when the five pages became one.
    //
    // It was not. Three runs each: LCP 2.6s external, 2.6s inlined, FCP 0.9s
    // both ways. The stylesheet is not on the critical path in any way that
    // shows up. Inlining would have added 28KB to every HTML response, which
    // /_astro/* caching otherwise serves once a year, so it is not worth
    // paying for a difference that does not exist.
    inlineStylesheets: 'auto',
  },
});
