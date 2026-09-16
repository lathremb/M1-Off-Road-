---
target: home page
total_score: 23
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Lathr\\OneDrive\\Desktop\\Ben's Work\\Website Designs\\M1 Off Road\\src\\pages\\index.astro"
target_fingerprint: "sha256:549b544a53e153511dbf7792b27d7f54352ac137f2c655908701bd0efd8681b1"
target_path: "C:\\Users\\Lathr\\OneDrive\\Desktop\\Ben's Work\\Website Designs\\M1 Off Road\\src\\pages\\index.astro"
timestamp: 2026-09-16T04-17-00Z
slug: src-pages-index-astro
---
# Critique — Home page (src/pages/index.astro)

Method: dual-agent (A: adb58dcd5f0a0fba9 · B: a80e4cda90848d3f1)
Deviation: detector findings were already in the parent context before Assessment A ran (earlier `/impeccable audit` this session, plus a mislabeled first spawn). Assessment A itself ran fully isolated and unanchored.

Surface mode: Persuade. Heuristic 7 scored n/a (single-conversion marketing page).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Mobile nav can never show current page — Header.astro:91 reads 'text-bone' : 'text-bone' |
| 2 | Match System / Real World | 3 | Machine names appear three sections down; audience decides by machine |
| 3 | User Control and Freedom | 4 | No traps, skip link present, every exit exists |
| 4 | Consistency and Standards | 2 | One destination carries four names; secondary button slot means three things |
| 5 | Error Prevention | 2 | Hours footer-only; nothing prevents a 9pm Sunday call into silence |
| 6 | Recognition Rather Than Recall | 3 | Six unlabeled gallery tiles force a memory bridge |
| 7 | Flexibility and Efficiency | n/a | Single-conversion marketing page; no expert workflow to accelerate |
| 8 | Aesthetic and Minimalist Design | 3 | 1088px hairline bisecting the hero; 190px dead space in section 2 |
| 9 | Error Recovery | 2 | tel: dead-ends silently on desktop, no fallback |
| 10 | Help and Documentation | 2 | "How a job actually runs" is a registered, unfilled gap |
| **Total** | | **23/36** | **Acceptable (64%)** |

## Design Specificity Verdict

The words are unmistakably this shop. The layout is not.

**Authored:** the price section exists at all and is the typographic peak (128px, larger than the H1); trade-literate copy with zero adjectives; the voice reaches alt text; art-directed hero built for one photograph.

**Category-default:** standard local-trade section rhythm in alternating bands. No interaction behaves like the craft — BendRule renders at 320×24px. The proof the shop owns is withheld from the eye: `platforms` names Pro R, Turbo S, XP 1000, Maverick X3 Turbo RR, Teryx KRX4; the visible design names none.

**Deterministic scan:** one CLI finding (broken-image, Lightbox.astro:41), verified by Assessment B as a FALSE POSITIVE at runtime (currentSrc empty, naturalWidth 0, no network request). This corrects the earlier `/impeccable audit`, which rated it P1 on static reasoning — downgraded to P3 code smell.

**Overlays:** injection succeeded, live server started on 8400 and verifiably stopped. `dark-glow` was the overlay detecting its own highlight ring. `repeating-stripes-gradient` matches `.shot` CSS that now renders nowhere (shotCount 0 on all five pages). One real finding: `line-length` on #q-photo-hint.

## What Is Working

1. Publishing the price and giving it a section — $2,500 larger than the H1 on its own band.
2. The voice is structural, not a layer — the same specificity reaches screen readers.
3. The mobile call/text bar — 188×56 targets, thumb zone, pre-filled SMS body, reserved padding.

## Priority Issues

**[P1] A `[ needs input — deposit terms ]` marker renders on the live home page.** Verified in dist/index.html. Lands three sentences after the most reassuring line on the page. The system contradicts itself: `deposit` is severity `content`, yet `tubing` and `warranty` are omitted entirely. Fix: remove the line, keep the registry entry, gate NeedsInput on `severity === 'launch'`. → /impeccable polish

**[P1] Hero subhead illegible where the scrim is thinnest.** text-steel #8e8e8e at 58–69% height where the gradient runs 0.26–0.40 alpha, crossing the lit flag and firework burst on mobile. The documented 5.8:1 holds against solid #111, not a 26% scrim. Fix: text-bone, and raise the scrim mid stop to ~.55 68%. → /impeccable typeset

**[P1] No reason to trust him above the fold.** Ten years, "Mike quotes it and Mike welds it", and the hours all exist already but sit below the fold or on other pages. Fix: one line under the hero price plus hours beside the phone CTA. → /impeccable layout

**[P2] Gallery teaser withholds machine names.** Identity lives in alt text only; sighted users must map a sentence onto six photos from memory. Fix: caption each tile or list machine names beneath the strip. → /impeccable clarify

**[P2] Mobile navigation can never show the current page.** Verified: Header.astro:91 both branches identical; line 45 correct on desktop. Hamburger never becomes an X. → /impeccable adapt

## Persona Red Flags

**Casey (mobile):** hamburger 42×36 below the 44 minimum and the only route to nav; four contact targets in the first screen, two identical tel: hrefs 300px apart; night hero behind a 0.92 scrim is invisible in daylight.

**Jordan (first-timer):** only unlabeled control is the hamburger, icon never changes state; nothing says what happens after the call (process gap unfilled); calls 9pm Sunday into silence; "Get a quote" and "Send the details" identical styling, different names, same destination.

**Riley (stress tester):** screenshots the public needs-input marker; notices inconsistent handling of one severity class; tel: dead-ends on desktop; aria-expanded persists on a display:none button after resize.

## Minor Observations

- Price rule is a 1088px hairline carrying 257px of text; border-t with no max-width while every other hero block is measure-constrained.
- Four names for one destination.
- line-length on #q-photo-hint, ~104 char capacity, no max-width.
- Two unresolved voids at desktop: 190px beside the services list, ~180px trailing in the price grid.
- Footer uses h2 for utility labels; outline reads as seven sibling h2s.
- scroll-behavior: smooth is global but every service link is a cross-page anchor.
- og:image deliberately absent — correct while placeholder, but this pitch is photographs and the only presence is Facebook.

## Questions to Consider

- What if the hero were the price?
- What would this page look like if the tiles said "Maverick X3 Turbo RR" out loud?
- What would a structural version of the bend look like at 40px?
- If the sticky bar is doing its job, does the hero need a Call button at all?
- What actually happens after somebody calls — unasked, or unanswered?
