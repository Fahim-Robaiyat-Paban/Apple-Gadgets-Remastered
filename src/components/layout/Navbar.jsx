"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import CategoryIcon from "@/components/ui/CategoryIcon";
import CartLink from "@/components/layout/CartLink";
import CategoryMenu from "@/components/layout/CategoryMenu";
import NavSearch from "@/components/layout/NavSearch";
import { navCategories } from "@/lib/data/categories";
import { EASE } from "@/lib/utils/motion";

const navLinks = [
  { label: "Offers", href: "/category/all?offer=true" },
  { label: "Pre-order", href: "/category/all?preorder=true" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Header slides away while scrolling down and returns on scroll up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
  });

  const closeAll = useCallback(() => {
    setDrawerOpen(false);
    setMenuOpen(false);
  }, []);

  // Close the drawer / menu whenever the route changes.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen && !drawerOpen ? "-100%" : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="sticky top-0 z-40 border-b-2 border-ink bg-paper/90 backdrop-blur"
      >
        <div className="site-container flex h-16 items-center gap-2 px-5 sm:px-8 lg:h-20 lg:gap-6 lg:px-16">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="-ml-2 grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-brand lg:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span
              aria-hidden="true"
              className="relative block h-6 w-5 bg-sticker [clip-path:polygon(35%_0,100%_0,100%_100%,35%_100%,0_50%)]"
            />
            Apple Gadgets
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <CategoryMenu
              open={menuOpen}
              onToggle={() => setMenuOpen((value) => !value)}
              onClose={closeAll}
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold hover:bg-sticker focus-visible:outline-2 focus-visible:outline-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <NavSearch className="ml-auto hidden max-w-md flex-1 lg:flex" />
          <CartLink className="ml-auto lg:ml-0" />
        </div>
      </motion.header>

      <Drawer open={drawerOpen} onClose={closeAll} title="Menu">
        <NavSearch onSearch={closeAll} className="mb-6" />
        <nav aria-label="Main">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className="flex min-h-12 items-center border-b border-ink/15 text-lg font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Categories" className="mt-6">
          <p className="mb-2 text-sm font-semibold text-ink/70">Categories</p>
          <ul>
            {navCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={closeAll}
                  className="flex min-h-12 items-center gap-3 border-b border-ink/15"
                >
                  <CategoryIcon name={category.icon} className="size-5 shrink-0" />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default Navbar;
