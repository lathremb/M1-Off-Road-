/**
 * robots.txt, generated rather than static, so it follows the same gate as the
 * noindex meta tag in Base.astro. One flag controls both.
 *
 * While SITE_LIVE is false this disallows everything, which keeps the
 * placeholder site off Google. Once it is true and the deploy is production,
 * it opens up and points at the sitemap.
 *
 * It also carries the go-live guard, below. This is an odd place for a build
 * check until you notice that this file IS the crawling decision — if
 * anything should refuse to build a site that is about to be crawled wrongly,
 * it is the file granting permission. It runs once per build, on every build,
 * which is what makes it a reliable place to put it.
 */
import { lookup } from 'node:dns/promises';
import type { APIRoute } from 'astro';
import { indexable, SITE_LIVE } from '../config/site';

/**
 * Refuse to publish a crawlable site whose canonical domain does not exist.
 *
 * This is not hypothetical. On 2026-09-23 the deployed site was serving
 * `<link rel="canonical" href="https://m1offroad.com/">` while m1offroad.com
 * had no DNS record at all — the domain was never registered. Nothing was
 * harmed only because SITE_LIVE was false and the whole site was noindex. Flip
 * that flag on its own and every page would have told Google its real address
 * was a domain that does not resolve, which is worse than not being indexed:
 * the pages get dropped rather than ranked, and undoing it means waiting for a
 * recrawl.
 *
 * So the check is the real condition rather than a proxy for it. It does not
 * compare the hostname against a hardcoded placeholder, because the
 * placeholder could legitimately become the real domain one day and the guard
 * would then be wrong in the most confusing possible way. It asks DNS.
 *
 * Only on a go-live build, so a normal build makes no network call. Failing
 * the build is the safe outcome: Vercel keeps serving the last good
 * deployment, so the site stays up while the domain gets sorted out.
 */
async function assertCanonicalDomainResolves(site: URL | undefined) {
  if (!SITE_LIVE) return;

  if (!site) {
    throw new Error(
      'SITE_LIVE is true but `site` is not set in astro.config.mjs. ' +
        'Canonical URLs and the sitemap have nothing to resolve against.'
    );
  }

  try {
    await lookup(site.hostname);
  } catch (err) {
    /* Narrowed structurally rather than as NodeJS.ErrnoException, so the file
       does not depend on @types/node being installed — the build strips types
       rather than checking them, so a missing global would fail silently in
       the editor instead of loudly here. */
    const code = (err as { code?: string })?.code;
    if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
      throw new Error(
        `\n\nGO-LIVE GUARD: ${site.hostname} does not resolve.\n\n` +
          `SITE_LIVE is true, so this build would publish a crawlable site whose\n` +
          `canonical URLs and sitemap all point at a domain that does not exist.\n` +
          `Google would drop those pages rather than rank them.\n\n` +
          `Fix one of these, then rebuild:\n` +
          `  - register ${site.hostname} and point its DNS at this project, or\n` +
          `  - set \`site\` in astro.config.mjs to the domain that is actually\n` +
          `    serving this deployment, or\n` +
          `  - set SITE_LIVE back to false in src/config/site.ts to keep the\n` +
          `    site out of search results for now.\n`
      );
    }
    /* Anything else — a transient resolver failure, no network in the build
       container — is not evidence that the domain is wrong, so it warns rather
       than blocking a deploy over something unrelated. */
    console.warn(
      `go-live guard: could not check ${site.hostname} (${code ?? 'unknown'}). ` +
        'Proceeding; verify the domain resolves before announcing the site.'
    );
  }
}

export const GET: APIRoute = async ({ site }) => {
  await assertCanonicalDomainResolves(site);

  const sitemap = new URL('sitemap-index.xml', site).href;

  const body = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Site is not finished. Nothing here should be indexed yet.\n` +
      `# Flip SITE_LIVE in src/config/site.ts when it is ready.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
