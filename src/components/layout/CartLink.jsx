"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { getCartCount } from "@/lib/utils/pricing";

const CartLink = ({ className = "" }) => {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const count = hasHydrated ? getCartCount(items) : 0;

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className={`relative grid size-11 place-items-center hover:text-brand focus-visible:outline-2 focus-visible:outline-brand ${className}`}
    >
      <ShoppingBag className="size-6" aria-hidden="true" />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1.7 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
          className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-sale px-1 font-mono text-xs font-semibold text-white"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
};

export default CartLink;
