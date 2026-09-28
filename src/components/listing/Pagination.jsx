import Link from "next/link";
import { buildQuery } from "@/lib/utils/listingParams";

// 1 … 4 5 6 … 12 style page list; every entry has a stable id for its key.
const getPageItems = (page, pageCount) => {
  const numbers = new Set([1, pageCount, page - 1, page, page + 1]);
  const sorted = [...numbers].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const items = [];
  sorted.forEach((number, index) => {
    if (index > 0 && number - sorted[index - 1] > 1) {
      items.push({ id: `gap-${number}`, type: "gap" });
    }
    items.push({ id: `page-${number}`, type: "page", number });
  });
  return items;
};

const linkBase =
  "inline-flex size-11 items-center justify-center rounded-full border-2 border-ink text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const Pagination = ({ basePath, params, page, pageCount }) => {
  if (pageCount <= 1) return null;

  const hrefFor = (number) =>
    `${basePath}${buildQuery(params, { page: number === 1 ? null : String(number) })}`;

  return (
    <nav aria-label="Pagination" className="mt-10">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <li>
            <Link href={hrefFor(page - 1)} className={`${linkBase} w-auto px-4 hover:bg-ink hover:text-paper`}>
              Previous
            </Link>
          </li>
        )}
        {getPageItems(page, pageCount).map((item) =>
          item.type === "gap" ? (
            <li key={item.id} aria-hidden="true" className="px-1 font-mono">
              …
            </li>
          ) : (
            <li key={item.id}>
              <Link
                href={hrefFor(item.number)}
                aria-label={`Page ${item.number}`}
                aria-current={item.number === page ? "page" : undefined}
                className={`${linkBase} font-mono ${
                  item.number === page ? "bg-ink text-paper" : "hover:bg-sticker"
                }`}
              >
                {item.number}
              </Link>
            </li>
          ),
        )}
        {page < pageCount && (
          <li>
            <Link href={hrefFor(page + 1)} className={`${linkBase} w-auto px-4 hover:bg-ink hover:text-paper`}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
