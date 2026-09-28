import { categories } from "@/lib/data/categories";

// Three colour sets, all cut from the brand palette (yellow, blue, coral-orange) plus one dark
// band. Shared by category tiles, product image wells, shelf bands and the about cards.
// Every class is written out in full so Tailwind can see it.
export const tones = {
  sun: {
    tile: "from-sticker to-amber-200",
    well: "from-amber-200 to-yellow-50",
    band: "from-sticker via-amber-200 to-paper",
    badge: "bg-ink text-sticker",
  },
  sky: {
    tile: "from-blue-300 to-mist",
    well: "from-mist to-white",
    band: "from-blue-200 via-mist to-paper",
    badge: "bg-brand text-white",
  },
  coral: {
    tile: "from-orange-300 to-amber-100",
    well: "from-orange-200 to-amber-50",
    band: "from-orange-200 via-amber-100 to-paper",
    badge: "bg-sale text-white",
  },
  // Dark band; not part of the rotation below.
  night: {
    tile: "from-ink to-brand",
    well: "from-mist to-blue-100",
    band: "from-ink via-deep to-brand",
    badge: "bg-sticker text-ink",
    dark: true,
  },
};

const rotation = [tones.sun, tones.sky, tones.coral];

export const getTone = (index) => rotation[index % rotation.length];

export const getCategoryTone = (slug) =>
  getTone(Math.max(categories.findIndex((category) => category.slug === slug), 0));
