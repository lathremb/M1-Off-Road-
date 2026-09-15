/**
 * robots.txt, generated rather than static, so it follows the same gate as the
 * noindex meta tag in Base.astro. One flag controls both.
 *
 * While SITE_LIVE is false this disallows everything, which keeps the
 * placeholder site off Google. Once it is true and the deploy is production,
 * it opens up and points at the sitemap.
 */
import type { APIRoute } from 'astro';
import { indexable } from '../config/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  const body = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Site is not finished. Nothing here should be indexed yet.\n` +
      `# Flip SITE_LIVE in src/config/site.ts when it is ready.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
