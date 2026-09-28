"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { SORT_OPTIONS, buildQuery, parsePositiveNumber } from "@/lib/utils/listingParams";

const DEBOUNCE_MS = 300;

const chipBase =
  "inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const fieldBase =
  "h-11 rounded-xl border-2 border-ink bg-white px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

// Filters live in the URL, so a filtered list is shareable, refresh-safe and back-button-safe.
// The server page reads the same params, so this component never holds the results itself.
// Any filter change drops the `page` param so results start again from page 1.
const FilterBar = ({ brands }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") ?? "";
  const urlSort = searchParams.get("sort") ?? "relevance";
  const urlMin = searchParams.get("min") ?? "";
  const urlMax = searchParams.get("max") ?? "";
  const activeBrand = searchParams.get("brand");
  const offerOnly = searchParams.get("offer") === "true";
  const hasFilters = searchParams.toString() !== "";

  const [queryInput, setQueryInput] = useState(urlQuery);
  const [sortValue, setSortValue] = useState(urlSort);
  const [minInput, setMinInput] = useState(urlMin);
  const [maxInput, setMaxInput] = useState(urlMax);
  const [priceError, setPriceError] = useState("");
  const lastPushedQuery = useRef(urlQuery);

  const hrefFor = (updates) => `${pathname}${buildQuery(searchParams, { page: null, ...updates })}`;

  // Pull in changes made elsewhere (e.g. the navbar search or "Clear filters").
  useEffect(() => {
    if (urlQuery !== lastPushedQuery.current) {
      lastPushedQuery.current = urlQuery;
      setQueryInput(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    setSortValue(urlSort);
  }, [urlSort]);

  useEffect(() => {
    setMinInput(urlMin);
    setMaxInput(urlMax);
  }, [urlMin, urlMax]);

  // Debounced search-as-you-type. Reads window.location at fire time so a brand chip
  // clicked during the delay is not overwritten.
  useEffect(() => {
    const value = queryInput.trim();
    if (value === lastPushedQuery.current) return undefined;

    const timer = setTimeout(() => {
      lastPushedQuery.current = value;
      const query = buildQuery(new URLSearchParams(window.location.search), { q: value, page: null });
      startTransition(() => router.replace(`${pathname}${query}`, { scroll: false }));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [queryInput, pathname, router]);

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortValue(value);
    startTransition(() =>
      router.replace(hrefFor({ sort: value === "relevance" ? null : value }), { scroll: false }),
    );
  };

  const handlePriceSubmit = (event) => {
    event.preventDefault();
    const min = parsePositiveNumber(minInput);
    const max = parsePositiveNumber(maxInput);
    if (min && max && min > max) {
      setPriceError("Minimum price can't be higher than the maximum.");
      return;
    }
    setPriceError("");
    startTransition(() =>
      router.replace(hrefFor({ min: min ?? null, max: max ?? null }), { scroll: false }),
    );
  };

  return (
    <div className="mb-8 rounded-[2rem] bg-linear-to-br from-white to-mist p-5 sm:p-6" aria-busy={isPending}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <label htmlFor="listing-search" className="sr-only">
            Search products
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink/60"
            aria-hidden="true"
          />
          <input
            id="listing-search"
            type="search"
            value={queryInput}
            onChange={(event) => setQueryInput(event.target.value)}
            placeholder="Search products"
            className={`${fieldBase} w-full pl-10`}
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="listing-sort" className="text-sm font-semibold">
            Sort by
          </label>
          <select
            id="listing-sort"
            value={sortValue}
            onChange={handleSortChange}
            className={`${fieldBase} text-sm`}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handlePriceSubmit} className="mt-4 flex flex-wrap items-center gap-2" noValidate>
        <p className="mr-1 text-sm font-semibold">Price (৳)</p>
        <label htmlFor="price-min" className="sr-only">
          Minimum price
        </label>
        <input
          id="price-min"
          type="number"
          inputMode="numeric"
          min="0"
          value={minInput}
          onChange={(event) => setMinInput(event.target.value)}
          placeholder="Min"
          className={`${fieldBase} w-28 font-mono`}
        />
        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-max"
          type="number"
          inputMode="numeric"
          min="0"
          value={maxInput}
          onChange={(event) => setMaxInput(event.target.value)}
          placeholder="Max"
          className={`${fieldBase} w-28 font-mono`}
        />
        <button
          type="submit"
          className="min-h-11 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Apply
        </button>
        {priceError && (
          <p role="alert" className="text-sm font-medium text-sale">
            {priceError}
          </p>
        )}
      </form>

      <ul className="mt-4 flex flex-wrap gap-2">
        <li>
          <Link
            href={hrefFor({ offer: offerOnly ? null : "true" })}
            scroll={false}
            aria-current={offerOnly ? "true" : undefined}
            className={`${chipBase} ${offerOnly ? "bg-sticker" : "hover:bg-sticker"}`}
          >
            Deals only
          </Link>
        </li>
        {brands.map((brand) => {
          const active = activeBrand === brand.slug;
          return (
            <li key={brand.slug}>
              <Link
                href={hrefFor({ brand: active ? null : brand.slug })}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={`${chipBase} ${active ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"}`}
              >
                {brand.name}
              </Link>
            </li>
          );
        })}
        {hasFilters && (
          <li>
            <Link
              href={pathname}
              className="inline-flex min-h-11 items-center px-3 text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
            >
              Clear filters
            </Link>
          </li>
        )}
      </ul>

      {isPending && (
        <p role="status" className="mt-3 font-mono text-sm text-ink/70">
          Updating results…
        </p>
      )}
    </div>
  );
};

export default FilterBar;
