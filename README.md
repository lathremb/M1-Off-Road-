# M1 Off-Road

Marketing site for M1 Off-Road, Mike Solger's custom UTV fabrication shop in
Tucson, Arizona. Astro + Tailwind, static output, deploying to Vercel.

**Not deployed yet.** See "Before launch" below.

---

## Running it

Node is installed at `%LOCALAPPDATA%\nodejs-portable` (a portable build — the
MSI installer needed admin rights). It is on your user PATH, so a new terminal
will find `node` and `npm` without anything extra.

```bash
npm install     # first time only
npm run dev     # http://localhost:4321
npm run build   # static output to dist/, then regenerates the two docs below
npm run preview # serve the built site on :4322
```

## What is where

| Path | What it is |
|---|---|
| `src/config/site.ts` | **Every swappable fact.** Phone number, GA ID, services, platforms, price. |
| `src/config/needs-input.ts` | Every fact nobody has confirmed yet. |
| `src/config/shots.ts` | The photo brief, as data. |
| `src/pages/` | One file per page. |
| `api/quote.js` | The quote form's serverless function. Resend, same as Lathrem Homebuilders. |
| `scripts/needs-input.mjs` | Generates `NEEDS-INPUT.md` and `SHOT-LIST.md` at build time. |
| `_reference/` | The 64 Facebook thumbnails. Git-ignored, not deployed, not usable. |

### Changing the phone number

`src/config/site.ts`, the `phone` object. It is the only place a number
appears — the header, the sticky bar, the footer, every call-to-action and the
schema markup all read from it. Swapping in a call-tracking number is a
one-line change.

### The two generated documents

`NEEDS-INPUT.md` and `SHOT-LIST.md` are written by `npm run build`. Do not edit
them — edit the registries in `src/config/` and rebuild. The build also warns
if a registry entry is no longer referenced by any page, or if a page
references something that was deleted, so the documents cannot drift out of
step with the site.

---

## No invented facts

The brief was explicit: no tubing spec, no wall thickness, no certifications,
no build counts, no review counts, no testimonials, no awards, no lead times,
no address. Where a page wanted one of those, it renders a visible
`[ needs input — … ]` marker instead of something plausible.

That extends to structured data. `Schema.astro` carries locality only, no
`priceRange` band, and no `aggregateRating`. The one price claim — $2,500 for a
typical full cage — is confirmed, and appears as a real `Offer`.

Facts that ARE confirmed and used throughout: Tucson AZ; Mike Solger; (520)
403-3366; over ten years; roll cages, doors, roofs; all MIG welding in house;
powder coating sent out; $2,500 typical full cage; mostly Polaris RZR and
Can-Am but a wide range of machines.

---

## Before launch

Run `npm run build` and read `NEEDS-INPUT.md` — it is generated and current.
The short version:

1. **Photography.** Everything is a placeholder. `SHOT-LIST.md` says what to
   shoot and at what ratio.
2. **Resend.** Set `RESEND_API_KEY` and `CONTACT_EMAIL` in Vercel (see
   `.env.example`). Until then the form returns "The form isn't hooked up yet"
   rather than failing silently.
3. **Google Analytics.** Put the GA4 ID in `src/config/site.ts`. While it is
   blank, no analytics script is emitted at all.
4. **Domain.** Set it in `astro.config.mjs` and in `public/robots.txt`.
5. **Address, hours, Facebook URL.** Footer, contact page and schema.
6. **The logo.** `src/components/Logo.astro` is a hand trace from a photo of
   the badge on a door. Mike needs to approve it or supply the original art.

## Picking this back up — GitHub and Vercel

The repo is initialised and the first commit is made. Nothing is pushed
anywhere yet, because creating a GitHub repo needs your GitHub login and
that is not something to hand off.

Git is a portable install at `%LOCALAPPDATA%\git-portable`, already on your
user PATH. Open a **new** terminal in this folder so it picks that up.

### 1. Check the commit is what you expect

```bash
git log --stat -1
```

The local identity is set to `Ben Lathrem <lathremben@gmail.com>` — I inferred
the name, so change it if it is wrong:

```bash
git config user.name "Your Name"
```

### 2. Make the GitHub repo

Create an **empty private** repo at https://github.com/new — no README, no
.gitignore, no licence, or the first push will conflict. Call it
`m1-off-road`. Then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/m1-off-road.git
git push -u origin main
```

Private is the right call for now: the site is full of placeholders and the
logo is an unapproved trace.

### 3. Link it to Vercel

In the Vercel dashboard: **Add New → Project → Import** the repo. Vercel
auto-detects Astro; accept the defaults. The root `api/` directory is picked
up as a serverless function with no adapter and no extra configuration —
which is why `output` stays `'static'` and every page is still prerendered.

### 4. Add the environment variables

In **Project → Settings → Environment Variables**, from `.env.example`:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | from resend.com/api-keys |
| `CONTACT_EMAIL` | where Mike wants quote requests |
| `CONTACT_FROM` | optional, leave unset at first |

Redeploy after adding them — Vercel does not apply new variables to an
existing build. Until they exist the form answers "The form isn't hooked up
yet" instead of failing silently.

### 5. Test the form on the deployed URL

It cannot be tested locally with `npm run dev` — `/api/quote` is a Vercel
function, not an Astro route. Submit it once on the deployed site and confirm
the email lands, with and without a photo.

### Nothing will be indexed

`SITE_LIVE` in `src/config/site.ts` is `false`, so every page emits
`noindex, nofollow` and `robots.txt` disallows everything — on preview **and**
production. Flip it to `true` only when the photos are in and the
needs-input list is clear. Staying out of the index is much easier than
getting removed from it later.

## Lighthouse

Mobile, against the production build, on 2026-09-15:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home | 100 | 100 | 100 | 66 \* |
| Contact | 100 | 100 | 100 | 66 \* |
| Gallery | 100 | 100 | 100 | 66 \* |

FCP 0.8 s · LCP 1.2 s · TBT 0 ms · CLS 0.

\* **The SEO score is 66 on purpose.** Exactly one audit fails —
`is-crawlable`, "Page is blocked from indexing" — which is the `SITE_LIVE`
gate doing its job. Every other SEO audit passes. Verified by temporarily
flipping the gate open and re-running: **SEO 100**. It will score 100 the day
the site is meant to be found, and not before.

The colour-contrast audit passes on every page with the monochrome palette.

**These were measured with placeholders, not photographs.** LCP will rise once
real images land. What protects it: every slot already reserves its exact
aspect ratio, so adding photos cannot shift the layout (CLS stays 0), and
images should go through `astro:assets` for AVIF/WebP and responsive `srcset`.
Re-measure after the shoot.

To re-run: `npm run build`, then `npm run preview`, then `npm run lighthouse`
in a second terminal.
