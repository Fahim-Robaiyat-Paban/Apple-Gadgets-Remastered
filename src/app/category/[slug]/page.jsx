import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryIcon from "@/components/ui/CategoryIcon";
import PageBanner from "@/components/ui/PageBanner";
import CategoryTabs from "@/components/listing/CategoryTabs";
import FilterBar from "@/components/listing/FilterBar";
import ListingResults from "@/components/listing/ListingResults";
import ListingSkeleton from "@/components/listing/ListingSkeleton";
import { getBrands, getCategory } from "@/lib/api/products";
import { first } from "@/lib/utils/listingParams";

// The API has a deliberate 3-4s delay; force-dynamic makes sure every request
// actually re-fetches instead of being served from a cached/prerendered page.
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `Shop ${category.name} at Apple Gadgets: genuine products with EMI, exchange and after-sales service.`,
    alternates: { canonical: `/category/${slug}` },
  };
};

const getHeading = (category, filters) => {
  if (category.slug !== "all") return category.name;
  if (first(filters.offer) === "true") return "Offers";
  if (first(filters.preorder) === "true") return "Pre-order";
  return category.name;
};

const CategoryPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const [filters, brands] = await Promise.all([searchParams, getBrands(slug)]);

  return (
    <>
      <PageBanner
        title={getHeading(category, filters)}
        icon={<CategoryIcon name={category.icon} className="size-14" />}
      />
      <section className="pb-10 pt-10 lg:pb-16 lg:pt-14">
        <div className="site-container px-5 sm:px-8 lg:px-16">
          <CategoryTabs activeSlug={slug} />
          <FilterBar brands={brands} />
          <Suspense key={JSON.stringify(filters)} fallback={<ListingSkeleton />}>
            <ListingResults slug={slug} filters={filters} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
