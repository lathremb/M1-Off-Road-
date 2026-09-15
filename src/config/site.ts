/* =========================================================
   M1 Off-Road — single source of truth for every swappable fact.

   Nothing in this file is invented. Everything here was confirmed by the
   owner. Anything that was NOT confirmed lives in ./needs-input.ts instead,
   so the two can never be confused with each other.

   To swap the phone number for a call-tracking number, change `phone` below
   and nothing else. It is the only place a number appears in the codebase.
   ========================================================= */

export const business = {
  name: 'M1 Off-Road',
  owner: 'Mike Sulger',
  city: 'Tucson',
  state: 'Arizona',
  stateCode: 'AZ',
  /* "in business over ten years" — kept as a relative phrase on purpose.
     A founding year would be a fact we do not have. */
  yearsInBusiness: 'over ten years',
  /* The shop has a Facebook page, but the URL was never supplied and a handle
     is not something to guess at — a wrong one sends customers to a stranger.
     [needs-input: facebook] */
  facebook: null as string | null,
} as const;

/* ---------------------------------------------------------
   Phone. One definition, three shapes.
   --------------------------------------------------------- */
export const phone = {
  /** What a human reads. */
  display: '(520) 403-3366',
  /** E.164, for href and for schema.org. */
  e164: '+15204033366',
  /** Tap-to-call href. */
  get tel() {
    return `tel:${this.e164}`;
  },
  /** Tap-to-text href. `?&body=` is the form both iOS and Android accept. */
  get sms() {
    return `sms:${this.e164}?&body=${encodeURIComponent(SMS_PREFILL)}`;
  },
} as const;

/** Pre-filled text body. Short — it sits in the compose field and people edit it. */
const SMS_PREFILL = "Hi Mike, I'd like a quote on my ";

/* ---------------------------------------------------------
   Pricing. The one number that stops people from calling.
   --------------------------------------------------------- */
export const pricing = {
  cageStartingAt: 2500,
  cageStartingAtDisplay: '$2,500',
} as const;

/* ---------------------------------------------------------
   Terms. Confirmed 2026-09-14.
   --------------------------------------------------------- */
export const terms = {
  /* A week is the OUTSIDE case, not the typical one — worded so it reads as a
     ceiling rather than a promise of exactly seven days. */
  leadTime: 'A week at the outside',
  /* Doors, roofs and custom work vary too much for a starting figure. Saying
     so plainly beats leaving the row blank. */
  servicePricing: 'Quoted per machine',
} as const;

/* ---------------------------------------------------------
   Analytics. Empty until the property exists, and the loader in
   BaseLayout skips itself entirely when this is blank — so nothing
   ships to the browser before there is somewhere to send it.
   [needs-input: ga-id]
   --------------------------------------------------------- */
export const GA_MEASUREMENT_ID = '';

/* ---------------------------------------------------------
   Search-engine gate.

   FALSE until the site is finished. While it is false every page emits
   `noindex, nofollow` and robots.txt disallows everything — on preview
   deployments AND on production.

   This matters more than it looks. A vercel.app URL full of placeholder
   blocks and "[ needs input ]" markers is exactly the kind of thing Google
   will happily index and then show to somebody searching for the shop. It is
   far easier to never be indexed than to get de-indexed afterwards.

   Flip to true only when the photography is in, the needs-input list is
   clear, and the real domain is pointed at the project.
   --------------------------------------------------------- */
export const SITE_LIVE = false;

/** True only on a real production deploy of a site that is ready to be found. */
export const indexable =
  SITE_LIVE && process.env.VERCEL_ENV === 'production';

/* ---------------------------------------------------------
   What the shop does. Drives the nav, the home page and the
   service-page routes from one list.
   --------------------------------------------------------- */
export const services = [
  {
    slug: 'roll-cages',
    title: 'Roll Cages',
    nav: 'Roll Cages',
    /* Used as the meta description and the service-page lede. */
    blurb:
      'Full replacement cages built to fit your machine, MIG welded start to finish.',
    startingAt: pricing.cageStartingAtDisplay,
  },
  {
    slug: 'doors',
    title: 'Doors',
    nav: 'Doors',
    blurb:
      'Custom doors that seal against the dust and latch the same way every time.',
    startingAt: null,
  },
  {
    slug: 'roofs',
    title: 'Roofs',
    nav: 'Roofs',
    blurb: 'Roofs built to the cage, not bolted on over it.',
    startingAt: null,
  },
  {
    slug: 'custom-fabrication',
    title: 'Custom Fabrication',
    nav: 'Custom Fab',
    blurb:
      'Bumpers, mounts, brackets, repairs — the work that does not come in a box.',
    startingAt: null,
  },
] as const;

/* ---------------------------------------------------------
   Gallery grouping. Platforms confirmed from the shop's own photos.
   --------------------------------------------------------- */
/* Groups and notes are taken from the badging visible in the shop's own
   photographs, not from an assumption about what a Tucson shop probably
   sees. Kawasaki earned its own group because four KRX builds are on file. */
export const platforms = [
  {
    slug: 'polaris-rzr',
    name: 'Polaris RZR',
    note: 'Pro R, Turbo S, XP 1000 — and a RZR 200. Two seat and four seat.',
  },
  {
    slug: 'can-am',
    name: 'Can-Am',
    note: 'Maverick X3, including the Turbo RR.',
  },
  {
    slug: 'kawasaki',
    name: 'Kawasaki',
    note: 'Teryx KRX4 — cages, doors, roofs and racks.',
  },
  {
    slug: 'in-the-shop',
    name: 'In the Shop',
    note: 'Bare tube, before any of it goes out for coating.',
  },
] as const;

export type Service = (typeof services)[number];
export type Platform = (typeof platforms)[number];
