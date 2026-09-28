"use client";
import { useEffect } from "react";
import ProductShelf from "@/components/home/ProductShelf";
import { useRecentStore } from "@/lib/store/useRecentStore";

// Records the current product, then shows the others viewed before it.
const RecentlyViewed = ({ product }) => {
  const items = useRecentStore((state) => state.items);
  const hasHydrated = useRecentStore((state) => state.hasHydrated);
  const addViewed = useRecentStore((state) => state.addViewed);

  useEffect(() => {
    if (hasHydrated) addViewed(product);
  }, [hasHydrated, addViewed, product]);

  const others = items.filter((item) => item.id !== product.id);
  if (!hasHydrated || others.length === 0) return null;

  return <ProductShelf title="Recently viewed" products={others} />;
};

export default RecentlyViewed;
