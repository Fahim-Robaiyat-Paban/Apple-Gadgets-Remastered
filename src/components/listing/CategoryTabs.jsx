import Link from "next/link";
import { navCategories } from "@/lib/data/categories";

// Hop between categories without opening the menu. Scrolls sideways on small screens.
const CategoryTabs = ({ activeSlug }) => (
  <nav aria-label="Categories" className="mb-6">
    <ul data-lenis-prevent className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
      {navCategories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <li key={category.slug} className="shrink-0">
            <Link
              href={`/category/${category.slug}`}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full border-2 border-ink px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                active ? "bg-ink text-paper" : "hover:bg-sticker"
              }`}
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default CategoryTabs;
