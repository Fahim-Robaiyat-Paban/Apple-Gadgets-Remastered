import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductShelf from "@/components/home/ProductShelf";
import BrandStrip from "@/components/home/BrandStrip";
import AboutBlock from "@/components/home/AboutBlock";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/lib/data/categories";
import { dealSlugs, heroProductSlug } from "@/lib/data/home";
import {
  getProduct,
  getProducts,
  getProductsBySlugs,
  getTopBrands,
} from "@/lib/api/products";

export const metadata = { alternates: { canonical: "/" } };
// The API has a deliberate 3-4s delay; force-dynamic makes sure every request
// actually re-fetches (instead of being served from a static/prerendered
// page) so loading.jsx has something to wait for.
export const dynamic = "force-dynamic";

const Home = async () => {
  const [heroProduct, preorders, deals, arrivals, appliances, computers, brands] = await Promise.all([
    getProduct(heroProductSlug),
    getProducts({ preorder: true }),
    getProductsBySlugs(dealSlugs),
    getProducts({ newArrival: true, limit: 8 }),
    getProducts({ category: "home-appliances", limit: 8 }),
    getProducts({ category: "pc-components", limit: 8 }),
    getTopBrands(12),
  ]);

  return (
    <>
      <Hero product={heroProduct} />
      <TrustStrip />
      <section className="py-12 lg:py-20">
        <div className="site-container px-5 sm:px-8 lg:px-16">
          <SectionHeading title="Shop by category" href="/category/all" linkLabel="All products" />
          <CategoryGrid categories={categories} />
        </div>
      </section>
      <ProductShelf title="Apple Exclusive 2026" href="/category/all?preorder=true" products={preorders} tone="night" />
      <ProductShelf title="Exclusive Deals" href="/category/all?offer=true" products={deals} tone="sun" />
      <ProductShelf title="New Arrival" href="/category/all" products={arrivals} tone="sky" />
      <BrandStrip brands={brands} />
      <ProductShelf title="Home Appliances" href="/category/home-appliances" products={appliances} tone="coral" />
      <ProductShelf title="AG Computers" href="/category/pc-components" products={computers} tone="sky" />
      <AboutBlock />
    </>
  );
};

export default Home;
