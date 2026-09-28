import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Spotlight from "@/components/ui/Spotlight";

const chipClasses =
  "inline-flex min-h-11 items-center bg-paper px-5 font-semibold text-ink transition-colors hover:bg-sticker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sticker [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] pl-7";

// Brand chips scroll sideways in a loop and pause on hover. The second copy is only there to
// make the loop seamless, so it is hidden from assistive tech and the tab order. With reduced
// motion the strip is a plain wrapped list of the first copy.
const BrandStrip = ({ brands }) => (
  <Spotlight
    drift={false}
    notch
    glow="rgba(255,214,10,0.25)"
    className="bg-linear-to-br from-ink via-deep to-ink pb-16 pt-12 lg:pb-20 lg:pt-16"
  >
    <div className="site-container px-5 sm:px-8 lg:px-16">
      <SectionHeading title="Shop by brand" inverted />
    </div>
    <div className="overflow-hidden px-5 sm:px-8 motion-reduce:overflow-visible lg:px-16">
      <ul className="flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-3">
        {brands.map((brand) => (
          <li key={brand.slug} className="mr-3 motion-reduce:mr-0">
            <Link href={`/category/all?brand=${brand.slug}`} className={chipClasses}>
              {brand.name}
            </Link>
          </li>
        ))}
        {brands.map((brand) => (
          <li key={`${brand.slug}-copy`} aria-hidden="true" className="mr-3 motion-reduce:hidden">
            <Link href={`/category/all?brand=${brand.slug}`} tabIndex={-1} className={chipClasses}>
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Spotlight>
);

export default BrandStrip;
