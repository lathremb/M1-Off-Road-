/* =========================================================
   The gallery, grouped by machine platform.

   Every entry is a real build that came through the shop, identified from
   the photograph itself — the badging on the machine, not a guess. Nothing
   is filed under a platform it does not belong to, because "has a machine
   like mine been done here" is the exact question this page answers and a
   wrong answer is worse than a thin group.

   Files live in src/assets/photos/ and are processed by astro:assets.
   ========================================================= */

export interface GalleryPhoto {
  file: string;
  /** Alt text. Describes the build, not the photo. */
  alt: string;
  /** object-position, where centre crop loses the subject. */
  position?: string;
}

export const gallery: Record<string, GalleryPhoto[]> = {
  'polaris-rzr': [
    {
      file: 'rzr-pror-blue-3q.jpg',
      alt: 'Blue Polaris RZR Pro R four-seat with a black roll cage, shot in late afternoon light.',
    },
    {
      file: 'cage-rzr-white-3q.jpg',
      alt: 'Black Polaris RZR Pro R with a white powder-coated roll cage and roof-mounted lights.',
    },
    {
      file: 'rzr-pror-white-cage-rear.jpg',
      alt: 'Black Polaris RZR Pro R with a white roll cage, seen from the rear three-quarter with a spare tyre carrier.',
    },
    {
      file: 'doors-rzr-white-side.jpg',
      alt: 'White Polaris RZR with full custom doors, in profile.',
    },
    {
      file: 'roof-rzr-blue-above.jpg',
      alt: 'Pale blue Polaris RZR Pro R with a black roll cage and roof, seen from above the front corner.',
    },
    {
      file: 'rzr-pror-blue-side.jpg',
      alt: 'Pale blue Polaris RZR Pro R in profile with a black roll cage and roof.',
    },
    {
      file: 'rzr-pror-red-bare.jpg',
      alt: 'Red Polaris RZR Pro R with a bare, uncoated steel roll cage, parked in the desert.',
    },
    {
      file: 'rzr-pror-red-bare-rear.jpg',
      alt: 'Red Polaris RZR Pro R with a bare steel roll cage, seen from the rear three-quarter.',
    },
    {
      file: 'rzr-xp-red-cage.jpg',
      alt: 'Black Polaris RZR XP 1000 four-seat with a red roll cage and full doors.',
    },
    {
      file: 'rzr-turbos-purple.jpg',
      alt: 'Polaris RZR XP Turbo S four-seat with a purple roll cage, parked under pines.',
    },
    {
      file: 'rzr-pror-teal.jpg',
      alt: 'Black Polaris RZR Pro R with a teal roll cage and roof rack.',
    },
    {
      file: 'rzr-pror-blue-cage-side.jpg',
      alt: 'White and blue Polaris RZR Pro R with a blue roll cage, in profile.',
    },
    {
      file: 'rzr-pror-blue-cage-rear.jpg',
      alt: 'White and blue Polaris RZR Pro R with a blue roll cage, from the rear three-quarter.',
    },
    {
      file: 'rzr-pror-bronze-side.jpg',
      alt: 'Black Polaris RZR Pro R with a bronze roll cage, in profile.',
    },
    {
      file: 'rzr-pror-bronze-rear.jpg',
      alt: 'Black Polaris RZR Pro R with a bronze roll cage, from the rear three-quarter.',
    },
    {
      file: 'rzr-white-rear-roof.jpg',
      alt: 'White Polaris RZR seen from directly behind, showing the roll cage bracing and roof.',
    },
    {
      file: 'rzr-200-youth.jpg',
      alt: 'Polaris RZR 200 with a black roll cage and roof — the same work, scaled down.',
    },
    {
      file: 'rzr-front-bumper-on.jpg',
      alt: 'Polaris RZR head-on, showing a custom tube front bumper.',
      position: '50% 40%',
    },
    {
      file: 'hero-night-dune-66.jpg',
      alt: 'White four-seat machine with an M1 OFF-ROAD number panel, on a dune at night.',
      position: '50% 55%',
    },
    {
      file: 'hero-dune-sunset-66.jpg',
      alt: 'The same four-seat machine on a dune at sunset, two lit whips flying flags above it and underglow lighting the sand.',
      position: '50% 55%',
    },
    {
      file: 'detail-badge-white-cage.jpg',
      alt: 'The M1 Off-Road badge on a white roll cage tube, weld beads visible along the joint.',
    },
    {
      file: 'detail-spare-carrier.jpg',
      alt: 'Rear detail of a white roll cage with a spare tyre carrier and rear tray.',
    },
    {
      file: 'fab-bumper-blue.jpg',
      alt: 'Custom tube front bumper on a grey Polaris RZR with blue a-arms.',
    },
  ],

  'can-am': [
    {
      file: 'canam-x3-green-cage.jpg',
      alt: 'Can-Am Maverick X3 Turbo RR with a lime green roll cage and black roof.',
    },
    {
      file: 'roof-canam-edge.jpg',
      alt: 'Can-Am Maverick X3 in profile, showing the roof and how it picks up the roll cage tube.',
    },
  ],

  kawasaki: [
    {
      file: 'krx-black-cage-doors.jpg',
      alt: 'Kawasaki Teryx KRX4 with a black roll cage and full doors.',
    },
    {
      file: 'krx-black-side.jpg',
      alt: 'Kawasaki Teryx KRX4 with a black roll cage, in profile.',
    },
    {
      file: 'krx-bronze-cage.jpg',
      alt: 'Kawasaki Teryx KRX4 with a bronze roll cage and rear rack.',
    },
    {
      file: 'krx-roof-rack.jpg',
      alt: 'Kawasaki Teryx KRX4 with a roll cage and a full-length roof rack.',
    },
  ],

  'in-the-shop': [
    {
      file: 'shop-bare-cage-cart.jpg',
      alt: 'A bare steel UTV roll cage on a rolling jig in the M1 Off-Road shop in Tucson, tube stock racked on the wall behind it.',
    },
    {
      file: 'shop-bare-cage-stands.jpg',
      alt: 'A bare, uncoated UTV roll cage on stands in the shop, chop saw and MIG welder behind it.',
    },
    {
      file: 'shop-bare-cage-jig.jpg',
      alt: 'A bare UTV roll cage on a jig, close enough to see the MIG welded nodes where tubes meet.',
    },
    {
      file: 'detail-badge-bronze-cage.jpg',
      alt: 'The M1 Off-Road badge on a bronze roll cage tube.',
    },
  ],
};

export const galleryCount = Object.values(gallery).reduce(
  (n, list) => n + list.length,
  0
);
