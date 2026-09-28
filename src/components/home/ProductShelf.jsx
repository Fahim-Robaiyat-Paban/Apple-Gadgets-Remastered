import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/product/ProductGrid";
import Spotlight from "@/components/ui/Spotlight";
import { tones } from "@/lib/data/tones";

// `tone` is a key of `tones` (sun, sky, coral, night).
const ProductShelf = ({ title, href, products, tone = "sun" }) => {
  const { band, dark } = tones[tone];

  return (
    <Spotlight
      glow={dark ? "rgba(255,214,10,0.3)" : "rgba(255,255,255,0.7)"}
      className={`bg-linear-to-b py-12 lg:py-20 ${band}`}
    >
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <SectionHeading title={title} href={href} inverted={Boolean(dark)} />
        <ProductGrid products={products} />
      </div>
    </Spotlight>
  );
};

export default ProductShelf;
