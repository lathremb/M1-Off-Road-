/* =========================================================
   The photo brief, as data.

   Every <Placeholder> on the site names a shot from this list, and
   scripts/needs-input.mjs turns the same list into SHOT-LIST.md. So the
   shot list is not a document somebody has to remember to update — it is
   generated from the slots that actually exist in the build.

   `aspect` is the real ratio the slot reserves. Shooting to a different
   ratio means the crop happens automatically and badly, so these matter.
   ========================================================= */

export type Priority = 'must' | 'should' | 'nice';

export interface Shot {
  /** Printed on the placeholder block, so the site reads sensibly before the photos land. */
  label: string;
  /** CSS aspect-ratio value. */
  aspect: string;
  /** Plain-language direction for whoever holds the camera. */
  direction: string;
  priority: Priority;
}

export const shots = {
  /* ---- the one that carries the whole site ---- */
  'hero-build': {
    label: 'Hero — finished build, three-quarter front',
    aspect: '16 / 9',
    direction:
      'A finished four-seat machine, three-quarter front, shot low — camera at about hub height so the cage sits against the sky. Late afternoon or first hour after sunrise; midday sun flattens the tube and blows out the powder coat. Leave empty space on the left third for the headline. Landscape, horizon level. This is the single most important photo on the site.',
    priority: 'must',
  },

  /* ---- services, home page and service page tops ---- */
  'svc-cage': {
    label: 'Roll cage — profile, machine outdoors',
    aspect: '4 / 3',
    direction:
      'Full side profile of a finished cage on the machine. Square to the vehicle, not angled. Plain background — a wall or open desert, not a cluttered yard.',
    priority: 'must',
  },
  'svc-doors': {
    label: 'Doors — closed, latch side',
    aspect: '4 / 3',
    direction:
      'Doors closed, shot square from the side so the panel gaps read. Get the latch in frame.',
    priority: 'must',
  },
  'svc-roofs': {
    label: 'Roof — from above front corner',
    aspect: '4 / 3',
    direction:
      'From slightly above the front corner so the roof surface and its join to the cage are both visible.',
    priority: 'must',
  },
  'svc-fab': {
    label: 'Custom fab — bumper or mount detail',
    aspect: '4 / 3',
    direction:
      'One custom piece, close. A bumper, a spare-tire mount, a bracket. Something that is obviously not a catalogue part.',
    priority: 'must',
  },

  /* ---- detail shots: these are what prove the workmanship ---- */
  'weld-bead': {
    label: 'Weld detail — bare joint, macro',
    aspect: '3 / 2',
    direction:
      'Tight macro on a finished joint BEFORE powder coat, while the bead and heat tint still show. Side light — a work lamp raking across the joint, not a flash straight on. This is the most persuasive photo on the site after the hero and there is currently nothing like it in the archive.',
    priority: 'must',
  },
  'cage-joint': {
    label: 'Cage detail — node where tubes meet',
    aspect: '3 / 2',
    direction:
      'A node where three or more tubes meet, coated and on the machine. Shows the fit-up.',
    priority: 'should',
  },
  'door-latch': {
    label: 'Door detail — latch and seal',
    aspect: '3 / 2',
    direction: 'Latch engaged, close enough to see how the door meets the frame.',
    priority: 'should',
  },
  'roof-edge': {
    label: 'Roof detail — edge and mount',
    aspect: '3 / 2',
    direction: 'Where the roof edge meets the cage tube. Shows it was built to fit, not bolted over.',
    priority: 'should',
  },

  /* ---- in progress: the shop, the work, the person ---- */
  'shop-wide': {
    label: 'Shop — machine on the table, work in progress',
    aspect: '3 / 2',
    direction:
      'Wide, inside the shop. A machine mid-build with bare tube tacked in place. Tools and sparks are good here — this is the only place on the site where mess helps.',
    priority: 'should',
  },
  'bend-bare': {
    label: 'Bare tube — bent sections before assembly',
    aspect: '3 / 2',
    direction:
      'Bent tube sections laid out or in the bender, bare steel, before anything is welded. Reads as craft immediately.',
    priority: 'should',
  },
  'mike-portrait': {
    label: 'Mike Solger — at work, not posed',
    aspect: '4 / 5',
    direction:
      'Mike in the shop, working or standing next to a build. Hood up or off, no staged arms-crossed shot. Vertical. People hire the person, and right now there is no photo of him anywhere on the site.',
    priority: 'must',
  },

  /* ---- gallery ---- */
  'gallery-tile': {
    label: 'Gallery — finished build',
    aspect: '1 / 1',
    direction:
      'Square crops of finished builds, grouped by platform. Aim for at least six per platform. Consistent distance and angle across a group reads far better than variety — shoot them the same way every time and the grid does the work.',
    priority: 'must',
  },

  /* ---- social ---- */
  'og-share': {
    label: 'Share card — build, wide crop',
    aspect: '1.91 / 1',
    direction:
      'Can be a crop of the hero shot. This is what appears when the link is pasted into Facebook or a text message, so it should show a finished machine and nothing else.',
    priority: 'should',
  },
} as const satisfies Record<string, Shot>;

export type ShotKey = keyof typeof shots;
