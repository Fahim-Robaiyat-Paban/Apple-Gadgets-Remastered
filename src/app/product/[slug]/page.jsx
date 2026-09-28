import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBuySection from "@/components/product/ProductBuySection";
import ProductDetails from "@/components/product/ProductDetails";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import ProductShelf from "@/components/home/ProductShelf";
import {
  getCategory,
  getProduct,
  getProductDetails,
  getRelatedProducts,
} from "@/lib/api/products";
import { formatPrice, slugify } from "@/lib/utils/formatters";

const crumbClass = "inline-flex min-h-11 items-center hover:text-brand";

// The API has a deliberate 3-4s delay; force-dynamic (instead of the old
// generateStaticParams build-time prerender) makes sure every visit actually
// re-fetches so loading.jsx has something to wait for.
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `Buy ${product.name} at Apple Gadgets for ${formatPrice(product.price)}. Genuine product with EMI, exchange and after-sales service.`,
    alternates: { canonical: `/product/${slug}` },
  };
};

const ProductPage = async ({ params }) => {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [category, related, details] = await Promise.all([
    getCategory(product.category),
    getRelatedProducts(product),
    getProductDetails(slug),
  ]);

  return (
    <>
      <section className="bg-linear-to-b from-mist via-paper to-paper py-8 lg:py-14">
        <div className="site-container px-5 sm:px-8 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center text-sm text-ink/70">
              <li>
                <Link href="/" className={crumbClass}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="px-2">
                /
              </li>
              <li>
                <Link href={`/category/${category.slug}`} className={crumbClass}>
                  {category.name}
                </Link>
              </li>
              <li aria-hidden="true" className="px-2">
                /
              </li>
              <li>
                <Link
                  href={`/category/${category.slug}?brand=${slugify(product.brand)}`}
                  className={crumbClass}
                >
                  {product.brand}
                </Link>
              </li>
            </ol>
          </nav>
          <ProductBuySection product={product} details={details} />
        </div>
      </section>

      {details && <ProductDetails product={product} details={details} />}

      {related.length > 0 && (
        <ProductShelf
          title={`More in ${category.name}`}
          href={`/category/${category.slug}`}
          products={related}
        />
      )}

      <RecentlyViewed product={product} />
    </>
  );
};

export default ProductPage;
