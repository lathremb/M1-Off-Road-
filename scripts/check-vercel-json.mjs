/* =========================================================
   Validates vercel.json before a push can waste a deployment on it.

   This exists because of a specific failure. A comment was added to
   vercel.json as a `"//redirects"` key — JSON has no comments, and the
   obvious workaround is a key nobody reads. Vercel's config schema rejects
   unknown top-level properties outright, so the deployment failed with:

     should NOT have additional property `//redirects`

   Nothing local caught it. The file is valid JSON, and `astro build` never
   reads vercel.json — only Vercel does, and it validates the config BEFORE
   running the build, so the failure cannot surface as a build error either.
   The only signal was a red deployment after the fact.

   Two rules, deliberately different in severity:

     - a comment-shaped key is always wrong and always fatal. There is no
       version of Vercel's schema where `//note` is valid.
     - an unrecognised key only warns. This allowlist will go stale as Vercel
       adds configuration options, and a stale allowlist must not be able to
       block a deploy that would have worked.
   ========================================================= */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FILE = fileURLToPath(new URL('../vercel.json', import.meta.url));

/* Top-level properties Vercel documents. Used only for the soft warning. */
const KNOWN = new Set([
  '$schema', 'buildCommand', 'cleanUrls', 'crons', 'devCommand', 'framework',
  'functions', 'git', 'headers', 'ignoreCommand', 'images', 'installCommand',
  'outputDirectory', 'public', 'redirects', 'regions', 'rewrites', 'routes',
  'trailingSlash',
]);

let raw;
try {
  raw = await readFile(FILE, 'utf8');
} catch {
  process.exit(0); // no vercel.json is a perfectly valid state
}

let config;
try {
  config = JSON.parse(raw);
} catch (err) {
  console.error(`\nvercel.json is not valid JSON: ${err.message}\n`);
  process.exit(1);
}

const keys = Object.keys(config);
const commentish = keys.filter((k) => k.startsWith('//') || k.startsWith('#'));
const unknown = keys.filter((k) => !KNOWN.has(k) && !commentish.includes(k));

if (commentish.length) {
  console.error(
    `\nvercel.json: comment-shaped key${commentish.length > 1 ? 's' : ''} ` +
      `${commentish.map((k) => `"${k}"`).join(', ')}.\n\n` +
      `  JSON has no comments, and Vercel rejects unknown top-level\n` +
      `  properties: the deploy fails with "should NOT have additional\n` +
      `  property". Put the explanation in the commit message instead.\n`
  );
  process.exit(1);
}

for (const k of unknown) {
  console.warn(
    `vercel.json: "${k}" is not a property this check knows about. If Vercel ` +
      'accepts it, add it to KNOWN in scripts/check-vercel-json.mjs.'
  );
}

console.log(`vercel.json: ${keys.length} top-level keys, no comment keys.`);
