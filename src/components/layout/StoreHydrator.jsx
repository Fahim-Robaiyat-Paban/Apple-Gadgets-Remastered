"use client";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useRecentStore } from "@/lib/store/useRecentStore";

// Persisted stores use skipHydration, so localStorage is only read after mount.
const StoreHydrator = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useRecentStore.persist.rehydrate();
  }, []);

  return null;
};

export default StoreHydrator;
