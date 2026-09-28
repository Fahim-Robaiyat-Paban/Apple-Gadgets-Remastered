"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import CategoryIcon from "@/components/ui/CategoryIcon";
import { navCategories } from "@/lib/data/categories";
import { EASE } from "@/lib/utils/motion";

const CategoryMenu = ({ open, onToggle, onClose }) => {
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  // Click outside and Escape both dismiss the panel; listeners are removed on cleanup.
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) onClose();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="category-menu"
        onClick={onToggle}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold hover:bg-sticker focus-visible:outline-2 focus-visible:outline-brand"
      >
        Categories
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="category-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 top-full z-50 mt-2 w-[min(760px,90vw)] rounded-3xl border-2 border-ink bg-white p-2 shadow-[6px_6px_0_0_var(--color-brand)]"
          >
            <ul className="grid grid-cols-2 lg:grid-cols-3">
              {navCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={onClose}
                    className="flex min-h-11 items-center gap-3 rounded-full px-3 py-2 text-sm font-medium hover:bg-sticker focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <CategoryIcon name={category.icon} className="size-5 shrink-0" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryMenu;
