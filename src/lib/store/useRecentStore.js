"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT = 8;

// Only what a product card needs; keeps localStorage small.
const toSnapshot = (product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  brand: product.brand,
  category: product.category,
  price: product.price,
  regularPrice: product.regularPrice,
  preorder: product.preorder,
  image: product.image,
});

const sanitizeItems = (items) =>
  Array.isArray(items)
    ? items.filter(
        (item) =>
          typeof item?.id === "string" &&
          typeof item?.slug === "string" &&
          typeof item?.name === "string" &&
          Number.isFinite(item?.price),
      )
    : [];

export const useRecentStore = create(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      addViewed: (product) =>
        set((state) => ({
          items: [toSnapshot(product), ...state.items.filter((item) => item.id !== product.id)].slice(
            0,
            MAX_RECENT,
          ),
        })),
    }),
    {
      name: "recently-viewed-storage",
      version: 1, // bump whenever the shape of persisted state changes
      skipHydration: true, // hydrated in <StoreHydrator /> after mount
      partialize: (state) => ({ items: state.items }),
      migrate: (persisted) => persisted, // nothing to migrate yet
      merge: (persisted, current) => ({ ...current, items: sanitizeItems(persisted?.items) }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
