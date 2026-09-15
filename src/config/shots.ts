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
  /**
   * Filename in src/assets/photos/. When present the slot renders the real
   * photograph; when absent it renders the labeled placeholder. Setting this
   * also drops the shot out of the "still to shoot" section of SHOT-LIST.md,
   * so the brief shrinks as photos arrive instead of going stale.
   */
  file?: string;
  /**
   * object-position for the slot, when the photo's subject is not centred or
   * the crop is tight. Only set where it was actually needed.
   */
  position?: string;
  /** Alt text. Required alongside `file` — a decorative default would be worse. */
  alt?: string;
}

export const shots = {
  /* ---- the one that carries the whole site ---- */
  'hero-build': {
    file: 'hero-night-dune-66.jpg',
    position: '50% 58%',
    alt: 'A four-seat machine built by M1 Off-Road parked on a dune at night, a lit whip and American flag alongside, fireworks overhead, and an M1 OFF-ROAD number panel on the door.',
    label: 'Hero — finished build, three-quarter front',
    aspect: '16 / 9',
    direction:
      'A finished four-seat machine, three-quarter front, shot low — camera at about hub height so the cage sits against the sky. Late afternoon or first hour after sunrise; midday sun flattens the tube and blows out the powder coat. Leave empty space on the left third for the headline. Landscape, horizon level. This is the single most important photo on the site.',
    priority: 'must',
  },

  /* ---- services, home page and service page tops ---- */
  'svc-cage': {
    file: 'cage-rzr-white-3q.jpg',
    alt: 'A black Polaris RZR Pro R with a white powder-coated M1 Off-Road cage, shot from the front three-quarter.',
    label: 'Roll cage — profile, machine outdoors',
    aspect: '4 / 3',
    direction:
      'Full side profile of a finished cage on the machine. Square to the vehicle, not angled. Plain background — a wall or open desert, not a cluttered yard.',
    priority: 'must',
  },
  'svc-doors': {
    file: 'doors-rzr-white-side.jpg',
    alt: 'A white Polaris RZR with full custom doors, shot square from the side so the panel gaps read.',
    label: 'Doors — closed, latch side',
    aspect: '4 / 3',
    direction:
      'Doors closed, shot square from the side so the panel gaps read. Get the latch in frame.',
    priority: 'must',
  },
  'svc-roofs': {
    file: 'roof-rzr-blue-above.jpg',
    alt: 'A pale blue Polaris RZR Pro R seen from above the front corner, showing the roof and how it joins the cage.',
    label: 'Roof — from above front corner',
    aspect: '4 / 3',
    direction:
      'From slightly above the front corner so the roof surface and its join to the cage are both visible.',
    priority: 'must',
  },
  'svc-fab': {
    file: 'fab-bumper-front.jpg',
    alt: 'A custom tube front bumper on a Polaris RZR with auxiliary lights mounted inside it.',
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
    file: 'shop-bare-cage-jig.jpg',
    alt: 'A bare steel cage on a jig cart in the shop, showing the welded nodes where the tubes meet.',
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
    file: 'roof-canam-edge.jpg',
    alt: 'The edge of a roof on a Can-Am Maverick X3 where it meets the cage tube.',
    label: 'Roof detail — edge and mount',
    aspect: '3 / 2',
    direction: 'Where the roof edge meets the cage tube. Shows it was built to fit, not bolted over.',
    priority: 'should',
  },

  /* ---- in progress: the shop, the work, the person ---- */
  'shop-wide': {
    file: 'shop-bare-cage-cart.jpg',
    alt: 'A bare steel cage mid-build on a rolling jig in the M1 Off-Road shop, tube stock racked on the wall behind it.',
    label: 'Shop — machine on the table, work in progress',
    aspect: '3 / 2',
    direction:
      'Wide, inside the shop. A machine mid-build with bare tube tacked in place. Tools and sparks are good here — this is the only place on the site where mess helps.',
    priority: 'should',
  },
  'bend-bare': {
    file: 'shop-bare-cage-stands.jpg',
    alt: 'A bare, unpainted cage on stands in the shop with a chop saw and welder behind it.',
    label: 'Bare tube — bent sections before assembly',
    aspect: '3 / 2',
    direction:
      'Bent tube sections laid out or in the bender, bare steel, before anything is welded. Reads as craft immediately.',
    priority: 'should',
  },

  'badge': {
    file: 'detail-badge-white-cage.jpg',
    position: '50% 45%',
    alt: 'The M1 Off-Road badge bolted to a white cage tube — a star with a stylised M1 in it, the 1 drawn as a waving flag, and OFF-ROAD on the diagonal.',
    label: 'Badge — the mark on a finished cage',
    aspect: '4 / 3',
    direction:
      'The badge plate on a coated cage, square on and close. Worth a proper frame of its own: it is the only place the real mark appears anywhere on the site.',
    priority: 'should',
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
