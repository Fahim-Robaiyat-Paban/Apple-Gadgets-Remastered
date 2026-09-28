import Link from "next/link";
import Pagination from "@/components/listing/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import { getProductPage } from "@/lib/api/products";
import { first, parsePositiveNumber, toSearchParams } from "@/lib/utils/listingParams";

const ListingResults = async ({ slug, filters }) => {
  const { items, total, page, pageSize, pageCount } = await getProductPage({
    category: slug,
    brand: first(filters.brand),
    q: first(filters.q),
    sort: first(filters.sort),
    offer: first(filters.offer) === "true",
    preorder: first(filters.preorder) === "true",
    min: parsePositiveNumber(filters.min),
    max: parsePositiveNumber(filters.max),
    page: parsePositiveNumber(filters.page) ?? 1,
  });

  if (total === 0) {
    return (
      <div className="rounded-[2rem] bg-linear-to-br from-white to-mist px-6 py-16 text-center">
        <p className="text-2xl font-extrabold">No results match your filters.</p>
        <p className="mt-2 text-ink/80">Try a different search or price range, or clear the filters.</p>
        <Link
          href={`/category/${slug}`}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-paper hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Clear filters
        </Link>
      </div>
    );
  }

  const start = (page - 1) * pageSize + 1;
  const end = start + items.length - 1;

  return (
    <div>
      <h2 className="sr-only">Products</h2>
      <p role="status" className="mb-4 font-mono text-sm text-ink/70">
        Showing {start}-{end} of {total} {total === 1 ? "product" : "products"}
      </p>
      <ProductGrid products={items} reveal={false} />
      <Pagination
        basePath={`/category/${slug}`}
        params={toSearchParams(filters)}
        page={page}
        pageCount={pageCount}
      />
    </div>
  );
};

export default ListingResults;
