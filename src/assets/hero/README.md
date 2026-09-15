# Hero photo

Drop **one** image in this folder and it becomes the home page hero. Remove it
and the labeled placeholder comes back. Nothing else to change — see
`src/components/HeroImage.astro`.

Name it whatever you like. `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` are all
picked up. If more than one file is here, the first alphabetically wins, so
keep it to one.

**Put the full-size original here.** Do not shrink it first. Astro generates
AVIF and WebP at 640 / 960 / 1280 / 1920 / 2560 wide and serves whichever the
browser asks for. Starting from a small file just means every size is soft.

## About the current shot

The night dune photo is **portrait**, and the hero slot is landscape — so on a
desktop screen most of the top and bottom gets cropped away. It survives this
better than most portrait shots, because the machine sits low-left and the dune
runs across the full width, but it is a compromise.

If the crop looks wrong, the dial is one line in `HeroImage.astro`:

```astro
<HeroImage position="50% 62%" />
```

First number is horizontal, second is vertical. Larger vertical percentage
keeps more of the bottom of the photo. Nothing else needs to move.

The long-term fix is the landscape hero shot at the top of `SHOT-LIST.md` —
shot 16:9, low, with empty space on one side for the headline.
