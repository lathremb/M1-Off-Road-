/* =========================================================
   Every fact the site needs that nobody has confirmed yet.

   The rule for this project is that no fact gets invented. When a page
   wanted a number, a date, a material or an address that was not in the
   brief, the gap was registered here and the page renders a visible
   bracketed marker instead of a plausible-sounding guess.

   `npm run build` runs scripts/needs-input.mjs, which:
     1. writes NEEDS-INPUT.md from this list, and
     2. fails loudly if an entry here is never referenced in src/ — so the
        list cannot quietly drift out of step with the pages.

   Delete an entry once the real fact is in place. The build will then tell
   you which file still references it.
   ========================================================= */

export type Severity = 'launch' | 'content';

export interface Gap {
  /** Shown inside the bracketed marker on the page. */
  label: string;
  /** What it is needed for. Goes in NEEDS-INPUT.md. */
  why: string;
  /** 'launch' = cannot go live without it. 'content' = site works, page is thinner. */
  severity: Severity;
}

export const gaps = {
  /* ---- cannot launch without these ---- */
  domain: {
    label: 'final domain',
    why: 'Set in astro.config.mjs. Canonical URLs, Open Graph and the sitemap all resolve against it.',
    severity: 'launch',
  },
  address: {
    label: 'shop address',
    why: 'Contact page and LocalBusiness schema. If the shop does not take walk-ins, say so and we publish the service area only — that is a valid answer, not a missing one.',
    severity: 'launch',
  },
  hours: {
    label: 'hours',
    why: 'Contact page and LocalBusiness schema. Google shows these directly in local results.',
    severity: 'launch',
  },
  'contact-email': {
    label: 'inbox for quote requests',
    why: 'Set as CONTACT_EMAIL in Vercel. The quote form returns a friendly error until this exists.',
    severity: 'launch',
  },
  'resend-key': {
    label: 'Resend API key',
    why: 'Set as RESEND_API_KEY in Vercel. Same as the Lathrem Homebuilders setup.',
    severity: 'launch',
  },
  'ga-id': {
    label: 'GA4 measurement ID',
    why: 'Set in src/config/site.ts. Analytics is skipped entirely while this is blank.',
    severity: 'launch',
  },
  'logo-art': {
    label: 'the real logo artwork',
    why: "The site currently shows a plain 'M1 OFF-ROAD' wordmark and no mark at all. The real badge — clearly visible in detail-badge-white-cage.jpg and detail-badge-bronze-cage.jpg — is a star with a stylised M1 locked into it, the 1 drawn as a waving American flag, and OFF-ROAD set small on the diagonal. Redrawing that from a photograph would read as a poor copy of Mike's logo rather than his logo. Ask him for the vector file, or for whoever cut the badge plates — they will have it.",
    severity: 'launch',
  },
  facebook: {
    label: 'Facebook page URL',
    why: 'Linked from the footer and listed in sameAs on the LocalBusiness schema. It is currently the only place the business exists online, so the link matters — and a guessed handle would send customers to someone else.',
    severity: 'launch',
  },
  'mike-photo': {
    label: 'a photo of Mike',
    why: "The about page has a portrait slot and there is nothing to put in it. Every other slot on the site now has a real photograph, so this is the last visibly empty one — and it is the page where it matters most, because people hire the person. See SHOT-LIST.md for the remaining shots.",
    severity: 'launch',
  },

  /* ---- site works without these, pages are just thinner ---- */
  process: {
    label: 'how a job actually runs',
    why: 'Does the customer book ahead, drop the machine off, wait? This is the "how it works" section that is currently omitted rather than guessed at.',
    severity: 'content',
  },
  tubing: {
    label: 'tubing spec',
    why: 'Material and wall thickness. Competitors lead with this. Cannot be stated without Mike confirming it.',
    severity: 'content',
  },
  deposit: {
    label: 'deposit terms',
    why: 'Whether a deposit is required to book. Belongs next to the price so there are no surprises.',
    severity: 'content',
  },
  warranty: {
    label: 'warranty',
    why: 'Any guarantee on the welds or the finish. Omitted entirely rather than implied.',
    severity: 'content',
  },
} as const satisfies Record<string, Gap>;

export type GapKey = keyof typeof gaps;
